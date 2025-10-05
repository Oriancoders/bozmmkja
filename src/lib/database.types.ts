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
      magazine_issues: {
        Row: {
          id: string
          title: string
          description: string
          cover_image_url: string
          pdf_url: string
          issue_month: number
          issue_year: number
          publish_date: string
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string
          cover_image_url: string
          pdf_url: string
          issue_month: number
          issue_year: number
          publish_date: string
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          cover_image_url?: string
          pdf_url?: string
          issue_month?: number
          issue_year?: number
          publish_date?: string
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      sister_magazines: {
        Row: {
          id: string
          name: string
          logo_url: string
          website_url: string
          description: string
          display_order: number
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url: string
          website_url?: string
          description?: string
          display_order?: number
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string
          website_url?: string
          description?: string
          display_order?: number
          active?: boolean
          created_at?: string
        }
      }
    }
  }
}

export type MagazineIssue = Database['public']['Tables']['magazine_issues']['Row']
export type SisterMagazine = Database['public']['Tables']['sister_magazines']['Row']
