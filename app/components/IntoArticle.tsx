import { Article } from "@prisma/client"
import { Link } from "@remix-run/react"
import { StringUtility } from "~/utils/string-utility"

export default function IntoArticle({ article }: { article: Omit<Article, 'markdown'> }) {
    return <article className="intro_post p-blk-2 p-ln-2">
        <img className="post_image" src={article.image} alt="computer screen with code" width={350} />
        <div>
            <span className="flex jst-btwn al-end f-s-3">
                <span><span className="f-s-4 f-w-6">{article.tag}</span> | {article.length} mins read</span>
                <span className="col-border">{article.createdAt.toLocaleDateString()}</span>
            </span>
            <Link to={`${article.slug}`} className="plain post_title blk m-blk-2 f-s-6 f-w-6">{article.title}</Link>
            <span>{StringUtility.showXChars(article.intro, 300)}</span>
        </div>
    </article>
}
