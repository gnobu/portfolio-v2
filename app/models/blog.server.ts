import { prisma } from "~/db.server"

export async function getArticles() {
    return prisma.article.findMany({
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
