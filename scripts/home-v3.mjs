import {researchFeature} from './opex-research.mjs';
import {ecosystem} from './ecosystem.mjs';
import {capitalIntro} from './capital.mjs';
export function home({projects}){
const find=slug=>projects.find(p=>p.slug===slug);
const cards=[
{id:'opportunities',tab:'₦14B opportunities',title:'₦14B in Real Estate Opportunities',copy:'Explore high-value residential, land and development opportunities in Nigeria.',image:'abuja-fog-16237804.jpg',width:1800,height:1080,alt:'Real aerial photography of Abuja, Nigeria, by Stuffedbox NG',path:'/opportunities/',cta:'Explore opportunities'},
{id:'terranile',title:'Terranile',copy:'Technology, intelligence and infrastructure built for the long term.',image:'terranile-hero.webp',mobile:'terranile-hero-mobile.webp',width:1944,height:809,alt:'Conceptual titanium structure across a calm waterfront',path:'/company/',cta:'Our company'},
...['avan','helios','opex-intelli','avanbnb'].map(slug=>{const p=find(slug);return {id:p.slug,title:p.name,copy:p.summary,image:p.image,mobile:p.image.endsWith('.webp')?p.image.replace('.webp','-mobile.webp'):null,width:1672,height:941,alt:p.alt,path:p.path,website:p.website,cta:'Learn more'}})
];
return `<section class="panel-hero" aria-labelledby="hero-heading" data-panel-deck>
<div class="deck-heading"><h1 id="hero-heading">We build infrastructure for what comes next.</h1></div>
<div class="deck-viewport" role="region" aria-roledescription="carousel" aria-label="Terranile companies and research" data-deck-viewport>
  <div class="deck-track" data-deck-track>${cards.map((card,i)=>`<article class="deck-card ${card.id==='opportunities'?'deck-card--opportunities':''}" id="hero-${card.id}" role="group" aria-roledescription="slide" aria-label="${i+1} of ${cards.length}: ${card.title}" data-deck-card>
    <a class="deck-image-link" href="${card.path}" aria-label="Explore ${card.title}" tabindex="${i===0?'0':'-1'}">${card.video?`<video class="deck-video" data-deck-video data-video-src="/assets/${card.video}" poster="/assets/${card.poster}" muted loop playsinline preload="none" aria-label="Nigeria Independence Day celebration film"></video>`:`<img src="/assets/${card.image}" ${card.mobile?`srcset="/assets/${card.mobile} 900w, /assets/${card.image} ${card.width}w" sizes="(max-width:640px) calc(100vw - 32px), (min-width:1680px) 1400px, (min-width:1280px) 1200px, calc(100vw - 88px)"`:''} alt="${card.alt}" width="${card.width}" height="${card.height}" draggable="false" ${i===0?'fetchpriority="high"':'loading="lazy"'}>`}</a>
    <div class="deck-card-content"><div>${card.id==='opportunities'?`<h2 class="deck-opportunity-title"><span class="deck-opportunity-number">₦14B</span><span class="deck-opportunity-label">in Real Estate Opportunities</span><span class="deck-opportunity-meta">Indicative aggregate offering value</span></h2>`:`<h2>${card.title}</h2>`}<p>${card.copy}</p></div><div class="deck-actions"><a href="${card.path}" tabindex="${i===0?'0':'-1'}">${card.cta}</a>${card.website?`<a href="${card.website}" target="_blank" rel="noopener noreferrer" tabindex="${i===0?'0':'-1'}">Open platform</a>`:''}</div></div>
  </article>`).join('')}</div>
</div>
<div class="deck-controls"><div class="deck-tabs" aria-label="Choose featured panel">${cards.map((card,i)=>`<button class="deck-tab ${i===0?'is-active':''}" type="button" data-deck-select="${i}" aria-pressed="${i===0?'true':'false'}" aria-controls="hero-${card.id}">${card.tab||card.title}<span class="deck-progress" aria-hidden="true"><span></span></span></button>`).join('')}</div><div class="deck-extra"><button type="button" class="deck-pause" data-deck-pause aria-pressed="false">Pause</button><a class="text-link" href="/projects/">Explore more</a></div></div>
<span class="sr-only" role="status" aria-live="polite" data-deck-status></span>
</section>
<section class="section opportunity-spotlight" aria-labelledby="opportunity-heading">
  <div class="opportunity-copy">
    <span class="eyebrow">AVAN / Real estate infrastructure</span>
    <h2 id="opportunity-heading"><a href="/opportunities/" aria-label="Explore ₦14 billion in real estate opportunities"><span class="opportunity-figure">₦14B</span><span class="opportunity-headline">in Real Estate<br>Opportunities.</span></a></h2>
    <p class="opportunity-intro">Explore selected residential, land and development opportunities in Nigeria. Connect with our team to discuss what is available, the purchase process and possibilities beyond acquisition.</p>
    <p class="opportunity-journey">From property discovery to what comes next.</p>
    <a class="opportunity-link" href="/opportunities/">Explore opportunities &amp; contact us <span aria-hidden="true">↗</span></a>
    <p class="opportunity-disclosure">₦14B is an indicative aggregate offering value, subject to pricing, availability and verification. It does not represent assets owned by Terranile or completed transactions.</p>
  </div>
  <div class="opportunity-gallery" aria-label="Real photography of Nigerian cities and real-estate settings">
    <figure class="opportunity-photo opportunity-photo-main"><img src="/assets/abuja-fog-16237804.jpg" alt="Real aerial photograph of Abuja, Nigeria, showing the urban landscape through morning fog" width="1800" height="1080" loading="lazy"><figcaption>Abuja, Nigeria / Photography by Stuffedbox NG</figcaption></figure>
    <div class="opportunity-photo-row">
      <figure class="opportunity-photo"><img src="https://images.unsplash.com/photo-1643643704183-f7a8ede67efa?auto=format&amp;fit=crop&amp;w=1100&amp;q=80" alt="Real residential buildings along a street in Abuja, Nigeria" width="1100" height="760" loading="lazy" referrerpolicy="no-referrer"><figcaption>Abuja homes / Inatimi Nathus</figcaption></figure>
      <figure class="opportunity-photo"><img src="/assets/construction-owner.jpg" alt="Construction professionals reviewing building plans at a construction site" width="1408" height="768" loading="lazy"><figcaption>Construction practice / Field photography</figcaption></figure>
    </div>
    <p class="opportunity-photo-note">Location and construction photography is illustrative and does not show specific properties on offer.</p>
  </div>
</section>
${capitalIntro}
<section class="section selected-perspectives"><div class="section-head"><div><span class="eyebrow">News / Perspectives / Announcements</span><h2>Ideas and updates.</h2></div><a class="text-link" href="/news/">Explore the newsroom</a></div>${researchFeature(true)}<div class="editorial-list"><a class="editorial-row" href="/perspectives/trust-is-infrastructure/"><span class="mono">Infrastructure</span><h3>Trust is infrastructure.</h3><span>Read perspective</span></a><a class="editorial-row" href="/perspectives/research-beyond-the-application/"><span class="mono">Research</span><h3>Research beyond the application.</h3><span>Read perspective</span></a></div></section>${ecosystem(projects)}`;
}
