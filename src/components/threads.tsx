"use client"
import Image from "next/image"
import { FaPhone, FaVideo, FaEllipsisVertical } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { IoMdSend } from "react-icons/io";
import { Database } from "@/types/database.types";
import { createBrowserClient, createServerClient, CookieOptions } from "@supabase/ssr";
import { User } from "@supabase/supabase-js";
import { useEffect, useState, useRef, useOptimistic } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { SendMessageButton } from "@/components/buttons";
import { cookies } from "next/headers";

import { deliverMessage } from "@/actions/message";
type messageType = Database['public']['Tables']['messages']['Row']

type userProfileType = Database['public']['Tables']['profiles']['Row']


export default function Threads({ messages, auth_user_detail, other_user_detail }: { messages: messageType[] | null, auth_user_detail: userProfileType | null | undefined, other_user_detail: userProfileType | null }) {
    const formRef = useRef<HTMLFormElement | null>(null)
    const messagesRef = useRef<HTMLDivElement | null>(null)
    const [allMessages, setAllMessages] = useState<messageType[]>(messages ? messages : []);

    const [optimisticMessages, addOptimisticMessage] = useOptimistic(
        allMessages,
        (state, newMessage: string) => [
            ...state,
            {
                content: newMessage,
                created_at: "null",
                id: "null",
                receiver_id: null,
                sender_id: "e5f739ab-faf5-4c54-9d69-144faa2aed9a"
            }
        ]
    );

    async function formAction(formData: FormData) {
        formRef.current?.reset();
        let content = formData.get("content") as string
        addOptimisticMessage(content);
        let sentMessage = await deliverMessage(formData);
        setAllMessages((messages) => [...messages, sentMessage])
        console.log(allMessages);

    }

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
                    console.log('Change received!', payload.new)

                    const { sender_id, receiver_id } = payload.new;

                    if ((sender_id === "e5f739ab-faf5-4c54-9d69-144faa2aed9a" && receiver_id === "bec9f99d-40de-435b-ae4e-de13327b4eb0") ||
                        (sender_id === "bec9f99d-40de-435b-ae4e-de13327b4eb0" && receiver_id === "e5f739ab-faf5-4c54-9d69-144faa2aed9a")) {
                        setAllMessages([...allMessages!, payload.new as messageType])

                    }

                }
            )
            .subscribe()
        return () => {
            supabase.removeChannel(channels)
        }
    }, [supabase, allMessages])

    return (
        <div className="max-w-2xl">
            <nav className="flex justify-between items-center  px-1 py-2 border-b border-b-gray-200">
                <div className="flex gap-x-3 items-center">

                    <div>
                        <Image
                            width={32}
                            height={32}
                            src="/profile-avatar.jpeg"
                            alt="profile-avartar"
                            className="rounded-full"
                            priority />
                    </div>

                    <div className="flex flex-col">
                        <h5 className="text-gray-900 font-medium text-base">{auth_user_detail?.last_name} {auth_user_detail?.first_name}</h5>
                        <div className="flex gap-x-1 mt-0.5 text-green-500 text-xs items-center flex-1">
                            <GoDotFill />
                            <span>Online</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-x-2">
                    <button title="phone call" className="p-[6px] hover:bg-blue-50 rounded">
                        <FaPhone className="w-5 h-5 fill-blue-700" />
                    </button>
                    <button title="video call" className="p-[6px] hover:bg-blue-50 rounded">
                        <FaVideo className="w-5 h-5 fill-blue-700" />
                    </button>
                    <button title="menu" className="p-[6px] hover:bg-blue-50 rounded">
                        <FaEllipsisVertical className="w-5 h-5 fill-blue-700" />
                    </button>
                </div>
            </nav>
            <div ref={messagesRef} className="flex flex-col gap-y-4 p-4 max-h-[77vh] overflow-y-scroll">
                {optimisticMessages?.map((message, index) => {
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
            <form action={formAction} ref={formRef} className="px-1 mt-2 w-full relative">
                <textarea title="send message" name="content" id="content"
                    placeholder="write your message here" className="w-full resize-none focus-visible:outline-blue-200 focus-visible:outline-1 pl-4 pr-10 py-3 border border-gray-200"></textarea>
                <input hidden type="text" name="sender_id" id="sender_id" className="hidden" defaultValue={'e5f739ab-faf5-4c54-9d69-144faa2aed9a'} />
                <input hidden type="text" name="receiver_id" id="sender_id" className="hidden" defaultValue={'bec9f99d-40de-435b-ae4e-de13327b4eb0'} />

                <SendMessageButton>
                    <IoMdSend className="w-8 h-8 fill-blue-600" />
                </SendMessageButton>
            </form>
        </div>
    )
}

