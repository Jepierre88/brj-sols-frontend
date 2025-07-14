import NextAuth, { CredentialsSignin } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
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

// Datos mockeados para desarrollo
const mockUser = {
    token: "mock-jwt-token-12345",
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan.perez@example.com",
    cellPhoneNumber: "+57 300 123 4567",
    companies: [
        {
            id: "1",
            nameCompany: "Empresa Principal",
            address: "Calle 123 #45-67, Bogotá, Colombia",
            description: "Empresa líder en tecnología y soluciones digitales",
            urlImage: "https://via.placeholder.com/150/4F46E5/FFFFFF?text=EP"
        },
        {
            id: "2",
            nameCompany: "Compañía Secundaria",
            address: "Avenida 78 #90-12, Medellín, Colombia",
            description: "Especialistas en consultoría empresarial",
            urlImage: "https://via.placeholder.com/150/10B981/FFFFFF?text=CS"
        },
        {
            id: "3",
            nameCompany: "Startup Innovadora",
            address: "Carrera 15 #25-30, Cali, Colombia",
            description: "Desarrollo de software y aplicaciones móviles",
            urlImage: "https://via.placeholder.com/150/F59E0B/FFFFFF?text=SI"
        }
    ]
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const { email, password } = loginSchema.parse(credentials)
                    
                    // Simular validación de credenciales
                    if (email === "admin@example.com" && password === "admin123") {
                        console.log("✅ Login exitoso con datos mockeados")
                        return mockUser
                    } else if (email === "user@example.com" && password === "user123") {
                        console.log("✅ Login exitoso con usuario regular")
                        return {
                            ...mockUser,
                            firstName: "María",
                            lastName: "García",
                            email: "maria.garcia@example.com",
                            cellPhoneNumber: "+57 310 987 6543"
                        }
                    } else {
                        console.log("❌ Credenciales inválidas")
                        throw new NotFoundCredentials()
                    }
                } catch (error) {
                    console.log("❌ Error en la validación:", error)
                    throw new ServerError()
                }
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
            session.user = token.user
            session.selectedCompany = token.selectedCompany
            return session
        },
    },
})