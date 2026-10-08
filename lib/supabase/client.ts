'use client';
import {createBrowserClient} from '@supabase/ssr';
import {accountConfig} from './config';
export function browserAccount(){
  const config=accountConfig();
  return config?createBrowserClient(config.url,config.key):null;
}
