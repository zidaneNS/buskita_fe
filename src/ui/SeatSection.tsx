'use client';

import { Bus } from "@/lib/type/bus";
import { Seat } from "@/lib/type/seat";
import { User } from "@/lib/type/user";
import { Dispatch, SetStateAction } from "react";

export default function SeatSection({ 
        selected, 
        setSelected, 
        seats, 
        bus,
        setSeatId,
        user,
        isEditing
    } : { 
        selected: number, 
        setSelected: Dispatch<SetStateAction<number>>, 
        seats: Seat[], 
        bus: Bus,
        setSeatId: Dispatch<SetStateAction<string | number | null>>,
        user: User,
        isEditing: boolean
    }) {

    const row = bus.totalRow;
    const col = bus.totalCol;
    const backseat = bus.totalBackseat;

    const sortedSeats = seats.sort((a, b) => a.seatNumber - b.seatNumber);

    const seatsUserId = seats.filter(seat => seat.user?.name !== null).map(seat => seat.user?.name);

    const handleClick = (seat: Seat) => {
        if (!seat.user?.name && !seatsUserId.includes(user.name) || isEditing) {
            setSelected(seat.seatNumber as number);
            setSeatId(seat.seatId);
        }
    }

    return (
        <div className={`w-full grid grid-cols-${backseat} gap-2`}>
            {sortedSeats.map((seat, i) => {
                const index = i + 1;
                let colStart = index;
                if (index <= col * row) {
                    for (let j = 1; j <= col; j++) {
                        if (j <= col/2) {
                            if (index % col === j) {
                                colStart = j;
                                break;
                            }
                        } else if (j > col/2 && j < col) {
                            if (index % col === j) {
                                colStart = j + backseat - col;
                                break;
                            }
                        } else {
                            if (index % col === 0) {
                                colStart = backseat;
                                break;
                            }
                        }
                    }
                }
                return (
                    <span 
                        key={i} 
                        onClick={() => handleClick(seat)} 
                        className={`p-2 hover:bg-lime-400 duration-300 cursor-pointer text-black text-sm text-center rounded-md col-start-${colStart} ${selected == index && !seat.user?.name ? "bg-lime-400" : seat.user?.name ? "bg-teal-700" : "bg-white"}`}
                    >
                        {seat.seatNumber}
                    </span>
                )
            })}
        </div>
    )
}