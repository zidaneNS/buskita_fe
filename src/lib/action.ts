import { verifySession } from "./dal";
import { CreateBusDto } from "./dto";
import { Bus, Schedule, Seat, User } from "./type";

const baseUrl = process.env.BASE_URL;

export const getSchedules = async () => {
    const session = await verifySession();
    const { token } = session!;

    try {
        const response = await fetch(`${baseUrl}/schedules`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const schedules = await response.json();
            return schedules as Schedule[];
        } else {
            console.log('failed fetching schedules', response);
            return null;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const getSeatsBySchedule = async (id: string | number) => {
    const session = await verifySession();
    const { token } = session!;

    try {
        const response = await fetch(`${baseUrl}/seats/schedule/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const seats = await response.json();
            return seats as Seat[];
        } else {
            console.log('failed fetch seats', response);
            return null;
        }
    } catch (err) {
        console.log('failed fetch seats', err);
        return null;
    }
}

export const getBusBySchedule = async (id: string | number) => {
    const session = await verifySession();
    const { token } = session!;

    try {
        const response = await fetch(`${baseUrl}/bus/schedule/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const bus = await response.json();
            return bus as Bus;
        } else {
            console.log('failed fetch bus by schedule', response.status);
            return null
        }
    } catch (err) {
        console.log('failed fetch bus by schedule', err);
        return null;
    }
}

export const getScheduleById = async (id: string | number) => {
    const session = await verifySession();
    const { token } = session!;

    try {
        const response = await fetch(`${baseUrl}/schedules/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const schedule = await response.json();
            return schedule as Schedule;
        } else {
            console.log('failed fetch schedule by id', response.status);
            return null
        }
    } catch (err) {
        console.log('failed fetch schedule by id', err);
        return null;
    }
}

export const getUserSchedule = async () => {
    const session = await verifySession();
    const { token } = session!;

    try {
        const response = await fetch(`${baseUrl}/user/schedules`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const schedules = await response.json();
            return schedules as Schedule[];
        } else {
            console.log('fail fetch user schedule', response.status);
            return null;
        }
    } catch (err) {
        console.log('fail fetch user schedule', err);
        return null;
    }
}

export const attachSeat = async (seat_id : string | number) => {
    const session = await verifySession();
    const { token } = session!;

    try {
        const response = await fetch(`${baseUrl}/seats`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                seat_id
            })
        });

        if (response.status === 200) {
            await response.json();
        } else {
            const result = await response.json();
            return { error: result.error }
        }
    } catch (err) {
        console.log('fail book seat', err);
        return { error: 'something went wrong' }
    }
}

export const updateSeat = async (seat_id : string | number, new_seat_id : string | number) => {
    const session = await verifySession();
    const { token } = session!;

    try {
        const response = await fetch(`${baseUrl}/seats/${seat_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                new_seat_id: new_seat_id
            })
        });

        if (response.status === 200) {
            await response.json();
        } else {
            const error = await response.json();
            return { error: error.message }
        }
    } catch (err) {
        console.log ('fail update seat', err);
        return { error: 'something went wrong' }
    }
}

export const detachSeat = async (id: number | string) => {
    const session = await verifySession();
    const { token } = session!;

    try {
        const response = await fetch(`${baseUrl}/seats/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status !== 204) {
            const result = await response.json();
            console.log('fail detach seat', result.error);
            return { error: result.error }
        }
    } catch (err) {
        console.log('fail detach seat', err);
        return { error: 'something went wrong' }
    }
}

export const getUserById = async (id: string | number) => {
    const session = await verifySession();
    const { token } = session!;

    try {
        const response = await fetch(`${baseUrl}/users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const user = await response.json();
            return user as User;
        } else {
            const result = await response.json();
            console.log('fail get user by id : ', result.error);
            return { error: result.error }
        }
    } catch (err) {
        console.log('fail get user by id', err);
        return { error: 'something went wrong' }
    }
}

export const getSeatById = async (id: number | string) => {
    const session = await verifySession();
    const { token } = session!;

    try {
        const response = await fetch(`${baseUrl}/seats/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const seat = await response.json();
            return seat as Seat;
        } else {
            const result = await response.json();
            console.log('fail get seat by id : ', result.error);
            return { error: result.error }
        }
    } catch (err) {
        console.log('fail get seat by id', err);
        return {  error: 'something went wrong' }
    }
}

export const getAllBuses = async () => {
    const session = await verifySession();
    const { token } = session!;

    try {
        const response = await fetch(`${baseUrl}/buses`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 200) {
            const buses = await response.json();
            return buses as Bus[];
        } else {
            const result = await response.json();
            console.log('fail get all buses : ', result.error);
        }
    } catch (err) {
        console.log('fail get all buses ', err);
    }
}

export const createBus = async (createBusDto: CreateBusDto) => {
    const session = await verifySession();
    const { token } = session!;

    try {
        const response = await fetch(`${baseUrl}/buses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(createBusDto)
        });

        if (response.status === 201) {
            return { success: true }
        } else {
            const result = await response.json();
            console.log('fail create bus : ', result.error);
            return { error: result.error };
        }
    } catch (err) {
        console.log('fail create bus', err);
        return { error: 'something went wrong' }
    }
}