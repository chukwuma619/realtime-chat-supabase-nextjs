import ChatList from "./chatList";
import Search from "./search";
export default function ChatSidebar() {
    return (
        <div className="flex gap-4 flex-col max-w-sm min-h-screen">
            <div>Dummy</div>
            <Search />
            <ChatList />
        </div>

    )

}