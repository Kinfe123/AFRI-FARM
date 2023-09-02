import {SupabaseClient  , createClient} from "@supabase/supabase-js"
const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseAnon = process.env.SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl , supabaseAnon)
