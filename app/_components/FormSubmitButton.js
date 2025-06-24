"use client";

import { useFormStatus } from "react-dom";

//need to be a client component, if this was inside a server compoennt then had to make a separate client component for this and import it
export default function FormSubmitButton({ text, isLoadingText }) {
  const { pending } = useFormStatus(); //used inside a component that is rendered inside a form, formdata, method and action can also be retrieved
  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? isLoadingText : text}
    </button>
  );
}
