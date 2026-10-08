import assert from 'node:assert/strict';
import {services,validateBrief,enquiryEmail} from '../lib/commissioning.ts';
const origin=process.env.TEST_ORIGIN||'http://127.0.0.1:5174';
const brief={service:'website',name:'Test Client',email:'client@example.com',company:'Test Company',title:'Project test',description:'A custom platform for managing our client workflow and reporting.',budget:10000,timeline:'Within 1–3 months'};
for(const service of services){
  assert.ok(validateBrief({...brief,service:service.id,budget:service.minimum}).brief);
  assert.ok(validateBrief({...brief,service:service.id,budget:service.minimum-1}).error);
}
assert.ok(validateBrief({...brief,email:'bad-email'}).error);
assert.ok(validateBrief({...brief,description:'Too short'}).error);
assert.ok(validateBrief({...brief,budget:NaN}).error);
assert.ok(validateBrief({...brief,service:'unknown'}).error);
assert.ok(enquiryEmail(brief).href.startsWith('mailto:info@terranile.com?'));
assert.ok(decodeURIComponent(enquiryEmail(brief).href).includes('Project test'));
const build=await fetch(origin+'/build/');assert.equal(build.status,200);
const html=await build.text();
for(const token of ['$10,000','$20,000','Your ambition.','application/ld+json','https://terranile.com/build/','/assets/capital-servers.jpg'])assert.ok(html.includes(token),token);
assert.ok(!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(html));
const account=await fetch(origin+'/account/');assert.equal(account.status,200);
assert.match(await account.text(),/name="robots" content="noindex, nofollow"/);
const dashboard=await fetch(origin+'/account/projects/',{redirect:'manual'});
assert.equal(dashboard.status,307);assert.equal(new URL(dashboard.headers.get('location'),origin).pathname,'/account/');
const csrf=await fetch(origin+'/api/project-requests/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(brief)});assert.equal(csrf.status,403);
const type=await fetch(origin+'/api/project-requests/',{method:'POST',headers:{Origin:origin,'Content-Type':'text/plain'},body:'test'});assert.equal(type.status,415);
const unconfigured=await fetch(origin+'/api/project-requests/',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(brief)});assert.ok([401,503].includes(unconfigured.status),'An unauthenticated request must not create a saved project');
assert.equal(unconfigured.headers.get('x-robots-tag'),'noindex');assert.ok(unconfigured.headers.get('cache-control').includes('no-store'));
for(const path of ['/assets/capital-servers.jpg','/build.css'])assert.equal((await fetch(origin+path)).status,200);
console.log('Verified commissioning pricing boundaries, brief validation, public metadata, private-route behavior, CSRF, unauthenticated fail-closed submission and email handoff.');
