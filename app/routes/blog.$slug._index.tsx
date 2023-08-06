import { LoaderArgs, V2_MetaFunction, json, redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

import { getArticle } from '~/models/blog.server'
import useGoBack from '~/hooks/useGoBack'
import markedWrapper from '~/utils/marked'
import { arrowLeftIcon, editIcon } from '~/assets/icons'
import SvgText from '~/components/SvgText'


export async function loader({ params }: LoaderArgs) {
    const { slug } = params
    if (!slug) return redirect('/blog')
    // if (!slug) throw new Error("Could not find the article")

    const article = await getArticle(slug)
    if (!article) return redirect('/blog') // TODO: 404

    return json({ article })
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
    return [{ title: data?.article.title ?? 'BLOG | UBONG' }]
}

export default function Article() {
    const { article } = useLoaderData<typeof loader>()
    const { goBack } = useGoBack()

    return (
        <div className="container m-blk-7">
            <aside className="flex jst-btwn m-blk-4">
                <button title="Previous page" onClick={goBack} className="rounded small bg-sec p-blk-2 p-ln-2">
                    <SvgText src={arrowLeftIcon} srcCls="f-s-6" />
                </button>
                <Link to='edit' className='button small ghost'><SvgText src={editIcon} srcCls='f-s-6' /></Link>
            </aside>
            <main className="">
                <header className="intro_post p-blk-2 p-ln-2">
                    <img className="post_image" src={article.image} alt="computer screen with code" width={350} />
                    <div className="">
                        <span className="flex jst-btwn al-end f-s-3">
                            <span><span className="f-s-4 f-w-6">{article.tag}</span> | {article.length} mins read</span>
                            <span className="col-border">{new Date(article.createdAt).toLocaleDateString()}</span>
                        </span>
                        <h1 className="title f-s-6 f-w-6">{article.title}</h1>
                    </div>
                </header>
                <article className='content m-ln-auto'>
                    <p>{article.intro}</p>
                    <div dangerouslySetInnerHTML={{ __html: markedWrapper(article.markdown) }}>
                    </div>
                </article>
                <aside className=''>
                    <h2>Related Articles</h2>
                </aside>
            </main>
        </div>
    )
}
