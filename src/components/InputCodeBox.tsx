'use client';

import { useActionState, useState } from "react";
import QrScanner from "./QrScanner";
import { checkUser } from "@/lib/formAction";
import ErrorInputForm from "./ErrorInputForm";
import Loader from "./Loader";

export default function InputCodeBox() {
    const [isQR, setIsQR] = useState<boolean>(false);
    const [state, action, pending] = useActionState(checkUser, undefined);
    return (
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
                        <Loader />
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
    )
}