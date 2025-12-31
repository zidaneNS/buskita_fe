'use client';

import { getCipher, getPlain } from "@/lib/formAction";
import { useActionState, useEffect, useState } from "react";
import { HiQrcode } from "react-icons/hi";
import ErrorInputForm from "./ErrorInputForm";
import QRCode from "react-qr-code";

export interface TrialEncryptFormProps {
  eValue?: number;
  nValue?: number;
}

export default function TrialEncryptForm({
  eValue,
  nValue,
}: TrialEncryptFormProps) {
  const [plaintext, setPlaintext] = useState<string>('');
  const [ciphertext, setCiphertext] = useState<string | null>(null);
  const [decrypted, setDecrypted] = useState<string | null>(null);

  const [state, action, pending] = useActionState(getCipher, undefined);
  const [decryptState, decryptAction, decryptPending] = useActionState(getPlain, undefined);

  useEffect(() => {
    if (state?.success && state.data) {
      setCiphertext(state.data)
    }
  }, [state]);

  useEffect(() => {
    if (decryptState?.success && decryptState.data) {
      setDecrypted(decryptState.data);
    }
  }, [decryptState]);

  return (
    <div className="flex flex-col flex-1 md:w-1/3 w-full gap-y-8 pb-8">
      <h2 className="text-3xl font-semibold text-center">Current encryption key</h2>
      <div className="w-full flex gap-x-8 items-center">
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="eValue">E Value:</label>
          <input type="number" id="eValue" defaultValue={eValue} readOnly className="outline-none bg-black/40 w-full px-4 py-3 rounded-md" />
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="nValue">N Value:</label>
          <input type="number" id="nValue" defaultValue={nValue} readOnly className="outline-none bg-black/40 w-full px-4 py-3 rounded-md" />
        </div>
      </div>
      <form action={action} className="flex flex-col gap-y-4 w-full">
        <h2 className="text-3xl font-semibold text-center">Trial</h2>
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="plaintext">Plaintext:</label>
          <input type="text" name="plaintext" value={plaintext} onChange={(e) => setPlaintext(e.target.value)} id="plaintext" className="outline-none bg-black/40 w-full px-4 py-3 rounded-md" />
          {state?.errors?.plaintext && <ErrorInputForm errMsg={state.errors.plaintext} />}
        </div>
        {pending ? <p className="text-center w-full">Loading...</p> : <button className="w-full bg-purple-900 py-2 text-center rounded-md cursor-pointer hover:bg-white hover:text-dark-purple duration-300">Generate QR Code</button>}
      </form>
      <form action={decryptAction} className="flex flex-col gap-y-4 w-full items-center">
        {ciphertext ? <QRCode value={ciphertext} className="rounded-md bg-white p-2 size-32" /> : <HiQrcode className="size-32 text-white/30" />}
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="ciphertext">Ciphertext:</label>
          <input type="text" name="ciphertext" value={ciphertext ? ciphertext : 'undefined'} readOnly id="ciphertext" className="outline-none bg-black/40 w-full px-4 py-3 rounded-md" />
          {decryptState?.errors?.ciphertext && <ErrorInputForm errMsg={decryptState.errors.ciphertext} />}
        </div>
        {decryptPending ? <p className="text-center w-full">Loading...</p> : <button className="w-full bg-purple-900 py-2 text-center rounded-md cursor-pointer hover:bg-white hover:text-dark-purple duration-300">Get decrypted data</button>}
      </form>
      <p className="px-4 bg-black/40 py-2 rounded-md w-full h-auto break-words">{decrypted ? decrypted : 'undefined'}</p>
    </div>
  )
}