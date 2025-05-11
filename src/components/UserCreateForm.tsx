import { useActionState } from "react";
import FormInput from "./FormInput";
import { createCo } from "@/lib/formAction";
import ErrorInputForm from "./ErrorInputForm";

export default function UserCreateForm() {
    const [state, action, pending] = useActionState(createCo, undefined);
    return (
        <form action={action} className="flex flex-col md:grid md:grid-cols-2 gap-3">
            <FormInput id="name" attribute="Name" type="text" placeholder="Enter name">
                {state?.errors?.name && <ErrorInputForm errMsg={state.errors.name} />}
            </FormInput>
            <FormInput id="nim_nip" attribute="NIM / NIP" type="text" placeholder="Enter id">
                {state?.errors?.nim_nip && <ErrorInputForm errMsg={state.errors.nim_nip} />}
            </FormInput>
            <FormInput id="email" attribute="Email" type="email" placeholder="Enter email">
                {state?.errors?.email && <ErrorInputForm errMsg={state.errors.email} />}
            </FormInput>
            <FormInput id="address" attribute="Address" type="text" placeholder="St Ohio">
                {state?.errors?.address && <ErrorInputForm errMsg={state.errors.address} />}
            </FormInput>
            <FormInput id="password" attribute="Password" type="password" placeholder="Enter password">
                {state?.errors?.password && <ErrorInputForm errMsg={state.errors.password} />}
            </FormInput>
            <FormInput id="password_confirmation" attribute="Confirm Password" type="password" placeholder="Confirm Password">
                {state?.errors?.password_confirmation && <ErrorInputForm errMsg={state.errors.password_confirmation} />}
            </FormInput>
            <FormInput id="phone_number" attribute="Phone" type="text" placeholder="083...">
                {state?.errors?.phone_number && <ErrorInputForm errMsg={state.errors.phone_number} />}
            </FormInput>
            {state?.message && <ErrorInputForm errMsg={state.message} />}
            {pending ? (
                <div className="w-full text-center col-span-2">Loading...</div>
            ) : (
                <button className="py-2 col-span-2 w-full bg-midnight-purple cursor-pointer hover:bg-white hover:text-black duration-300 rounded-md">Submit</button>
            )}
        </form>
    )
}