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
    id: string | number,
    expiresAt: Date
}