import { cssBundleHref } from "@remix-run/css-bundle"
import { json, type LinksFunction, type LoaderArgs } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react"
import globalStylesUrl from "~/styles/globals.css"
import Navigation from "./components/Navigation"
import useTheme, { ThemeContext } from "./hooks_contexts/useTheme"
import useWindowSize, { WindowSizeContext } from "./hooks_contexts/useWindowSize"
import { AuthContext } from "./hooks_contexts/AuthContext"
import { getSession } from "./sessions"

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []), {
    rel: "stylesheet",
    href: globalStylesUrl,
  },
]


export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  return json({ role: session.get('role') ?? null })
}

export default function App() {
  const { role } = useLoaderData<typeof loader>()
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <AuthContext.Provider value={{ role }}>
          <ThemeContext.Provider value={useTheme()}>
            <WindowSizeContext.Provider value={useWindowSize()}>
              <Navigation />
              <Outlet />
            </WindowSizeContext.Provider>
          </ThemeContext.Provider>
        </AuthContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
