import assert from 'node:assert/strict';
import {createServer} from 'vite';
import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
const server=await createServer({server:{host:'127.0.0.1',port:5192}});await server.listen();
const browser=await chromium.launch();const out='screenshots/pour-revision';await mkdir(out,{recursive:true});
const report={checks:[],errors:[]};const check=(v,s)=>{assert.ok(v,s);report.checks.push(s)};
try{
 for(const [width,height] of [[1440,900],[390,844],[320,844],[375,667]]){
  const context=await browser.newContext({viewport:{width,height}}),page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  await page.goto(server.resolvedUrls.local[0]);await page.waitForSelector('html.enhanced');await page.waitForTimeout(950);
  check(!(await page.locator('details').getAttribute('open')),`${width}: project story starts collapsed`);
  check(await page.getByText('Latest project',{exact:false}).count()===1,`${width}: Latest project replaces replay label`);
  check(await page.locator('.hero-foot').count()===0,`${width}: obsolete hero notes removed`);
  const poses=new Map();
  for(const p of [0,.15,.3,.5,.7,.87,.9,.96,1,.96,.9,.87,.7,.5,.3,.15,0]){
   await page.evaluate(p=>{const s=document.querySelector('[data-tear-scene]');scrollTo({top:(s.offsetHeight-s.querySelector('.scene-stage').offsetHeight)*p,behavior:'instant'});},p);
   await page.waitForTimeout(70);
   const state=await page.evaluate(()=>({bottle:document.querySelector('[data-bottle-scroll]').style.cssText,cap:document.querySelector('[data-cap]').style.transform,liquid:[...document.querySelectorAll('.liquid-transition path')].map(p=>p.getAttribute('d')),opacity:document.querySelector('.hero').style.opacity,title:document.querySelector('#work-title').style.transform,support:document.querySelector('#work').style.getPropertyValue('--work-details'),clip:document.querySelector('.hero').style.clipPath,particles:[...document.querySelectorAll('.liquid-transition circle,.liquid-transition ellipse')].filter(e=>e.parentElement.style.display!=='none').map(e=>e.outerHTML)}));
   if([.7,.87,.9].includes(p)&&!poses.has(p)){
    check(await page.locator('[data-work-support]').evaluateAll(es=>es.every(e=>getComputedStyle(e).opacity==='0')),`${width}: ${p} shows title without supporting project content`);
    check(await page.locator('#work-title').evaluate(e=>getComputedStyle(e).opacity==='1'),`${width}: ${p} title stays opaque`);
    if(p>=.87)check(await page.locator('.liquid-transition').evaluate(e=>e.style.visibility==='hidden'),`${width}: ${p} completed fill has no remaining stream`);
   }
   if(p===.96&&!poses.has(p))check(await page.locator('#work').evaluate(e=>Number(e.style.getPropertyValue('--work-details'))>0),`${width}: support enters after fill is complete`);
   if(p===.3&&!poses.has(p)){
    const local=await page.locator('.bottle-local').getAttribute('style');
    await page.locator('.bottle-hit').dispatchEvent('pointerenter',{pointerType:'mouse'});await page.waitForTimeout(80);
    check(await page.locator('.bottle-local').getAttribute('style')===local,`${width}: hover cannot disturb scroll-owned bottle geometry`);
    await page.locator('.bottle-hit').dispatchEvent('pointerleave',{pointerType:'mouse'});
   }
   if(p===.9&&!poses.has(p))check(await page.locator('#work-title').evaluate(e=>{const r=e.getBoundingClientRect();const hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return hit===e||e.contains(hit);}),`${width}: filled surface reveals usable project instead of blank cover`);
   if(poses.has(p)){check(JSON.stringify(state)===poses.get(p),`${width}: exact reversed pour pose ${p}`);}else poses.set(p,JSON.stringify(state));
   if([0,.3,.5,.7,.87,.9,.96,1].includes(p))await page.screenshot({path:`${out}/${width}-${p}.png`});
  }
  await page.locator('.bottle-hit').click();
  await page.waitForFunction(()=>document.querySelector('[data-bottle]').dataset.capState==='open');
  const manual=await page.locator('[data-cap]').evaluate(e=>e.style.transform);
  check(await page.locator('[data-cap]').evaluate(e=>getComputedStyle(e).opacity==='0'),`${width}: completed cap leaves scene rather than hovering`);
  await page.evaluate(()=>{const s=document.querySelector('[data-tear-scene]');scrollTo({top:(s.offsetHeight-s.querySelector('.scene-stage').offsetHeight)*.01,behavior:'instant'});});
  await page.waitForTimeout(90);
  check(await page.locator('[data-cap]').evaluate(e=>e.style.transform)===manual,`${width}: scrolling preserves manually opened cap at handoff`);
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(90);
  check(await page.locator('[data-cap]').evaluate(e=>e.style.transform)===manual,`${width}: reversing retains manually opened cap`);
  if(width>560)check(await page.locator('.masthead').evaluate(e=>{const [a,b]=e.querySelectorAll('span');return b.getBoundingClientRect().left-a.getBoundingClientRect().right>=32;}),'masthead has clear word separation');
  await page.locator('.button-dark').click();await page.waitForTimeout(100);
  check(await page.locator('#work-title').evaluate(e=>e===document.activeElement),`${width}: project shortcut reveals OOTD and focuses heading`);
  await page.locator('details summary').click();
  check(await page.locator('details').evaluate(e=>e.open),`${width}: Explore OOTD opens story`);
  await page.locator('[data-preview-action="start"][data-piece="cream"]').click();
  check(await page.locator('#panel-today').isVisible(),`${width}: disclosed wardrobe remains interactive`);
  await page.locator('[data-preview-action="save"]').click();
  check(await page.locator('#panel-looks').isVisible(),`${width}: disclosed look can be kept`);
  check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}: no horizontal overflow`);
  for(const name of ['Gowrish','Jeswin','Sabi'])check(await page.getByRole('heading',{name,exact:true}).count()===1,`${width}: ${name} preserved`);
  await context.close();
 }
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'}),page=await context.newPage();await page.goto(server.resolvedUrls.local[0]);await page.waitForTimeout(1000);
 check(await page.locator('.liquid-transition').count()===0,'reduced motion uses ordinary flow');
 check(await page.locator('details').evaluate(e=>!e.open),'reduced motion preserves story disclosure');await context.close();
 check(report.errors.length===0,'no browser errors');report.passed=true;
}finally{await writeFile(`${out}/report.json`,JSON.stringify(report,null,2));await browser.close();await server.close();console.log(JSON.stringify({passed:report.passed,checks:report.checks.length,errors:report.errors}));}
