import Script from 'next/script';
import {breadcrumbs} from '@/lib/seo';
import type {ReactNode} from 'react';

const navigation=[['Capital','/capital/'],['Research','/research/'],['Projects','/projects/'],['Company','/company/'],['News','/news/']] as const;
export function SiteShell({route,children,className=''}:{route:string;children:ReactNode;className?:string}){
  const crumbs=route==='/404/'?[]:breadcrumbs(route);
  const links=navigation.map(([name,url])=><a key={url} href={url} aria-current={route.startsWith(url)?'page':undefined}>{name}</a>);
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="header">
      <a className="brand" href="/" aria-label="Terranile home"><img className="brand-art" src="/assets/terranile-logo-clean.png" alt="" width="240" height="68" aria-hidden="true"/></a>
      <nav className="nav" aria-label="Main navigation">{links}<a className="contact-link" href="/build/">Build with us</a></nav>
      <button className="menu-button" type="button" aria-expanded="false" aria-controls="mobile-navigation">Menu</button>
      <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">{links}<a href="/build/">Build with us</a><a href="/contact/">Contact</a></nav>
    </header>
    <main id="main" className={className}>{crumbs.length>0&&<nav className="site-breadcrumbs" aria-label="Breadcrumb"><ol>{crumbs.map((crumb,index)=><li key={crumb.path}>{index===crumbs.length-1?<span aria-current="page">{crumb.name}</span>:<a href={crumb.path}>{crumb.name}</a>}</li>)}</ol></nav>}{children}</main>
    <footer className="footer">
      <div className="footer-top"><div><a className="brand footer-name" href="/" aria-label="Terranile home">terranile</a><p className="footer-tagline">Build infrastructure.<br/>Build intelligence.<br/>Build what lasts.</p></div>
        <div className="footer-links">
          <div><span className="mono">Our work</span><a href="/avan/">AVAN</a><a href="/companies/avanbnb/">AvanBnB</a><a href="/research/helios/">Project Helios</a><a href="/projects/opex-intelli/">OPEX Intelli</a></div>
          <div><span className="mono">Terranile</span><a href="/company/">Company</a><a href="/nigerian-roots/">Our Nigerian roots</a><a href="/research/">Research</a><a href="/news/">Newsroom</a><a href="/perspectives/">Perspectives</a><a href="/announcements/">Announcements</a><a href="/projects/real-assets/">Real estate partnerships</a></div>
          <div><span className="mono">Connect</span><a href="/build/">Build with Terranile</a><a href="/account/">Client account</a><a href="/contact/">Contact</a><a href="/careers/">Careers</a><a href="/legal/">Legal</a><a href="/legal/#privacy">Privacy</a></div>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">terranile</div>
      <div className="footer-bottom"><span>© 2025–{new Date().getFullYear()} Terranile Digital Infrastructure Ltd.</span><span>Originating in Nigeria. Built for global relevance.</span></div>
    </footer>
    <Script src="/site.js" strategy="afterInteractive"/>
    <Script src="/city-film.js" strategy="afterInteractive"/>
    {route==='/'&&<><Script src="/panel-deck.js" strategy="afterInteractive"/></>}
  </>;
}
