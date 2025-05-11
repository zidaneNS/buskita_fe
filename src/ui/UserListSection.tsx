'use client';

import UserCard from "@/components/UserCard";
import userContext from "@/context/UserContext";
import { useContext } from "react";

export default function UserListSection() {
    const { users } = useContext(userContext);
    return (
        <section className="h-full overflow-y-auto pr-4 py-6 md:py-8 scrollbar-thin">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                {users.length > 0 ? 
                    users.map((user, i) => (
                        <UserCard key={i} user={user} />
                    )) : (
                        <div>No users</div>
                    )
                }
            </div>
        </section>
    )
}