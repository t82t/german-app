import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pbezubgifitnywglqijc.supabase.co';
const supabaseKey = 'sb_publishable_nFB7Gp8lKWkBgl0MM6atGw_tv6xKWrQ';

export const supabase = createClient(supabaseUrl, supabaseKey);
