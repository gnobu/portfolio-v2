import { cssBundleHref } from "@remix-run/css-bundle"
import type { LinksFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import globalStylesUrl from "~/styles/globals.css"
import Navigation from "./components/Navigation"
import useTheme, { ThemeContext } from "./hooks/useTheme"
import useWindowSize, { WindowSizeContext } from "./hooks/useWindowSize"

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []), {
    rel: "stylesheet",
    href: globalStylesUrl,
  },
  {
    rel: 'icon',
    href: '/favicon.png'
  }
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeContext.Provider value={useTheme()}>
          <WindowSizeContext.Provider value={useWindowSize()}>
            <Navigation />
            <Outlet />
          </WindowSizeContext.Provider>
        </ThemeContext.Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
