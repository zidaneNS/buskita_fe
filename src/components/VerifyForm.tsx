'use client';

import { verifyPassenger } from "@/lib/formAction";
import { useActionState } from "react";
import ErrorInputForm from "./ErrorInputForm";
import { Plaintext } from "@/lib/type";

export interface VerifyFormProps {
  plaintext: Plaintext
}

export default function VerifyForm({
  plaintext
}: VerifyFormProps) {
  const verifyPassengerWithId = verifyPassenger.bind(null, undefined, plaintext.seatId);
  const [state, action, pending] = useActionState(verifyPassengerWithId, undefined);
  return (
    <form action={action} className="w-full flex justify-center">
      {state?.error && <ErrorInputForm errMsg={state.error} />}
      { state?.success && state.data.verified ? (
        <div className="py-2 px-4 rounded-full bg-green-500/10 text-green-500">Verified</div>
      ) : pending ? (
        <div>Loading</div>
      ) : (
        <button className="bg-black/60 px-4 py-2 rounded-md cursor-pointer hover:bg-white/40 duration-300">Verify</button>
      )}
    </form>
  )
}