'use server';

import { verifySession } from "./dal";
import { dummyUser } from "./dummyData";
import { createSession } from "./session";
import { SignUpFormSchema, SignUpFormState } from "./definition";

export const signup = async (state: SignUpFormState, formData: FormData) => {
    const validatedFields = SignUpFormSchema.safeParse({
        nim_nip: formData.get('nim_nip'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone_number: formData.get('phone_number'),
        address: formData.get('address'),
        password: formData.get('password'),
        password_confirmation: formData.get('password_confirmation'),
    });

    console.log(validatedFields.success);

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }
}

export const getUser = async () => {
    return dummyUser;
}

export const verifyCo = async () => {
    const user = await getUser();

    return user.role === "co" || user.role === "co_leader";
}