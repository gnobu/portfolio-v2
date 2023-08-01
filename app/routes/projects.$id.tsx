import { LoaderArgs, json, redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

import { getProject } from '~/utils/project-data'
import SvgText from '~/components/SvgText'
import useGoBack from '~/hooks/useGoBack'
import { arrowLeftIcon, arrowTopRightIcon } from '~/assets/icons'
import Row from '~/components/Row'

export function loader({ params }: LoaderArgs) {
    const { id } = params
    if (!id) throw new Error("Could not find the movie")

    const project = getProject(+id)
    if (!project) return redirect('/projects') // TODO: 404

    return json({ project })
}

export default function Project() {
    const { project } = useLoaderData<typeof loader>()
    const { goBack } = useGoBack()
    return (<>
        <section className="container pos-rel">
            <button title="Previous page" onClick={goBack} className="project_prev rounded small bg-sec p-blk-2 p-ln-2">
                <SvgText src={arrowLeftIcon} srcCls="f-s-6 col-white" />
            </button>
            <img className='project_image_hero' src={project.image} alt="screenshot of the project" width={1000} height={500} />
        </section>
        <section className='container m-blk-4'>
            <div className="content m-ln-auto flex-col gap-2">
                <h1 className='f-s-8 m-blk-0'>{project.title}</h1>
                <p className='project_desc m-blk-0'>{project.description}</p>
                <div className="flex-col gap-p5">
                    {Object.entries(project.details).map(([key, val]) => (
                        <Row key={key} value={val instanceof Object ? val.join(', ') : `${val}`}
                            title={key.replace(key.charAt(0), key.charAt(0).toLocaleUpperCase())} />
                    ))}
                </div>

                <Link className='button outline flex gap-1 min-w r-4' to={project.link.url}>
                    <span>view {project.link.type}</span>
                    <SvgText src={arrowTopRightIcon} srcCls='f-s-7' />
                </Link>
            </div>
        </section>
        <Link to={`/projects/${project.next ?? '.'}`} className='p-blk-4 border-top flex centered-flex gap-p5 f-s-6'>
            <span>Next Project</span>
            <SvgText src={arrowLeftIcon} srcCls='f-s-7 rotate-180' />
        </Link>
    </>)
}
