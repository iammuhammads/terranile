'use client';
import {useState,type FormEvent} from 'react';
import {browserAccount} from '@/lib/supabase/client';
export function AccountForm(){
  const [busy,setBusy]=useState(false),[message,setMessage]=useState(''),[error,setError]=useState('');
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();const form=new FormData(event.currentTarget);setBusy(true);setError('');
    try{
      const account=browserAccount();if(!account)throw new Error('Online registration is not available yet. Please contact info@terranile.com.');
      const email=String(form.get('email')).trim(),name=String(form.get('name')).trim();
      const {error}=await account.auth.signInWithOtp({email,options:{emailRedirectTo:`${window.location.origin}/auth/callback/`,data:{full_name:name}}});
      if(error)throw new Error('We could not send a sign-in link. Please retry shortly or contact our team.');
      setMessage('Check your email for a secure sign-in link. Open it in this browser to create or access your account.');
    }catch(err){setError(err instanceof Error?err.message:'Please try again.');}finally{setBusy(false);}
  }
  return <form className="account-form" onSubmit={submit}><label>Your name<input name="name" required minLength={2} maxLength={120} autoComplete="name"/></label><label>Email address<input name="email" type="email" required maxLength={254} autoComplete="email"/></label><p>By continuing, you agree to the account information in our <a className="text-link" href="/legal/#privacy">privacy notice</a>.</p><button className="pill-link" disabled={busy} type="submit">{busy?'Sending link…':'Send secure sign-in link'} <span aria-hidden="true">↗</span></button><p className="brief-note">New here? Your account is created when you verify your email. Returning clients use the same link to sign in.</p>{message&&<p className="form-message" role="status">{message}</p>}{error&&<p className="form-message error" role="alert">{error}</p>}</form>;
}
export function SignOut(){
  const [error,setError]=useState('');
  return <><button type="button" className="text-link" onClick={async()=>{try{const account=browserAccount();const result=await account?.auth.signOut();if(result?.error)throw result.error;window.location.assign('/account/');}catch{setError('Please try signing out again.');}}}>Sign out</button>{error&&<p role="alert">{error}</p>}</>;
}
