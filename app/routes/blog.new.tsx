import { useState } from 'react'
import { ActionArgs, LoaderArgs, json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useNavigation } from '@remix-run/react'

import ArticleFormInputs from '~/components/ArticleFormInputs'
import MarkdownPreview from '~/components/MarkdownPreview'
import { processArticleData } from '~/utils/blog-action.server'
import { createArticle } from '~/models/blog.server'
import { isAdmin, getSession } from '~/sessions'

export async function loader({ request }: LoaderArgs) {
    const session = await getSession(request.headers.get('Cookie'))
    if (!isAdmin(session)) return redirect('/blog')
    return null
}

export const action = async ({ request }: ActionArgs) => {
    const { data, errors } = await processArticleData(request)
    if (errors) return json(errors)

    await createArticle(data)
    return redirect("/blog")
}

export default function NewBlog() {
    const errors = useActionData<typeof action>()

    const { state } = useNavigation()
    const isCreating = state === 'submitting'

    const [intro, setIntro] = useState('')
    const [markdown, setMarkdown] = useState('')

    return (
        <main className="container m-blk-7">
            <h2>Create Blog Post</h2>
            <div className='col'>
                <Form method="post" className='plain flex-col gap-p5' encType="multipart/form-data">
                    <ArticleFormInputs errors={errors} setIntro={setIntro} setMarkdown={setMarkdown} />
                    <div className="flex gap-1">
                        <Link to={'/blog'} className="button cancel-btn">Cancel</Link>
                        <button type="submit" className="btn-primary" disabled={isCreating}>
                            {isCreating ? "Creating..." : "Create"}
                        </button>
                    </div>
                </Form>
                <MarkdownPreview intro={intro} markdown={markdown} />
            </div>
        </main>
    )
}
