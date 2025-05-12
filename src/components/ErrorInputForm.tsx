export default function ErrorInputForm({ errMsg }: { errMsg: string | string[] }) {
    return <p className="text-red-500 p-2 font-semibold rounded-md bg-red-500/10">{errMsg}</p>
}