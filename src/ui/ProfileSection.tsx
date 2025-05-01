'use client';

import ProfileDetail from "@/components/ProfileDetail";
import { User } from "@/lib/type";
import { useState } from "react";

export default function ProfileSection({ user }: { user: User }) {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    return (
        <form className="w-full flex flex-col gap-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-4 w-full min-h-full">
                <ProfileDetail isEditing={isEditing} setIsEditing={setIsEditing} attribute="NIM / NIP" value={user.nim_nip} />
                <ProfileDetail isEditing={isEditing} setIsEditing={setIsEditing} attribute="Name" value={user.name} />
                <ProfileDetail isEditing={isEditing} setIsEditing={setIsEditing} attribute="Email" value={user.email} />
                <ProfileDetail isEditing={isEditing} setIsEditing={setIsEditing} attribute="Address" value={user.address} />
                <ProfileDetail isEditing={isEditing} setIsEditing={setIsEditing} attribute="Phone" value={user.phone_number} />
                <ProfileDetail isEditing={isEditing} setIsEditing={setIsEditing} attribute="Credit Score" value={user.credit_score} />
                <ProfileDetail isEditing={isEditing} setIsEditing={setIsEditing} attribute="Role" value={user.role_name} />
            </div>
            {isEditing && (
                <div className="flex w-full gap-x-4 items-center">
                    <button type="submit" className="w-full py-3 bg-midnight-purple shadow-xl rounded-md cursor-pointer hover:bg-white hover:text-black duration-300">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="w-full py-3 border border-white shadow-xl rounded-md cursor-pointer hover:bg-slate-600 hover:border-slate-600 duration-300">Cancel</button>
                </div>
            )}
        </form>
    )
}