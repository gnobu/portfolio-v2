import { ActionArgs, LoaderArgs, SerializeFrom, json, redirect } from '@remix-run/node'
import { Form, Link, useActionData, useNavigation } from '@remix-run/react'

import ProjectFormInputs from '~/components/ProjectFormInputs'
import { createProject } from '~/models/project.server'
import { isAdmin, getSession } from '~/sessions'
import { processProjectData } from '~/utils/project-action.server'

export async function loader({request}:LoaderArgs) {
    const session = await getSession(request.headers.get('Cookie'))
    if(!isAdmin(session)) return redirect('/blog')
    return null
}

export async function action({ request }: ActionArgs) {
    const { data, errors } = await processProjectData(request)
    if (errors) return json(errors)

    await createProject(data)
    return redirect("/project")
}

export type Errors = SerializeFrom<typeof action> | undefined

export default function NewProject() {
    const errors = useActionData<typeof action>()
    const { state } = useNavigation()
    const isCreating = state === 'submitting'

    return (<div className='container m-blk-4'>
        <h1 className='m-blk-3'>Add a new project</h1>
        <Form method="post" className='plain flex-col gap-p5' encType="multipart/form-data">
            <ProjectFormInputs errors={errors} />
            <div className="flex gap-1">
                <Link to={'/projects'} className="button cancel-btn">Cancel</Link>
                <button type="submit" className="btn-primary" disabled={isCreating}>
                    {isCreating ? "Creating..." : "Create"}
                </button>
            </div>
        </Form>
    </div>)
}
