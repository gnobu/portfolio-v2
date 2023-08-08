import { prisma } from "~/db.server"

export async function getProjects() {
    return await prisma.project.findMany({
        select: {
            id: true,
            title: true,
            image: true,
            year: true,
        },
        orderBy: { year: 'desc' }
    })
}

export async function getProject(id: number) {
    return await prisma.project.findUnique({ where: { id } })
}