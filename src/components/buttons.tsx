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


export function SendMessageButton({ children }: { children: React.ReactNode }) {
    const status = useFormStatus();
    return (
        <button disabled={status.pending} type="submit" title="send" className="absolute right-0 top-1/4 p-1">
            {children}
        </button>
    );
}
