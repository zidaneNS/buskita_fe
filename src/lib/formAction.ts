'use server';

import { attachSeat } from "./action";
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