import { marked } from "marked"

export default function markedWrapper(markdown: string) {
    return marked(markdown, { mangle: false, headerIds: false })
}