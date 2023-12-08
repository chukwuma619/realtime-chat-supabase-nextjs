'use client';
import { useProfile, useProfileDispatch } from "@/contexts/ProfileProvider";
import { Database } from "@/types/database.types";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { useEffect } from "react";

export default function Demopage() {
    const dispatch = useProfileDispatch()
    const profile = useProfile()

    useEffect(() => {

        const fetchProfile = async () => {
            let supabase = createBrowserClient<Database>(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            )
            let {
                data: { user },
            } = await supabase.auth.getUser();

            if (user) {
                let { data: profiles, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("user_id", user.id)
                    .limit(1)
                    .single();
                if (error) {
                    console.error(error);

                } else dispatch({
                    type: "update", profile: profiles
                });
            } else dispatch({
                type: "update", profile: null
            });
        }
        fetchProfile()
    }, [dispatch])


    console.log(profile);
    return <h1>Hello im <Link href={'/'}>testing</Link></h1>
}

