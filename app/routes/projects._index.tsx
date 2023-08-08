import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import ProjectCard from '~/components/ProjectCard'
import { getProjects } from '~/models/project.server'

export async function loader() {
    const projects = await getProjects()
    return json({ projects })
}

export default function Projects() {
    const { projects } = useLoaderData<typeof loader>()
    return (<>
        <header className="container m-blk-6">
            <h1 className="f-s-9 f-w-3 col-sec">A showcase of my personal projects</h1>
        </header>
        <section className="container projects m-blk-5">
            {projects.map(project => (<ProjectCard key={project.id} project={project} />))}
        </section>
    </>)
}
