import { LoaderArgs, json, redirect } from '@remix-run/node'
import { Link, useLoaderData, useRouteLoaderData } from '@remix-run/react'
import { Project } from '@prisma/client'

import SvgText from '~/components/SvgText'
import useGoBack from '~/hooks_contexts/useGoBack'
import { arrowLeftIcon, arrowTopRightIcon, editIcon } from '~/assets/icons'
import Row from '~/components/Row'
import { getProject } from '~/models/project.server'
import { projectImage } from '~/assets/images'
import { useContext } from 'react'
import { AuthContext } from '~/hooks_contexts/AuthContext'
import { Role } from '~/sessions'

export async function loader({ params }: LoaderArgs) {
    const { id } = params
    if (!id) throw new Error("Could not find the movie")

    const project = await getProject(id)
    if (!project) return redirect('/projects') // TODO: 404

    return json({ project })
}

export default function ProjectPage() {
    const { project } = useLoaderData<typeof loader>()
    const { role } = useContext(AuthContext)
    const { projectLinkTree } = useRouteLoaderData('routes/projects') as { projectLinkTree: { id: string, next: string }[] }
    const currentProject = projectLinkTree.find(proj => proj.id === project.id)

    const { goBack } = useGoBack()
    const rows = ['type', 'role', 'year', 'stack'] as Array<keyof Project>

    return (<>
        <section className="container pos-rel">
            <button title="Previous page" onClick={goBack} className="project_prev rounded small bg-sec p-blk-2 p-ln-2">
                <SvgText src={arrowLeftIcon} srcCls="f-s-6 col-white" />
            </button>
            <img className='project_image_hero' src={project.image ?? projectImage} alt="screenshot of the project" width={1000} height={500} />
        </section>
        <section className='container m-blk-4'>
            <div className="content m-ln-auto flex-col gap-2">
                <h1 className='f-s-8 m-blk-0'>{project.title}</h1>
                <p className='project_desc m-blk-0'>{project.description}</p>
                <div className="flex-col gap-p5">
                    {rows.map((item) => (
                        <Row key={item} value={`${project[item]}`}
                            title={item.replace(item.charAt(0), item.charAt(0).toLocaleUpperCase())} />
                    ))}
                </div>

                <div className="flex jst-btwn">
                    <Link className='button outline flex gap-1 min-w r-4' target='_blank' to={project.link_url}>
                        <span>view {project.link_type}</span>
                        <SvgText src={arrowTopRightIcon} srcCls='f-s-7' />
                    </Link>
                    {role === Role.ADMIN
                        ? <Link to='edit' className='button small ghost'>
                            <SvgText src={editIcon} srcCls='f-s-6' />
                        </Link>
                        : null
                    }
                </div>
            </div>
        </section>
        <Link to={`/projects/${currentProject?.next ?? ''}`} className='p-blk-4 border-top flex centered-flex gap-p5 f-s-6'>
            <span>Next Project</span>
            <SvgText src={arrowLeftIcon} srcCls='f-s-7 rotate-180' />
        </Link>
    </>)
}
