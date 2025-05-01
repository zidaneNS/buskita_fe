export default function ProfileDetail({ attribute, value }: { attribute: string, value: string | number }) {
    return (
        <div className="flex flex-col w-full gap-y-3">
            <h2 className="text-xl font-semibold">{attribute} :</h2>
            <div className="px-4 py-2 bg-black/20 border border-dark-purple shadow-xl rounded-md w-full">
                <p className="text-lg">{value}</p>
            </div>
        </div>
    )
}