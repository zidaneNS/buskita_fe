'use server';

import { revalidatePath } from "next/cache";
import { attachSeat, detachSeat, updateSeat } from "./action";
import { BookSeatState } from "./type";

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

export const cancelSchedule = async (id: number | string) => {
    try {
        await detachSeat(id);
    } catch (err) {
        console.log('fail cancel schedule', err);
    }
}