import Link from "next/link";
import { FaTelegramPlane } from "react-icons/fa";

export default function Page() {
    return (
        <main className="h-screen flex flex-col justify-center items-center">
            <div className="w-64 flex flex-col items-center gap-y-3">
                <Link href="#" className="w-fit flex gap-x-3 items-center py-2 px-4 rounded-md bg-blue-700 text-white cursor-pointer hover:bg-white hover:text-black duration-300">
                    <FaTelegramPlane className="size-8" />
                    <p>Join on Telegram</p>
                </Link>
                <p className="">Harusnya bisa redirect ke grup telegram tapi takut dimarahin share grup sembarangan jadi UI aja HEHEHE</p>
            </div>
        </main>
    )
}