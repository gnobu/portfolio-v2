import { postImage } from "~/assets/images"

const articles = [
    {
        id: 4,
        image: postImage,
        title: '3 Essential React Testing Library Tips for Flawless Tests',
        tag: 'JavaScript',
        length: '4 minutes',
        intro: "Writing tests is an important part of any software development project. React Testing Library is a popular testing tool for React applications. However, even with its automatic logging, it can be difficult to identify why a test has failed. In this post, we'll explore three tips for writing better tests from the start.",
        date: '10 March 2023',
    },
    {
        id: 3,
        image: postImage,
        title: 'Understanding Reusability from the Ground Up',
        tag: 'JavaScript',
        length: '4 minutes',
        intro: "Writing tests is an important part of any software development project. React Testing Library is a popular testing tool for React applications. However, even with its automatic logging, it can be difficult to identify why a test has failed. In this post, we'll explore three tips for writing better tests from the start.",
        date: '10 March 2023',
    },
    {
        id: 2,
        image: postImage,
        title: 'Understanding Reusability from the Ground Up',
        tag: 'JavaScript',
        length: '4 minutes',
        intro: "Writing tests is an important part of any software development project. React Testing Library is a popular testing tool for React applications. However, even with its automatic logging, it can be difficult to identify why a test has failed. In this post, we'll explore three tips for writing better tests from the start.",
        date: '10 March 2023',
    },
    {
        id: 1,
        image: postImage,
        title: 'Understanding Reusability from the Ground Up',
        tag: 'JavaScript',
        length: '4 minutes',
        intro: "Writing tests is an important part of any software development project. React Testing Library is a popular testing tool for React applications. However, even with its automatic logging, it can be difficult to identify why a test has failed. In this post, we'll explore three tips for writing better tests from the start.",
        date: '10 March 2023',
    },
]

export function getArticles() {
    return articles.slice(1).map(article => ({
        id: article.id,
        title: article.title,
        image: article.image,
        date: article.date,
        tag: article.tag,
        length: article.length
    }))
}

export function getIntroArticle() {
    return {
        id: articles[0].id,
        title: articles[0].title,
        image: articles[0].image,
        intro: articles[0].intro,
        date: articles[0].date,
        tag: articles[0].tag,
        length: articles[0].length
    }
}

export function getArticle(id: number) {
    return articles.find(article => article.id === id) ?? null
}