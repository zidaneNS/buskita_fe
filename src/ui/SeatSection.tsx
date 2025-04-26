'use client';

import { Bus, Seat } from "@/lib/type";
import { Dispatch, SetStateAction } from "react";

export default function SeatSection({ selected, setSelected, seats, bus }: { selected: number, setSelected: Dispatch<SetStateAction<number>>, seats: Seat[], bus: Bus }) {
    const row = bus.available_row;
    const col = bus.available_col;
    const backseat = bus.available_backseat;

    return (
        <div className="w-full grid grid-cols-6 gap-2">
            {seats.map((seat, i) => {
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
                                colStart = j + col/2;
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
                    <div key={i} onClick={() => setSelected(seat.seat_number)} className={`p-2 hover:bg-lime-400 duration-300 cursor-pointer text-black text-sm text-center rounded-md col-start-${colStart} ${selected == index && !seat.user_id ? "bg-lime-400" : seat.user_id ? "bg-teal-700" : "bg-white"}`}>
                        {index}
                    </div>
                )
            })}
        </div>
    )
}