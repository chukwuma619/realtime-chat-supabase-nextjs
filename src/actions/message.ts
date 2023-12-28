"use server";
import { z } from "zod";
import { Database } from "@/types/database.types";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function deliverMessage({
  receiver_id,
  message,
  status,
  type,
}: {
  receiver_id: string;
  message: string;
  status: string;
  type: string;
}) {
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

  let { data, error } = await supabase.rpc("send_message", {
    message: message,
    receiver_id_value: receiver_id,
    status_value: status,
    type_value: type,
  });
  if (error) console.error(error);
  else console.log(data);
}

export async function getAllMessages(receiver_id: string) {
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
  let { data, error } = await supabase.rpc("get_messages", {
    receiver_id_input: receiver_id,
  });
  if (error) console.error(error);
  else return data;
}
