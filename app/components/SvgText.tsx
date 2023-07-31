type SvgTextProps = {
    src: string,
    classNames?: string,
    srcCls?: string,
    text?: string,
    element?: React.ReactNode,
    // size?: "small" | "xs" | "large"
}
export default function SvgText({ src, srcCls, text, element, classNames }: SvgTextProps) {
    return (
        <div className={`flex gap-p25 aligned-flex ${classNames ?? ''}`} >
            <svg className={srcCls} height={'.9em'} >
                <use href={src} width={'100%'} height={'100%'} />
            </svg>
            {text
                ? <span>{text}</span>
                : element}
        </div>
    )
}
