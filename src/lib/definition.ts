import { z } from "zod"

export const SignUpFormSchema = z.object({
    nim_nip: z.string().min(8, "NIM / NIP must filled at least 8 characters long").trim(),
    name: z.string().min(3, "Name must filled").trim(),
    email: z.string().email({ message: "please enter valid email" }).trim(),
    phone_number: z.string().min(1, { message: "Phone Number cannot empty" }).trim(),
    address: z.string().min(1, { message: "Address cannot empty" }).trim(),
    password: z.string().min(8, { message: "password must filled at least 8 characters long" }).trim(),
    password_confirmation: z.string().min(8, { message: "password must filled at least 8 characters long" }).trim()
})

export type SignUpFormState = | {
    errors?: {
        nim_nip?: string[],
        name?: string[],
        email?: string[],
        phone_number?: string[],
        address?: string[],
        password?: string[],
        password_confirmation?: string[],
    }
    message?: string
} | undefined