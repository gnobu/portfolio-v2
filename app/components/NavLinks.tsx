import { NavLink } from '@remix-run/react'

export default function NavLinks() {
    const navLinkClass = "f-s-4 f-w-6"
    return (
        <nav>
            <ul className={`min-w no-list-pad no-list-style m-blk-0 al-end flex-col gap-p5`}>
                <li><NavLink target='_blank' to="https://drive.google.com/file/d/11KOd5L9ignURi7Y80-JZKXvCGhHJSuOW/view?usp=sharing"
                    className={({ isActive }) =>
                        isActive ? `active ${navLinkClass}`: navLinkClass}>
                    RESUME
                </NavLink></li>
                <li><NavLink to="/projects"
                    className={({ isActive }) =>
                        isActive ? `active ${navLinkClass}`: navLinkClass}>
                    PROJECTS
                </NavLink></li>
                <li><NavLink to="mailto:inyangubong17+portfolio@gmail.com"
                    className={({ isActive }) =>
                        isActive ? `active ${navLinkClass}`: navLinkClass}>
                    CONTACT
                </NavLink></li>
                <li><NavLink to="/blog"
                    className={({ isActive }) =>
                        isActive ? `active ${navLinkClass}`: navLinkClass}>
                    BLOG
                </NavLink></li>
            </ul>
        </nav>
    )
}
