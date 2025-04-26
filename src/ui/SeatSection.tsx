'use client';

import { Dispatch, SetStateAction } from "react";

export default function SeatSection({ selected, setSelected }: { selected: number, setSelected: Dispatch<SetStateAction<number>> }) {
    
    return (
        <div className="w-full grid grid-cols-6 gap-2">
            {[...Array.from({length: 30})].map((_, i) => {
                const index = i + 1;
                const colStart = index <= 24 ?
                    index % 4 === 1 ? 1 :
                    index % 4 === 2 ? 2 :
                    index % 4 === 3 ? 5 :
                    index % 4 === 0 ? 6 :
                    index : index;
                return (
                    <div key={i} onClick={() => setSelected(index)} className={`p-2 hover:bg-lime-400 duration-300 cursor-pointer text-black text-sm text-center rounded-md col-start-${colStart} ${selected === index ? "bg-lime-400" : "bg-white"}`}>
                        {index}
                    </div>
                )
            })}
        </div>
    )
}