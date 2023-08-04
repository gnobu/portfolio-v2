import { Article } from "@prisma/client"
import { prisma } from "~/db.server"

export async function getArticles() {
    return await prisma.article.findMany({
        select: {
            title: true,
            image: true,
            tag: true,
            intro: true,
            slug: true,
            length: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}

export async function getArticle(slug: string) {
    return await prisma.article.findUnique({
        where: { slug }
    })
}

export async function createArticle(data: Omit<Article, 'createdAt'>) {
    return await prisma.article.create({
        data
    })
}