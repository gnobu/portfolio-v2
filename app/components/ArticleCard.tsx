import { Article } from '~/interfaces/article.interface'
import { StringUtility } from '~/utils/string-utility'

export default function ArticleCard({ article }: { article: Article }) {
    return <article className="post p-blk-2 p-ln-2 bg-card">
        <img className="post-image" src={article.image} alt="computer screen with code"
            width={350} height={400} />
        <div className="m-blk-0">
            <span className="f-w-5 col-sec">{article.tag}</span> <span className="f-s-3">{article.length} read</span>
            <h2 className="f-s-5 f-w-6 col-sec">{article.title}</h2>
            <span>{StringUtility.showXChars(article.intro, 170)}</span>
            <span className="col-border f-s-3 blk m-blk-2">{article.date}</span>
        </div>
    </article>
}
