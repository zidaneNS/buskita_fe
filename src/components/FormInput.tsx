import { InputHTMLAttributes } from "react";

export default function FormInput({ id, attribute, type, placeholder }: { id: string, attribute: string, type: InputHTMLAttributes<HTMLInputElement>['type'], placeholder: string }) {
    return (
        <div className="flex flex-col gap-y-2 text-sm">
            <label htmlFor={id} >{attribute} :</label>
            <input id={id} type={type} required placeholder={placeholder} autoFocus autoComplete="off" className="px-4 py-2 rounded-md border border-dark-purple" />
        </div>
    )
}