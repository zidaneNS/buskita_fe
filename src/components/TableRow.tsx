export default function TableRow() {
    return (
        <tr className={`bg-black/30 text-xs md:text-sm`}>
            <td className="py-3 border border-white/10">
                <div className="flex flex-col w-full items-center">
                    <p>01:00 - 02:00</p>
                    <p className="text-center">10 december 2025</p>
                </div>
            </td>
            <td className="py-3 border border-white/10 text-center">08</td>
            <td className="py-3 border border-white/10 text-center">SBY-GSK</td>
            <td className="py-3 border border-white/10 text-center">Open</td>
            <td className="py-3 border border-white/10">
                <div className="w-full flex flex-col md:flex-row justify-center gap-y-2 md:gap-x-3 py-2 md:px-0 px-2">
                    <button className="md:py-2 md:px-4 px-2 py-1 rounded-md text-xs md:text-sm bg-green-500 cursor-pointer hover:bg-green-300 duration-300">Edit</button>
                    <button className="md:py-2 md:px-4 px-2 py-1 rounded-md text-xs md:text-sm bg-red-500 cursor-pointer hover:bg-red-300 duration-300">Delete</button>
                </div>
            </td>
        </tr>
    )
}