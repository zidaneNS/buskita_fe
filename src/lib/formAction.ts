'use server';

import { revalidatePath } from "next/cache";
import { attachSeat, createBus, destroyBus, detachSeat, getScheduleById, getSeatById, getUserById, storeSchedule, updateBus, updateSeat } from "./action";
import { BookSeatState, CheckState, CreateBusState, CreateScheduleState, DestroyBusState, Schedule, Seat, User } from "./type";
import { CheckUserSchema, CreateBusSchema, CreateScheduleSchema } from "./definition";
import { cryptoDecrypt, generatePlain, m_digit, PRIVATE_KEY } from "./crypto";
import { CreateBusDto, CreateScheduleDto } from "./dto";

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

    // console.log(information);

    if (information.length !== 3) return {
        message: 'invalid cipher'
    }
    const user_id = information[0];
    const schedule_id = information[1];
    const seat_id = information[2]

    const passenger = await getUserById(user_id) as User;
    const schedule = await getScheduleById(schedule_id) as Schedule;
    const seat = await getSeatById(seat_id) as Seat;

    return {
        passenger,
        schedule,
        seat
    }
}

export const addBus = async (state: CreateBusState, formData: FormData) => {
    const validatedFields = CreateBusSchema.safeParse({
        identity: formData.get('identity'),
        available_row: parseInt(formData.get('available_row') as string),
        available_col: parseInt(formData.get('available_col') as string),
        available_backseat: parseInt(formData.get('available_backseat') as string),
    });

    if (!validatedFields.success) {
        console.log(validatedFields);
        return { errors: validatedFields.error.flatten().fieldErrors}
    }

    const { identity, available_row, available_col, available_backseat} = validatedFields.data;

    try {
        const dto: CreateBusDto = {
            identity,
            available_row,
            available_col,
            available_backseat
        };

        const result = await createBus(dto);
        if (result?.error) {
            return { error: result.error }
        }
        revalidatePath('/');
        return { success: true }
    } catch (err) {
        console.log('fail create bus', err);
        return { error: 'something went wrong' }
    }
}

export const deleteBus = async (state: DestroyBusState, id: number | string) => {
    try {
        const result = await destroyBus(id);
        if (result?.error) {
            return { error: result.error as string }
        }
        revalidatePath('/');
        return { success: true }
    } catch (err) {
        console.log('fail delete bus', err);
        return { error: 'something went wrong' }
    }
}

export const changeBus = async (state: CreateBusState, formData: FormData) => {
    const validatedFields = CreateBusSchema.safeParse({
        identity: formData.get('identity'),
        available_row: parseInt(formData.get('available_row') as string),
        available_col: parseInt(formData.get('available_col') as string),
        available_backseat: parseInt(formData.get('available_backseat') as string),
    });

    const id = formData.get('id')?.toString();

    if (!validatedFields.success) {
        console.log(validatedFields);
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { identity, available_row, available_col, available_backseat } = validatedFields.data;

    const updateBusDto: CreateBusDto = {
        identity,
        available_row,
        available_col,
        available_backseat
    }

    try {
        const result = await updateBus(id!, updateBusDto);
        if (result?.error) {
            return { error: result.error as string }
        }
        revalidatePath('/');
        return { success: true }
    } catch (err) {
        console.log('fail edit bus', err);
        return { error: 'something went wrong' }
    }
}

export const createSchedule = async (state: CreateScheduleState, formData: FormData) => {
    const rawDate = formData.get('time');
    const date = new Date(`${rawDate}:00`);

    const validatedFields = CreateScheduleSchema.safeParse({
        time: date.toISOString(),
        bus_id: formData.get('bus_id'),
        route_id: formData.get('route_id')
    });
    
    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors }
    }

    const { time, bus_id, route_id } = validatedFields.data;

    const createScheduleDto: CreateScheduleDto = {
        time,
        bus_id,
        route_id
    }

    try {
        const result = await storeSchedule(createScheduleDto);

        if (result.error) {
            return { error: result.error }
        }
        revalidatePath('/');
        return { success: true }
    } catch (err) {
        console.log('fail create schedule', err);
        return { error: 'something went wrong' };
    }
}