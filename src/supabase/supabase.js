import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rpzsivtkzcgmgtmizkdd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwenNpdnRremNnbWd0bWl6a2RkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTQ2ODMsImV4cCI6MjA5MTczMDY4M30.gpLUtPFs7a4Gu9thLz-Y6kx7UvmAdBRdwd7cht3jEDs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);