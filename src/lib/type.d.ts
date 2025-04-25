import { z } from "zod";

export type Role = "passenger" | "co" | "co_leader";

export type User = {
    id: string | number,
    nim_nip: string,
    name: string,
    email: string,
    phone_number: string,
    address: string,
    credit_score: number,
    role: Role
}

export type SessionPayload = {
    token: string,
    expiresAt: Date
}

export type SignUpFormState = | {
    errors?: {
        nim_nip?: string[],
        name?: string[],
        email?: string[],
        phone_number?: string[],
        address?: string[],
        password?: string[],
        password_confirmation?: string[]
    },
    message?: string,
    success?: boolean
} | undefined

export type SignInFormState = | {
    errors?: {
        nim_nip?: string[],
        password?: string[]
    },
    message?: string,
    success?: boolean
} | undefined