import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

// Preserve the approved marketing templates during the framework migration.
// Only these repository-owned templates may become HTML; never inject user/API data.
fs.rmSync('dist',{recursive:true,force:true});
fs.mkdirSync('dist',{recursive:true});
for(const name of fs.readdirSync('public')){
  fs.cpSync(path.join('public',name),path.join('dist',name),{recursive:true});
}
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit'});
execFileSync(process.execPath,['scripts/check.mjs'],{stdio:'inherit'});
const pages={};
const decode=value=>value.replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&lt;','<').replaceAll('&gt;','>');
for(const file of fs.readdirSync('dist',{recursive:true}).filter(file=>file.endsWith('index.html'))){
  const route='/'+file.replaceAll('\\','/').replace(/index\.html$/,'');
  if(route==='/companies/'||route==='/companies/avan/')continue;
  const html=fs.readFileSync(path.join('dist',file),'utf8');
  pages[route]={
    title:decode(html.match(/<title>(.*?)<\/title>/s)[1]),
    description:decode(html.match(/name="description" content="([^"]*)"/)[1]),
    body:html.match(/<main id="main">([\s\S]*?)<\/main>/)[1],
    className:route==='/research/helios/'?'helios-detail':''
  };
}
fs.mkdirSync('generated',{recursive:true});
fs.writeFileSync('generated/pages.json',JSON.stringify(pages));
console.log(`Prepared ${Object.keys(pages).length} Next.js marketing pages.`);
