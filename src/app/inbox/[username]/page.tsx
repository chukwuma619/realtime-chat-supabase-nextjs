import Threads from "@/components/threads";
import { getAllMessages } from "@/actions/message";
import { authUserProfile, otherUserProfile } from "@/actions/profile";


export default async function MessagePage({ params }: { params: { username: string } }) {

    const authuserProfile = await authUserProfile()
    
    const otheruserProfile = await otherUserProfile({user_id: params.username})

    const messages = await getAllMessages(params.username)

    return <Threads messages={messages}  auth_user_detail={authuserProfile}  other_user_detail={otheruserProfile}/>
}

