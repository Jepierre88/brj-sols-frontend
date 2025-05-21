'use client'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "@/schemas/auth/login"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
export default function Login() {

    const router = useRouter()


    const onSubmit = async (data: any) => {

        const response = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        })
        if (response?.error) {
            console.log(response)
            toast.error(response.code)
            return
        }

        router.push("/home")

    }


    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    return (
        <section className="flex flex-col items-center justify-center h-screen">

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="border border-gray-200 rounded-lg p-4 w-96">
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                        </FormItem>
                    )} />
                    <Separator className="my-4" />
                    <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                        </FormItem>
                    )} />
                    <Button type="submit" className="w-full my-4">Iniciar sesión</Button>
                </form>
            </Form>

        </section>
    )
}