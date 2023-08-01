export default function Row({ title, value }: { title: string, value: string }) {
    return (<aside className='project_row p-ln-2 p-blk-2 border-bottom'>
        <h2 className='m-blk-0 f-w-5'>{title}</h2>
        <span className=''>{value}</span>
    </aside>)
}
