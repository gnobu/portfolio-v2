import { createContext } from "react"
import { Role } from "~/sessions"

export const AuthContext = createContext<{
    role: Role | null,
}>({
    role: null,
})