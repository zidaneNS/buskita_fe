'use cleint';

import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import Modal from "./Modal";
import { MdClose } from "react-icons/md";
import { User } from "@/lib/type/user";

export default function UserCard({ user }: { user: User }) {
    const roleColors = user.role?.name === "user" ? "text-yellow-600 bg-yellow-600/15" : user.role?.name === "admin" ? "text-green-600 bg-green-600/15" : "text-red-600 bg-red-600/15";

    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <>
            {isOpen && (
                <Modal>
                    <div className="flex flex-col gap-y-8 max-h-4/5 overflow-y-auto scrollbar-thin w-4/5 md:w-2/3 rounded-lg shadow-xl py-4 px-6 bg-dark-purple">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col gap-y-2">
                                <h1 className="text-2xl font-semibold">User Details</h1>
                                <p className="text-sm text-slate-300">Detailed information about user</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="flex justify-center items-center p-2 rounded-xl border-2 border-slate-400 cursor-pointer hover:bg-white/15 duration-300">
                                <MdClose className="size-4 md:size-6" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="flex flex-col gap-y-2 p-2 rounded-md border border-white/30">
                                <p>Name:</p>
                                <p className="font-semibold">{user.name}</p>
                            </div>
                            <div className="flex flex-col gap-y-2 p-2 rounded-md border border-white/30">
                                <p>NIM / NIP:</p>
                                <p className="font-semibold">{user.userId}</p>
                            </div>
                            <div className="flex flex-col gap-y-2 p-2 rounded-md border border-white/30">
                                <p>Email:</p>
                                <p className="font-semibold">{user.email}</p>
                            </div>
                            <div className="flex flex-col gap-y-2 p-2 rounded-md border border-white/30">
                                <p>Address:</p>
                                <p className="font-semibold">{user.address}</p>
                            </div>
                            <div className="flex flex-col gap-y-2 p-2 rounded-md border border-white/30">
                                <p>Phone :</p>
                                <p className="font-semibold">{user.phoneNumber}</p>
                            </div>
                            <div className="flex flex-col gap-y-2 p-2 rounded-md border border-white/30">
                                <p>Credit Score :</p>
                                <p className="font-semibold">{user.creditScore}</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
            <div onClick={() => setIsOpen(true)} className="w-full flex flex-col px-6 py-4 rounded-lg bg-black/40 border border-dark-purple hover:-translate-y-3 duration-300 cursor-pointer gap-y-3">
                <div className="flex items-center gap-x-3">
                    <FaRegUserCircle className="size-12" />
                    <div className="flex flex-col gap-y-2">
                        <h2 className="text-xl font-bold">{user.name}</h2>
                        <p className="text-sm">{user.userId}</p>
                        <p className="text-sm">{user.email}</p>
                    </div>
                </div>
                <p className={`text-xs ${roleColors} py-2 px-4 rounded-full w-fit`}>{user.role?.name}</p>
            </div>
        </>
    )
}