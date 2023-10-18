import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { useContext } from 'react'
import { plusIcon } from '~/assets/icons'

import ProjectCard from '~/components/ProjectCard'
import SvgText from '~/components/SvgText'
import { AuthContext } from '~/hooks_contexts/AuthContext'
import { getProjects } from '~/models/project.server'
import { Role } from '~/sessions'

export async function loader() {
    const projects = await getProjects()
    return json({ projects })
}

export default function Projects() {
    const { projects } = useLoaderData<typeof loader>()
    const { role } = useContext(AuthContext)
    return (<>
        <header className="container m-blk-6">
            <h1 className="f-s-9 f-w-3 col-sec">A showcase of my favorite projects</h1>
        </header>
        <section className="container projects m-blk-5">
            {projects.map(project => (<ProjectCard key={project.id} project={project} />))}
        </section>
        {role === Role.ADMIN
            ? <aside className="container m-blk-6 flex jst-center">
                <Link to={'new'} title='add project' className='button outline small '><SvgText src={plusIcon} srcCls='f-s-8' /></Link>
            </aside>
            : null}
    </>)
}
