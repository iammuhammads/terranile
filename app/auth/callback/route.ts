import {NextResponse,type NextRequest} from 'next/server';
import {serverAccount} from '@/lib/supabase/server';
export async function GET(request:NextRequest){
  const code=request.nextUrl.searchParams.get('code');
  const account=await serverAccount();
  if(code&&account){const {error}=await account.auth.exchangeCodeForSession(code);if(!error)return NextResponse.redirect(new URL('/account/projects/',request.url));}
  return NextResponse.redirect(new URL('/account/?error=link',request.url));
}
