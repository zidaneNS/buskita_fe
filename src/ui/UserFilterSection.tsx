'use client';

import RadioButton from "@/components/RadioButton";
import userContext from "@/context/UserContext";
import { User } from "@/lib/type";
import { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

export type RadioRoleType = "all" | "co" | "passenger"

export default function UserFilterSection({ initUsers }: { initUsers: User[] }) {
    const { setUsers } = useContext(userContext);
    const radioValues: RadioRoleType[] = ['all', 'co', 'passenger'];

    const [term, setTerm] = useState<string>("");
    const [role, setRole] = useState<RadioRoleType>('all');

    useEffect(() => {
        if (term.length > 0) {
            setUsers(initUsers.filter(user => user.name.toLowerCase().includes(term.toLocaleLowerCase()) ||
            user.email.toLowerCase().includes(term.toLowerCase()) ||
            user.role_name.toLowerCase().includes(term.toLowerCase()) ||
            user.nim_nip.toLowerCase().includes(term.toLowerCase())));
            if (role !== 'all') {
                setUsers(initUsers.filter(user => user.role_name.toLowerCase() === role.toLowerCase()));
            }
        } else {
            if (role !== 'all') {
                setUsers(initUsers.filter(user => user.role_name.toLowerCase() === role.toLowerCase()));
            } else {
                setUsers(initUsers);
            }
        }

    }, [term, setUsers, role, initUsers]);

    return (
        <section className="flex flex-col md:flex-row gap-y-2 w-full md:gap-x-2">
            <div className="flex flex-1 items-center w-full bg-black/30 border border-dark-purple py-2 px-4 gap-x-3 rounded-md">
                <CiSearch className="size-6" />
                <input type="text" name="search" placeholder="Search users..." onChange={(e) => setTerm(e.target.value)} value={term} className="py-1 w-full flex-1 outline-none" />
            </div>
            <div className="flex gap-x-3 items-center">
                {radioValues.map((value, i) => (
                    <RadioButton value={value} key={i} role={role} setRole={setRole} />
                ))}
            </div>
        </section>
    )
}