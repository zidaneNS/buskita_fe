import { Schedule, Seat, User } from "@/lib/type";
import Image from "next/image";

export default function SeatDetail({
    schedule,
    user,
    selected,
    userSeat,
    isEditing,
    date
}: {
    schedule: Schedule,
    user: User,
    selected: number,
    userSeat: Seat,
    isEditing: boolean,
    date: string
}) {
    return (
        <div className="flex flex-col w-full gap-y-4 pt-8 pb-12 px-10 bg-gradient-end rounded-lg shadow-xl">
            <h1 className="font-semibold text-lg px-4">Booking Summary</h1>
            <span className="w-full border-b border-white"></span>
            <div className="flex gap-x-2 w-fit items-center">
                <Image
                    src="/assets/route-booking.png"
                    alt="route"
                    width={40}
                    height={44}
                />
                <div className="flex flex-col text-lg">
                    <p>Route</p>
                    <p className="font-bold">{schedule.route_name}</p>
                </div>
            </div>
            <p>Name : {user.name}</p>
            <p>Seat : {userSeat && !isEditing ? userSeat.seat_number : selected}</p>
            <p>Date : {date}</p>
        </div>
    )
}