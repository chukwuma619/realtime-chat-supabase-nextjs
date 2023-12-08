"use server";
import { z } from "zod";
import { Database } from "@/types/database.types";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
// import { cache } from "react";

const messageSchema = z.object({
  content: z.string(),
  receiver_id: z.string(),
  sender_id: z.string(),
});

export async function deliverMessage(formData: FormData) {
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

  const content_input = formData.get("content");
  const sender_id_input = formData.get("sender_id");
  const receiver_id_input = formData.get("receiver_id");

  const validatedFields = messageSchema.safeParse({
    content: content_input,
    sender_id: sender_id_input,
    receiver_id: receiver_id_input,
  });

  if (validatedFields.success) {
    const { content, sender_id, receiver_id } = validatedFields.data;

    const { data, error } = await supabase
      .from("messages")
      .insert({
        content: content,
        sender_id: sender_id,
        receiver_id: receiver_id,
      })
      .select();
    if (error) console.error(error);
    else console.log(data);
  }
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
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    let { data: messages, error } = await supabase
    .from("messages").select("*");
    if (error) {
      console.error(error);
      return null;
    } else return messages;
  } else return null;
}
