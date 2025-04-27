'use server';

import { revalidatePath } from "next/cache";
import { attachSeat, updateSeat } from "./action";
import { BookSeatState } from "./type";

export const bookSeat = async (state: BookSeatState, seat_id: string | number | null) => {
    if (!seat_id) return { 
        success: false,
        errors: 'make sure you selected seat'
    }

    try {
        await attachSeat(seat_id);
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
        await updateSeat(seat_id, new_seat_id);
        revalidatePath('/');
        return { success: true }
    } catch {
        return {
            errors: 'something went wrong'
        }
    }
    
}