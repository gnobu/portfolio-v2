import { useState } from 'react'
import { ActionArgs, LoaderArgs, json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useLoaderData, useNavigation } from '@remix-run/react'

import ArticleFormInputs from '~/components/ArticleFormInputs'
import MarkdownPreview from '~/components/MarkdownPreview'
import { processArticleData } from '~/utils/blog-action.server'
import { deleteArticle, getArticle, updateArticle } from '~/models/blog.server'
import { Cloudinary } from '~/utils/cloudinary.server'

export async function loader({ params }: LoaderArgs) {
    const { slug } = params
    if (!slug) return redirect('/blog')

    const article = await getArticle(slug)
    if (!article) return redirect('/blog') // TODO: 404

    return json({ article, slug })
}

export const action = async ({ request }: ActionArgs) => {
    const { data, errors, intent, slug } = await processArticleData(request)
    if (errors) return json(errors)
    if (!slug) throw new Error("No slug provided")

    if (intent === 'update') await updateArticle(slug as string, { ...data, image: data.image || undefined })

    if (intent === 'delete') {
        const { image } = await deleteArticle(slug as string)
        const { isSuccess, message } = await Cloudinary.deleteImage(image.match(/(portfolio)\/[\w/-]+/)?.[0] ?? '')
        if (!isSuccess) throw new Error(message)
    }
    return redirect("/blog")
}

export default function EditArticle() {
    const { article, slug } = useLoaderData<typeof loader>()
    const errors = useActionData<typeof action>()

    const { state } = useNavigation()
    const submitting = state === 'submitting'

    const [intro, setIntro] = useState(article?.intro ?? '')
    const [markdown, setMarkdown] = useState(article?.markdown ?? '')

    return (
        <div className='m-blk-7 container col'>
            <main>
                <Form method="post" className='plain flex-col gap-p5' encType="multipart/form-data">
                    <input type="hidden" name="former_slug" value={slug} />
                    <ArticleFormInputs article={article} errors={errors} setIntro={setIntro} setMarkdown={setMarkdown} />
                    <div className="flex gap-1 jst-btwn">
                        <Link to={'/blog'} className="button outline">Cancel</Link>
                        <button type="submit" name='intent' value='delete' className="cancel-btn" disabled={submitting}>
                            {submitting ? "Delete..." : "Delete"}
                        </button>
                        <button type="submit" name='intent' value='update' className="btn-primary" disabled={submitting}>
                            {submitting ? "Updating..." : "Update"}
                        </button>
                    </div>
                </Form>
            </main>
            <MarkdownPreview intro={intro} markdown={markdown} />
        </div>
    )
}
