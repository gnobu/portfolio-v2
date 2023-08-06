import { useState } from 'react'
import { ActionArgs, json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useNavigation } from '@remix-run/react'

import ArticleFormInputs from '~/components/ArticleFormInputs'
import MarkdownPreview from '~/components/MarkdownPreview'
import { processArticleData } from '~/utils/blog-action'
import { createArticle } from '~/models/blog.server'

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
        <div className='m-blk-7 container col'>
            <main>
                <Form method="post" className='plain flex-col gap-p5' encType="multipart/form-data">
                    <ArticleFormInputs errors={errors} setIntro={setIntro} setMarkdown={setMarkdown} />
                    <div className="flex gap-1">
                        <Link to={'/blog'} className="button cancel-btn">Cancel</Link>
                        <button type="submit" className="btn-primary" disabled={isCreating}>
                            {isCreating ? "Creating..." : "Create"}
                        </button>
                    </div>
                </Form>
            </main>
            <MarkdownPreview intro={intro} markdown={markdown} />
        </div>
    )
}
