export default function UpdateSeatForm({
    updateAction
}: {
    updateAction: () => void
}) {
    return (
        <form action={updateAction} className="w-fit">
            <button type="submit" className="bg-green-800 py-2 px-6 rounded-md hover:bg-white hover:text-black cursor-pointer duration-300">Update</button>
        </form>
    )
}