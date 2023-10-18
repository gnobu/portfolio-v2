// app/sessions.ts
import { Session, createCookieSessionStorage } from "@remix-run/node"; // or cloudflare/deno
import invariant from "tiny-invariant";

export enum Role {
    ADMIN = 'admin',
    GUEST = 'guest'
}

type SessionData = {
    role: Role;
};

type SessionFlashData = {
    auth_error: string;
};

invariant(process.env.BASE_URL, "BASE_URL must be set")

const { getSession, commitSession, destroySession } =
    createCookieSessionStorage<SessionData, SessionFlashData>(
        {
            // a Cookie from `createCookie` or the CookieOptions to create one
            cookie: {
                name: "gnobu_port__session",
                // all of these are optional
                // domain: process.env.BASE_URL,
                httpOnly: true,
                maxAge: 60 * 60, // 1hr
                path: "/",
                sameSite: true,
                secrets: ["s3cret1"],
                // secure: true,
            },
        }
    );

function isAdmin(session: Session<SessionData, SessionFlashData>) {
    return session.get('role') === Role.ADMIN
}

export { getSession, commitSession, destroySession, isAdmin };
