import { LoaderArgs, redirect } from "@remix-run/node"
import { Role, commitSession, getSession } from "~/sessions"

export async function loader({ request }: LoaderArgs) {
    const session = await getSession(request.headers.get('Cookie'))
    session.set('role', Role.GUEST)
    return redirect('/', {
        headers: {
            'Set-Cookie': await commitSession(session)
        }
    })
}