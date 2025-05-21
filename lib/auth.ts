import NextAuth, { CredentialsSignin, AuthError } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios, { AxiosError } from "axios"
import { CONSTANTS } from "@/config/constants"
import { loginSchema } from "@/schemas/auth/login"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"


class NotFoundCredentials extends CredentialsSignin {
    code = "Credenciales no encontradas"
}

class ServerError extends CredentialsSignin {
    code = "Error interno del servidor"
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, request) {

                const { email, password } = loginSchema.parse(credentials)
                let user = null
                await axios.post(`${CONSTANTS.API_URL}/auth/login`, {
                    email,
                    password
                }).then(res => {
                    user = res.data
                }).catch(err => {
                    console.log(err)
                    if (err instanceof AxiosError) {
                        throw handleError(err)
                    } else {
                        throw new ServerError()
                    }

                })
                return user
            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }): Promise<JWT> {
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token }: { session: Session, token: JWT }): Promise<Session> {
            session.user = token.user as any
            return session
        },
    },
})


const handleError = (error: AxiosError): NotFoundCredentials | ServerError => {
    if (error.status === 401) {
        return new NotFoundCredentials()
    } else {
        return new ServerError()
    }

}