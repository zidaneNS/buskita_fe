import FormInput from "@/components/FormInput";
import { Dispatch, SetStateAction } from "react";
import { MdClose } from "react-icons/md";

export default function AuthModal({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) {
    return (
        <div className={`fixed inset-0 bg-black/80 z-20 items-center justify-center flex duration-200 backdrop-blur-sm ${isOpen ? "scale-100" : "scale-0"}`}>
            <form className={`bg-white px-6 py-4 rounded-xl flex flex-col gap-y-3 text-black relative`}>
                <MdClose onClick={() => setIsOpen(false)} className="absolute size-8 top-0 -translate-12 text-white cursor-pointer hover:rotate-180 duration-700" />
                <h1 className="text-2xl text-dark-purple font-bold pb-2 border-b border-dark-purple">Register</h1>
                <FormInput id="nim_nip" attribute="NIM / NIP" type="text" placeholder="181221..." />
                <FormInput id="name" attribute="Nama" type="text" placeholder="John Doe" />
                <div className="flex gap-x-4">
                    <div className="flex flex-col gap-y-2">
                        <FormInput id="phone_number" attribute="No. Hp" type="text" placeholder="08xxx" />
                        <FormInput id="address" attribute="Alamat" type="text" placeholder="Jl. Tralalelo Tralala" />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <FormInput id="password" attribute="Password" type="password" placeholder="min 6 characters" />
                        <FormInput id="password_confirmation" attribute="Confirm Password" type="password" placeholder="Confirm your password here" />
                    </div>
                </div>
                <button className="bg-midnight-purple py-2 rounded-lg text-sm font-semibold text-white cursor-pointer hover:bg-midnight-purple/60 duration-300">Submit</button>
            </form>
        </div>
    )
}