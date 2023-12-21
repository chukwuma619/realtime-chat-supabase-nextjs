import ChatSidebar from "@/components/chat/sidebar";
import Messages from "@/components/messaging/messeges";
export default function Inbox() {
    return (
        <div className="flex">
            <ChatSidebar />
            <Messages />
        </div>

    )
}