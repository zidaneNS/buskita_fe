'use client';

import React, { HTMLInputTypeAttribute, useState } from "react";

export default function AddBusInputForm({ 
    name, 
    type, 
    title,
    placeholder,
    minValue,
    children,
    value
} : { 
    name: string, 
    type: HTMLInputTypeAttribute, 
    title: string,
    placeholder: string,
    minValue?: string | number,
    children?: React.ReactNode,
    value?: string | number
}) {
    const [inputVal, setInputVal] = useState<number | string | undefined>(value);
    return (
        <div className="flex flex-col gap-y-2 w-full">
            <label htmlFor={name} className="text-base md:text-lg font-semibold">{title} :</label>
            <input id={name} name={name} type={type} placeholder={placeholder} min={minValue} value={inputVal} onChange={(e) => setInputVal(e.target.value)} className="text-sm md:text-base bg-white text-black px-4 py-2 rounded-md" />
            {children}
        </div>
    )
}