import GenerateKeyForm from "@/components/GenerateKeyForm";
import { getKey } from "@/lib/action";
import { HiQrcode } from "react-icons/hi";

export default async function Page() {
  const publicKey = await getKey();
  return (
    <main className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 justify-between h-screen w-full px-8 py-6 md:px-10 md:py-8 gap-x-12 overflow-y-auto">
      <GenerateKeyForm />

      <div className="flex flex-col flex-1 md:w-1/3 w-full gap-y-8">
        <h2 className="text-3xl font-semibold text-center">Current encryption key</h2>
        <div className="w-full flex gap-x-8 items-center">
          <div className="flex flex-col w-full gap-y-2">
            <label htmlFor="eValue">E Value:</label>
            <input type="number" id="eValue" value={publicKey?.eValue || 0} readOnly className="outline-none bg-black/40 w-full px-4 py-3 rounded-md" />
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <label htmlFor="nValue">N Value:</label>
            <input type="number" id="nValue" value={publicKey?.nValue || 0} readOnly className="outline-none bg-black/40 w-full px-4 py-3 rounded-md" />
          </div>
        </div>
        <form action="" className="flex flex-col gap-y-4 w-full">
          <h2 className="text-3xl font-semibold text-center">Trial</h2>
          <div className="flex flex-col w-full gap-y-2">
            <label htmlFor="plaintext">Plaintext:</label>
            <input type="text" id="plaintext" className="outline-none bg-black/40 w-full px-4 py-3 rounded-md" />
          </div>
          <button className="w-full bg-purple-900 py-2 text-center rounded-md cursor-pointer hover:bg-white hover:text-dark-purple duration-300">Generate QR Code</button>
        </form>
        <form action="" className="flex flex-col gap-y-4 w-full items-center">
          <HiQrcode className="size-32 text-white/30" />
          <button className="w-full bg-purple-900 py-2 text-center rounded-md cursor-pointer hover:bg-white hover:text-dark-purple duration-300">Get decrypted data</button>
        </form>
        <p className="px-4 bg-black/40 py-2 rounded-md w-full">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi enim adipisci est eum id sint consectetur doloribus molestiae commodi veniam.</p>
      </div>
    </main>
  )
}