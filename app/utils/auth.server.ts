import { Role } from "~/sessions"

export function validateCredentials(
    { username, password }: { username: string, password: string }
) {
    if (username.trim() === 'gnobu' && password.trim() === 'renegade17.PORT') {
        return Role.ADMIN
    }
    return Role.GUEST
}