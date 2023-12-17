"use server";

import { z } from "zod";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Database } from "@/types/database.types";
const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(3, { message: "Must be 5 or more characters long" })
    .refine(
      async (username) => {
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
        if (profiles) return false;
        else return true;
      },
      {
        message: "Username already exist",
      }
    ),

  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "Must be 8 or more characters long" }),
});

const LoginSchema = UserSchema.omit({ username: true });

type State =
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
  | null;
export const signInWithEmail = async (prevState: State, formData: FormData) => {
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

  const emailInput = formData.get("email");
  const passwordInput = formData.get("password");

  const validatedFields = LoginSchema.safeParse({
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

type prevRegState =
  string | {
      email?: string[] | undefined;
      username?: string[] | undefined;
      password?: string[] | undefined;
    }
  | undefined;
export const signUpNewUser = async (
  prevState: prevRegState,
  formData: FormData
) => {
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

  const emailInput = formData.get("email");
  const passwordInput = formData.get("password");
  const usernameInput = formData.get("username");

  const validatedFields = await UserSchema.spa({
    email: emailInput,
    password: passwordInput,
    username: usernameInput,
  });

  if (!validatedFields.success) {
    const formatted = validatedFields.error.flatten().fieldErrors;
    console.log(formatted);
    return formatted;
  }

  const { email, password, username } = validatedFields.data;
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error(error);
    if (error.message === "User already registered") {
      return "A user with this email address already exists."
    }
  } else {
    console.log(data);
    const { data: profile, error } = await supabase
      .from("profiles")
      .insert({ user_id: data.user?.id, username: username })
      .select();

    if (error) console.error(error);
    else console.log(profile);
  }
};
