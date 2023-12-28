import { SendMessageButton } from "@/components/buttons";
import { useRef } from "react";
import { userProfileType } from "@/types/extracted-database.types";
import { deliverMessage } from "@/actions/message";


export default function FormArea({ receiver_id }: { receiver_id: userProfileType['user_id'] }) {
    const formRef = useRef<HTMLFormElement | null>(null)

    async function formAction(formData: FormData) {
        formRef.current?.reset();
        let message = formData.get("message") as string   
        await deliverMessage({ receiver_id: receiver_id!, message: message, type: "Text", status: "Sent" });

    }

    return (
        <form action={formAction} ref={formRef} className="border border-gray-200 px-4 bg-white self-end  w-available">
            <textarea title="message" autoFocus name="message" placeholder="Write your message here..." id="message"
                className="py-3 h-24 resize-none px-4 w-full border-b border-gray-200 focus-visible:outline-1 focus-visible:outline-blue-600" />
            <div className="flex py-3 px-4 justify-end">
                <SendMessageButton />
            </div>
        </form>
    )
}