import { verifySession } from "./dal";
import { Bus, Schedule, Seat } from "./type";

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