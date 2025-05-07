export default function RadioButton({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-x-2 cursor-pointer hover:bg-white/5 duration-300 p-2 rounded-md">
            <div className="border border-midnight-purple p-1 rounded-full flex items-center justify-center"><span className="size-3 bg-midnight-purple rounded-full"></span></div>
            <p>{text}</p>
        </div>
    )
}