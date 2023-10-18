import { createContext } from "react"
import { Role } from "~/sessions"

export const AuthContext = createContext<{
    role: Role,
}>({
    role: Role.GUEST,
})