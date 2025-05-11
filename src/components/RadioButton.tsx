import { RadioRoleType } from "@/ui/UserFilterSection";
import { Dispatch, SetStateAction } from "react";

export default function RadioButton({ value, role, setRole }: { value: RadioRoleType, role: RadioRoleType, setRole: Dispatch<SetStateAction<RadioRoleType>> }) {
    return (
        <button onClick={() => setRole(value)} className="flex items-center gap-x-2 cursor-pointer hover:bg-white/5 duration-300 p-2 rounded-md">
            <div className="border border-midnight-purple p-1 rounded-full flex items-center justify-center"><span className={`size-3 ${role === value ? "bg-midnight-purple" : "bg-transparent"} rounded-full`}></span></div>
            <p>{value}</p>
        </button>
    )
}