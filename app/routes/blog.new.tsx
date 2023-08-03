import { useState } from 'react'
import { ActionArgs, json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useNavigation } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { marked } from "marked"

export const action = async ({ request }: ActionArgs) => {
    const formData = await request.formData()
    const title = formData.get("title")
    const tag = formData.get("tag")
    const image = formData.get("image")
    console.log(typeof image)
    const markdown = formData.get("markdown")

    const errors = {
        title: title ? null : "Title is required",
        tag: tag ? null : "Tag is required",
        image: image ? null : "Image is required",
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
    // invariant(
    //     typeof image === "string",
    //     "Image must be a string"
    // )
    invariant(
        typeof markdown === "string",
        "Markdown must be a string"
    )

    // await createPost({ title, tag, markdown })

    return redirect("/blog")
}

export default function NewBlog() {
    const errors = useActionData<typeof action>()

    const { state } = useNavigation()
    const isCreating = state === 'submitting'

    const [value, setValue] = useState('')
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
                            {errors?.tag ? (
                                <em className="col-error f-s-3">{errors.tag}</em>
                            ) : null}
                            <input type="text" name="tag" id='tag' className={inputClassName} />
                        </label>
                        <label htmlFor='image'>
                            Intro image:{" "}
                            {errors?.image ? (
                                <em className="col-error f-s-3">{errors.image}</em>
                            ) : null}
                            <input type="file" accept='image/*' name="image" id='image' className={inputClassName} />
                        </label>
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
                            onChange={(e) => setValue(e.target.value)}
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
                <h2 className='preview_title f-s-4'>Preview</h2>
                <div dangerouslySetInnerHTML={{ __html: marked(value, { mangle: false, headerIds: false }) }}></div>
            </aside>
        </div>
    )
}
