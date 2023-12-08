import Threads from "@/ui/threads";
import { getAllMessages } from "@/actions/message";
import { fetchUserProfile, fetchUserDetails } from "@/actions/profile";



export default async function MessagePage({ params }: { params: { user_id: string } }) {
    const userProfile = await fetchUserProfile()
    console.log(userProfile);

    const userDetails = await fetchUserDetails(params.user_id)
    console.log(userDetails);

    const messages = await getAllMessages(params.user_id)
    console.log(messages);

    return <Threads messages={messages} user_profile={userProfile} user_details={userDetails} />
}

