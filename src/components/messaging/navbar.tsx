import UserInMessage from "./user"
import MessagingButtons from "./buttons"
export default function Navbar() {
    return (
        <div className="flex h-16 justify-between border border-gray-200 bg-white items-center">
            <UserInMessage />
            <MessagingButtons />
        </div>
    )
}