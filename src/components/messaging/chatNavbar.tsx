import UserInMessage from "./userInMessage"
import MessagingButtons from "./buttons"
import { userProfileType } from "@/types/extracted-database.types";

export default function ChatNavbar({userProfile}:{userProfile:userProfileType | null}) {
    return (
        <div className="flex h-16 justify-between border w-full self-start border-gray-200 bg-white items-center">
            <UserInMessage userProfile={userProfile} />
            <MessagingButtons />
        </div>
    )
}