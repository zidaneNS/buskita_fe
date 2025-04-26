import { verifySession } from "./dal";
import { Schedule, Seat } from "./type";

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
            console.log(schedules);
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
        }
    } catch (err) {
        console.log('failed fetch seats', err);
        return null;
    }
}