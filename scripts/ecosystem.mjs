// Approved public homepage captures are stored locally for fast delivery.
// Helios retains labelled conceptual imagery until an interface is available.
export const ecosystemProducts = [
  {slug:'avan',preview:'avan-homepage.webp',name:'AVAN',logo:'avan-logo-clean.png',category:'Real-estate infrastructure'},
  {slug:'avanbnb',preview:'avanbnb-homepage.webp',name:'AvanBnB',logo:'avanbnb-logo-clean.png',category:'Hospitality'},
  {slug:'helios',name:'Project Helios',logo:'helios-logo-clean.png',category:'Biomedical intelligence'},
  {slug:'opex-intelli',preview:'opex-homepage.webp',name:'OPEX Intelli',logo:'opex-logo-clean.png',category:'Quantitative research'}
];
export function ecosystem(projects){
  const entries=ecosystemProducts.map(item=>({...projects.find(p=>p.slug===item.slug),...item}));
  return `<div class="portfolio-logos ecosystem-logos" role="region" aria-label="Across Terranile"><p class="eyebrow">Across Terranile</p><div class="portfolio-logo-row">${entries.map(p=>`<a class="ecosystem-selector" href="${p.path}" aria-label="Explore ${p.name}"><img src="/assets/${p.logo}" alt="" width="160" height="120" loading="lazy"><span>${p.name}</span><small>${p.category}</small></a>`).join('')}</div></div>`;
}
