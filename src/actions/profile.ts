"use server";
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

  let { data, error } = await supabase.rpc("get_auth_user_profile");
  console.log(data);

  if (error) console.error(error);
  else return data ? data[0] : null;
});

export const otherUserProfile = async ({ user_id }: { user_id: string }) => {
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
    .eq("user_id", "168dd8af-db2c-4d4e-aea3-40b9c9a6bf12")
    .limit(1)
    .single();

  if (error?.hint === null) notFound();
  else return profiles;
};
