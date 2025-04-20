import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function RouteDropdown() {
    return (
        <div className="w-full px-4 py-2 bg-gradient-end rounded-md items-center flex justify-between cursor-pointer hover:bg-gradient-end/70 duration-300">
            <button className="w-fit text-xs font-semibold">SBY - GSK</button>
            <ChevronRightIcon className="size-4" />
        </div>
    )
}