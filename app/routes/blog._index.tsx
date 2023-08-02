import { V2_MetaFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { getArticles, getIntroArticle } from "~/utils/blog-data"
import ArticleCard from "~/components/ArticleCard"
import IntoArticle from "~/components/IntoArticle"
import Tag from "~/components/Tag"

export const meta: V2_MetaFunction = () => {
    return [{ title: "BLOG | UBONG" }]
}

export function loader() {
    const articles = getArticles()
    const introArticle = getIntroArticle()

    return json({ introArticle, articles })
}

export default function Blog() {
    const { articles, introArticle } = useLoaderData<typeof loader>()
    // const { goBack } = useGoBack()

    return (
        <main className="m-blk-7">
            <section className="container">
                {/* <aside className="flex jst-btwn">
                    <button title="Previous page" onClick={goBack} className="rounded small bg-sec p-blk-2 p-ln-2">
                        <SvgText src={arrowLeftIcon} srcCls="f-s-6" />
                    </button>
                    <button title="Search" className="rounded small bg-sec p-blk-2 p-ln-2">
                        <SvgText src={searchIcon} srcCls="f-s-6" />
                    </button>
                </aside> */}
                <aside className="p-blk-5">
                    <ul className="flex f-wrap jst-center gap-1 no-list-style no-list-pad">
                        {["All", "Css", "JavaScript", "React", "MongoDB", "Html"].map(tag => (
                            <Tag key={tag} tagName={tag} />
                        ))}
                    </ul>
                </aside>
            </section>

            <section className="container m-blk-5">
                <IntoArticle article={introArticle} />
            </section>

            <section className="container other_posts m-blk-5">
                {articles.map(article => {
                    return <ArticleCard key={article.id} article={article} />
                })}
            </section>
        </main>
    )
}
