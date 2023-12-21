import UserChat from "./user";

export default function ChatList (){
    return (
        <div className="flex flex-col pb-5 gap-2 border border-gray-200 h-full overflow-y-scroll">
            <UserChat />
            <UserChat />
            <UserChat />
            <UserChat />
            <UserChat />
        </div>
    )
}