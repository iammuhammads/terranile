// Set preview to an optimized, approved product screenshot when one is available.
// Until then, keep the existing artwork explicitly labelled as an illustration.
export const ecosystemProducts = [
  {slug:'avan',name:'AVAN',logo:'avan-logo-clean.png',category:'Real-estate infrastructure'},
  {slug:'avanbnb',name:'AvanBnB',logo:'avanbnb-logo-clean.png',category:'Hospitality'},
  {slug:'helios',name:'Project Helios',logo:'helios-logo-clean.png',category:'Biomedical intelligence'},
  {slug:'opex-intelli',name:'OPEX Intelli',logo:'opex-logo-clean.png',category:'Quantitative research'}
];
export function ecosystem(projects){
  const entries=ecosystemProducts.map(item=>({...projects.find(p=>p.slug===item.slug),...item}));
  return `<section class="section ecosystem" data-ecosystem aria-labelledby="ecosystem-heading">
    <div class="ecosystem-heading"><span class="eyebrow">Across Terranile</span><h2 id="ecosystem-heading">What we build</h2><p>Independent initiatives. A shared ambition to build what lasts.</p></div>
    <div class="ecosystem-canvas" data-ecosystem-canvas>${entries.map((p,i)=>`<article class="ecosystem-panel ${i===0?'is-active':''}" id="ecosystem-${p.slug}" data-ecosystem-panel ${i===0?'':'hidden'} aria-labelledby="ecosystem-title-${p.slug}">
      <figure class="ecosystem-visual"><img src="/assets/${p.preview||p.image}" alt="${p.preview?`${p.name} product preview`:p.alt}" width="1672" height="941" loading="lazy"><figcaption>${p.preview?'Product preview':p.slug==='helios'?'Conceptual biomedical study':'Illustrative visual / '+p.category}</figcaption></figure>
      <div class="ecosystem-caption"><div><span class="eyebrow">${p.category}</span><h3 id="ecosystem-title-${p.slug}">${p.name}</h3><p>${p.summary}</p></div><div class="ecosystem-actions"><a class="pill-link" href="${p.website||p.path}" ${p.website?'target="_blank" rel="noopener noreferrer"':''}>Explore ${p.name}<span aria-hidden="true"> ↗</span></a>${p.website?`<a class="text-link" href="${p.path}">About the initiative</a>`:''}</div></div>
    </article>`).join('')}</div>
    <div class="portfolio-logos"><div class="portfolio-logo-row" role="group" aria-label="Choose a project">${entries.map((p,i)=>`<button type="button" class="ecosystem-selector ${i===0?'is-active':''}" data-ecosystem-select="${i}" aria-pressed="${i===0}" aria-controls="ecosystem-${p.slug}"><img src="/assets/${p.logo}" alt="" width="160" height="120" loading="lazy"><span>${p.name}</span><small>${p.category}</small></button>`).join('')}</div></div>
    <noscript><p>Explore our initiatives: ${entries.map(p=>`<a href="${p.path}">${p.name}</a>`).join(' ? ')}</p></noscript>
  </section>`;
}
