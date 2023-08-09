import { Project } from '@prisma/client'
import { Errors } from '~/routes/projects.new'

export default function ProjectFormInputs({ errors, project }: {
    errors: Errors,
    project?: Omit<Project, 'createdAt'>
}) {
    const inputClassName = `form-element m-blk-2`
    return (<>
        <div className='form-group'>
            <label>
                Title:{" "}
                {errors?.title ? (
                    <em className="col-error f-s-3">{errors.title}</em>
                ) : null}
                <input type="text" name="title" className={inputClassName} defaultValue={project?.title} />
            </label>
        </div>
        <div className='form-group-inline'>
            <label htmlFor='type'>
                Type:{" "}
                {errors?.type ? (
                    <em className="col-error f-s-3">{errors.type}</em>
                ) : null}
                <input type="text" name="type" id='type' defaultValue={project?.type}
                    placeholder='Personal project, contact' className={inputClassName} />
            </label>
            <label htmlFor='role'>
                Role:{" "}
                {errors?.role ? (
                    <em className="col-error f-s-3">{errors.role}</em>
                ) : null}
                <input type="text" name="role" id='role' defaultValue={project?.role}
                    placeholder='Front-end, Back-end' className={inputClassName} />
            </label>
        </div>
        <div className='form-group-inline'>
            <label htmlFor='year'>
                Year:{" "}
                {errors?.year ? (
                    <em className="col-error f-s-3">{errors.year}</em>
                ) : null}
                <input type="text" name="year" id='year' defaultValue={project?.year} className={inputClassName} />
            </label>
            <label htmlFor='stack'>
                Stack:{" "}
                {errors?.stack ? (
                    <em className="col-error f-s-3">{errors.stack}</em>
                ) : null}
                <input type="text" name="stack" id='stack' defaultValue={project?.stack}
                    placeholder='Remix, Typescript, Node.js ...' className={inputClassName} />
            </label>
        </div>
        <div className='form-group-inline'>
            <label htmlFor='link_type'>
                Link Type:{" "}
                {errors?.link_type ? (
                    <em className="col-error f-s-3">{errors.link_type}</em>
                ) : null}
                <select name="link_type" id='link_type' defaultValue={project?.link_type} className={inputClassName}>
                    <option value="website">Website</option>
                    <option value="code">Code</option>
                </select>
            </label>
            <label htmlFor='link_url'>
                Link Url:{" "}
                {errors?.link_url ? (
                    <em className="col-error f-s-3">{errors.link_url}</em>
                ) : null}
                <input type="text" name="link_url" id='link_url' defaultValue={project?.link_url} className={inputClassName} />
            </label>
        </div>
        <div className="form-group">
            <label htmlFor='image'>
                Image:{" "}
                {errors?.image ? (
                    <em className="col-error f-s-3">{errors.image}</em>
                ) : null}
                <input type="file" accept='image/*' name="image" id='image' className={inputClassName} />
            </label>
        </div>
        <div className='form-group'>
            <label htmlFor="description">
                Description:{" "}
                {errors?.description ? (
                    <em className="col-error f-s-3">
                        {errors.description}
                    </em>
                ) : null}
            </label>
            <br />
            <textarea
                id="description"
                name="description"
                rows={5}
                className={inputClassName}
                defaultValue={project?.description}
            />
        </div>
    </>)
}
