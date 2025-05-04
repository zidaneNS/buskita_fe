'use server';

import { revalidatePath } from "next/cache";
import { attachSeat, detachSeat, updateSeat } from "./action";
import { BookSeatState, CheckState } from "./type";
import { CheckUserSchema } from "./definition";
import { cryptoDecrypt, generatePlain, m_digit, PRIVATE_KEY } from "./crypto";

export const bookSeat = async (state: BookSeatState, seat_id: string | number | null) => {
    if (!seat_id) return { 
        success: false,
        errors: 'make sure you selected seat'
    }

    try {
        const response = await attachSeat(seat_id);
        if (response?.error) {
            return { errors: response.error }
        }
        return { success: true }
    } catch {
        return {
            success: false,
            errors: 'something went wrong'
        }
    }
}

export const changeSeat = async (state: BookSeatState, seat_id: string | number, new_seat_id: string | number | null) => {
    if (!new_seat_id) return { 
        success: false,
        errors: 'make sure you selected seat'
    }
    
    try {
        const response = await updateSeat(seat_id, new_seat_id);
        revalidatePath('/');
        if (response?.error) {
            return { errors: response.error }
        }
        return { success: true }
    } catch {
        return {
            errors: 'something went wrong'
        }
    }
}

export const cancelSchedule = async (state: BookSeatState, id: number | string) => {
    try {
        const response = await detachSeat(id);
        if (response?.error) {
            return { errors: response.error }
        }
        revalidatePath('/');
        return { success: true }
    } catch (err) {
        console.log('fail cancel schedule', err);
        return { errors: 'something went wrong' }
    }
}

export const checkUser = async (state: CheckState, formData: FormData) => {
    const validatedFields = CheckUserSchema.safeParse({
        cipher: formData.get('cipher')
    });

    if (!validatedFields.success) return {
        errors: validatedFields.error.flatten().fieldErrors
    }

    const { cipher } = validatedFields.data;
    const plain = cryptoDecrypt(cipher, PRIVATE_KEY, m_digit);
    const text = generatePlain(plain, m_digit);
    const information: number[] = JSON.parse(text);

    if (information.length !== 3) return {
        message: 'invalid cipher'
    }
    // const user_id = information[0];
    // const schedule_id = information[1];
    // const seat_id = information[2]
}