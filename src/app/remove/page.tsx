'use client';
import { useProfile, useProfileDispatch } from "@/contexts/ProfileProvider";
import { useEffect } from "react";

export default function Demopage() {
    const dispatch = useProfileDispatch()
    const profile = useProfile()

    useEffect(() => {
        dispatch({
            type: "remove", profile: null
        })

    }, [dispatch])


    console.log(profile);
    return <h1>Hello im testing</h1>
}

