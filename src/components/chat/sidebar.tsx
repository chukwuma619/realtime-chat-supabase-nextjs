import ChatList from "./chatList";
import Search from "./search";
export default function ChatSidebar() {
    return (
        <div className="flex gap-4 flex-col w-full max-w-xs min-h-screen">
            <div>Dummy</div>
            <Search />
            <ChatList />
        </div>

    )

}