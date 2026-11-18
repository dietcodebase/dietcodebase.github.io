import assert from 'node:assert/strict';
import {createServer} from 'vite';
import {chromium} from 'playwright';
import {writeFile} from 'node:fs/promises';
const server=await createServer({server:{host:'127.0.0.1',port:5195}});await server.listen();const browser=await chromium.launch();
const checks=[],errors=[];const check=(v,label)=>{assert.ok(v,label);checks.push(label)};
try{
 const page=await browser.newPage({viewport:{width:1440,height:900}});page.on('pageerror',e=>errors.push(e.message));
 await page.goto(server.resolvedUrls.local[0]);await page.waitForSelector('html.enhanced');await page.waitForTimeout(1000);
 async function mouth(label){
  await page.evaluate(()=>{const s=document.querySelector('[data-tear-scene]');scrollTo({top:(s.offsetHeight-s.querySelector('.scene-stage').offsetHeight)*.5,behavior:'instant'});});await page.waitForTimeout(130);
  const error=await page.evaluate(()=>{
   const art=document.querySelector('.bottle-local'),hero=document.querySelector('.hero'),box=art.getBoundingClientRect(),frame=hero.getBoundingClientRect();
   const m=new DOMMatrix(getComputedStyle(document.querySelector('[data-bottle-scroll]')).transform),base=new DOMMatrix(getComputedStyle(document.querySelector('.bottle-position')).transform);
   const scale=Math.hypot(m.a,m.b),angle=Math.atan2(m.b,m.a)+Math.atan2(base.b,base.a),lip=art.offsetWidth*.025*scale,neck=art.offsetHeight*.402*scale;
   const x=box.x+box.width/2-frame.x+Math.cos(angle)*lip+Math.sin(angle)*neck,y=box.y+box.height/2-frame.y+Math.sin(angle)*lip-Math.cos(angle)*neck;
   const d=document.querySelector('.liquid-transition path').getAttribute('d');
   const first=d.match(/^M([-\d.]+),([-\d.]+)/),last=d.match(/L([-\d.]+),([-\d.]+) Z$/);
   return Math.hypot((+first[1]+ +last[1])/2-x,(+first[2]+ +last[2])/2-y);
  });check(error<.1,`${label}: cached stream origin matches actual rendered mouth within0.1px`);
 }
 await mouth('desktop');await page.setViewportSize({width:390,height:844});await page.waitForTimeout(250);await mouth('phone resize');
 await page.setViewportSize({width:844,height:390});await page.waitForTimeout(250);
 check(await page.locator('.liquid-transition').count()===0,'short landscape uses ordinary flow');
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(250);await mouth('portrait remount');
 await page.evaluate(()=>{location.hash='work'});await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(250);
 check(await page.locator('.liquid-transition').count()===0,'hash plus reduced-motion remount leaves no stale renderer');
 check(await page.locator('.hero').evaluate(e=>e.style.clipPath===''),'destroyed scene does not restore an old clip');
 await page.emulateMedia({reducedMotion:'no-preference'});await page.waitForTimeout(250);await mouth('normal-motion remount');
 await page.goto(server.resolvedUrls.local[0]);await page.waitForSelector('html.enhanced');await page.waitForTimeout(1000);
 await page.keyboard.press('Tab');check(await page.locator('.skip-link').evaluate(e=>e===document.activeElement),'skip remains first keyboard control');
 await page.keyboard.press('Enter');await page.waitForTimeout(100);await page.keyboard.press('Tab');
 check(await page.locator('.bottle-hit').evaluate(e=>e===document.activeElement),'bottle remains reachable directly after skipping header');
 check(errors.length===0,'no lifecycle browser errors');
 console.log(JSON.stringify({passed:true,checks:checks.length}));
}finally{await writeFile('docs/reviews/performance/lifecycle.json',JSON.stringify({checks,errors},null,2));await browser.close();await server.close();}
