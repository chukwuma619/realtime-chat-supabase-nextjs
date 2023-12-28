import { Avatar } from "../avatars";
import { userProfileType } from "@/types/extracted-database.types";

export default function UserInMessage({userProfile}:{userProfile:userProfileType | null}) {
    return (
        <div className="flex items-center gap-2">
            <Avatar img_url="/profile-avatar1.jpeg" />
            <div className="flex flex-col justify-center gap-0.5">
                <h5 className="text-base font-medium text-gray-900">{userProfile?.first_name} {userProfile?.last_name}</h5>
                <div className="flex gap-1">
                    <div className="w23 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-xs text-green-500 font-medium flex-1">Online</p>
                </div>
            </div>
        </div>
    )
}