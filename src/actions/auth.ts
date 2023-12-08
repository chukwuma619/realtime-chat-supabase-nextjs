"use server";

import { z } from "zod";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
const LogiSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// export async function registerUser(prevState, queryData) {
//   const itemID = queryData.get("itemID");
//   if (itemID === "1") {
//     return "Added to cart";
//   } else {
//     return "Couldn't add to cart: the item is sold out.";
//   }
// }

export type State =
  | {
      errors: {
        email?: string[] | undefined;
        password?: string[] | undefined;
      };
      message: string;
    }
  | {
      message: string;
      errors?: undefined;
    }
  | undefined;

export const loginUser = async (prevState: State, formData: FormData) => {
  const cookieStore = cookies();

  const supabase = createServerClient(
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

  const emailInput = formData.get("email");
  const passwordInput = formData.get("password");

  const validatedFields = LogiSchema.safeParse({
    email: emailInput,
    password: passwordInput,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to login.",
    };
  }

  const { email, password } = validatedFields.data;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) return { message: error.message };

  revalidatePath("/");
  redirect("/");
};
