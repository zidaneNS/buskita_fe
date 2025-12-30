'use client';

import Modal from "@/components/Modal";
import UserCreateForm from "@/components/UserCreateForm";
import { User } from "@/lib/type/user";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function UserHeadSection({ user }: { user: User }) {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    return (
        <section className="flex flex-col md:flex-row md:justify-between gap-y-3 w-full">
            {isCreating && user.role?.name === 'superadmin' && (
                <Modal>
                    <div className="flex flex-col gap-y-4 max-h-4/5 w-4/5 md:w-1/3 rounded-md py-4 px-6 bg-dark-purple shadow-xl overflow-y-auto schrollbar-thin">
                        <h1 className="text-2xl font-semibold">Add Co</h1>
                        <p className="text-sm text-slate-300">Add user with co role to manage application</p>
                        <UserCreateForm />
                        <button onClick={() => setIsCreating(false)} className="py-2 w-full rounded-md border border-gray-400 cursor-pointer hover:bg-gray-400 duration-300">Cancel</button>
                    </div>
                </Modal>
            )}
            <h1 className="text-xl md:text-3xl font-bold">Users</h1>
            {user.role?.name === 'superadmin' && (
                <button onClick={() => setIsCreating(true)} className="py-3 px-4 rounded-md bg-midnight-purple hover:bg-white hover:text-black cursor-pointer duration-300 flex gap-x-2 items-center w-fit">
                    <IoMdAdd className="size-5" />
                    <p className="text-sm">Add User</p>
                </button>
            )}
        </section>
    )
}