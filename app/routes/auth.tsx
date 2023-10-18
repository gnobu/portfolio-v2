import type { ActionArgs, LoaderArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react"

import { getSession, commitSession, Role } from "../sessions"
import { validateCredentials } from "~/utils/auth.server"
import invariant from "tiny-invariant"

export async function loader({
    request,
}: LoaderArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    )
    if (session.get("role") === Role.ADMIN) {
        return redirect("/", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        })
    }
    const data = { error: session.get("auth_error") }
    return json(data, {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    })
}

export async function action({
    request,
}: ActionArgs) {
    const session = await getSession(request.headers.get("Cookie"))
    const form = await request.formData()
    const username = form.get("username")
    const password = form.get("password")
    invariant(typeof username === "string", "Username must be a string")
    invariant(typeof password === "string", "password must be a string")
    const role = validateCredentials({ username, password })
    if (role != Role.ADMIN) {
        session.flash("auth_error", "Invalid username/password")
        return json(null, {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        })
    }
    session.set("role", role)
    return redirect("/", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    })
}

export default function Auth() {
    const { error } = useLoaderData<typeof loader>()
    return (
        <main className="navbar-margin">
            <div className='m-blk-4 container'>
                <h2>Please sign in</h2>
                <Form method="post" className='plain flex-col gap-p5' encType="multipart/form-data">
                    <div className="form-group">
                        <label>
                            Username:{" "}
                            <input className="form-element m-blk-2" type="text" name="username" />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Password:{" "}
                            <input className="form-element m-blk-2" type="password" name="password" />
                        </label>
                    </div>
                    {error ? <em className="col-error f-s-3">{error}</em> : null}
                    <button type="submit" className="btn-primary" disabled={false}>
                        Login
                    </button>
                </Form>
            </div>
        </main>
    )
}
