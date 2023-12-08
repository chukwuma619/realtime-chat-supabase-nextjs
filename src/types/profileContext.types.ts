import { Database } from "@/types/database.types";
export type Dispatch<T> = (action: T) => void;

export type profileType = Database["public"]["Tables"]["profiles"]["Row"];

export type actionType = {
  type: "update" | "remove";
  profile: profileType;
};
