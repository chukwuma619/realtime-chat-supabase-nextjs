'use client';
import { useProfile, useProfileDispatch } from "@/contexts/ProfileProvider";
import { useEffect } from "react";

export default function Demopage() {
    const dispatch = useProfileDispatch()
    const profile = useProfile()

    localStorage.removeItem("profile")


    console.log(profile);
    return <h1>Hello im testing</h1>
}

