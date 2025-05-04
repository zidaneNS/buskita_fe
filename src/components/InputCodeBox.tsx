'use client';

import { useState } from "react";
import QrScanner from "./QrScanner";

export default function InputCodeBox() {
    const [isQR, setIsQR] = useState<boolean>(false);
    return (
        <div className="w-full flex flex-col px-4 py-4 rounded-md gap-y-3 bg-dark-purple">
            <div className="w-full flex gap-x-3">
                <button onClick={() => setIsQR(false)} className={`w-full py-2 rounded-md ${isQR ? "bg-none" : "bg-black/30"} cursor-pointer duration-300 hover:bg-black/10`}>Enter Code</button>
                <button onClick={() => setIsQR(true)} className={`w-full py-2 rounded-md cursor-pointer duration-300 hover:bg-black/10 ${isQR ? "bg-black/30" : "bg-none"}`}>Scan QR Code</button>
            </div>
            {!isQR ? (
                <div className="w-full flex gap-x-3 items-center">
                    <input type="number" placeholder="122..." className="bg-black/30 w-full flex-1 py-2 px-3 outline-none" />
                    <button className="py-2 px-4 rounded-md bg-midnight-purple hover:bg-midnight-purple/80 cursor-pointer duration-300">Check</button>
                </div>
            ) : (
                <div className="w-full flex justify-center py-10">
                    <QrScanner />
                </div>
            )}
        </div>
    )
}