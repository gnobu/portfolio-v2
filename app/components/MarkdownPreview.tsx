import markedWrapper from '~/utils/marked'

export default function MarkdownPreview({ intro, markdown }: { intro: string, markdown: string }) {
    return (<aside className='preview'>
        <span className='preview_title f-s-4 f-w-5'>Preview</span>
        <p>{intro}</p>
        <div dangerouslySetInnerHTML={{ __html: markedWrapper(markdown) }}></div>
    </aside>)
}
