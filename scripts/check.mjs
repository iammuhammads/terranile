import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve('dist');
const files=fs.readdirSync(root,{recursive:true}).filter(f=>f.endsWith('.html'));
const errors=[];
for(const file of files){const html=fs.readFileSync(path.join(root,file),'utf8');
  if((html.match(/<h1[ >]/g)||[]).length!==1)errors.push(`${file}: expected one h1`);
  for(const tag of ['<title>','name="description"','<main','<header','<footer','lang="en"','rel="canonical"'])if(!html.includes(tag))errors.push(`${file}: missing ${tag}`);
  for(const m of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)){let href=m[1];if(!href.startsWith('/'))continue;let target=path.join(root,href);if(href.endsWith('/'))target=path.join(target,'index.html');if(!fs.existsSync(target))errors.push(`${file}: missing ${href}`)}
  for(const m of html.matchAll(/<img\b[^>]*>/g)){for(const attr of ['alt=','width=','height='])if(!m[0].includes(attr))errors.push(`${file}: img missing ${attr}`)}
  for(const match of html.matchAll(/href="((?:\/|#)[^"]*)"/g)){const link=match[1];if(!link.includes('#'))continue;const url=new URL(link,'https://terranile.example/'+file.replaceAll('\\','/'));const fragment=decodeURIComponent(url.hash.slice(1));if(!fragment)continue;let target=link.startsWith('#')?path.join(root,file):path.join(root,url.pathname);if(url.pathname.endsWith('/'))target=path.join(target,'index.html');if(fs.existsSync(target)&&!fs.readFileSync(target,'utf8').includes(`id="${fragment}"`))errors.push(`${file}: missing link destination #${fragment}`)}
}
new vm.Script(fs.readFileSync('dist/site.js','utf8'));
new vm.Script(fs.readFileSync('dist/panel-deck.js','utf8'));
new vm.Script(fs.readFileSync('dist/city-film.js','utf8'));
new vm.Script(fs.readFileSync('dist/ecosystem.js','utf8'));

if(!fs.readFileSync('dist/contact/index.html','utf8').includes('mailto:info@terranile.com'))errors.push('Missing supplied contact email');
const home=fs.readFileSync('dist/index.html','utf8');
if((home.match(/data-deck-card/g)||[]).length!==6)errors.push('Expected six separate hero media panels');
if((home.match(/data-deck-select="/g)||[]).length!==6||!home.includes('data-deck-pause'))errors.push('Missing hero panel controls');
if(!home.includes('data-deck-video')||!home.includes('Happy birthday, Nigeria.'))errors.push('Missing Nigeria video panel');
if(!home.includes('avanbnb-logo-clean.png'))errors.push('Missing supplied AvanBnB logo');
if(!home.includes('data-city-film')||!home.includes('/nigerian-roots/'))errors.push('Missing capital city film or Nigerian roots link');
if(!fs.existsSync(path.join(root,'nigerian-roots/index.html')))errors.push('Missing Nigerian roots page');
for(const asset of ['lagos-capital.mp4','lagos-capital-poster.jpg'])if(!fs.existsSync(path.join(root,'assets',asset)))errors.push(`Missing Lagos asset ${asset}`);
const contact=fs.readFileSync('dist/contact/index.html','utf8');
if((contact.match(/data-enquiry-role=/g)||[]).length!==8||!contact.includes('data-copy-email'))errors.push('Missing Contact enquiry choices or copy-email fallback');
for(const asset of ['nigeria-independence.mp4','nigeria-independence-poster.jpg'])if(!fs.existsSync(path.join(root,'assets',asset)))errors.push(`Missing Nigeria asset ${asset}`);
if((home.match(/<section /g)||[]).length!==4)errors.push('Homepage should have four focused sections');
for(const route of ['company','research','careers'])if(!fs.readFileSync(`dist/${route}/index.html`,'utf8').includes('page-photograph'))errors.push(`Missing editorial image on ${route}`);
if(!fs.readFileSync('dist/projects/opex-intelli/index.html','utf8').includes('opex-intelli-v3.webp'))errors.push('Missing distinct OPEX visual');
if(!fs.readFileSync('dist/avan/index.html','utf8').includes('https://dist-peach-ten-62.vercel.app/'))errors.push('Missing current AVAN destination');
if(!fs.readFileSync('dist/companies/avanbnb/index.html','utf8').includes('https://avanbnb.com/'))errors.push('Missing AvanBnB destination');
const helios=fs.readFileSync('dist/research/helios/index.html','utf8');
if((helios.match(/data-film-select/g)||[]).length!==2||!helios.includes('preload="none"'))errors.push('Missing deferred Helios film selection');
for(const media of helios.matchAll(/(?:poster|data-film-poster|data-film-src)="([^"]+)"/g))if(!fs.existsSync(path.join(root,media[1])))errors.push(`Missing Helios media ${media[1]}`);
for(const image of ['architecture.jpg','hospitality.jpg']){const file=path.join(root,'assets',image);if(fs.existsSync(file)){const data=fs.readFileSync(file);if(data.length<1000||data[0]!==0xff||data[1]!==0xd8)errors.push(`Invalid JPEG ${image}`)}}
if(home.includes('data-ecosystem-panel')||home.includes('What we build')||home.includes('/ecosystem.js'))errors.push('Removed product showcase must not appear on homepage');
if((home.match(/class="ecosystem-selector"/g)||[]).length!==4)errors.push('Expected four linked initiative logos');
if(!contact.includes('abuja-fog-16237804.jpg'))errors.push('Missing real Abuja contact photograph');
for(const route of ['news','announcements'])if(!fs.readFileSync(`dist/${route}/index.html`,'utf8').includes('newsroom-nav'))errors.push(`Missing newsroom route ${route}`);
if(!home.includes('Built in partnership.')||!fs.readFileSync('dist/projects/real-assets/index.html','utf8').includes('Developer Partnerships'))errors.push('Missing partnership positioning');
if(!fs.readFileSync('dist/projects/opex-intelli/index.html','utf8').includes('https://opex-intelli-frontend-iegh.vercel.app/'))errors.push('Missing OPEX platform link');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log(`Verified ${files.length} pages: local links, assets, metadata, headings, image dimensions, contact email and JavaScript syntax.`);

