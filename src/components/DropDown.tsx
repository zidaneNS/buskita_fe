'use client';

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function DropDown({ items }: { items: (string | number)[]}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string | number>(items[0]);

    const handleClickItem = (item: string | number) => {
        setSelectedItem(item);
        setIsOpen(false);
    }
    
    return (
        <div className="relative w-full">
            <div onClick={() => setIsOpen(prev => !prev)} className="w-full px-4 py-2 bg-gradient-end rounded-md items-center flex justify-between cursor-pointer hover:bg-gradient-end/70 duration-300">
                <button className="w-fit text-xs font-semibold">{selectedItem}</button>
                <ChevronRightIcon className={`size-4 duration-300 ${isOpen ? "rotate-90" : "" }`} />
            </div>
            <div className={`absolute top-full mt-2 bg-gradient-end w-full rounded-md flex flex-col gap-y-3 p-2 origin-top duration-300 ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}`}>
                {items.map((item,i) => (
                    <div onClick={() => handleClickItem(item)} className="px-4 py-2 bg-dark-purple w-full rounded-md text-xs text-center hover:bg-white/20 cursor-pointer duration-300">
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}