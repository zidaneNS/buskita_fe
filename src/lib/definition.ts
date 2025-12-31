import { z } from "zod"

export const SignUpFormSchema = z.object({
    nim_nip: z.string().min(8, "NIM / NIP must filled at least 8 characters long").trim(),
    name: z.string().min(3, "Name must filled").trim(),
    email: z.string().email({ message: "please enter valid email" }).trim(),
    phone_number: z.string().min(1, { message: "Phone Number cannot empty" }).trim(),
    address: z.string().min(1, { message: "Address cannot empty" }).trim(),
    password: z.string().min(8, { message: "password must filled at least 8 characters long" }).trim(),
    password_confirmation: z.string().min(8, { message: "password must filled at least 8 characters long" }).trim()
});

export const SignInFormSchema = z.object({
    nim_nip: z.string().min(1, "field cannot empty").trim(),
    password: z.string().min(1, "field cannot empty")
});

export const CheckUserSchema = z.object({
    cipher: z.string().min(1, "field cannot empty").trim()
});

export const CreateBusSchema = z.object({
    identity: z.string().min(1, "field cannot empty").trim(),
    available_row: z.number().min(1, "field cannot empty"),
    available_col: z.number().min(1, "field cannot empty").max(12, "seat only available to 12"),
    available_backseat: z.number().min(0, "field cannot empty").max(12, "seat only available to 12")
});

export const CreateScheduleSchema = z.object({
    time: z.string().datetime(),
    bus_id: z.string().min(1, "field cannot empty").trim(),
    route_id: z.string().min(1, "field cannot empty").trim()
});

export const UpdateScheduleSchema = z.object({
    time: z.string().datetime(),
    bus_id: z.string().min(1, "field cannot empty").trim(),
    route_id: z.string().min(1, "field cannot empty").trim(),
    closed: z.boolean()
});

export const UpdateProfileFormSchema = z.object({
    nim_nip: z.string().min(8, "NIM / NIP must filled at least 8 characters long").trim(),
    name: z.string().min(3, "Name must filled").trim(),
    email: z.string().email({ message: "please enter valid email" }).trim(),
    phone_number: z.string().min(1, { message: "Phone Number cannot empty" }).trim(),
    address: z.string().min(1, { message: "Address cannot empty" }).trim()
});

export const GenerateEvaluesSchema = z.object({
    pValue: z.number().min(1, 'field cannot empty'),
    qValue: z.number().min(1, 'field cannot empty'),
    total: z.number().min(1, 'field cannot empty'),
});

export const GenerateKeySchema = z.object({
    toitent: z.number().min(1, 'field cannot empty'),
    nValue: z.number().min(1, 'field cannot empty'),
    eValue: z.number().min(1, 'field cannot empty'),
});