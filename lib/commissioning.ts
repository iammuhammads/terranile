export const services=[
  {id:'website',name:'Custom websites',category:'Software & digital products',minimum:10000,description:'A considered digital presence, with the functionality your business needs.',deliverables:'Custom design · Content systems · Integrations'},
  {id:'app',name:'Web & mobile apps',category:'Software & digital products',minimum:10000,description:'Products built around the people, workflows and problems they serve.',deliverables:'Product design · Application development · Deployment'},
  {id:'software',name:'Custom software',category:'Software & digital products',minimum:10000,description:'Purpose-built platforms, internal tools and connected business systems.',deliverables:'Dashboards · APIs · Business workflows'},
  {id:'ai',name:'AI systems',category:'AI & research',minimum:20000,description:'Applied intelligence grounded in your use case, data and evaluation needs.',deliverables:'AI applications · Knowledge systems · Evaluation'},
  {id:'research',name:'Research engagements',category:'AI & research',minimum:20000,description:'Defined technical questions explored through computational work and evidence.',deliverables:'Technical studies · Prototypes · Documented findings'}
] as const;
export type ServiceId=typeof services[number]['id'];
export const usd=(value:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(value);
export type ProjectBrief={service:ServiceId;name:string;email:string;company:string;title:string;description:string;budget:number;timeline:string};
export function validateBrief(value:unknown):{brief?:ProjectBrief;error?:string}{
  if(!value||typeof value!=='object'||Array.isArray(value))return {error:'Please complete your project brief.'};
  const input=value as Record<string,unknown>;
  const fields=['name','email','company','title','description','timeline'] as const;
  const cleaned:Record<string,string>={};
  for(const field of fields){if(typeof input[field]!=='string')return {error:'Please complete your project details.'};cleaned[field]=input[field].trim();}
  const service=services.find(item=>item.id===input.service);
  if(!service)return {error:'Choose a service.'};
  if(cleaned.name.length<2||cleaned.name.length>120)return {error:'Enter your name (2–120 characters).'};
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleaned.email)||cleaned.email.length>254)return {error:'Enter a valid email address.'};
  if(cleaned.company.length>160)return {error:'Keep the company name under 160 characters.'};
  if(cleaned.title.length<3||cleaned.title.length>160)return {error:'Enter a project title (3–160 characters).'};
  if(cleaned.description.length<30||cleaned.description.length>6000)return {error:'Describe your project in 30–6,000 characters.'};
  if(!['Exploring options','Within 1–3 months','Within 3–6 months','More than 6 months'].includes(cleaned.timeline))return {error:'Choose your intended timeline.'};
  if(typeof input.budget!=='number'||!Number.isSafeInteger(input.budget)||input.budget<service.minimum||input.budget>10000000)return {error:`${service.name} engagements start at ${usd(service.minimum)}.`};
  return {brief:{service:service.id,...cleaned,budget:input.budget} as ProjectBrief};
}
export function enquiryEmail(brief:ProjectBrief){
  const service=services.find(item=>item.id===brief.service)!;
  const body=`Hello Terranile,\n\nI would like to discuss a ${service.name.toLowerCase()} project.\n\nProject: ${brief.title}\nName: ${brief.name}\nEmail: ${brief.email}\nCompany: ${brief.company||'Independent'}\nBudget: ${usd(brief.budget)}+\nTimeline: ${brief.timeline}\n\nProject brief:\n${brief.description}\n\nPlease let me know the next steps.`;
  return {body,href:`mailto:info@terranile.com?subject=${encodeURIComponent(`Build with Terranile — ${brief.title}`)}&body=${encodeURIComponent(body)}`};
}
