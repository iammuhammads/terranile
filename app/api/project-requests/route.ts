import {serverAccount} from '@/lib/supabase/server';
import {validateBrief} from '@/lib/commissioning';
export const dynamic='force-dynamic';
const headers={'Cache-Control':'private, no-store','X-Robots-Tag':'noindex'};
export async function POST(request:Request){
  // Same-origin JSON mutations only. Client-supplied identity never determines ownership.
  const origin=request.headers.get('origin');
  const requestUrl=new URL(request.url);
  const localRequest=['localhost','127.0.0.1'].includes(requestUrl.hostname);
  const allowedOrigins=localRequest?[`http://localhost:${requestUrl.port}`,`http://127.0.0.1:${requestUrl.port}`]:['https://terranile.com'];
  if(!origin||!allowedOrigins.includes(origin))return Response.json({error:'Please submit from the Terranile website.'},{status:403,headers});
  if(!request.headers.get('content-type')?.startsWith('application/json'))return Response.json({error:'Send a project brief as JSON.'},{status:415,headers});
  const account=await serverAccount();
  if(!account)return Response.json({error:'Online submissions are not available yet. Please send your brief by email.'},{status:503,headers});
  const {data:{user},error:authError}=await account.auth.getUser();
  if(authError||!user)return Response.json({error:'Sign in to submit your project.'},{status:401,headers});
  let text:string;try{text=await request.text();}catch{return Response.json({error:'Please retry your request.'},{status:400,headers});}
  if(text.length>20000)return Response.json({error:'Your brief is too long.'},{status:413,headers});
  let input:unknown;try{input=JSON.parse(text);}catch{return Response.json({error:'Please check your project brief.'},{status:400,headers});}
  const {brief,error}=validateBrief(input);
  if(!brief)return Response.json({error},{status:400,headers});
  // Database trigger enforces the per-user submission limit even for direct API clients.
  const {data,error:saveError}=await account.from('project_requests').insert({user_id:user.id,service:brief.service,contact_name:brief.name,contact_email:brief.email,company:brief.company,title:brief.title,description:brief.description,budget_usd:brief.budget,timeline:brief.timeline}).select('id').single();
  if(saveError)return Response.json({error:saveError.message.includes('submission_limit')?'You have reached the daily submission limit. Please email us.':'Your request could not be saved. Please retry or email your brief.'},{status:saveError.message.includes('submission_limit')?429:503,headers});
  return Response.json({id:data.id},{status:201,headers});
}
