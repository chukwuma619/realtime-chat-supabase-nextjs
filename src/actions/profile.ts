import { Database } from "@/types/database.types";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { cache } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";

export const authUserProfile = cache(async () => {
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data, error } = await supabase.auth.getSession();

  if (data && data.session?.user) {
    const user = data.session.user;
    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .limit(1)
      .single();

    if (error) console.error(error);
    else return profiles;
  }
});

export const otherUserProfile = async ({ username }: { username: string }) => {
  noStore();
  const cookieStore = cookies();
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .limit(1)
      .single();

    if (error?.hint === null) notFound();
    else return profiles;
  }
