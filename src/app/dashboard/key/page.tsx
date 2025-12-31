import { HiQrcode } from "react-icons/hi";

export default function Page() {
  return (
    <main className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 justify-between h-screen w-full px-8 py-6 md:px-10 md:py-8 gap-x-12 overflow-y-auto">
      <div className="flex flex-col flex-1 md:w-1/3 w-full gap-y-8">
        <h2 className="text-3xl font-semibold text-center">Generate new encryption key</h2>
        <form action="" className="w-full flex-col gap-y-4 flex">
          <div className="flex flex-col w-full gap-y-2">
            <label htmlFor="pValue">P Value:</label>
            <input type="number" id="pValue" placeholder="input prime value" className="outline-none bg-black/40 w-full px-4 py-3 rounded-md" />
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <label htmlFor="qValue">Q Value:</label>
            <input type="number" id="qValue" placeholder="input prime value" className="outline-none bg-black/40 w-full px-4 py-3 rounded-md" />
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <label htmlFor="total">Total:</label>
            <input type="number" id="total" placeholder="total key options" className="outline-none bg-black/40 w-full px-4 py-3 rounded-md" />
          </div>
          <button className="w-full bg-purple-900 py-2 text-center rounded-md cursor-pointer hover:bg-white hover:text-dark-purple duration-300">Submit</button>
        </form>
        <form action="" className="flex flex-col gap-y-4 w-full">
          <div className="flex flex-col w-full">
            <label htmlFor="eValue">E Value:</label>
            <select className="outline-none bg-black/40 w-full px-4 py-3 rounded-md">
              <option value="">Select E Values</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <button className="w-full bg-white/90 text-dark-purple py-2 text-center rounded-md cursor-pointer hover:bg-white/30 hover:text-white duration-300">Generate key</button>
        </form>
      </div>

      <div className="flex flex-col flex-1 md:w-1/3 w-full gap-y-8">
        <h2 className="text-3xl font-semibold text-center">Current encryption key</h2>
        <div className="w-full flex gap-x-8 items-center">
          <div className="flex flex-col w-full gap-y-2">
            <label htmlFor="eValue">E Value:</label>
            <input type="number" id="eValue" value={20} readOnly className="outline-none bg-black/40 w-full px-4 py-3 rounded-md" />
          </div>
          <div className="flex flex-col w-full gap-y-2">
            <label htmlFor="nValue">N Value:</label>
            <input type="number" id="nValue" value={20} readOnly className="outline-none bg-black/40 w-full px-4 py-3 rounded-md" />
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