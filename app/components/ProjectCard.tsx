import { Link } from "@remix-run/react"

import SvgText from "./SvgText"
import { arrowTopRightIcon } from "~/assets/icons"
import { Project } from "~/interfaces/project.interface"

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <article tabIndex={0} className="project">
            <img className="project_image" src={project.image} alt="A robot smiling" width={472} height={260} />
            <span className="project_year">'{project.year}</span>
            <div className="project_overlay">
                <h2 className="m-blk-0">{project.title}</h2>
                <Link to={`${project.id}` ?? '.'} className="plain project_arrow rounded p-ln-2 p-blk-2">
                    <SvgText src={arrowTopRightIcon} srcCls="f-s-7" />
                </Link>
            </div>
        </article>
    )
}
