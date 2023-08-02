import { LoaderArgs, V2_MetaFunction, json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { arrowLeftIcon } from '~/assets/icons'
import SvgText from '~/components/SvgText'
import useGoBack from '~/hooks/useGoBack'

import { getArticle } from '~/utils/blog-data'

export function loader({ params }: LoaderArgs) {
    const { id } = params
    if (!id) throw new Error("Could not find the movie")

    const article = getArticle(+id)
    if (!article) return redirect('/articles') // TODO: 404

    return json({ article })
}

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
    return [{ title: data?.article.title ?? 'BLOG | UBONG' }]
}

export default function Article() {
    const { article } = useLoaderData<typeof loader>()
    const { goBack } = useGoBack()

    return (<main className="m-blk-7">
        <div className="container">
            <section className="">
                <aside className="flex jst-btwn m-blk-4">
                    <button title="Previous page" onClick={goBack} className="rounded small bg-sec p-blk-2 p-ln-2">
                        <SvgText src={arrowLeftIcon} srcCls="f-s-6" />
                    </button>
                </aside>
                <header className="intro_post p-blk-2 p-ln-2">
                    <img className="post_image" src={article.image} alt="computer screen with code" width={350} />
                    <div className="">
                        <span className="flex jst-btwn al-end f-s-3">
                            <span><span className="f-s-4 f-w-6">{article.tag}</span> | {article.length} read</span>
                            <span className="col-border">{article.date}</span>
                        </span>
                        <h1 className="title f-s-6 f-w-6">{article.title}</h1>
                    </div>
                </header>
            </section>
            <div className='content m-ln-auto'>
                <section className=''>
                    <h2>Introduction</h2>
                </section>
                <section className=''>
                    <h2>Conclusion</h2>
                </section>
            </div>
            <section className=''>
                <h2>Related Articles</h2>
            </section>
        </div>
    </main>)
}
