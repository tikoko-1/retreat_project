// Database types generated from Supabase schema
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
      amenities: {
        Row: {
          id: string
          name: string
          group_type: Database['public']['Enums']['amenity_group']
          icon_url: string | null
          description: string | null
          is_active: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          group_type: Database['public']['Enums']['amenity_group']
          icon_url?: string | null
          description?: string | null
          is_active?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          group_type?: Database['public']['Enums']['amenity_group']
          icon_url?: string | null
          description?: string | null
          is_active?: boolean | null
          created_at?: string
        }
        Relationships: []
      }
      availability_blocks: {
        Row: {
          id: string
          venue_id: string
          start_date: string
          end_date: string
          is_available: boolean | null
          reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          venue_id: string
          start_date: string
          end_date: string
          is_available?: boolean | null
          reason?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          venue_id?: string
          start_date?: string
          end_date?: string
          is_available?: boolean | null
          reason?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "availability_blocks_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          }
        ]
      }
      blog_articles: {
        Row: {
          id: string
          author_id: string | null
          title: string
          slug: string
          excerpt: string | null
          content: string
          cover_image: string | null
          tags: string[] | null
          is_published: boolean | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id?: string | null
          title: string
          slug: string
          excerpt?: string | null
          content: string
          cover_image?: string | null
          tags?: string[] | null
          is_published?: boolean | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_id?: string | null
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          cover_image?: string | null
          tags?: string[] | null
          is_published?: boolean | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      cancellation_policies: {
        Row: {
          id: string
          venue_id: string
          days_before: number
          refund_percent: number
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          venue_id: string
          days_before: number
          refund_percent: number
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          venue_id?: string
          days_before?: number
          refund_percent?: number
          description?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cancellation_policies_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          }
        ]
      }
      favorites: {
        Row: {
          user_id: string
          venue_id: string
          created_at: string
        }
        Insert: {
          user_id: string
          venue_id: string
          created_at?: string
        }
        Update: {
          user_id?: string
          venue_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          }
        ]
      }
      food_dining: {
        Row: {
          id: string
          venue_id: string
          meal_type: string | null
          diet_options: string[] | null
          description: string | null
          price: number | null
          is_included: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          venue_id: string
          meal_type?: string | null
          diet_options?: string[] | null
          description?: string | null
          price?: number | null
          is_included?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          venue_id?: string
          meal_type?: string | null
          diet_options?: string[] | null
          description?: string | null
          price?: number | null
          is_included?: boolean | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "food_dining_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          }
        ]
      }
      guide_venues: {
        Row: {
          guide_id: string
          venue_id: string
          created_at: string
        }
        Insert: {
          guide_id: string
          venue_id: string
          created_at?: string
        }
        Update: {
          guide_id?: string
          venue_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "guide_venues_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guide_venues_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          }
        ]
      }
      guides: {
        Row: {
          id: string
          title: string
          slug: string
          category: Database['public']['Enums']['guide_category']
          content: string
          excerpt: string | null
          cover_image: string | null
          region: string | null
          read_time_minutes: number | null
          is_published: boolean | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          category: Database['public']['Enums']['guide_category']
          content: string
          excerpt?: string | null
          cover_image?: string | null
          region?: string | null
          read_time_minutes?: number | null
          is_published?: boolean | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          category?: Database['public']['Enums']['guide_category']
          content?: string
          excerpt?: string | null
          cover_image?: string | null
          region?: string | null
          read_time_minutes?: number | null
          is_published?: boolean | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          id: string
          venue_id: string
          user_id: string | null
          guest_name: string
          guest_email: string
          guest_phone: string | null
          group_size: number
          check_in_date: string | null
          check_out_date: string | null
          message: string | null
          status: Database['public']['Enums']['inquiry_status']
          host_response: string | null
          responded_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          venue_id: string
          user_id?: string | null
          guest_name: string
          guest_email: string
          guest_phone?: string | null
          group_size?: number
          check_in_date?: string | null
          check_out_date?: string | null
          message?: string | null
          status?: Database['public']['Enums']['inquiry_status']
          host_response?: string | null
          responded_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          venue_id?: string
          user_id?: string | null
          guest_name?: string
          guest_email?: string
          guest_phone?: string | null
          group_size?: number
          check_in_date?: string | null
          check_out_date?: string | null
          message?: string | null
          status?: Database['public']['Enums']['inquiry_status']
          host_response?: string | null
          responded_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "inquiries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inquiries_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          }
        ]
      }
      price_packages: {
        Row: {
          id: string
          venue_id: string
          name: string
          price: number
          duration_days: number | null
          description: string | null
          is_active: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          venue_id: string
          name: string
          price: number
          duration_days?: number | null
          description?: string | null
          is_active?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          venue_id?: string
          name?: string
          price?: number
          duration_days?: number | null
          description?: string | null
          is_active?: boolean | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_packages_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          id: string
          role: Database['public']['Enums']['user_role']
          name: string | null
          avatar_url: string | null
          email: string | null
          phone: string | null
          bio: string | null
          website_url: string | null
          instagram_url: string | null
          is_verified: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role?: Database['public']['Enums']['user_role']
          name?: string | null
          avatar_url?: string | null
          email?: string | null
          phone?: string | null
          bio?: string | null
          website_url?: string | null
          instagram_url?: string | null
          is_verified?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: Database['public']['Enums']['user_role']
          name?: string | null
          avatar_url?: string | null
          email?: string | null
          phone?: string | null
          bio?: string | null
          website_url?: string | null
          instagram_url?: string | null
          is_verified?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      reviews: {
        Row: {
          id: string
          venue_id: string
          user_id: string | null
          reviewer_name: string
          reviewer_title: string | null
          rating: number
          comment: string
          is_verified: boolean | null
          is_published: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          venue_id: string
          user_id?: string | null
          reviewer_name: string
          reviewer_title?: string | null
          rating: number
          comment: string
          is_verified?: boolean | null
          is_published?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          venue_id?: string
          user_id?: string | null
          reviewer_name?: string
          reviewer_title?: string | null
          rating?: number
          comment?: string
          is_verified?: boolean | null
          is_published?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          }
        ]
      }
      venue_amenities: {
        Row: {
          venue_id: string
          amenity_id: string
          created_at: string
        }
        Insert: {
          venue_id: string
          amenity_id: string
          created_at?: string
        }
        Update: {
          venue_id?: string
          amenity_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "venue_amenities_amenity_id_fkey"
            columns: ["amenity_id"]
            isOneToOne: false
            referencedRelation: "amenities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "venue_amenities_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          }
        ]
      }
      venue_photos: {
        Row: {
          id: string
          venue_id: string
          url: string
          alt_text: string | null
          position: number | null
          is_cover: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          venue_id: string
          url: string
          alt_text?: string | null
          position?: number | null
          is_cover?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          venue_id?: string
          url?: string
          alt_text?: string | null
          position?: number | null
          is_cover?: boolean | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "venue_photos_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "venues"
            referencedColumns: ["id"]
          }
        ]
      }
      venues: {
        Row: {
          id: string
          owner_id: string
          title: string
          slug: string | null
          description: string | null
          short_description: string | null
          status: Database['public']['Enums']['venue_status']
          country: string
          city: string
          address: string | null
          latitude: number | null
          longitude: number | null
          capacity_min: number
          capacity_max: number
          price_min: number | null
          price_max: number | null
          price_unit: Database['public']['Enums']['price_code']
          currency: string | null
          area_sqft: number | null
          bedrooms: number | null
          bathrooms: number | null
          property_type: string | null
          website_url: string | null
          instagram_url: string | null
          house_rules: string | null
          cancellation_policy: Database['public']['Enums']['cancellation_type'] | null
          check_in_time: string | null
          check_out_time: string | null
          minimum_stay: number | null
          is_featured: boolean | null
          view_count: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          title: string
          slug?: string | null
          description?: string | null
          short_description?: string | null
          status?: Database['public']['Enums']['venue_status']
          country: string
          city: string
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          capacity_min?: number
          capacity_max?: number
          price_min?: number | null
          price_max?: number | null
          price_unit?: Database['public']['Enums']['price_code']
          currency?: string | null
          area_sqft?: number | null
          bedrooms?: number | null
          bathrooms?: number | null
          property_type?: string | null
          website_url?: string | null
          instagram_url?: string | null
          house_rules?: string | null
          cancellation_policy?: Database['public']['Enums']['cancellation_type'] | null
          check_in_time?: string | null
          check_out_time?: string | null
          minimum_stay?: number | null
          is_featured?: boolean | null
          view_count?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          title?: string
          slug?: string | null
          description?: string | null
          short_description?: string | null
          status?: Database['public']['Enums']['venue_status']
          country?: string
          city?: string
          address?: string | null
          latitude?: number | null
          longitude?: number | null
          capacity_min?: number
          capacity_max?: number
          price_min?: number | null
          price_max?: number | null
          price_unit?: Database['public']['Enums']['price_code']
          currency?: string | null
          area_sqft?: number | null
          bedrooms?: number | null
          bathrooms?: number | null
          property_type?: string | null
          website_url?: string | null
          instagram_url?: string | null
          house_rules?: string | null
          cancellation_policy?: Database['public']['Enums']['cancellation_type'] | null
          check_in_time?: string | null
          check_out_time?: string | null
          minimum_stay?: number | null
          is_featured?: boolean | null
          view_count?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "venues_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_slug: {
        Args: {
          title: string
        }
        Returns: string
      }
      increment_venue_views: {
        Args: {
          venue_uuid: string
        }
        Returns: undefined
      }
    }
    Enums: {
      amenity_group: 'core' | 'general' | 'food_dining' | 'wellness' | 'outdoor' | 'indoor' | 'tech' | 'other'
      cancellation_type: 'flexible' | 'moderate' | 'strict' | 'custom'
      guide_category: 'destination' | 'wellness' | 'yoga' | 'meditation' | 'marketing' | 'operations' | 'other'
      inquiry_status: 'new' | 'viewed' | 'responded' | 'closed'
      price_code: 'weekend' | 'per_night' | 'per_person' | 'week' | 'custom'
      review_rating: '1' | '2' | '3' | '4' | '5'
      user_role: 'client' | 'host' | 'admin'
      venue_status: 'draft' | 'pending' | 'published' | 'rejected'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Convenience types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Specific type aliases for commonly used types
export type Profile = Tables<'profiles'>
export type Venue = Tables<'venues'>
export type VenuePhoto = Tables<'venue_photos'>
export type Amenity = Tables<'amenities'>
export type Inquiry = Tables<'inquiries'>
export type Review = Tables<'reviews'>
export type Favorite = Tables<'favorites'>
export type Guide = Tables<'guides'>
export type BlogArticle = Tables<'blog_articles'>

export type VenueStatus = Enums<'venue_status'>
export type UserRole = Enums<'user_role'>
export type InquiryStatus = Enums<'inquiry_status'>
export type AmenityGroup = Enums<'amenity_group'>
export type GuideCategory = Enums<'guide_category'>
export type PriceCode = Enums<'price_code'>
export type CancellationType = Enums<'cancellation_type'>

// Extended types with relationships
export type VenueWithDetails = Venue & {
  venue_photos: VenuePhoto[]
  amenities: Amenity[]
  reviews: Review[]
  owner: Profile
  price_packages?: Tables<'price_packages'>[]
  food_dining?: Tables<'food_dining'>[]
  cancellation_policies?: Tables<'cancellation_policies'>[]
}

export type InquiryWithVenue = Inquiry & {
  venue: Venue & {
    owner: Profile
  }
}

export type ProfileWithStats = Profile & {
  venue_count?: number
  inquiry_count?: number
  favorite_count?: number
}

