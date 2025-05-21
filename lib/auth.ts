import NextAuth, { CredentialsSignin, AuthError } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios, { AxiosError } from "axios"
import { CONSTANTS } from "@/config/constants"
import { loginSchema } from "@/schemas/auth/login"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"
import { Company } from "@/types/Company"


class NotFoundCredentials extends CredentialsSignin {
    code = "Credenciales no encontradas"
}

class ServerError extends CredentialsSignin {
    code = "Error interno del servidor"
}



declare module "next-auth" {

    interface User {
        token: string
        firstName: string
        lastName: string
        email: string
        cellPhoneNumber: string
        companies: Company[]
    }
    interface Session {
        user: User
        selectedCompany: Company
    }

}
declare module "next-auth/jwt" {
    interface JWT {
        user: {
            token: string
            firstName: string
            lastName: string
            email: string
            cellPhoneNumber: string
            companies: Company[]
        },
        selectedCompany: Company
    }
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
                    user.companies = [
                        ...user.companies,
                        {
                            id: "2",
                            nameCompany: "Company 1",
                            address: "Address 1",
                            description: "Description 1",
                        }
                    ]
                    console.log(user)
                }).catch(err => {
                    if (err instanceof AxiosError) {
                        console.log(err.response?.data)
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
        async jwt({ token, user, trigger, session }): Promise<JWT> {
            if (trigger === "update" && session?.selectedCompany) {
                token.selectedCompany = session.selectedCompany;
            }
            if (user) {
                token.user = user
                token.selectedCompany = user.companies[0]
            }
            return token
        },
        async session({ session, token }: { session: Session, token: JWT }): Promise<Session> {
            session.user = token.user as any
            session.selectedCompany = token.selectedCompany
            return session
        },
    },
})


const handleError = (error: AxiosError): NotFoundCredentials | ServerError => {
    if (error.status === 401) {
        return new NotFoundCredentials()
    } else if (error.status === 500) {
        return new ServerError()
    } else {
        return new NotFoundCredentials()
    }

}