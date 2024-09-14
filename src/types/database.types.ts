export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart: {
        Row: {
          product_id: string
          quantity: number
          user_id: string
        }
        Insert: {
          product_id: string
          quantity?: number
          user_id: string
        }
        Update: {
          product_id?: string
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      order_products: {
        Row: {
          created_at: string
          discount: number
          discount_type: Database["public"]["Enums"]["discount_type_enum"]
          id: number
          order_id: number
          price_before_discount: number
          product_id: string
          quantity: number
          wholesale_price: number
        }
        Insert: {
          created_at?: string
          discount: number
          discount_type: Database["public"]["Enums"]["discount_type_enum"]
          id?: number
          order_id: number
          price_before_discount: number
          product_id: string
          quantity: number
          wholesale_price?: number
        }
        Update: {
          created_at?: string
          discount?: number
          discount_type?: Database["public"]["Enums"]["discount_type_enum"]
          id?: number
          order_id?: number
          price_before_discount?: number
          product_id?: string
          quantity?: number
          wholesale_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_products_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          additional_info: string
          address: string
          city: string
          created_at: string
          first_name: string
          id: number
          last_name: string
          payment_method: Database["public"]["Enums"]["payment_method_enum"]
          phone_number: string
          region: string
          status: Database["public"]["Enums"]["status_type_enum"]
          total_price: number
          user_id: string
          wholesale_price: number
        }
        Insert: {
          additional_info?: string
          address?: string
          city?: string
          created_at?: string
          first_name?: string
          id?: number
          last_name?: string
          payment_method?: Database["public"]["Enums"]["payment_method_enum"]
          phone_number?: string
          region?: string
          status?: Database["public"]["Enums"]["status_type_enum"]
          total_price: number
          user_id: string
          wholesale_price?: number
        }
        Update: {
          additional_info?: string
          address?: string
          city?: string
          created_at?: string
          first_name?: string
          id?: number
          last_name?: string
          payment_method?: Database["public"]["Enums"]["payment_method_enum"]
          phone_number?: string
          region?: string
          status?: Database["public"]["Enums"]["status_type_enum"]
          total_price?: number
          user_id?: string
          wholesale_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchases_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: number
          created_at: string
          description: string
          discount: number
          discount_type: Database["public"]["Enums"]["discount_type_enum"]
          id: string
          image_url: string | null
          price: number
          stock: number
          subtitle: string
          title: string
          wholesale_price: number
        }
        Insert: {
          category_id: number
          created_at?: string
          description?: string
          discount?: number
          discount_type?: Database["public"]["Enums"]["discount_type_enum"]
          id?: string
          image_url?: string | null
          price?: number
          stock?: number
          subtitle?: string
          title?: string
          wholesale_price?: number
        }
        Update: {
          category_id?: number
          created_at?: string
          description?: string
          discount?: number
          discount_type?: Database["public"]["Enums"]["discount_type_enum"]
          id?: string
          image_url?: string | null
          price?: number
          stock?: number
          subtitle?: string
          title?: string
          wholesale_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          is_admin: boolean
          user_id: string
        }
        Insert: {
          is_admin?: boolean
          user_id: string
        }
        Update: {
          is_admin?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist: {
        Row: {
          created_at: string
          product_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          product_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          product_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlist_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
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
      discount_type_enum: "percentage" | "fixed"
      status_type_enum: "pending" | "cancelled" | "fulfilled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
