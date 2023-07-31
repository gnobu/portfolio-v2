import { Article } from "~/interfaces/article.interface"

export default function IntoArticle({ article }: { article: Article }) {
    return <article className="intro_post p-blk-2 p-ln-2">
        <img className="post-image" src={article.image} alt="computer screen with code"
            width={350} />
        <div className="m-blk-0">
            <span className="col-sec">{article.tag}</span> <span className="f-s-3">{article.length} read</span>
            <h1 className="f-s-6 f-w-6 col-sec m-blk-3">{article.title}</h1>
            <span>{article.intro}</span>
            <span className="col-border blk m-blk-2">{article.date}</span>
        </div>
    </article>
}
