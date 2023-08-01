import { LinksFunction, V2_MetaFunction } from "@remix-run/node"

import { projectImage } from "~/assets/images"
import ProjectCard from "~/components/ProjectCard"
import projectsStylesUrl from "~/styles/projects.css"

export const meta: V2_MetaFunction = () => {
  return [{ title: "PROJECTS | UBONG" }]
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: projectsStylesUrl },
]

const projects = [
  {
    id: '1',
    title: 'Project Name',
    image: projectImage,
    year: 22
  },
  {
    id: '2',
    title: 'Project Name',
    image: projectImage,
    year: 21
  },
]

export default function Projects() {
  return (
    <main className="navbar-margin">
      <header className="container m-blk-6">
        <h1 className="f-s-9 f-w-3 col-sec">A showcase of my personal projects</h1>
      </header>
      <section className="container projects m-blk-5">
        {projects.map(project => (<ProjectCard key={project.id} project={project} />))}
      </section>
    </main>
  )
}
