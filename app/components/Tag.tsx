import { Link } from "@remix-run/react"

export default function Tag({ tagName }: { tagName: string }) {
    return <li className="tag">
        <Link to={'.'}>{tagName}</Link>
    </li>
}
