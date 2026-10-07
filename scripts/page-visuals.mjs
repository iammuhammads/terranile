const scenes={
  '/capital/':{image:'capital-nairobi',extension:'jpg',alt:'Nairobi skyline with commercial buildings and elevated roads',caption:'Nairobi, Kenya / Real photography of an African city'},
  '/contact/':{image:'lagos-city',extension:'jpg',alt:'High-rise buildings in Lagos Island at sunset',caption:'Lagos, Nigeria / Photograph by Emmanuel Ikwuegbu'},
  '/perspectives/':{image:'capital-servers',extension:'jpg',alt:'Server racks and equipment in a real data centre',caption:'Digital infrastructure / Stock photography by Brett Sayles'},
  '/company/':{image:'construction-owner',extension:'jpg',alt:'Two construction professionals reviewing plans at a building site',caption:'Illustrative fieldwork study / Technology and the physical world'},
  '/research/':{image:'research-people-v3',alt:'Two researchers working in a bright laboratory, viewed from behind with faces hidden',caption:'Illustrative laboratory study / Observation and research'},
  '/careers/':{image:'research-people-v3',alt:'Researchers viewed from behind at their laboratory workbench, faces not visible',caption:'Illustrative study / People behind the work'}
};
export function addPageVisual(route,body){const scene=scenes[route];if(!scene)return body;const end=body.indexOf('</section>')+'</section>'.length;if(end<10)return body;return body.slice(0,end)+`<figure class="page-photograph"><img src="/assets/${scene.image}.${scene.extension||'webp'}" ${scene.extension?'':`srcset="/assets/${scene.image}-mobile.webp 900w, /assets/${scene.image}.webp 1672w"`} sizes="(max-width:640px) 100vw, 90vw" alt="${scene.alt}" width="1672" height="941" loading="lazy"><figcaption class="mono">${scene.caption}</figcaption></figure>`+body.slice(end)}
