import { LinksFunction, V2_MetaFunction, json } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { getProjects } from "~/models/project.server"

import projectsStylesUrl from "~/styles/projects.css"

export const meta: V2_MetaFunction = () => {
  return [{ title: "PROJECTS | UBONG" }]
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: projectsStylesUrl },
]

export async function loader() {
  const projects = await getProjects()
  const projectsWithNext = projects.map((project, idx, arr) => ({
    id: project.id,
    next: arr[idx + 1]?.id ?? null
  }))
  return json({ projects: projectsWithNext })
}

export default function Projects() {
  return <main className="navbar-margin">
    <Outlet />
  </main>
}
