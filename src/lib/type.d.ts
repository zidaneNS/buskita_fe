export type Role = "passenger" | "co" | "co_leader";

export type User = {
    id: string | number,
    nim_nip: string,
    name: string,
    email: string,
    phone_number: string,
    address: string,
    credit_score: number,
    role_name: Role
}

export type Schedule = {
    id: string | number,
    time: Date,
    bus_identity: string,
    route_name: string,
    closed: boolean
}

export type Seat = {
    id: string | number,
    seat_number: string | number,
    user_name: string | null,
    verified: boolean,
    user_id: string | number | null,
    schedule_id: string | number
}

export type Bus = {
    id: string | number,
    identity: string,
    available_row: number,
    available_col: number,
    available_backseat: number
}

export type RouteType = {
    id: string | number,
    route_name: string
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

export type BookSeatState = | {
    errors?: string,
    success?: boolean
} | undefined

export type CheckState = | {
    errors?: {
        cipher?: string[]
    },
    message?: string,
    success?: boolean
} | undefined

export type CreateBusState = | {
    errors?: {
        identity?: string[],
        available_row?: string[],
        available_col?: string[],
        available_backseat?: string[]
    },
    message?: string,
    success?: boolean
} | undefined

export type DestroyBusState = | {
    error?: string,
    success?: boolean
} | undefined

export type CreateScheduleState = | {
    errors?: {
        time?: string[],
        bus_id?: string[],
        route_id?: string[]
    },
    message?: string,
    success?: boolean
} | undefined

export type UpdateScheduleState = | {
    errors?: {
        time?: string[],
        bus_id?: string[],
        route_id?: string[],
        closed?: string[]
    },
    message?: string,
    success?: boolean
} | undefined

export type DeleteScheduleState = | {
    error?: string,
    success?: boolean
} | undefined

export type VerifyState = | {
    error?: string,
    success?: boolean
} | undefined

export type UpdateProfileState = | {
    errors?: {
        nim_nip?: string[],
        name?: string[],
        email?: string[],
        phone_number?: string[],
        address?: string[],
    },
    message?: string,
    success?: boolean
} | undefined