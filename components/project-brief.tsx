'use client';
import {useState,type FormEvent} from 'react';
import {services,usd,validateBrief,enquiryEmail,type ServiceId,type ProjectBrief} from '@/lib/commissioning';
export function ProjectBriefForm({accountsEnabled=false,signedIn=false,email='',name=''}:{accountsEnabled?:boolean;signedIn?:boolean;email?:string;name?:string}){
  const [service,setService]=useState<ServiceId>('website');
  const selected=services.find(item=>item.id===service)!;
  const [step,setStep]=useState(1),[brief,setBrief]=useState<ProjectBrief|null>(null),[error,setError]=useState(''),[busy,setBusy]=useState(false),[saved,setSaved]=useState(false),[copied,setCopied]=useState(false);
  function review(event:FormEvent<HTMLFormElement>){
    event.preventDefault();const data=new FormData(event.currentTarget);
    const result=validateBrief({service,name:data.get('name'),email:data.get('email'),company:data.get('company'),title:data.get('title'),description:data.get('description'),budget:Number(data.get('budget')),timeline:data.get('timeline')});
    if(!result.brief){setError(result.error!);return;}setBrief(result.brief);setError('');setStep(3);
  }
  async function submit(){
    if(!brief)return;setBusy(true);setError('');
    try{const response=await fetch('/api/project-requests/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(brief)});const data=await response.json();if(!response.ok)throw new Error(data.error||'Please retry or email your brief.');setSaved(true);}
    catch(err){setError(err instanceof Error?err.message:'Please retry or email your brief.');}finally{setBusy(false);}
  }
  return <div className="brief-flow">
    <div className="brief-progress" aria-label="Project brief progress">{['Choose your project','Define the brief','Review & send'].map((label,index)=><span key={label} aria-current={step===index+1?'step':undefined}><small>0{index+1}</small>{label}</span>)}</div>
    {saved?<div className="brief-complete" role="status"><span className="eyebrow">Request submitted</span><h3>Your project starts<br/>with a conversation.</h3><p>Your brief is saved in your account for Terranile to review. A proposal will define the scope, cost and delivery plan before work begins.</p><a className="pill-link" href="/account/projects/">View your requests</a></div>:<>
    {step===1&&<div><h3>What would you like to build?</h3><div className="service-options">{services.map(item=><button type="button" key={item.id} aria-pressed={service===item.id} onClick={()=>setService(item.id)}><span>{item.name}</span><small>From {usd(item.minimum)}</small><b aria-hidden="true">{service===item.id?'●':'↗'}</b></button>)}</div><div className="brief-actions"><p>Starting prices in USD. Final pricing follows your brief.</p><button className="pill-link" type="button" onClick={()=>setStep(2)}>Continue <span aria-hidden="true">↗</span></button></div></div>}
    <form onSubmit={review} hidden={step!==2}>
      <div className="brief-form-head"><h3>Tell us what matters.</h3><p>{selected.name} · From {usd(selected.minimum)}</p></div>
      <div className="brief-fields">
        <label>Your name<input name="name" autoComplete="name" required minLength={2} maxLength={120} defaultValue={name}/></label>
        <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} defaultValue={email}/></label>
        <label className="full">Company or organisation <small>Optional</small><input name="company" autoComplete="organization" maxLength={160}/></label>
        <label className="full">Project name<input name="title" required minLength={3} maxLength={160} placeholder="A working title is enough"/></label>
        <label className="full">What do you want to achieve?<textarea name="description" required minLength={30} maxLength={6000} rows={5} placeholder="Describe the problem, who it serves, and the functionality or outcomes you need."/><small>Please leave out passwords, sensitive records and confidential technical material.</small></label>
        <label>Expected budget<select name="budget" key={selected.minimum} defaultValue={selected.minimum}>{[10000,20000,50000,100000,250000].filter(value=>value>=selected.minimum).map(value=><option key={value} value={value}>{usd(value)}+</option>)}</select></label>
        <label>When would you like to begin?<select name="timeline" defaultValue="Exploring options">{['Exploring options','Within 1–3 months','Within 3–6 months','More than 6 months'].map(value=><option key={value}>{value}</option>)}</select></label>
      </div>
      <div className="brief-actions"><button type="button" className="text-link" onClick={()=>{setError('');setStep(1);}}>Back</button><button type="submit" className="pill-link">Review brief <span aria-hidden="true">↗</span></button></div>
    </form>
    {step===3&&brief&&<div className="brief-review"><h3>A clear starting point.</h3><dl><div><dt>Project</dt><dd>{brief.title}</dd></div><div><dt>Engagement</dt><dd>{selected.name}</dd></div><div><dt>Budget</dt><dd>{usd(brief.budget)}+</dd></div><div><dt>Timing</dt><dd>{brief.timeline}</dd></div><div><dt>Contact</dt><dd>{brief.name} · {brief.email}</dd></div></dl><p className="review-description">{brief.description}</p><p className="brief-note">This is a project enquiry. Scope, pricing and terms will be agreed in a separate proposal before work begins.</p>
      <div className="brief-actions"><button type="button" className="text-link" onClick={()=>{setError('');setStep(2);}}>Edit brief</button>{accountsEnabled&&signedIn?<button type="button" className="pill-link" disabled={busy} onClick={submit}>{busy?'Submitting…':'Submit project request'} <span aria-hidden="true">↗</span></button>:<a className="pill-link" href={enquiryEmail(brief).href}>Open email draft <span aria-hidden="true">↗</span></a>}</div>
      {!(accountsEnabled&&signedIn)&&<p className="brief-note">Your email app will open a prepared draft. Send it to complete your enquiry; nothing has been submitted yet.</p>}
      <div className="brief-fallback"><button type="button" className="text-link" onClick={async()=>{try{await navigator.clipboard.writeText(enquiryEmail(brief).body);setCopied(true);}catch{setError('Copy the brief above and email info@terranile.com.');}}}>{copied?'Brief copied':'Copy brief instead'}</button><a href="mailto:info@terranile.com">info@terranile.com</a>{accountsEnabled&&!signedIn&&<a href="/account/">Create an account / sign in</a>}</div>
    </div>}
    </>}
    {error&&<p className="form-message error" role="alert">{error}</p>}
    <noscript><p>To discuss a project, email <a href="mailto:info@terranile.com">info@terranile.com</a> with your goals, budget and timeline.</p></noscript>
  </div>;
}
