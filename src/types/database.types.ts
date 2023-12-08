export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      messages: {
        Row: {
          content: string | null
          created_at: string
          id: string
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          }
        ]
      }
      profiles: {
        Row: {
          first_name: string | null
          id: string
          last_name: string | null
          profile_pic: string | null
          user_id: string | null
          username: string | null
        }
        Insert: {
          first_name?: string | null
          id?: string
          last_name?: string | null
          profile_pic?: string | null
          user_id?: string | null
          username?: string | null
        }
        Update: {
          first_name?: string | null
          id?: string
          last_name?: string | null
          profile_pic?: string | null
          user_id?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
