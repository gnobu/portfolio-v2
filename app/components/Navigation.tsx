import { useContext, useState } from 'react'
import { Link, useLocation } from '@remix-run/react'

import { ThemeContext } from '~/hooks_contexts/useTheme'
import { logo, moonIcon, sunIcon } from '~/assets/icons'
import SvgText from './SvgText'
import NavLinks from './NavLinks'
import { AuthContext } from '~/hooks_contexts/AuthContext'
import { Role } from '~/sessions'

export default function Navigation() {
    const { theme, setTheme } = useContext(ThemeContext)
    const isDarkTheme = theme === 'dark'

    const { role } = useContext(AuthContext)
    const [authLink, setAuthLink] = useState<Role | null>(null)
    function authEasterEgg(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        if (event.detail == 4) {
            if (!authLink) return setAuthLink(prev => role)
        }
        return setAuthLink(null)
    }

    const { pathname } = useLocation()
    const isBlogPage = /blog/.test(pathname)

    return <header onClick={authEasterEgg} className="navbar navbar-blur">
        <div className="container flex jst-btwn al-start p-blk-2">
            <Link to={'/'} title='Home page'>
                <SvgText src={logo} srcCls="f-s-8 col-sec" />
            </Link>
            {authLink
                ? <div className="m-blk-2">
                    {authLink === Role.GUEST ? <Link to={'auth'}>Login</Link> : null}
                    {authLink === Role.ADMIN ? <Link to={'logout'}>Logout</Link> : null}
                </div>
                : null
            }
            <div className="flex gap-1 al-start">
                {isDarkTheme
                    ? <button title={`switch to light theme`}
                        onClick={() => setTheme('light')}
                        className={`bg-sec small theme-picker rounded`}
                    >
                        <SvgText src={sunIcon} srcCls="f-s-7" />
                    </button>
                    : <button title={`switch to dark theme`}
                        onClick={() => setTheme('dark')}
                        className={`bg-sec small theme-picker rounded`}
                    >
                        <SvgText src={moonIcon} srcCls="f-s-7" />
                    </button>}
                {isBlogPage ? null : <NavLinks />}
            </div>
        </div>
    </header>
}
