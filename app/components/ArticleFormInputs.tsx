import { Article } from '@prisma/client';
import React from 'react'

export default function ArticleFormInputs({ errors, setIntro, setMarkdown, article }: {
    errors: {
        title: string | null;
        tag: string | null;
        image: string | null;
        intro: string | null;
        markdown: string | null;
    } | undefined,
    setIntro: React.Dispatch<React.SetStateAction<string>>,
    setMarkdown: React.Dispatch<React.SetStateAction<string>>,
    article?: Omit<Article, 'createdAt'>
}) {
    const inputClassName = `form-element m-blk-2`
    return (<>
        <div className='form-group'>
            <label>
                Post Title:{" "}
                {errors?.title ? (
                    <em className="col-error f-s-3">{errors.title}</em>
                ) : null}
                <input type="text" name="title" className={inputClassName} defaultValue={article?.title} />
            </label>
        </div>
        <div className='form-group-inline'>
            <label htmlFor='tag'>
                Add tag:{" "}
                <input type="text" name="tag" id='tag' defaultValue={article?.tag} className={inputClassName} />
                {errors?.tag ? (
                    <em className="col-error f-s-3">{errors.tag}</em>
                ) : null}
            </label>
            <label htmlFor='image'>
                Intro image:{" "}
                <input type="file" accept='image/*' name="image" id='image' className={inputClassName} />
                {errors?.image ? (
                    <em className="col-error f-s-3">{errors.image}</em>
                ) : null}
            </label>
        </div>
        <div className='form-group'>
            <label htmlFor="intro">
                Intro:{" "}
                {errors?.intro ? (
                    <em className="col-error f-s-3">
                        {errors.intro}
                    </em>
                ) : null}
            </label>
            <br />
            <textarea
                id="intro"
                name="intro"
                rows={5}
                className={inputClassName}
                defaultValue={article?.intro}
                onChange={(e) => setIntro(e.target.value)}
            />
        </div>
        <div className='form-group'>
            <label htmlFor="markdown">
                Markdown:{" "}
                {errors?.markdown ? (
                    <em className="col-error f-s-3">
                        {errors.markdown}
                    </em>
                ) : null}
            </label>
            <br />
            <textarea
                id="markdown"
                name="markdown"
                rows={10}
                className={inputClassName}
                defaultValue={article?.markdown}
                onChange={(e) => setMarkdown(e.target.value)}
            />
        </div>
    </>)
}
