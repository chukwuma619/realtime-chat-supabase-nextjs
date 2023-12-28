import { useFormStatus } from "react-dom";

export function AuthSubmitButton({ text }: { text: string }) {
    const status = useFormStatus();
    return (
        <button
            type="submit"
            disabled={status.pending}
            className="w-full text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none  focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            {text}
        </button>
    );
}


export function SendMessageButton() {
    const status = useFormStatus();
    return (
        <button disabled={status.pending} type="submit" title="send" className="py-2 px-3 inline-flex items-center bg-blue-700 rounded-lg text-sm text-white hover:bg-blue-800 focus-visible:outline-[3px] focus-visible:outline-blue-200 focus-visible:bg-blue-800">
            Send Message
        </button>
    );
}
