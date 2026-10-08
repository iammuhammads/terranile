import type {Metadata} from 'next';
import {redirect} from 'next/navigation';
import {SiteShell} from '@/components/site-shell';
import {ProjectBriefForm} from '@/components/project-brief';
import {SignOut} from '@/components/account-form';
import {serverAccount} from '@/lib/supabase/server';
import {services,usd} from '@/lib/commissioning';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Your project requests — Terranile',robots:{index:false,follow:false}};
export default async function ProjectsPage(){
  const account=await serverAccount();if(!account)redirect('/account/');
  const {data:{user},error}=await account.auth.getUser();if(error||!user)redirect('/account/');
  const {data:requests,error:loadError}=await account.from('project_requests').select('id,title,service,budget_usd,status,created_at').eq('user_id',user.id).order('created_at',{ascending:false});
  return <SiteShell route="/account/projects/"><section className="page-hero"><span className="eyebrow">Client workspace</span><h1>Your next chapter.</h1><p className="page-lead">Your project requests with Terranile.</p><SignOut/></section><section className="section"><div className="section-head"><h2>Your requests.</h2><a className="text-link" href="#new-request">Start another project</a></div>{loadError?<p role="alert">Your requests could not be loaded. Please retry or contact our team.</p>:!requests?.length?<p>No requests yet. Tell us what you would like to build below.</p>:<div className="request-list">{requests.map(request=><article key={request.id}><span className="mono">{services.find(service=>service.id===request.service)?.name}</span><h3>{request.title}</h3><p>{usd(request.budget_usd)}+ · {String(request.status).replaceAll('_',' ')}</p><time dateTime={request.created_at}>{new Date(request.created_at).toLocaleDateString('en-GB',{timeZone:'UTC'})}</time></article>)}</div>}</section><section className="section build-enquiry" id="new-request"><div className="build-enquiry-intro"><span className="eyebrow">A new engagement</span><h2>Tell us what<br/>comes next.</h2><p>Scope, price and delivery will be agreed after review.</p></div><ProjectBriefForm accountsEnabled signedIn email={user.email||''} name={user.user_metadata.full_name||''}/></section></SiteShell>;
}
