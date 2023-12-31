import { Link } from "@remix-run/react"
import { Project } from "@prisma/client"

import SvgText from "./SvgText"
import { arrowTopRightIcon } from "~/assets/icons"
import { projectImage } from "~/assets/images"

export default function ProjectCard({ project }: { project: Pick<Project, 'id' | 'title' | 'image' | 'year'> }) {
    return (
        <article tabIndex={0} className="project">
            <img className="project_image" src={project.image || projectImage} alt="A robot smiling" width={472} height={260} />
            <span className="project_year">'{`${project.year}`.slice(2)}</span>
            <div className="project_overlay">
                <h2 className="m-blk-0">{project.title}</h2>
                <Link to={`${project.id}` ?? '.'} className="plain project_arrow rounded p-ln-2 p-blk-2">
                    <SvgText src={arrowTopRightIcon} srcCls="f-s-7" />
                </Link>
            </div>
        </article>
    )
}
