import { useState } from 'react'
import {
    ActionArgs, NodeOnDiskFile, json, redirect,
    unstable_composeUploadHandlers, unstable_createFileUploadHandler,
    unstable_createMemoryUploadHandler, unstable_parseMultipartFormData
} from '@remix-run/node'
import { Form, Link, useActionData, useNavigation } from '@remix-run/react'
import invariant from 'tiny-invariant'
import slugify from 'slugify'

import { Cloudinary } from '~/utils/cloudinary.server'
import markedWrapper from '~/utils/marked'
import { createArticle } from '~/models/blog.server'

export const action = async ({ request }: ActionArgs) => {
    const uploadHandler = unstable_composeUploadHandlers(
        unstable_createFileUploadHandler({
            maxPartSize: 5_000_000,
            file: ({ filename }) => filename,
        }),
        unstable_createMemoryUploadHandler()// parse everything else into memory
    )
    const formData = await unstable_parseMultipartFormData(request, uploadHandler)

    const title = formData.get("title")
    const tag = formData.get("tag")
    const image = formData.get("image")
    const intro = formData.get("intro")
    const markdown = formData.get("markdown")

    const errors = {
        title: title ? null : "Title is required",
        tag: tag ? null : "Tag is required",
        image: image ? null : "Image is required",
        intro: intro ? null : "Intro is required",
        markdown: markdown ? null : "Markdown is required",
    }
    const hasErrors = Object.values(errors).some(
        (errorMessage) => errorMessage
    )
    if (hasErrors) {
        return json(errors)
    }

    invariant(
        typeof title === "string",
        "Title must be a string"
    )
    invariant(
        typeof tag === "string",
        "Tag must be a string"
    )
    invariant(
        image instanceof NodeOnDiskFile,
        "Image must be an object"
    )
    invariant(
        typeof intro === "string",
        "Intro must be an object"
    )
    invariant(
        typeof markdown === "string",
        "Markdown must be a string"
    )
    const slug = slugify(title, { strict: true })
    const length = Math.min(1, Math.round((intro + markdown).split(' ').length / 200))
    const { imageURL } = await Cloudinary.uploadImage(image.getFilePath(), slug, 'blog')
    if (!imageURL) throw new Error('An error occured while uploading the picture')

    await createArticle({ title, tag, markdown, length, slug, image: imageURL, intro })
    return redirect("/blog")
}

export default function NewBlog() {
    const errors = useActionData<typeof action>()

    const { state } = useNavigation()
    const isCreating = state === 'submitting'

    const [intro, setIntro] = useState('')
    const [markdown, setMarkdown] = useState('')
    const inputClassName = `form-element`

    return (
        <div className='m-blk-7 container col'>
            <main>
                <Form method="post" className='plain flex-col gap-p5' encType="multipart/form-data">
                    <div className='form-group'>
                        <label>
                            Post Title:{" "}
                            {errors?.title ? (
                                <em className="col-error f-s-3">{errors.title}</em>
                            ) : null}
                            <input type="text" name="title" className={inputClassName} />
                        </label>
                    </div>
                    <div className='form-group-inline'>
                        <label htmlFor='tag'>
                            Add tag:{" "}
                            <input type="text" name="tag" id='tag' className={inputClassName} />
                            {errors?.tag ? (
                                <em className="col-error f-s-3">{errors.tag}</em>
                            ) : null}
                        </label>
                        <label htmlFor='image'>
                            Intro image:{" "}
                            <input type="file" accept='image/*' name="image" id='image' className={inputClassName} />
                            {errors?.image ? (
                                <em className="col-error f-s-3">{errors.image}</em>
                            ) : null}
                        </label>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="intro">
                            Intro:{" "}
                            {errors?.intro ? (
                                <em className="col-error f-s-3">
                                    {errors.intro}
                                </em>
                            ) : null}
                        </label>
                        <br />
                        <textarea
                            id="intro"
                            name="intro"
                            className={inputClassName}
                            onChange={(e) => setIntro(e.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="markdown">
                            Markdown:{" "}
                            {errors?.markdown ? (
                                <em className="col-error f-s-3">
                                    {errors.markdown}
                                </em>
                            ) : null}
                        </label>
                        <br />
                        <textarea
                            id="markdown"
                            name="markdown"
                            rows={10}
                            className={inputClassName}
                            onChange={(e) => setMarkdown(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-1">
                        <Link to={'/blog'} className="button cancel-btn">Cancel</Link>
                        <button type="submit" className="btn-primary" disabled={isCreating}>
                            {isCreating ? "Creating..." : "Create"}
                        </button>
                    </div>
                </Form>
            </main>
            <aside className='preview'>
                <span className='preview_title f-s-4 f-w-5'>Preview</span>
                <p>{intro}</p>
                <div dangerouslySetInnerHTML={{ __html: markedWrapper(markdown) }}></div>
            </aside>
        </div>
    )
}
