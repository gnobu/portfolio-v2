export class StringUtility {
    static showXWords(sentence: string, words: number): string {
        return sentence.split(" ").slice(0, words).join(" ")
    }
    static showXChars(sentence: string, chars: number): string {
        return `${sentence.slice(0, chars)}...`
    }
}