// No seu arquivo supabase.js
import { createClient } from '@supabase/supabase-js';
import config from '../config.js'; // Subindo uma pasta para acessar o arquivo na raiz
 

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_KEY);

export { supabase };
