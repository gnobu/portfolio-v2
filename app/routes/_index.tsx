import { useContext } from "react"
import { LinksFunction, V2_MetaFunction } from "@remix-run/node"

import { WindowSizeContext } from "~/hooks/useWindowSize"
import { headshot } from '~/assets/images'
import portfolioStyles from '~/styles/portfolio.css'
import SvgText from "~/components/SvgText"
import { smilieIcon } from "~/assets/icons"
import Socials from "~/components/Socials"


export const meta: V2_MetaFunction = () => {
    return [{ title: "UBONG" }]
}

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: portfolioStyles },
]


export default function HomeRoute() {
    return (
        <main className="navbar-margin">
            <section className="container portfolio-grid">
                <header className="header area-a">
                    <span className="f-s-7 f-w-5 flex gap-p5">Hi, I'm <SvgText src={smilieIcon} srcCls="f-s-7" /></span>
                    <h1 className="f-s-10 f-w-3 col-sec m-blk-3">
                        <span className="blk">UBONG</span>
                        <span className="blk">INYANG</span>
                    </h1>
                    <p className="f-s-6">I blend technical expertise and creative flair
                        to develop captivating, high-performant digital experiences.</p>
                </header>
                <div className="flex-col al-end area-b">
                    <img className={`headshot`}
                        src={headshot} alt="Hiding nerves behind a confident smile" width={350} height={400} />
                    <h2 className={`f-s-9 f-w-6 word-wrap m-blk-4 end-text`}>
                        <span className="blk">FULL-STACK</span>
                        <span className="blk">DEVELOPER</span>
                    </h2>
                </div>
                <Socials className='area-c' />
            </section>
        </main>
    )
}