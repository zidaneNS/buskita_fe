'use client';

import { useActionState, useState } from "react";
import QrScanner from "./QrScanner";
import { checkUser } from "@/lib/formAction";
import ErrorInputForm from "./ErrorInputForm";
import { FaUserAlt } from "react-icons/fa";
import { TbArmchair } from "react-icons/tb";
import { GrSchedule } from "react-icons/gr";

export default function InputCodeBox() {
    const [isQR, setIsQR] = useState<boolean>(false);
    const [state, action, pending] = useActionState(checkUser, undefined);
    return (
        <>
            <div className="w-full flex flex-col px-4 py-4 rounded-md gap-y-3 bg-dark-purple">
                <div className="w-full flex gap-x-3">
                    <button onClick={() => setIsQR(false)} className={`w-full py-2 rounded-md ${isQR ? "bg-none" : "bg-black/30"} cursor-pointer duration-300 hover:bg-black/10`}>Enter Code</button>
                    <button onClick={() => setIsQR(true)} className={`w-full py-2 rounded-md cursor-pointer duration-300 hover:bg-black/10 ${isQR ? "bg-black/30" : "bg-none"}`}>Scan QR Code</button>
                </div>
                {!isQR ? (
                    <form action={action} className="w-full flex gap-x-3 items-center">
                        <input type="number" name="cipher" placeholder="122..." className="bg-black/30 w-full flex-1 py-2 px-3 outline-none" />
                        {state?.errors?.cipher && <ErrorInputForm errMsg={state.errors.cipher} />}
                        {pending ? (
                            <div>Loading...</div>
                        ) : (
                            <button className="py-2 px-4 rounded-md bg-midnight-purple hover:bg-midnight-purple/80 cursor-pointer duration-300">Check</button>
                        )}
                    </form>
                ) : (
                    <div className="w-full flex justify-center py-10">
                        <QrScanner />
                    </div>
                )}
            </div>
            <div className="w-full flex flex-col gap-y-4 bg-black/20 border border-dark-purple px-8 py-6 rounded-md">
                <h1 className="text-2xl">Passenger Information</h1>
                <div className="flex flex-col w-full">
                    <div className="flex gap-x-2 items-center">
                        <FaUserAlt className="size-5" />
                        <p className="font-semibold">Passenger Detail</p>
                    </div>
                    <p>Zidane</p>
                    <p className="text-sm font-thin">181221055</p>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex gap-x-2 items-center">
                        <TbArmchair className="size-5" />
                        <p className="font-semibold">Seat Assignment</p>
                    </div>
                    <p>09</p>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex gap-x-2 items-center">
                        <GrSchedule className="size-5" />
                        <p className="font-semibold">Passenger Detail</p>
                    </div>
                    <p>SBY-GSK</p>
                    <p className="text-sm font-thin">6 Mei 2025, 00:00 - 01:00</p>
                    <p className="text-sm font-thin">Bus: 08</p>
                </div>
                <div className="w-full flex justify-center">
                    <button className="bg-black/60 px-4 py-2 rounded-md cursor-pointer hover:bg-white/40 duration-300">Verify</button>
                </div>
            </div>
        </>
    )
}