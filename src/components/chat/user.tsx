import { Avatar } from "../avatars";
// bg-gray-50
export default function UserChat() {

    return (
        <div className="flex py-1.5 px-3 gap-2.5 hover:bg-gray-50">
            <Avatar img_url="/profile-avatar1.jpeg" notification_dot />
            <div className="flex-1">
                <div className="flex justify-between">
                    <h4 className="text-gray-900 text-base font-medium">Roberta Casas</h4>
                    <time className="text-xs text-gray-500">14:23</time>
                </div>
                <div className="flex justify-between items-center">
                    <p className="line-clamp-1 text-sm">Yes, we can do this! 🔥</p>
                    <div className="rounded-full h-4 w-4 py-0.5 px-1.5 flex justify-center items-center bg-red-100 text-xs font-medium text-red-800">2</div>
                </div>

            </div>
        </div>
    )
}