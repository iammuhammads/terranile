// Add approved, factual updates here. Drafts never appear on the public website.
// Example schema: {slug,type,topic,title,summary,date,paragraphs,status:'published'}.
export const updates=[];
export const updateTopics=['Partnerships','Research releases','Product launches','Company updates'];
export function newsroomNav(active){
  return `<nav class="newsroom-nav" aria-label="Newsroom sections">${[['News','/news/'],['Perspectives','/perspectives/'],['Announcements','/announcements/']].map(([label,path])=>`<a href="${path}" ${active===path?'aria-current="page"':''}>${label}</a>`).join('')}</nav>`;
}
export function updateList(type){
  const published=updates.filter(update=>update.status==='published'&&update.type===type).sort((a,b)=>b.date.localeCompare(a.date));
  return published.length?`<div class="editorial-list">${published.map(update=>`<a class="editorial-row" href="/news/${update.slug}/"><span class="mono">${update.topic} / ${update.date}</span><h3>${update.title}</h3><span>Read update</span></a>`).join('')}</div>`:`<div class="newsroom-empty"><span class="eyebrow">${type==='announcement'?'Official announcements':'Company news'}</span><h2>${type==='announcement'?'Announcements will appear here.':'Updates will appear here.'}</h2><p>${type==='announcement'?'Approved partnership announcements, research releases, product launches and major company updates will be published here.':'Company news and milestones will be published as they are announced.'}</p><a class="text-link" href="/perspectives/">Explore our perspectives</a></div>`;
}
export const newsroomTopics=`<div class="newsroom-topics" aria-label="Areas covered">${updateTopics.map(topic=>`<span>${topic}</span>`).join('')}</div>`;
