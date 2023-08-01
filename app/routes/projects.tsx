import { LinksFunction, V2_MetaFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"

import projectsStylesUrl from "~/styles/projects.css"

export const meta: V2_MetaFunction = () => {
  return [{ title: "PROJECTS | UBONG" }]
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: projectsStylesUrl },
]


export default function Projects() {
  return <main className="navbar-margin">
    <Outlet />
  </main>
}
