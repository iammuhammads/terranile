import 'server-only';
import {createServerClient} from '@supabase/ssr';
import {cookies} from 'next/headers';
import {accountConfig} from './config';
export async function serverAccount(){
  const config=accountConfig();if(!config)return null;
  const store=await cookies();
  return createServerClient(config.url,config.key,{cookies:{getAll(){return store.getAll();},setAll(values){
    // Server components cannot set cookies; proxy refreshes them before rendering.
    try{values.forEach(({name,value,options})=>store.set(name,value,options));}catch{}
  }}});
}
