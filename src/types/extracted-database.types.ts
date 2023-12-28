import { Database } from "./database.types"

export type messageType = Database['public']['Tables']['messages']['Row']

export type userProfileType = Database['public']['Tables']['profiles']['Row']