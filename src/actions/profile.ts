import { Database } from "@/types/database.types";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";

export const fetchUserProfile = cache(async () => {
  "use server";
  const cookieStore = cookies();

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
  const {
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
      return null;
    } else return profiles;
  } else return null;
});

export const fetchUserDetails = cache(async (user_id: string) => {
  "use server";
  const cookieStore = cookies();

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  let { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", 'bec9f99d-40de-435b-ae4e-de13327b4eb0')
    .limit(1)
    .single();

  if (error) {
    console.error(error);
    return null;
  } else return profile;
});
