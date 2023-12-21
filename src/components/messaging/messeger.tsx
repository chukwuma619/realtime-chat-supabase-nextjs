import ChatBubble from "./chatbubbles"
export default function Messenger() {
    return (
        <div className="flex flex-col gap-y-4 p-4 flex-1 overflow-y-scroll">
            <ChatBubble />
        </div>
    )
}

