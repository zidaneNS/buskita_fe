import React, { InputHTMLAttributes } from "react";

export default function FormInput({ id, attribute, type, placeholder, children }: { id: string, attribute: string, type: InputHTMLAttributes<HTMLInputElement>['type'], placeholder: string, children?: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-y-2 text-sm w-full">
            <label htmlFor={id} >{attribute} :</label>
            <input id={id} type={type} name={id} required placeholder={placeholder} autoFocus autoComplete="off" className="px-4 py-2 rounded-md bg-white text-black border border-black" />
            {children}
        </div>
    )
}