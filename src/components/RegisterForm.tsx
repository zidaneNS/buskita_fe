'use client';

import { MdClose } from "react-icons/md";
import FormInput from "./FormInput";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useActionState } from "react";
import { signup } from "@/lib/action";
import ErrorInputForm from "./ErrorInputForm";

export default function RegisterForm({ setIsLogin }: { setIsLogin: Dispatch<SetStateAction<boolean>> }) {
    const router = useRouter();
    const [state, action, pending] = useActionState(signup, undefined);

    return (
        <div className="flex flex-col gap-y-3">
            <MdClose onClick={() => router.back()} className="size-8 text-white cursor-pointer hover:rotate-180 duration-700" />
            <form action={action} className={`bg-white px-6 py-4 rounded-xl flex flex-col gap-y-3 text-black relative max-h-[80vh] overflow-y-auto`}>
                <h1 className="text-2xl text-dark-purple font-bold pb-2 border-b border-dark-purple">Register</h1>
                <div className="flex gap-x-4">
                    <div className="flex flex-col gap-y-2">
                        <FormInput id="nim_nip" attribute="NIM / NIP" type="text" placeholder="181221..." />
                        {state?.errors.nim_nip && <ErrorInputForm errMsg={state.errors.nim_nip} />}
                        <FormInput id="name" attribute="Nama" type="text" placeholder="John Doe" />
                        {state?.errors.name && <ErrorInputForm errMsg={state.errors.name} />}
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <FormInput id="phone_number" attribute="No. Hp" type="text" placeholder="08xxx" />
                        {state?.errors.phone_number && <ErrorInputForm errMsg={state.errors.phone_number} />}
                        <FormInput id="address" attribute="Alamat" type="text" placeholder="Jl. Tralalelo Tralala" />
                        {state?.errors.address && <ErrorInputForm errMsg={state.errors.address} />}
                    </div>
                </div>
                <FormInput id="password" attribute="Password" type="password" placeholder="min 6 characters" />
                {state?.errors.password && <ErrorInputForm errMsg={state.errors.password} />}
                <FormInput id="password_confirmation" attribute="Confirm Password" type="password" placeholder="Confirm your password here" />
                {state?.errors.password_confirmation && <ErrorInputForm errMsg={state.errors.password_confirmation} />}
                <p onClick={() => setIsLogin(true)} className="text-midnight-purple cursor-pointer hover:underline text-xs">Already have an account ? sign in here</p>
                <button disabled={pending} type="submit" className="bg-midnight-purple py-2 rounded-lg text-sm font-semibold text-white cursor-pointer hover:bg-midnight-purple/60 duration-300">Submit</button>
            </form>
        </div>
    )
}