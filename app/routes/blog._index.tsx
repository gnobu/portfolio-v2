import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import ArticleCard from "~/components/ArticleCard"
import IntoArticle from "~/components/IntoArticle"
import Tag from "~/components/Tag"
import { getArticles } from "~/models/blog.server"

export async function loader() {
    const articles = await getArticles()

    return json({ introArticle: articles[0], articles: articles.slice(1) })
}

export default function Blog() {
    const { articles, introArticle } = useLoaderData<typeof loader>()

    return (
        <main className="m-blk-7">
            <section className="container">
                <aside className="p-blk-5">
                    <ul className="flex f-wrap jst-center gap-1 no-list-style no-list-pad">
                        {["All", "Css", "JavaScript", "React", "MongoDB", "Html"].map(tag => (
                            <Tag key={tag} tagName={tag} />
                        ))}
                    </ul>
                </aside>
            </section>

            <section className="container m-blk-5">
                {introArticle ? <IntoArticle article={{ ...introArticle, createdAt: new Date(introArticle.createdAt) }} /> : null}
            </section>

            <section className="container other_posts m-blk-5">
                {articles.map(article => {
                    return <ArticleCard key={article.slug} article={{ ...article, createdAt: new Date(article.createdAt) }} />
                })}
            </section>
        </main>
    )
}
