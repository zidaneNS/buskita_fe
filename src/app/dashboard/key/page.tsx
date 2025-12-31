import GenerateKeyForm from "@/components/GenerateKeyForm";
import TrialEncryptForm from "@/components/TrialEncryptForm";
import { getKey } from "@/lib/action";

export default async function Page() {
  const publicKey = await getKey();
  return (
    <main className="flex flex-col md:flex-row gap-y-8 md:gap-y-0 justify-between h-screen w-full px-8 py-6 md:px-10 md:py-8 gap-x-12 overflow-y-auto">
      <GenerateKeyForm />

      <TrialEncryptForm
        eValue={publicKey?.eValue}
        nValue={publicKey?.nValue}
      />
    </main>
  )
}