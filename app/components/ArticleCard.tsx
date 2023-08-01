import { Link } from '@remix-run/react'
import { Article } from '~/interfaces/article.interface'

export default function ArticleCard({ article }: { article: Omit<Article, 'intro'> }) {
    return <Link to={`${article.id}`} className="post p-blk-2 p-ln-2">
        <img className="post_image" src={article.image} alt="computer screen with code"
            width={350} />
        <span className="flex jst-btwn al-end f-s-3">
            <span><span className="f-s- f-w-6">{article.tag}</span> | {article.length} read</span>
            <span className="col-border">{article.date}</span>
        </span>
        <h2 className="post_title f-s-5 f-w-6 col-sec m-blk-1">{article.title}</h2>
    </Link>
}
