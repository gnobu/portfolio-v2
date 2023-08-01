import { projectImage } from "~/assets/images"

const projects = [
    {
        id: 2,
        title: 'KOTMY',
        image: projectImage,
        description: 'Lorem ipsum dolor sit amet consectetur. Commodo ac non integer dolor venenatis sem lorem.Pretium sollicitudin nec sodales in augue sed lectus.Volutpat arcu hendrerit',
        details: {
            type: 'Contract',
            role: 'Front-end developer',
            year: 2023,
            stack: ['React', 'TypeScript', 'Redux'],
        },
        link: {
            type: 'website',
            url: '.'
        },
        next: 1
    },
    {
        id: 1,
        title: 'Project Name',
        image: projectImage,
        description: 'Lorem ipsum dolor sit amet consectetur. Commodo ac non integerdolor venenatis sem lorem.Pretium sollicitudin nec sodales in augue sed lectus.Volutpat arcu hendrerit',
        details: {
            type: 'Personal Project',
            role: 'Front-end developer',
            year: 2022,
            stack: ['Remix', 'TypeScript', 'Node.js'],
        },
        link: {
            type: 'code',
            url: '.'
        },
        next: null
    },
]

export function getProjects() {
    return projects.map(project => ({
        id: project.id,
        title: project.title,
        image: project.image,
        year: project.details.year
    }))
}

export function getProject(id: number) {
    return projects.find(project => project.id === id) ?? null
}