import { useFormStatus } from "react-dom";

export function AuthSubmitButton({ text }: { text: string }) {
    const status = useFormStatus();
    return <button type="submit" disabled={status.pending} className="w-full text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none disabled:bg-blue-300 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        {status.pending ? "Logining..." : "Login"}</button>

}

export function SendMessageButton({
    children,
}: {
    children: React.ReactNode
}) {
    const status = useFormStatus();
    return <button type="submit" title="send" className="absolute right-0 top-1/4 p-1">{children}</button>
}
