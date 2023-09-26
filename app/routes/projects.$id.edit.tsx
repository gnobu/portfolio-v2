import { ActionArgs, LoaderArgs, SerializeFrom, json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useLoaderData, useNavigation } from '@remix-run/react'

import ProjectFormInputs from '~/components/ProjectFormInputs'
import { deleteProject, getProject, updateProject } from '~/models/project.server'
import { processProjectData } from '~/utils/project-action.server'
import { Cloudinary } from '~/utils/cloudinary.server'

export async function loader({ params }: LoaderArgs) {
    const { id } = params
    if (!id) return redirect('/projects')

    const project = await getProject(id)
    if (!project) return redirect('/projects') // TODO: 404

    return json({ project, id })
}

export async function action({ request }: ActionArgs) {
    const { data, errors, id, intent } = await processProjectData(request)
    if (errors) return json(errors)
    if (!id) throw new Error("No id provided")

    if (intent === 'update') await updateProject(id as string, { ...data, image: data.image || undefined })

    if (intent === 'delete') {
        await deleteProject(id as string)
        const { isSuccess, message } = await Cloudinary.deleteImage(`portfolio/projects/${id}`)
        if (!isSuccess) throw new Error(message)
    }
    return redirect("/projects")
}

export type Errors = SerializeFrom<typeof action> | undefined

export default function NewProject() {
    const { id, project } = useLoaderData<typeof loader>()
    const errors = useActionData<typeof action>()

    const { state } = useNavigation()
    const submitting = state === 'submitting'

    return (<div className='container m-blk-4'>
        <h1 className='m-blk-3'>Add a new project</h1>
        <Form method="post" className='plain flex-col gap-p5' encType="multipart/form-data">
            <input type="hidden" name="id" value={id} />
            <ProjectFormInputs errors={errors} project={project} />
            <div className="flex gap-1 jst-btwn">
                <Link to={'/projects'} className="button outline">Cancel</Link>
                <button type="submit" name='intent' value='delete' className="cancel-btn" disabled={submitting}>
                    {submitting ? "Deleting..." : "Delete"}
                </button>
                <button type="submit" name='intent' value='update' className="btn-primary" disabled={submitting}>
                    {submitting ? "Updating..." : "Update"}
                </button>
            </div>
        </Form>
    </div>)
}
