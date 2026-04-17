import { createClient } from '@supabase/supabase-js'

const url = 'https://elzhxxccbojmegfirork.supabase.co'
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsemh4eGNjYm9qbWVnZmlyb3JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2OTc4MTEsImV4cCI6MjA3NzI3MzgxMX0.0GvI6yuHGxh3G4wqNWQpMys-KvwiEnip1HOFJxO3XXk'
export const supabase = createClient(url, anonKey)
