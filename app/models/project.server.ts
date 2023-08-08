import { Project } from "@prisma/client"
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

export async function createProject(data: Omit<Project, 'createdAt' | 'id'>) {
    return await prisma.project.create({
        data
    })
}

export async function updateProject(id: number, data: Partial<Project>) {
    return await prisma.project.update({
        where: { id },
        data
    })
}

export async function deleteProject(id: number) {
    return await prisma.project.delete({ where: { id } })
}