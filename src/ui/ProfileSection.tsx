'use client';

import ErrorInputForm from "@/components/ErrorInputForm";
import ProfileDetail from "@/components/ProfileDetail";
import { editProfile } from "@/lib/formAction";
import { User } from "@/lib/type";
import { useActionState, useEffect, useState } from "react";

export default function ProfileSection({ user }: { user: User }) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [state, action, pending] = useActionState(editProfile, undefined);

    useEffect(() => {
        if (state?.success) {
            if (state.success) setIsEditing(false);
        }
    }, [state, setIsEditing]);
    return (
        <div className="w-full flex flex-col gap-y-4">
            <form action={action} className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-4 w-full min-h-full">
                {/* <input type="hidden" name="id" value={user.userId} /> */}
                <ProfileDetail isEditing={isEditing} type="text" name="nim_nip" setIsEditing={setIsEditing} attribute="NIM / NIP" value={user.userId}>
                {state?.errors?.nim_nip && <ErrorInputForm errMsg={state.errors.nim_nip} />}
                </ProfileDetail>
                <ProfileDetail isEditing={isEditing} type="text" name="name" setIsEditing={setIsEditing} attribute="Name" value={user.name}>
                    {state?.errors?.name && <ErrorInputForm errMsg={state.errors.name} />}
                </ProfileDetail>
                <ProfileDetail isEditing={isEditing} type="email" name="email" setIsEditing={setIsEditing} attribute="Email" value={user.email}>
                    {state?.errors?.email && <ErrorInputForm errMsg={state.errors.email} />}
                </ProfileDetail>
                <ProfileDetail isEditing={isEditing} type="text" name="address" setIsEditing={setIsEditing} attribute="Address" value={user.address}>
                    {state?.errors?.address && <ErrorInputForm errMsg={state.errors.address} />}
                </ProfileDetail>
                <ProfileDetail isEditing={isEditing} type="text" name="phone_number" setIsEditing={setIsEditing} attribute="Phone" value={user.phoneNumber}>
                    {state?.errors?.phone_number && <ErrorInputForm errMsg={state.errors.phone_number} />}
                </ProfileDetail>
                <ProfileDetail isEditing={isEditing} type="text" setIsEditing={setIsEditing} attribute="Credit Score" value={user.creditScore} />
                <ProfileDetail isEditing={isEditing} type="text" setIsEditing={setIsEditing} attribute="Role" value={user.role?.name || ''} />
                {state?.error && <ErrorInputForm errMsg={state.error} />}
                {pending ? (
                    <div className="w-full md:col-span-2 text-center">Loading...</div>
                ) : isEditing && (
                    <button type="submit" className="w-full md:col-span-2 py-3 bg-midnight-purple shadow-xl rounded-md cursor-pointer hover:bg-white hover:text-black duration-300">Save</button>
                )}
            </form>
            {isEditing && (
                <div className="flex w-full gap-x-4 items-center">
                    <button type="button" onClick={() => setIsEditing(false)} className="w-full py-3 border border-white shadow-xl rounded-md cursor-pointer hover:bg-slate-600 hover:border-slate-600 duration-300">Cancel</button>
                </div>
            )}
        </div>
    )
}