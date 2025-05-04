'use client';

import { MdClose } from "react-icons/md";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useActionState, useEffect } from "react";
import FormInput from "@/components/FormInput";
import { signin } from "@/lib/auth";
import ErrorInputForm from "@/components/ErrorInputForm";
import Loader from "@/components/Loader";

export default function LoginForm({ setIsLogin }: { setIsLogin: Dispatch<SetStateAction<boolean>> }) {
    const router = useRouter();
    const [state, action, pending] = useActionState(signin, undefined);

    useEffect(() => {
        if (state?.success) {
            if (state.success) router.back();
        }
    }, [state, router]);

    return (
        <form action={action} className={`bg-white px-6 py-4 rounded-xl flex flex-col gap-y-3 text-black relative`}>
            <MdClose onClick={() => router.back()} className="absolute size-8 top-0 -translate-12 text-white cursor-pointer hover:rotate-180 duration-700" />
            <h1 className="text-2xl text-dark-purple font-bold pb-2 border-b border-dark-purple">Login</h1>
            <FormInput id="nim_nip" attribute="NIM / NIP" type="text" placeholder="181221..." />
            {state?.errors?.nim_nip && <ErrorInputForm errMsg={state.errors.nim_nip} />}
            <FormInput id="password" attribute="Password" type="password" placeholder="Input your password here" />
            {state?.errors?.password && <ErrorInputForm errMsg={state.errors.password} />}
            {state?.message && <ErrorInputForm errMsg={state.message} />}
            <p onClick={() => setIsLogin(false)} className="text-midnight-purple cursor-pointer hover:underline text-xs">Not have any account ? sign up here</p>
            
            {pending ? (
                <Loader />
            ) : (
                <button className="bg-midnight-purple py-2 rounded-lg text-sm font-semibold text-white cursor-pointer hover:bg-midnight-purple/60 duration-300">Submit</button>
            )}
        </form>
    )
}