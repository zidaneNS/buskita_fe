'use server';

import { SignInFormSchema, SignUpFormSchema } from "./definition";
import { createSession, deleteSession } from "./session";
import { DefaultResponse, SignInFormState, SignUpFormState, User } from "./type";
import { verifySession } from "./dal";
import { CreateCoDto } from "./dto";

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
    const createUserDto: CreateCoDto = {
        userId: nim_nip,
        name,
        email,
        phoneNumber: phone_number,
        address,
        password,
        confirmPassword: password_confirmation,
        roleId: 3
    }

    try {
        const response = await fetch(`${baseUrl}/auth/signup`, {
            method: "POST",
            body: JSON.stringify(createUserDto),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        const result = await response.json() as DefaultResponse<User>;
        if (result.payloads?.data) {
            return {success: true}
        } else if (response.status === 422) {
            return {  message: "system error" }
        }  else if (response.status === 500) {
            return {  message: result.message || "server error" }
        } else {
            return { message: result.message || "uncatch error"}
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
        const response = await fetch(`${baseUrl}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                userId: nim_nip,
                password
            })
        });

        const result = await response.json() as DefaultResponse<string>;

        if (result.payloads?.data) {
            const token = result.payloads.data;
            await createSession(token);
            return { success: true }
        }

        if (response.status === 500) {
            return { message: "server error" }
        } else if (response.status === 422) {
            return { message: "credentials error"}
        } else if (response.status === 400) {
            return { message: result.message }
        } else {
            return { message: result.message || 'uncatch error' }
        }

    } catch (err) {
        console.error(err);
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