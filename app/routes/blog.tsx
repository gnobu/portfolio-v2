import { LinksFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"

import blogStylesUrl from "~/styles/blog.css"

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: blogStylesUrl },
]

export default function blog() {
    return <Outlet />
}
