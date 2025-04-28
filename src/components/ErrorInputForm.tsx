export default function ErrorInputForm({ errMsg }: { errMsg: string | string[] }) {
    return <p className="text-sm text-red-500 p-2 font-semibold rounded-md bg-red-100/50">{errMsg}</p>
}