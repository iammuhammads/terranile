import type {Metadata} from 'next';
import {SiteShell} from '@/components/site-shell';
import {AccountForm} from '@/components/account-form';
import {accountConfig} from '@/lib/supabase/config';
export const metadata:Metadata={title:'Client account — Terranile',robots:{index:false,follow:false}};
export default async function AccountPage({searchParams}:{searchParams:Promise<{error?:string}>}){
  const params=await searchParams;
  return <SiteShell route="/account/"><section className="section account-layout"><div><span className="eyebrow">Build with Terranile</span><h1>A place for<br/>your next project.</h1><p className="page-lead">Create an account to submit your brief and view your project requests.</p><a className="text-link" href="/build/">Explore our capabilities</a></div><div className="account-panel">{accountConfig()?<>{params.error&&<p role="alert" className="form-message error">That sign-in link could not be verified. Request a new link below.</p>}<h2>Create an account.<br/>Or come back in.</h2><AccountForm/></>:<><span className="eyebrow">Project enquiries</span><h2>Start with<br/>a conversation.</h2><p>Online registration is being prepared. You can send a project brief to Terranile today.</p><a className="pill-link" href="/build/#start-project">Prepare your brief ↗</a><a className="text-link" href="mailto:info@terranile.com">info@terranile.com</a></>}</div></section></SiteShell>;
}
