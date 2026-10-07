import {SiteShell} from '@/components/site-shell';
export default function NotFound(){
  return <SiteShell route="/404/"><section className="page-hero"><span className="eyebrow">404</span><h1>A different direction.</h1><p className="page-lead">The page you’re looking for could not be found.</p></section><section className="section"><a className="text-link" href="/">Return to Terranile</a></section></SiteShell>;
}
