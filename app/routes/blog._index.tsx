import { Article } from "@prisma/client"
import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { plusIcon } from "~/assets/icons"

import ArticleCard from "~/components/ArticleCard"
import IntoArticle from "~/components/IntoArticle"
import SvgText from "~/components/SvgText"
import Tag from "~/components/Tag"
import { getArticles } from "~/models/blog.server"

export async function loader() {
    const articles = await getArticles()

    if (typeof articles === 'string') {
        return json({ articles: [], introArticle: null, error: articles })
    }

    return json({ introArticle: articles[0], articles: articles.slice(1), error: null })
}

export default function Blog() {
    const { articles, introArticle, error } = useLoaderData<typeof loader>()
    console.log(error)

    return (
        <main className="m-blk-7">
            <aside className="container p-blk-5">
                <ul className="flex f-wrap jst-center gap-1 no-list-style no-list-pad">
                    {["All", "Css", "JavaScript", "React", "MongoDB", "Html"].map(tag => (
                        <Tag key={tag} tagName={tag} />
                    ))}
                </ul>
            </aside>
            <section className="container m-blk-5">
                {introArticle ? <IntoArticle article={{ ...introArticle, createdAt: new Date(introArticle.createdAt) }} /> : null}
            </section>
            <section className="container other_posts m-blk-6">
                {articles.map(article => {
                    return <ArticleCard key={article.slug} article={{ ...article, createdAt: new Date(article.createdAt) }} />
                })}
            </section>
            <aside className="container m-blk-6 flex jst-center">
                <Link to={'new'} title='Add article' className='button outline small '><SvgText src={plusIcon} srcCls='f-s-8' /></Link>
            </aside>
        </main>
    )
}
