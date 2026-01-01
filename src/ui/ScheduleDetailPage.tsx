'use client';

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import SeatSection from "./SeatSection";
import { useActionState, useEffect, useState } from "react";
import { format } from "date-fns";
import { bookSeat, changeSeat } from "@/lib/formAction";
import ErrorInputForm from "@/components/ErrorInputForm";
import UpdateSeatForm from "./UpdateSeatForm";
import SeatDetail from "./SeatDetail";
import { Schedule } from "@/lib/type";
import { Bus } from "@/lib/type";
import { User } from "@/lib/type";
import { Seat } from "@/lib/type";

export default function ScheduleDetailPage({ schedule, bus, user, seats }: { schedule: Schedule, bus: Bus, user: User, seats: Seat[] }) {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [selected, setSelected] = useState<number>(0);
    const [seatId, setSeatId] = useState<string | number | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    
    const bookSeatWithId = bookSeat.bind(null, undefined, seatId);
    const [state, action, pending] = useActionState(bookSeatWithId, undefined);
    
    const date = format(new Date(schedule.time), "dd MMMM yyyy");
    
    const seatUser = seats.filter(seat => seat.user?.name !== null).map(seat => seat.user?.name);
    const userSeat = seats.filter(seat => seat.user?.name === user.name)[0] || null;
    const alreadyBooked = seatUser.includes(user.name);

    const preparedChangeSeat = changeSeat.bind(null, undefined, userSeat?.seatId, seatId);
    const [updateState, updateAction, updatePending] = useActionState(preparedChangeSeat, undefined);

    const handleEditButton = () => {
        setIsEditing(prev => !prev);
        setSelected(0);
        setSeatId(null);
    }

    useEffect(() => {
        if (state?.success) {
            if (state.success) setIsSuccess(true);
        }

        if (updateState?.success) {
            if (updateState.success) setIsEditing(false);
        }
    }, [state, updateState]);

    return !isSuccess ?
        (
            <main className="min-h-screen flex flex-col w-full px-6 pt-24 pb-10 md:p-32 gap-y-4">
                <Link href="/schedule" className="w-fit flex gap-x-3 items-center">
                    <ArrowLeftIcon className="size-6" />
                    <p className="hover:underline">Back to all offers</p>
                </Link>
                <section className="w-full flex flex-col md:flex-row gap-y-8 md:gap-x-18">
                    <div className="w-full max-w-full overflow-x-auto md:w-1/2 flex flex-col py-10 px-12 gap-y-16 bg-gradient-end rounded-lg shadow-2xl">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="text-xl font-semibold">Pick your seat</h1>
                            <p>Bus : {bus.name}</p>
                        </div>
                        <SeatSection 
                            selected={selected} 
                            setSelected={setSelected} 
                            seats={seats} 
                            bus={bus}
                            setSeatId={setSeatId}
                            user={user}
                            isEditing={isEditing}
                        />
                        <div className="w-full px-4 flex justify-around">
                            <div className="w-fit flex flex-col gap-y-2 items-center">
                                <span className="size-10 bg-white rounded-md"></span>
                                <p className="text-xs">Available</p>
                            </div>
                            <div className="w-fit flex flex-col gap-y-2 items-center">
                                <span className="size-10 bg-lime-400 rounded-md"></span>
                                <p className="text-xs">Selected</p>
                            </div>
                            <div className="w-fit flex flex-col gap-y-2 items-center">
                                <span className="size-10 bg-teal-500 rounded-md"></span>
                                <p className="text-xs">Booked</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col h-fit items-center gap-y-6">
                        <SeatDetail
                            schedule={schedule}
                            user={user}
                            userSeat={userSeat}
                            selected={selected}
                            isEditing={isEditing}
                            date={date}
                        />
                        {pending ? (
                            <div>Loading...</div>
                        ) : (
                            <>
                                {state?.errors && (<ErrorInputForm errMsg={state.errors} />)}
                                {updateState?.errors && (<ErrorInputForm errMsg={updateState.errors} />)}
                                {alreadyBooked ? isEditing ? (
                                    <div className="w-full flex justify-center gap-x-4">
                                        {updatePending ? (
                                            <p>Loading...</p>
                                        ) : (
                                            <>
                                                <button onClick={handleEditButton} type="button" className="bg-red-500 py-2 px-6 rounded-md hover:bg-red-200 hover:text-black cursor-pointer duration-300">Cancel</button>
                                                <UpdateSeatForm
                                                    updateAction={updateAction}
                                                />
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <div className="w-full flex items-center gap-x-4 justify-center">
                                        <button onClick={handleEditButton} type="button" className="bg-green-800 py-2 px-6 rounded-md hover:bg-white hover:text-black cursor-pointer duration-300">Edit</button>
                                    </div>
                                ) : (
                                    <form action={action} className="w-full flex justify-center">
                                        <button 
                                            className="bg-midnight-purple rounded-xl py-2 px-8 font-semibold text-xl cursor-pointer hover:bg-white/20 duration-300"
                                            type="submit"
                                        >
                                            Book
                                        </button>
                                    </form>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </main>
        ) : (
            <main className="h-screen w-full flex items-center justify-center flex-col gap-y-4">
                <h1 className="text-2xl md:text-3xl font-semibold">Your Booking is Succeed</h1>
                <p className="text-xs md:text-sm text-center">Check your schedule <Link href="/myschedule" className="hover:underline cursor-pointer text-blue-500">here</Link> or Click this button to back on homepage</p>
                <Link href="/schedule" className="py-2 px-6 bg-midnight-purple rounded-xl hover:bg-white/40 duration-300 cursor-pointer">Back</Link>
            </main>
        )
}