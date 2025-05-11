'use client';

import { useActionState, useState } from "react";
import QrScanner from "./QrScanner";
import { checkUser } from "@/lib/formAction";
import ErrorInputForm from "./ErrorInputForm";
import { FaUserAlt } from "react-icons/fa";
import { TbArmchair } from "react-icons/tb";
import { GrSchedule } from "react-icons/gr";
import { addHours, format } from "date-fns";
import VerifyForm from "./VerifyForm";

export default function InputCodeBox() {
    const [isQR, setIsQR] = useState<boolean>(false);
    const [cipher, setCipher] = useState<number | string>("");
    const [state, action, pending] = useActionState(checkUser, undefined);

    const seat_number = state?.seat?.seat_number.toString().padStart(2, '0');
    const date = state?.schedule?.time ? format(state.schedule.time, "dd MMMM yyyy") : "invalid";
    const time = state?.schedule?.time ? format(state.schedule.time, "HH:mm") : "invalid";
    const endTime = state?.schedule?.time ? addHours(state!.schedule?.time, 1) : undefined;
    const endTimeStr = endTime ? format(endTime, "HH:mm") : "invalid";

    return (
        <>
            <div className="w-full flex flex-col px-4 py-4 rounded-md gap-y-3 bg-dark-purple">
                <div className="w-full flex gap-x-3">
                    <button onClick={() => setIsQR(false)} className={`w-full py-2 rounded-md ${isQR ? "bg-none" : "bg-black/30"} cursor-pointer duration-300 hover:bg-black/10`}>Enter Code</button>
                    <button onClick={() => setIsQR(true)} className={`w-full py-2 rounded-md cursor-pointer duration-300 hover:bg-black/10 ${isQR ? "bg-black/30" : "bg-none"}`}>Scan QR Code</button>
                </div>
                {!isQR ? (
                    <form action={action} className="w-full flex gap-x-3 items-center">
                        <input type="number" name="cipher" value={cipher} onChange={(e) => setCipher(parseInt(e.target.value))} placeholder="122..." className="bg-black/30 w-full flex-1 py-2 px-3 outline-none" />
                        {state?.errors?.cipher && <ErrorInputForm errMsg={state.errors.cipher} />}
                        {pending ? (
                            <div>Loading...</div>
                        ) : (
                            <button className="py-2 px-4 rounded-md bg-midnight-purple hover:bg-midnight-purple/80 cursor-pointer duration-300">Check</button>
                        )}
                    </form>
                ) : (
                    <div className="w-full flex justify-center py-10">
                        <QrScanner setCipher={setCipher} setIsQR={setIsQR} />
                    </div>
                )}
            </div>
            {state?.passenger && state?.schedule && state?.seat && (
                <div className="w-full flex flex-col gap-y-4 bg-black/20 border border-dark-purple px-8 py-6 rounded-md">
                    <h1 className="text-2xl">Passenger Information</h1>
                    <div className="flex flex-col w-full">
                        <div className="flex gap-x-2 items-center">
                            <FaUserAlt className="size-5" />
                            <p className="font-semibold">Passenger Detail</p>
                        </div>
                        <p>{state.passenger.name}</p>
                        <p className="text-sm font-thin">{state.passenger.nim_nip}</p>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex gap-x-2 items-center">
                            <TbArmchair className="size-5" />
                            <p className="font-semibold">Seat Assignment</p>
                        </div>
                        <p>{seat_number}</p>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex gap-x-2 items-center">
                            <GrSchedule className="size-5" />
                            <p className="font-semibold">Schedule Detail</p>
                        </div>
                        <p>{state.schedule.route_name}</p>
                        <p className="text-sm font-thin">{date}, {time} - {endTimeStr}</p>
                        <p className="text-sm font-thin">Bus: {state.schedule.bus_identity}</p>
                    </div>
                    <VerifyForm initState={state} />
                </div>
            )}
        </>
    )
}