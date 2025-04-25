export default function ErrorInputForm({ errMsg }: { errMsg: string | string[] }) {
    return <p className="text-xs text-red-500 p-2 rounded-md bg-red-200/60">{errMsg}</p>
}