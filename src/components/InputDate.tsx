import { CalendarIcon } from "@heroicons/react/24/outline";

export default function InputDate() {
    return (
        <div className="w-full flex px-6 py-2 bg-gradient-end rounded-md items-center justify-between cursor-pointer hover:bg-gradient-end/70 duration-300">
            <button className="w-fit text-xs font-semibold">01/12/24</button>
            <CalendarIcon className="size-4" />
        </div>
    )
}