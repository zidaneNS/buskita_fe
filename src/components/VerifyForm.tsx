'use client';

import { verifyPassenger } from "@/lib/formAction";
import { useActionState } from "react";
import ErrorInputForm from "./ErrorInputForm";
import { Schedule, Seat, User } from "@/lib/type";

export default function VerifyForm({ initState }: { initState: {
    seat: Seat;
    passenger: User;
    schedule: Schedule;
    errors?: undefined;
    error?: undefined;
} }) {
    const verifyPassengerWithId = verifyPassenger.bind(null, undefined, initState.seat.seatId);
    const [state, action, pending] = useActionState(verifyPassengerWithId, undefined);
    return (
        <form action={action} className="w-full flex justify-center">
            {state?.error && <ErrorInputForm errMsg={state.error} />}
            {initState.seat.verified || state?.success ? (
                <div className="py-2 px-4 rounded-full bg-green-500/10 text-green-500">Verified</div>
            ) : pending ? (
                <div>Loading</div>
            ) : (
                <button className="bg-black/60 px-4 py-2 rounded-md cursor-pointer hover:bg-white/40 duration-300">Verify</button>
            )}
        </form>
    )
}