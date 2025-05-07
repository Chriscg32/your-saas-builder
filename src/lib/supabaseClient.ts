import { createClient } from "@supabase/supabase-js";

// Use environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://heeqmwmgavwpzbxkvucd.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlZXFtd21nYXZ3cHpieGt2dWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5Mzk0NzUsImV4cCI6MjA1NjUxNTQ3NX0.rZXUKLs0Flh1InhXNzJDmUKipNkyRhJ7sVrWE-edwxk";

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Mock data functions for development
export function useMockData() {
  return {
    designs: [
      { id: 1, title: "Modern Logo", description: "Clean, minimalist design", imageUrl: "/mock/design1.jpg" },
      { id: 2, title: "Vibrant Brand Identity", description: "Colorful and energetic", imageUrl: "/mock/design2.jpg" },
      { id: 3, title: "Corporate Stationery", description: "Professional business materials", imageUrl: "/mock/design3.jpg" }
    ]
  };
}

export function getMockData() {
  return {
    designs: [
      { id: 1, title: "Modern Logo", description: "Clean, minimalist design", imageUrl: "/mock/design1.jpg" },
      { id: 2, title: "Vibrant Brand Identity", description: "Colorful and energetic", imageUrl: "/mock/design2.jpg" },
      { id: 3, title: "Corporate Stationery", description: "Professional business materials", imageUrl: "/mock/design3.jpg" }
    ]
  };
}
