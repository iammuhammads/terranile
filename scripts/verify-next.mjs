import assert from 'node:assert/strict';
import fs from 'node:fs';

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
for(const [route,page] of Object.entries(pages)){
  const response=await fetch(origin+route);
  assert.equal(response.status,200,route);
  const html=await response.text();
  assert.ok(html.includes(page.title.replaceAll('&','&amp;')),`Title: ${route}`);
  assert.ok(html.includes('id="main"'),`Main content: ${route}`);
  assert.ok(html.includes('rel="canonical"'),`Canonical: ${route}`);
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
const sitemap=await fetch(origin+'/sitemap.xml');assert.equal(sitemap.status,200);assert.ok((await sitemap.text()).includes('https://terranile.com/nigerian-roots/'));
for(const asset of ['nigeria-independence.mp4','lagos-capital.mp4','helios-lab.mp4','helios-sample.mp4']){
  const response=await fetch(origin+'/assets/'+asset,{headers:{Range:'bytes=0-31'}});
  assert.equal(response.status,206,asset);assert.equal((await response.arrayBuffer()).byteLength,32,asset);
  assert.ok(response.headers.get('content-type').includes('video/mp4'),asset);
}
console.log(`Verified ${Object.keys(pages).length} Next.js pages, native redirects, 404, server health API, sitemap and four video range responses at ${origin}.`);
