import { Avatar } from "../avatars"
export default function ChatBubble() {
    return (
        <>
            <div className={`w-full flex gap-x-2.5 flex-row-reverse `}>
                <div>
                    <Avatar img_url="/profile-avatar1.jpeg" />
                </div>
                <div>
                    <div className={`flex gap-x-1.5 justify-end`}>
                        <h6 className="text-gray-900 font-medium text-sm">My name</h6>
                        <time className="texxt-gray-500 text-sm">11:46</time>
                    </div>
                    <div className={`p-4 bg-gray-100 mt-1  rounded-tl-[20px] rounded-br-[20px]  rounded-bl-[20px] max-w-xs`}>
                        <p className="text-gray-900 text-sm">That&apos;s awesome. I think our users
                            will really appreciate the improvements.</p>
                    </div>
                </div>
            </div>

            <div className={`w-full flex gap-x-2.5 flex-row`}>
                <div>
                    <Avatar img_url="/profile-avatar1.jpeg" />
                </div>
                <div>
                    <div className={`flex gap-x-1.5 justify-start`}>
                        <h6 className="text-gray-900 font-medium text-sm">Roberta Casas</h6>
                        <time className="texxt-gray-500 text-sm">11:46</time>
                    </div>
                    <div className={`p-4 bg-gray-100 mt-1 rounded-tr-[20px] rounded-br-[20px]  rounded-bl-[20px] max-w-xs`}>
                        <p className="text-gray-900 text-sm">That&apos;s awesome. I think our users
                            will really appreciate the improvements.</p>
                    </div>
                </div>
            </div>
        </>

    )
}