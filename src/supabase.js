import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://szmocbabbojkpqzccfki.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6bW9jYmFiYm9qa3BxemNjZmtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODczMjU5NTgsImV4cCI6MjAwMjkwMTk1OH0.Vlh7XBKz7WNJ-2nmc3XQlFYgWzxaUA8ErrZEXmIWokA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
