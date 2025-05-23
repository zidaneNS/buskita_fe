'use client';

import React, { Dispatch, InputHTMLAttributes, ReactNode, SetStateAction, useState } from "react"
import { FaEdit } from "react-icons/fa";

export default function ProfileDetail({ 
    attribute, 
    value, 
    isEditing, 
    setIsEditing,
    name,
    type,
    children
    }: { 
    attribute: string, 
    value: string | number,
    isEditing: boolean,
    setIsEditing: Dispatch<SetStateAction<boolean>>,
    name?: string,
    type: InputHTMLAttributes<HTMLInputElement>['type'],
    children?: ReactNode
    }) {
    const [content, setContent] = useState<string | number>(value);
    const isChangeable = attribute !== 'Credit Score' && attribute !== 'Role';
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isChangeable) setContent(e.target.value);
    }
    return (
        <div className="flex flex-col w-full gap-y-3">
            <label className="text-xl font-semibold">{attribute} :</label>
            <div className="px-2 md:px-4 py-1 md:py-2 bg-black/30 border border-dark-purple shadow-xl rounded-md w-full flex gap-x-3 items-center">
                <input type={type} name={name} className={`text-base md:text-lg outline-none rounded-md px-4 py-2 w-full ${isEditing && isChangeable ? "border border-white/30": "border-none"}`} value={content} onChange={(e) => handleInput(e)} readOnly={!isEditing} autoFocus={isEditing} />
                {isChangeable && <FaEdit onClick={() => setIsEditing(true)} className="size-6 cursor-pointer rounded duration-300"/>}
            </div>
            {children}
        </div>
    )
}