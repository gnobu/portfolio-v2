import { useContext } from 'react'
import { Link, useLocation } from '@remix-run/react'

import { ThemeContext } from '~/hooks/useTheme'
import { logo, moonIcon, sunIcon } from '~/assets/icons'
import SvgText from './SvgText'
import NavLinks from './NavLinks'

export default function Navigation() {
    // theme selector logic
    const { theme, setTheme } = useContext(ThemeContext)
    const isDarkTheme = theme === 'dark'

    const { pathname } = useLocation()
    const isBlogPage = /blog/.test(pathname)

    return <header className="navbar navbar-blur">
        <div className="container flex jst-btwn al-start p-blk-2">
            <Link to={'/'} title='Home page'>
                <SvgText src={logo} srcCls="f-s-8 col-sec" />
            </Link>
            <div className="flex gap-1 al-start">
                <div className="col-pry bg-sec p-blk-p5 p-ln-p5 rounded">
                    {isDarkTheme
                        ? <button title={`switch to light theme`}
                            onClick={() => setTheme('light')}
                            className={`small theme-picker`}
                        >
                            <SvgText src={sunIcon} srcCls="f-s-7" />
                        </button>
                        : <button title={`switch to dark theme`}
                            onClick={() => setTheme('dark')}
                            className={`small theme-picker`}
                        >
                            <SvgText src={moonIcon} srcCls="f-s-7" />
                        </button>}
                </div>
                {isBlogPage ? null : <NavLinks />}
            </div>
        </div>
    </header>
}
