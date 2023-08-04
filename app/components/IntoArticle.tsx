import { Link } from "@remix-run/react"

import { Article } from "~/interfaces/article.interface"

export default function IntoArticle({ article }: { article: Omit<Article, 'markdown'> }) {
    return <article className="intro_post p-blk-2 p-ln-2">
        <img className="post_image" src={article.image} alt="computer screen with code" width={350} />
        <div className="">
            <span className="flex jst-btwn al-end f-s-3">
                <span><span className="f-s-4 f-w-6">{article.tag}</span> | {article.length} mins read</span>
                <span className="col-border">{new Date(article.createdAt).toLocaleDateString()}</span>
            </span>
            <Link to={`${article.slug}`} className="plain post_title blk m-blk-2 f-s-6 f-w-6">{article.title}</Link>
            <span>{article.intro}</span>
        </div>
    </article>
}
