import { LinksFunction, V2_MetaFunction } from "@remix-run/node"

import ArticleCard from "~/components/ArticleCard"
import IntoArticle from "~/components/IntoArticle"
import SvgText from "~/components/SvgText"
import useGoBack from "~/hooks/useGoBack"
import Tag from "~/components/Tag"
import { arrowLeftIcon, searchIcon } from "~/assets/icons"
import { postImage } from "~/assets/images"
import blogStylesUrl from "~/styles/blog.css"

export const meta: V2_MetaFunction = () => {
    return [{ title: "BLOG | UBONG" }]
}

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: blogStylesUrl },
]

const articles = [
    {
        image: postImage,
        title: '3 Essential React Testing Library Tips for Flawless Tests',
        tag: 'JavaScript',
        length: '4 minutes',
        intro: "Writing tests is an important part of any software development project. React Testing Library is a popular testing tool for React applications. However, even with its automatic logging, it can be difficult to identify why a test has failed. In this post, we'll explore three tips for writing better tests from the start.",
        date: '10 March 2023',
    },
    {
        image: postImage,
        title: ' Essential React Testing Library Tips for Flawless Tests',
        tag: 'JavaScript',
        length: '4 minutes',
        intro: "Writing tests is an important part of any software development project. React Testing Library is a popular testing tool for React applications. However, even with its automatic logging, it can be difficult to identify why a test has failed. In this post, we'll explore three tips for writing better tests from the start.",
        date: '10 March 2023',
    },
    {
        image: postImage,
        title: ' Essential React Testing Library Tips for Flawless Tests',
        tag: 'JavaScript',
        length: '4 minutes',
        intro: "Writing tests is an important part of any software development project. React Testing Library is a popular testing tool for React applications. However, even with its automatic logging, it can be difficult to identify why a test has failed. In this post, we'll explore three tips for writing better tests from the start.",
        date: '10 March 2023',
    },
]

export default function Blog() {
    const { goBack } = useGoBack()

    return (
        <main className="m-blk-7">
            <section className="container">
                <aside className="flex jst-btwn">
                    <button title="Previous page" onClick={goBack} className="rounded small bg-sec p-blk-2 p-ln-2">
                        <SvgText src={arrowLeftIcon} srcCls="f-s-6" />
                    </button>
                    <button title="Search" className="rounded small bg-sec p-blk-2 p-ln-2">
                        <SvgText src={searchIcon} srcCls="f-s-6" />
                    </button>
                </aside>
                <aside className="m-blk-4">
                    <ul className="flex f-wrap jst-center gap-1 no-list-style no-list-pad">
                        {["All", "CSS", "JavaScript", "React", "MongoDB", "HTML"].map(tag => (
                            <Tag key={tag} tagName={tag} />
                        ))}
                    </ul>
                </aside>
            </section>

            <section className="container m-blk-5">
                <IntoArticle article={articles[0]} />
            </section>

            <section className="container other_posts m-blk-5">
                {articles.map((article, idx) => {
                    return <ArticleCard key={idx} article={article} />
                })}
            </section>
        </main>
    )
}
