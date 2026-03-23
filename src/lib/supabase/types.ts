// AVOID UPDATING THIS FILE DIRECTLY. It is automatically generated.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.4'
  }
  public: {
    Tables: {
      advertisements: {
        Row: {
          active: boolean
          company_name: string
          created_at: string
          description: string
          facebook: string | null
          id: string
          image_url: string
          instagram: string | null
          is_general: boolean
          link: string
          phone: string | null
          target_categories: string[]
          website: string | null
        }
        Insert: {
          active?: boolean
          company_name: string
          created_at?: string
          description: string
          facebook?: string | null
          id?: string
          image_url: string
          instagram?: string | null
          is_general?: boolean
          link: string
          phone?: string | null
          target_categories?: string[]
          website?: string | null
        }
        Update: {
          active?: boolean
          company_name?: string
          created_at?: string
          description?: string
          facebook?: string | null
          id?: string
          image_url?: string
          instagram?: string | null
          is_general?: boolean
          link?: string
          phone?: string | null
          target_categories?: string[]
          website?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string
          emoji: string | null
          group: string | null
          group_emoji: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          suggested_services: string[] | null
        }
        Insert: {
          created_at?: string
          emoji?: string | null
          group?: string | null
          group_emoji?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          suggested_services?: string[] | null
        }
        Update: {
          created_at?: string
          emoji?: string | null
          group?: string | null
          group_emoji?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          suggested_services?: string[] | null
        }
        Relationships: []
      }
      neighborhoods: {
        Row: {
          created_at: string
          group: string | null
          id: string
          latitude: number
          longitude: number
          name: string
        }
        Insert: {
          created_at?: string
          group?: string | null
          id?: string
          latitude?: number
          longitude?: number
          name: string
        }
        Update: {
          created_at?: string
          group?: string | null
          id?: string
          latitude?: number
          longitude?: number
          name?: string
        }
        Relationships: []
      }
      otps: {
        Row: {
          code: string
          created_at: string
          expires_at: string
          id: string
          phone: string
        }
        Insert: {
          code: string
          created_at?: string
          expires_at: string
          id?: string
          phone: string
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string
          id?: string
          phone?: string
        }
        Relationships: []
      }
      plans: {
        Row: {
          created_at: string
          features: string[]
          id: string
          name: string
          price: number
        }
        Insert: {
          created_at?: string
          features?: string[]
          id?: string
          name: string
          price?: number
        }
        Update: {
          created_at?: string
          features?: string[]
          id?: string
          name?: string
          price?: number
        }
        Relationships: []
      }
      professionals: {
        Row: {
          address: string | null
          category_id: string | null
          created_at: string
          description: string
          email: string | null
          gallery: string[]
          id: string
          image: string
          latitude: number | null
          longitude: number | null
          name: string
          neighborhood_id: string | null
          phone: string
          plan_id: string | null
          premium_highlight: string | null
          subscription_status: string | null
          verified: boolean
          working_hours: string
        }
        Insert: {
          address?: string | null
          category_id?: string | null
          created_at?: string
          description: string
          email?: string | null
          gallery?: string[]
          id?: string
          image: string
          latitude?: number | null
          longitude?: number | null
          name: string
          neighborhood_id?: string | null
          phone: string
          plan_id?: string | null
          premium_highlight?: string | null
          subscription_status?: string | null
          verified?: boolean
          working_hours: string
        }
        Update: {
          address?: string | null
          category_id?: string | null
          created_at?: string
          description?: string
          email?: string | null
          gallery?: string[]
          id?: string
          image?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          neighborhood_id?: string | null
          phone?: string
          plan_id?: string | null
          premium_highlight?: string | null
          subscription_status?: string | null
          verified?: boolean
          working_hours?: string
        }
        Relationships: [
          {
            foreignKeyName: 'professionals_category_id_fkey'
            columns: ['category_id']
            isOneToOne: false
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'professionals_neighborhood_id_fkey'
            columns: ['neighborhood_id']
            isOneToOne: false
            referencedRelation: 'neighborhoods'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'professionals_plan_id_fkey'
            columns: ['plan_id']
            isOneToOne: false
            referencedRelation: 'plans'
            referencedColumns: ['id']
          },
        ]
      }
      reviews: {
        Row: {
          comment: string
          created_at: string
          id: string
          professional_id: string | null
          rating: number
          reviewer_name: string
        }
        Insert: {
          comment: string
          created_at?: string
          id?: string
          professional_id?: string | null
          rating?: number
          reviewer_name: string
        }
        Update: {
          comment?: string
          created_at?: string
          id?: string
          professional_id?: string | null
          rating?: number
          reviewer_name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'reviews_professional_id_fkey'
            columns: ['professional_id']
            isOneToOne: false
            referencedRelation: 'professionals'
            referencedColumns: ['id']
          },
        ]
      }
      services: {
        Row: {
          created_at: string
          id: string
          name: string
          professional_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          professional_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          professional_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'services_professional_id_fkey'
            columns: ['professional_id']
            isOneToOne: false
            referencedRelation: 'professionals'
            referencedColumns: ['id']
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] & DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

// ====== DATABASE EXTENDED CONTEXT (auto-generated) ======
// This section contains actual PostgreSQL column types, constraints, RLS policies,
// functions, triggers, indexes and materialized views not present in the type definitions above.
// IMPORTANT: The TypeScript types above map UUID, TEXT, VARCHAR all to "string".
// Use the COLUMN TYPES section below to know the real PostgreSQL type for each column.
// Always use the correct PostgreSQL type when writing SQL migrations.

// --- COLUMN TYPES (actual PostgreSQL types) ---
// Use this to know the real database type when writing migrations.
// "string" in TypeScript types above may be uuid, text, varchar, timestamptz, etc.
// Table: advertisements
//   id: uuid (not null, default: gen_random_uuid())
//   company_name: text (not null)
//   description: text (not null)
//   image_url: text (not null)
//   link: text (not null)
//   target_categories: _text (not null, default: '{}'::text[])
//   active: boolean (not null, default: true)
//   phone: text (nullable)
//   website: text (nullable)
//   facebook: text (nullable)
//   instagram: text (nullable)
//   is_general: boolean (not null, default: false)
//   created_at: timestamp with time zone (not null, default: now())
// Table: categories
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   slug: text (not null)
//   emoji: text (nullable)
//   group: text (nullable)
//   group_emoji: text (nullable)
//   icon: text (nullable)
//   suggested_services: _text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: neighborhoods
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   latitude: numeric (not null, default: 0)
//   longitude: numeric (not null, default: 0)
//   group: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: otps
//   id: uuid (not null, default: gen_random_uuid())
//   phone: text (not null)
//   code: text (not null)
//   expires_at: timestamp with time zone (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: plans
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   price: numeric (not null, default: 0)
//   features: _text (not null, default: '{}'::text[])
//   created_at: timestamp with time zone (not null, default: now())
// Table: professionals
//   id: uuid (not null, default: gen_random_uuid())
//   name: text (not null)
//   email: text (nullable)
//   phone: text (not null)
//   description: text (not null)
//   address: text (nullable)
//   latitude: numeric (nullable)
//   longitude: numeric (nullable)
//   category_id: uuid (nullable)
//   neighborhood_id: uuid (nullable)
//   plan_id: uuid (nullable)
//   verified: boolean (not null, default: false)
//   image: text (not null)
//   gallery: _text (not null, default: '{}'::text[])
//   working_hours: text (not null)
//   premium_highlight: text (nullable)
//   subscription_status: text (nullable)
//   created_at: timestamp with time zone (not null, default: now())
// Table: reviews
//   id: uuid (not null, default: gen_random_uuid())
//   professional_id: uuid (nullable)
//   reviewer_name: text (not null)
//   rating: numeric (not null, default: 5)
//   comment: text (not null)
//   created_at: timestamp with time zone (not null, default: now())
// Table: services
//   id: uuid (not null, default: gen_random_uuid())
//   professional_id: uuid (nullable)
//   name: text (not null)
//   created_at: timestamp with time zone (not null, default: now())

// --- CONSTRAINTS ---
// Table: advertisements
//   PRIMARY KEY advertisements_pkey: PRIMARY KEY (id)
// Table: categories
//   PRIMARY KEY categories_pkey: PRIMARY KEY (id)
// Table: neighborhoods
//   PRIMARY KEY neighborhoods_pkey: PRIMARY KEY (id)
// Table: otps
//   PRIMARY KEY otps_pkey: PRIMARY KEY (id)
// Table: plans
//   PRIMARY KEY plans_pkey: PRIMARY KEY (id)
// Table: professionals
//   FOREIGN KEY professionals_category_id_fkey: FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
//   FOREIGN KEY professionals_neighborhood_id_fkey: FOREIGN KEY (neighborhood_id) REFERENCES neighborhoods(id) ON DELETE SET NULL
//   PRIMARY KEY professionals_pkey: PRIMARY KEY (id)
//   FOREIGN KEY professionals_plan_id_fkey: FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE SET NULL
// Table: reviews
//   PRIMARY KEY reviews_pkey: PRIMARY KEY (id)
//   FOREIGN KEY reviews_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES professionals(id) ON DELETE CASCADE
// Table: services
//   PRIMARY KEY services_pkey: PRIMARY KEY (id)
//   FOREIGN KEY services_professional_id_fkey: FOREIGN KEY (professional_id) REFERENCES professionals(id) ON DELETE CASCADE

// --- ROW LEVEL SECURITY POLICIES ---
// Table: advertisements
//   Policy "Advertisements are accessible by everyone" (ALL, PERMISSIVE) roles={public}
//     USING: true
//     WITH CHECK: true
// Table: categories
//   Policy "Categories are deletable by everyone" (DELETE, PERMISSIVE) roles={public}
//     USING: true
//   Policy "Categories are insertable by everyone" (INSERT, PERMISSIVE) roles={public}
//     WITH CHECK: true
//   Policy "Categories are readable by everyone" (SELECT, PERMISSIVE) roles={public}
//     USING: true
//   Policy "Categories are updatable by everyone" (UPDATE, PERMISSIVE) roles={public}
//     USING: true
//     WITH CHECK: true
// Table: neighborhoods
//   Policy "Neighborhoods are accessible by everyone" (ALL, PERMISSIVE) roles={public}
//     USING: true
//     WITH CHECK: true
// Table: otps
//   Policy "OTPs are accessible by everyone" (ALL, PERMISSIVE) roles={public}
//     USING: true
//     WITH CHECK: true
// Table: plans
//   Policy "Plans are accessible by everyone" (ALL, PERMISSIVE) roles={public}
//     USING: true
//     WITH CHECK: true
// Table: professionals
//   Policy "Professionals are accessible by everyone" (ALL, PERMISSIVE) roles={public}
//     USING: true
//     WITH CHECK: true
// Table: reviews
//   Policy "Reviews are accessible by everyone" (ALL, PERMISSIVE) roles={public}
//     USING: true
//     WITH CHECK: true
// Table: services
//   Policy "Services are accessible by everyone" (ALL, PERMISSIVE) roles={public}
//     USING: true
//     WITH CHECK: true

// --- DATABASE FUNCTIONS ---
// FUNCTION rls_auto_enable()
//   CREATE OR REPLACE FUNCTION public.rls_auto_enable()
//    RETURNS event_trigger
//    LANGUAGE plpgsql
//    SECURITY DEFINER
//    SET search_path TO 'pg_catalog'
//   AS $function$
//   DECLARE
//     cmd record;
//   BEGIN
//     FOR cmd IN
//       SELECT *
//       FROM pg_event_trigger_ddl_commands()
//       WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
//         AND object_type IN ('table','partitioned table')
//     LOOP
//        IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
//         BEGIN
//           EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
//           RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
//         EXCEPTION
//           WHEN OTHERS THEN
//             RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
//         END;
//        ELSE
//           RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
//        END IF;
//     END LOOP;
//   END;
//   $function$
//
