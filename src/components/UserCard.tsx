import { FaRegUserCircle } from "react-icons/fa";

export default function UserCard() {
    return (
        <div className="w-full flex flex-col px-6 py-4 rounded-lg bg-black/40 border border-dark-purple hover:-translate-y-3 duration-300 cursor-pointer gap-y-3">
            <div className="flex items-center gap-x-3">
                <FaRegUserCircle className="size-12" />
                <div className="flex flex-col gap-y-2">
                    <h2 className="text-xl font-bold">Zidane</h2>
                    <p className="text-sm">181221055</p>
                    <p className="text-sm">zidane@gmail.com</p>
                </div>
            </div>
            <p className="text-xs text-yellow-600 bg-yellow-600/15 py-2 px-4 rounded-full w-fit">Passenger</p>
        </div>
    )
}