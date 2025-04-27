'use server';

import { SignInFormSchema, SignUpFormSchema } from "./definition";
import { createSession, deleteSession } from "./session";
import { SignInFormState, SignUpFormState } from "./type";
import { verifySession } from "./dal";

const baseUrl = process.env.BASE_URL;

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

    if (!validatedFields.success) {
        console.log(validatedFields.error);
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const { nim_nip, name, email, phone_number, address, password, password_confirmation } = validatedFields.data;

    try {
        const response = await fetch(`${baseUrl}/register`, {
            method: "POST",
            body: JSON.stringify({
                nim_nip,
                name,
                email,
                phone_number,
                address,
                password,
                password_confirmation,
                role_id: 3
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })

        if (response.status === 422) {
            return {  message: "system error" }
        } else if (response.status === 201) {
            return { success: true }
        } else if (response.status === 500) {
            return {  message: "server error" }
        } else {
            return { message: "uncatch error"}
        }
    } catch (err) {
        console.log(err)
    }
}

export const signin = async (state: SignInFormState, formData: FormData) => {
    const validatedFields = SignInFormSchema.safeParse({
        nim_nip: formData.get('nim_nip'),
        password: formData.get('password'),
    });

    if (!validatedFields.success) {
        console.log(validatedFields.error);
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const { nim_nip, password } = validatedFields.data;

    try {
        const response = await fetch(`${baseUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                nim_nip,
                password
            })
        });

        if (response.status === 500) {
            return { message: "server error" }
        } else if (response.status === 422) {
            return { message: "credentials error"}
        } else if (response.status === 200) {
            const { token } = await response.json();
            await createSession(token);
            
            return { success: true }
        } else if (response.status === 400) {
            const result = await response.json();
            return { message: result.error }
        } else {
            return { message: "uncatch error" }
        }
    } catch (err) {
        console.log(err);
    }
}

export const logout = async () => {
    const session = await verifySession();
    const { token } = session!;
    try {
        const response = await fetch(`${baseUrl}/logout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status !== 204) {
            console.log('logout failed : ', response);
        }
    } catch (err) {
        console.log(err)
    } finally {
        await deleteSession();
    }
}