import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';

const origin=process.env.TEST_ORIGIN||'http://127.0.0.1:5174';
const pages=JSON.parse(fs.readFileSync('generated/pages.json','utf8'));
const homepage=await (await fetch(origin+'/')).text();
assert.ok(!homepage.includes('What we build')&&!homepage.includes('data-ecosystem-panel')&&!homepage.includes('/ecosystem.js'),'Removed product showcase');
for(const logo of ['avan','avanbnb','helios','opex'])assert.ok(homepage.includes(`/assets/${logo}-logo-clean.png`),`${logo}: retained logo`);
for(const theme of ['light','dark']){
  assert.ok(homepage.includes(`(prefers-color-scheme: ${theme})`));
  const response=await fetch(origin+`/assets/favicon-${theme}.png`);assert.equal(response.status,200);assert.ok(response.headers.get('content-type').includes('image/png'));
}
const contact=await(await fetch(origin+'/contact/')).text();assert.ok(contact.includes('abuja-fog-16237804.jpg'),'Real Abuja photograph');
const research=await(await fetch(origin+'/research/opex-001/')).text();
for(const text of ['11.18','13.39','0.748','22.28','Historical simulated results','untouched holdout','not live investment performance'])assert.ok(research.includes(text),`Research qualification or result: ${text}`);
for(const route of ['/','/research/','/projects/opex-intelli/'])assert.ok((await(await fetch(origin+route)).text()).includes('href="/research/opex-001/"'),`Research entry point: ${route}`);
for(const name of ['risk-return','growth-drawdown','rolling-risk']){const response=await fetch(origin+`/assets/research/${name}.png`);assert.equal(response.status,200);assert.ok(response.headers.get('content-type').includes('image/png'));}
for(const file of ['OPEX-Research-001.pdf','OPEX-Research-001-evaluation.json','OPEX-Research-001-monthly-returns.csv','OPEX-Research-001-manifest.json'])assert.equal((await fetch(origin+'/'+file)).status,404,`Internal package must remain unavailable: ${file}`);
const company=await(await fetch(origin+'/company/')).text();assert.ok(company.includes('Founded in 2025'),'Correct founding year');assert.ok(homepage.includes('2025–'),'Copyright begins in founding year');
for(const [route,page] of Object.entries(pages)){
  const response=await fetch(origin+route);
  assert.equal(response.status,200,route);
  const html=await response.text();
  assert.ok(html.includes(page.title.replaceAll('&','&amp;')),`Title: ${route}`);
  assert.ok(html.includes('id="main"'),`Main content: ${route}`);
  const canonical=html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
  assert.equal(canonical?.[1],`https://terranile.com${route}`,`Exact canonical: ${route}`);
  assert.ok(!/<meta[^>]*name="robots"[^>]*content="[^"]*noindex/.test(html),`Indexable: ${route}`);
  assert.ok(!response.headers.get('x-robots-tag')?.includes('noindex'),`Indexable header: ${route}`);
  assert.ok(html.includes('property="og:image"')&&html.includes('content="summary_large_image"'),`Social image: ${route}`);
  const schemaScripts=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.equal(schemaScripts.length,1,`JSON-LD script: ${route}`);
  const data=JSON.parse(schemaScripts[0][1]);
  assert.equal(data['@context'],'https://schema.org');
  if(route==='/'){
    assert.ok(data['@graph'].some(node=>node['@type']==='Organization'&&node.url==='https://terranile.com/'));
    assert.ok(data['@graph'].some(node=>node['@type']==='WebSite'));
  }else{
    const crumbs=data['@graph'].find(node=>node['@type']==='BreadcrumbList');
    assert.equal(crumbs.itemListElement.at(-1).item,`https://terranile.com${route}`);
    assert.ok(html.includes('aria-label="Breadcrumb"'),`Visible breadcrumbs: ${route}`);
  }
  if(route==='/research/opex-001/')assert.ok(data['@graph'].some(node=>node['@type']==='ScholarlyArticle'&&node.headline===page.title.replace(/ — Terranile$/,'')));
  if(route.startsWith('/perspectives/')&&route!=='/perspectives/')assert.ok(data['@graph'].some(node=>node['@type']==='Article'));

  assert.ok(html.includes('/site.js'),`Interactions: ${route}`);
}
for(const [route,target] of [['/companies/','/projects/'],['/companies/avan/','/avan/']]){
  const response=await fetch(origin+route,{redirect:'manual'});
  assert.equal(response.status,308,route);
  assert.equal(new URL(response.headers.get('location'),origin).pathname,target);
}
const missing=await fetch(origin+'/missing-page-check/');
assert.equal(missing.status,404,'Unknown route must return HTTP 404');
assert.ok((await missing.text()).includes('A different direction.'));
const health=await fetch(origin+'/api/health/');
assert.equal(health.status,200);assert.deepEqual(await health.json(),{status:'ok',service:'terranile-web'});
assert.equal(health.headers.get('cache-control'),'no-store');
assert.equal(health.headers.get('x-robots-tag'),'noindex');
const sitemap=await fetch(origin+'/sitemap.xml');assert.equal(sitemap.status,200);
const sitemapUrls=[...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]);
assert.deepEqual(sitemapUrls.sort(),Object.keys(pages).map(route=>'https://terranile.com'+route).sort(),'Exact sitemap membership');
const robots=await fetch(origin+'/robots.txt');assert.equal(robots.status,200);
assert.match(await robots.text(),/Allow: \/[\s\S]*Sitemap: https:\/\/terranile\.com\/sitemap\.xml/);
const tagged=await(await fetch(origin+'/research/opex-001/?utm_source=check')).text();
assert.ok(tagged.includes('rel="canonical" href="https://terranile.com/research/opex-001/"'),'Query-free canonical');
// Local production server allows exact Host-header verification without touching DNS.
if(new URL(origin).hostname==='127.0.0.1'){
  for(const host of ['www.terranile.com','terranile.vercel.app']){
    for(const route of ['/','/research/opex-001/?utm_source=check','/robots.txt','/sitemap.xml']){
      const redirect=await new Promise((resolve,reject)=>{
        const request=http.get(origin+route,{headers:{Host:host}},response=>{response.resume();resolve(response);});
        request.on('error',reject);
      });
      assert.equal(redirect.statusCode,308,`Host redirect: ${host}${route}`);
      assert.equal(new URL(redirect.headers.location).href,'https://terranile.com'+route,`Host redirect path/query: ${host}${route}`);
    }
  }
}

for(const asset of ['nigeria-independence.mp4','lagos-capital.mp4','helios-lab.mp4','helios-sample.mp4']){
  const response=await fetch(origin+'/assets/'+asset,{headers:{Range:'bytes=0-31'}});
  assert.equal(response.status,206,asset);assert.equal((await response.arrayBuffer()).byteLength,32,asset);
  assert.ok(response.headers.get('content-type').includes('video/mp4'),asset);
}
console.log(`Verified ${Object.keys(pages).length} Next.js pages, native redirects, 404, server health API, sitemap and four video range responses at ${origin}.`);
