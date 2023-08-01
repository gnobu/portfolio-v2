import { projectImage } from "~/assets/images"

const projects = [
    {
        id: 1,
        title: 'Project Name',
        image: projectImage,
        year: 22
    },
    {
        id: 2,
        title: 'Project Name',
        image: projectImage,
        year: 23
    },
]

export function getProjects() {
    return projects.map(project => ({
        id: project.id,
        title: project.title,
        image: project.image,
        year: project.year
    }))
}

export function getProject(id: number) {
    return projects.find(project => project.id === id) ?? null
}