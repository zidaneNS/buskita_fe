'use server';

import { revalidatePath } from "next/cache";
import { attachSeat, createBus, destroyBus, destroySchedule, detachSeat, getScheduleById, getSeatById, getUserById, storeSchedule, updateBus, updateProfile, updateSchedule, updateSeat, verify } from "./action";
import { BookSeatState, CheckState, CreateBusState, CreateScheduleState, DeleteScheduleState, DestroyBusState, Schedule, Seat, SignUpFormState, UpdateProfileState, UpdateScheduleState, User, VerifyState } from "./type";
import { CheckUserSchema, CreateBusSchema, CreateScheduleSchema, SignUpFormSchema, UpdateProfileFormSchema, UpdateScheduleSchema } from "./definition";
import { cryptoDecrypt, generatePlain, m_digit, PRIVATE_KEY } from "./crypto";
import { CreateBusDto, CreateScheduleDto, UpdateProfileDto, UpdateScheduleDto } from "./dto";

const baseUrl = process.env.BASE_URL;

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
    const seat_id: number = JSON.parse(text);

    try {
        const seat = await getSeatById(seat_id) as Seat | null;
        if (!seat) {
            return { error: 'fail fetch seat' }
        }
        const passenger = await getUserById(seat.user_id!) as User | null;
        const schedule = await getScheduleById(seat.schedule_id!) as Schedule | null;

        if (!passenger) return { error: 'no passenger found' }
        if (!schedule) return { error: 'no schedule found' }

        return { seat, passenger, schedule }

    } catch (err) {
        console.log('fail get seat', err);
        return { error: 'something went wrong' }
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

    if (available_col > available_backseat) {
        return { error: 'total column cannot greater than total backseats' }
    }

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

    if (available_col > available_backseat) {
        return { error: 'total column cannot greater than total backseats' }
    }

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

export const editSchedule = async (state: UpdateScheduleState, formData: FormData) => {
    const id = formData.get('id')?.toString();
    const isClosed = formData.get('closed') === 'on';
    const rawDate = formData.get('time');
    const date = new Date(`${rawDate}:00`);
    
    const validatedFields = UpdateScheduleSchema.safeParse({
        closed: isClosed,
        time: date.toISOString(),
        bus_id: formData.get('bus_id'),
        route_id: formData.get('route_id')
    });

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors}
    }

    const { closed, time, bus_id, route_id } = validatedFields.data;

    const updateScheduleDto: UpdateScheduleDto = {
        closed,
        time,
        bus_id,
        route_id
    }

    try {
        const result = await updateSchedule(updateScheduleDto, id!);
        if (result?.error) {
            return { error: result.error }
        }
        revalidatePath('/');
        return { success: true }
    } catch (err) {
        console.log('fail update schedule', err);
        return { error: 'something went wrong' }
    }
}

export const deleteSchedule = async (state: DeleteScheduleState, id: number | string) => {
    try {
        const result = await destroySchedule(id);
        if (result?.error) {
            return { error: result.error }
        }
        revalidatePath('/');
        return { success: true }
    } catch (err) {
        console.log('fail delete schedule', err);
        return  { error: 'something went wrong' }
    }
}

export const createCo = async (state: SignUpFormState, formData: FormData) => {
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
                role_id: 2
            }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })

        if (response.status === 422) {
            return {  message: "system error" }
        } else if (response.status === 201) {
            revalidatePath('/');
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

export const verifyPassenger = async (state: VerifyState, id: string | number) => {
    // console.log(id);
    try {
        const result = await verify(id);

        if (result.error) return { error: result.error };
        revalidatePath('/');
        return { success: true };
    } catch (err) {
        console.log('fail verify', err);
        return { error: 'something went wrong' }
    }
}

export const editProfile = async (state: UpdateProfileState, formData: FormData) => {
    const id = formData.get('id')?.toString();
    
    const validatedFields = UpdateProfileFormSchema.safeParse({
        nim_nip: formData.get('nim_nip'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone_number: formData.get('phone_number'),
        address: formData.get('address')
    })

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors}
    }

    const { nim_nip, name, email, phone_number, address } = validatedFields.data;

    const updateProfileDto: UpdateProfileDto = {
        nim_nip,
        name,
        email,
        phone_number,
        address
    }

    try {
        const result = await updateProfile(updateProfileDto, id!);
        if (result?.error) {
            return { error: result.error }
        }
        revalidatePath('/');
        return { success: true }
    } catch (err) {
        console.log('fail update profile', err);
        return { error: 'something went wrong' }
    }
}