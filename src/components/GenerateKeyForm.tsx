'use client';

import { generateEvalues, generateKey } from "@/lib/formAction";
import { useActionState, useEffect, useState } from "react";
import ErrorInputForm from "./ErrorInputForm";

export default function GenerateKeyForm() {
  const [state, action, pending] = useActionState(generateEvalues, undefined);
  const [eValues, setEValues] = useState<number[]>([]);
  const [nValue, setNValue] = useState<number | null>(null);
  const [toitent, setToitent] = useState<number | null>(null);
  const [canGenerateKey, setCanGenerateKey] = useState<boolean>(false);

  const [stateKey, actionKey, pendingKey] = useActionState(generateKey, undefined);
  
  useEffect(() => {
    if (state?.success && state.data) {
      setEValues(state.data.eValues);
      setNValue(state.data.nValue);
      setToitent(state.data.toitent);
    }
    setCanGenerateKey(state?.success || false);
  }, [state]);
  return (
    <div className="flex flex-col flex-1 md:w-1/3 w-full gap-y-8">
      <h2 className="text-3xl font-semibold text-center">Generate new encryption key</h2>
      <form action={action} className="w-full flex-col gap-y-4 flex">
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="pValue">P Value:</label>
          <input type="number" name="pValue" id="pValue" placeholder="input prime value" className="outline-none bg-black/40 w-full px-4 py-3 rounded-md" />
          {state?.errors?.pValue && <ErrorInputForm errMsg={state.errors.pValue} />}
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="qValue">Q Value:</label>
          <input type="number" name="qValue" id="qValue" placeholder="input prime value" className="outline-none bg-black/40 w-full px-4 py-3 rounded-md" />
          {state?.errors?.qValue && <ErrorInputForm errMsg={state.errors.qValue} />}
        </div>
        <div className="flex flex-col w-full gap-y-2">
          <label htmlFor="total">Total:</label>
          <input type="number" name="total" id="total" placeholder="total key options" className="outline-none bg-black/40 w-full px-4 py-3 rounded-md" />
          {state?.errors?.total && <ErrorInputForm errMsg={state.errors.total} />}
        </div>
        {pending ? <p className="text-center w-full">Loading...</p> : <button className="w-full bg-purple-900 py-2 text-center rounded-md cursor-pointer hover:bg-white hover:text-dark-purple duration-300">Submit</button>}
        
        {state?.error && <ErrorInputForm errMsg={state.error} />}
      </form>
      <form action={actionKey} className="flex flex-col gap-y-4 w-full">
        <input type="number" hidden name="nValue" value={nValue || 0} />
        <input type="number" hidden name="toitent" value={toitent || 0} />
        <div className="flex flex-col w-full">
          <label htmlFor="eValue">E Value:</label>
          <select disabled={!canGenerateKey} name="eValue" className="outline-none bg-black/40 w-full px-4 py-3 rounded-md">
            <option value="">{!canGenerateKey ? 'Fill form above first' : 'Select E Value'}</option>
            {eValues.map((val, idx) => (
              <option value={val} key={idx}>{val}</option>
            ))}
          </select>
          {stateKey?.errors?.eValue && <ErrorInputForm errMsg={stateKey.errors.eValue} />}
        </div>
        {pendingKey ? <p className="text-center w-full">Loading...</p> : <button disabled={!canGenerateKey} className="w-full bg-white/90 text-dark-purple py-2 text-center rounded-md cursor-pointer hover:bg-white/30 hover:text-white duration-300">Generate key</button>}
        {stateKey?.errors?.nValue && <ErrorInputForm errMsg={stateKey.errors.nValue} />}
        {stateKey?.errors?.toitent && <ErrorInputForm errMsg={stateKey.errors.toitent} />}
        {stateKey?.error && <ErrorInputForm errMsg={stateKey.error} />}
      </form>
    </div>
  )
}