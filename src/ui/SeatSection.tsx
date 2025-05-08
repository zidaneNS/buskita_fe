'use client';

import { Bus, Seat, User } from "@/lib/type";
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

    const row = bus.available_row;
    const col = bus.available_col;
    const backseat = bus.available_backseat;

    const sortedSeats = seats.sort((a, b) => parseInt(a.seat_number as string) - parseInt(b.seat_number as string));

    const seatsUserId = seats.filter(seat => seat.user_id !== null).map(seat => seat.user_id);

    const handleClick = (seat: Seat) => {
        if (!seat.user_id && !seatsUserId.includes(user.id) || isEditing) {
            setSelected(seat.seat_number as number);
            setSeatId(seat.id);
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
                                colStart = j + Math.floor(backseat/3);
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
                        className={`p-2 hover:bg-lime-400 duration-300 cursor-pointer text-black text-sm text-center rounded-md col-start-${colStart} ${selected == index && !seat.user_id ? "bg-lime-400" : seat.user_id ? "bg-teal-700" : "bg-white"}`}
                    >
                        {seat.seat_number}
                    </span>
                )
            })}
        </div>
    )
}