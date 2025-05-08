import React, { HTMLInputTypeAttribute } from "react";

export default function AddBusInputForm({ 
    name, 
    type, 
    title,
    placeholder,
    minValue,
    children
} : { 
    name: string, 
    type: HTMLInputTypeAttribute, 
    title: string,
    placeholder: string,
    minValue?: string | number,
    children?: React.ReactNode
}) {
    return (
        <div className="flex flex-col gap-y-2 w-full">
            <label htmlFor={name} className="text-base md:text-lg font-semibold">{title} :</label>
            <input id={name} name={name} type={type} placeholder={placeholder} min={minValue} className="text-sm md:text-base bg-white text-black px-4 py-2 rounded-md" />
            {children}
        </div>
    )
}