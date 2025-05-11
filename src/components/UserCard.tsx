import { User } from "@/lib/type";
import { FaRegUserCircle } from "react-icons/fa";

export default function UserCard({ user }: { user: User }) {
    const roleColors = user.role_name === "passenger" ? "text-yellow-600 bg-yellow-600/15" : user.role_name === "co" ? "text-green-600 bg-green-600/15" : "text-red-600 bg-red-600/15"
    return (
        <div className="w-full flex flex-col px-6 py-4 rounded-lg bg-black/40 border border-dark-purple hover:-translate-y-3 duration-300 cursor-pointer gap-y-3">
            <div className="flex items-center gap-x-3">
                <FaRegUserCircle className="size-12" />
                <div className="flex flex-col gap-y-2">
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-sm">{user.nim_nip}</p>
                    <p className="text-sm">{user.email}</p>
                </div>
            </div>
            <p className={`text-xs ${roleColors} py-2 px-4 rounded-full w-fit`}>{user.role_name}</p>
        </div>
    )
}