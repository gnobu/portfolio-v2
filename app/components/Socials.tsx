import { Link } from '@remix-run/react'

export default function Socials({ className }: React.ComponentProps<'div'>) {
    return <div className={`flex-col gap-p5 min-w m-blk-4 ${className ?? ''}`}>
        <Link target='_blank' to='https://twitter.com/hedonist_ub' className="f-s-5 f-w-6">TWITTER [X]</Link>
        <Link target='_blank' to='https://linkedin.com/in/inyang-ubong' className="f-s-5 f-w-6">LINKEDIN</Link>
        <Link target='_blank' to='https://github.com/gnobu' className="f-s-5 f-w-6">GITHUB</Link>
    </div>
}
