'use client';
import { useProfile, useProfileDispatch } from "@/contexts/ProfileProvider";
import { useEffect } from "react";

export default function Demopage() {
    const dispatch = useProfileDispatch()
    const profile = useProfile()
    
    useEffect(() => {
        dispatch({
            type: "update", profile: {
                first_name: "Ebube",
                id: "1",
                last_name: "chukwuma",
                profile_pic: null,
                user_id: null,
                username: null,
            }
        })

    }, [dispatch])


    console.log(profile);
    return <h1>Hello im testing</h1>
}

