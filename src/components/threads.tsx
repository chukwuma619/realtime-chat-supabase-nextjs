"use client"
import Image from "next/image"
import { FaPhone, FaVideo, FaEllipsisVertical } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { Database } from "@/types/database.types";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState, useRef, useOptimistic } from "react"; import { useFormState, useFormStatus } from "react-dom";
import { deliverMessage } from "@/actions/message";
import FormArea from "./messaging/formarea";
import ChatSidebar from "./chat/sidebar";
import ChatNavbar from "./messaging/chatNavbar";
import { messageType, userProfileType } from "@/types/extracted-database.types";


export default function Threads({ messages, auth_user_detail, other_user_detail }: { messages: messageType[] | null | undefined, auth_user_detail: userProfileType | null | undefined, other_user_detail: userProfileType | null }) {
    const messagesRef = useRef<HTMLDivElement | null>(null)
    const [allMessages, setAllMessages] = useState<messageType[]>(messages ? messages : []);


    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTo({ behavior: "smooth", top: messagesRef.current.scrollHeight })
        }
    }, [messages])

    const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,)
    useEffect(() => {

        const channels = supabase.channel('chat-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'messages', },
                (payload) => {
                    const { sender_id, receiver_id } = payload.new;
                    if ((sender_id === auth_user_detail?.user_id && receiver_id === other_user_detail?.user_id) ||
                        (sender_id === other_user_detail?.user_id && receiver_id === auth_user_detail?.user_id)) {
                        setAllMessages([...allMessages!, payload.new as messageType])

                    }

                }
            )
            .subscribe()
        return () => {
            supabase.removeChannel(channels)
        }
    }, [supabase, allMessages, auth_user_detail?.user_id, other_user_detail?.user_id])

    return (
        <div className="flex">
            <ChatSidebar />
            <div className="flex flex-1 flex-col h-screen">
                <ChatNavbar userProfile={other_user_detail} />
                <div className="flex flex-col gap-y-4 p-4 flex-1 overflow-y-auto">
                    {allMessages?.map((message, index) => {
                        const isSender = message.sender_id === auth_user_detail?.user_id
                        return (

                            <div key={index} className={`w-full flex gap-x-2.5 ${isSender ? 'flex-row-reverse' : 'flex-row'} `}>
                                <div>
                                    <Image
                                        width={32}
                                        height={32}
                                        src="/profile-avatar1.jpeg"
                                        alt="profile-avartar"
                                        className="rounded-full"
                                        priority />
                                </div>
                                <div>
                                    <div className={`flex gap-x-1.5 ${isSender ? 'justify-end' : 'justify-start'}`}>
                                        <h6 className="text-gray-900 font-medium text-sm">{isSender ? `${auth_user_detail?.first_name} ${auth_user_detail?.last_name}` : `${other_user_detail?.first_name} ${other_user_detail?.last_name}`}</h6>
                                        <p className="texxt-gray-500 text-sm">11:46</p>
                                    </div>
                                    <div className={`p-4 bg-gray-100 mt-1 ${isSender ? 'mt-1 rounded-tl-[20px]' : 'rounded-tr-[20px]'} rounded-br-[20px]  rounded-bl-[20px] max-w-xs`}>
                                        <p className="text-gray-900 text-sm">{message.content}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <FormArea receiver_id={other_user_detail?.user_id!} />
            </div>
        </div>

    )
}

