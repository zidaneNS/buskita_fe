'use client';

import { useActionState, useEffect, useState } from "react";
import QrScanner from "./QrScanner";
import { getPlain } from "@/lib/formAction";
import ErrorInputForm from "./ErrorInputForm";
import { FaUserAlt } from "react-icons/fa";
import { TbArmchair } from "react-icons/tb";
import { GrSchedule } from "react-icons/gr";
import { addHours, format } from "date-fns";
import VerifyForm from "./VerifyForm";
import { Plaintext } from "@/lib/type";

export default function InputCodeBox() {
  const [isQR, setIsQR] = useState<boolean>(false);
  const [cipher, setCipher] = useState<number | string>("");
  const [plaintext, setPlaintext] = useState<Plaintext | null>(null);
  const [state, action, pending] = useActionState(getPlain, undefined);

  const seat_number = plaintext?.seatNumber.toString().padStart(2, '0');
  const date = plaintext?.time ? format(plaintext.time, "dd MMMM yyyy") : "invalid";
  const time = plaintext?.time ? format(plaintext.time, "HH:mm") : "invalid";
  const endTime = plaintext?.time ? addHours(plaintext.time, 1) : undefined;
  const endTimeStr = endTime ? format(endTime, "HH:mm") : "invalid";

  useEffect(() => {
    if (state?.success && state.data) {
      console.log('dta', JSON.parse(state.data))
      setPlaintext(JSON.parse(state.data))
    }
  }, [state]);

  return (
    <>
      <div className="w-full flex flex-col px-4 py-4 rounded-md gap-y-3 bg-dark-purple">
        <div className="w-full flex gap-x-3">
          <button onClick={() => setIsQR(false)} className={`w-full py-2 rounded-md ${isQR ? "bg-none" : "bg-black/30"} cursor-pointer duration-300 hover:bg-black/10`}>Enter Code</button>
          <button onClick={() => setIsQR(true)} className={`w-full py-2 rounded-md cursor-pointer duration-300 hover:bg-black/10 ${isQR ? "bg-black/30" : "bg-none"}`}>Scan QR Code</button>
        </div>
        {!isQR ? (
          <form action={action} className="w-full flex gap-x-3 items-center">
            <input type="text" name="ciphertext" value={cipher} onChange={(e) => setCipher(e.target.value)} placeholder="122..." className="bg-black/30 w-full flex-1 py-2 px-3 outline-none" />
            {state?.errors?.ciphertext && <ErrorInputForm errMsg={state.errors.ciphertext} />}
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
      {plaintext && (
        <div className="w-full flex flex-col gap-y-8 bg-black/20 border border-dark-purple px-8 py-6 rounded-md">
          <h1 className="text-2xl">Passenger Information</h1>
          <div className="flex flex-col gap-y-2 w-full">
            <div className="flex gap-x-2 items-center">
              <FaUserAlt className="size-5" />
              <p className="font-semibold text-xl">Passenger Detail</p>
            </div>
            <p>Name: {plaintext.name}</p>
            <p className="text-sm">NIM / NIP: {plaintext.userId}</p>
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <div className="flex gap-x-2 items-center">
              <TbArmchair className="size-5" />
              <p className="font-semibold text-xl">Seat Assignment</p>
            </div>
            <p>{seat_number}</p>
          </div>
          <div className="flex flex-col gap-y-2 w-full">
            <div className="flex gap-x-2 items-center">
              <GrSchedule className="size-5" />
              <p className="font-semibold text-xl">Schedule Detail</p>
            </div>
            <p>Route: {plaintext.routeName}</p>
            <p className="text-sm">{date}, {time} - {endTimeStr}</p>
          </div>
          <VerifyForm plaintext={plaintext} />
        </div>
      )}
    </>
  )
}