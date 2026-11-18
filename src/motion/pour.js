import { pourPoseAt } from './pour-state.js';
const NS='http://www.w3.org/2000/svg';
function node(tag,attrs={}){const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);return n;}
const fract=x=>x-Math.floor(x);
export function mountPour(hero,bottle,controller){
 const svg=node('svg',{'class':'liquid-transition','aria-hidden':'true'});
 const defs=node('defs');
 for(const [id,colors] of [['milk-jet',['#d8d6cc','#fffffa','#f4f1ea','#c9c8bc']],['milk-pool',['#fffef8','#f7f4ed','#f4f1ea']]]){
  const g=node('linearGradient',{id,x1:'0%',y1:'0%',x2:id==='milk-jet'?'100%':'0%',y2:id==='milk-jet'?'0%':'100%'});
  colors.forEach((c,i)=>g.append(node('stop',{offset:`${i/(colors.length-1)*100}%`,'stop-color':c})));defs.append(g);
 }
 const material=node('pattern',{id:'milk-material',width:1,height:1,patternContentUnits:'objectBoundingBox'});
 material.append(node('image',{href:new URL('./assets/liquid/milk-surface.webp',document.baseURI).href,width:1,height:1,preserveAspectRatio:'none'}));defs.append(material);
 const coat=node('path',{fill:'url(#milk-jet)',opacity:.2});
 const jet=node('path',{fill:'url(#milk-material)'}),shine=node('path',{fill:'none',stroke:'#fffffa','stroke-width':2,opacity:.45});
 const waveBand=node('path',{fill:'#f4f1ea'});
 const pool=node('path',{fill:'#f4f1ea'}),rim=node('path',{fill:'none',stroke:'#fffef9','stroke-width':3,opacity:.9});
 const splash=node('g'),bubbles=node('g'),crown=node('path',{fill:'url(#milk-jet)',opacity:.85});splash.append(crown);svg.append(defs,jet,coat,shine,waveBand,pool,rim,bubbles,splash);hero.parentElement.append(svg);
 const drops=Array.from({length:20},()=>{const e=node('ellipse',{fill:'#fffdf5'});splash.append(e);return e;});
 const air=Array.from({length:20},()=>{const e=node('circle',{fill:'#fffefa',stroke:'#d5d2c7','stroke-width':.8});bubbles.append(e);return e;});
 const art=hero.querySelector('.bottle-local'),position=hero.querySelector('.bottle-position');
 let geometry,phase;
 function measure(){
  phase=null;
  const prior=bottle.style.transform,localPrior=art.style.transform;
  bottle.style.transform='none';art.style.transform='none';
  const frame=hero.getBoundingClientRect(),box=art.getBoundingClientRect();
  const matrix=new DOMMatrix(getComputedStyle(position).transform);
  geometry={w:hero.clientWidth,h:hero.clientHeight,base:Math.atan2(matrix.b,matrix.a)*180/Math.PI,
   cx:box.x+box.width/2-frame.x,cy:box.y+box.height/2-frame.y,
   artW:art.offsetWidth,artH:art.offsetHeight,headerHeight:hero.querySelector('.site-header').offsetHeight};
  bottle.style.transform=prior;art.style.transform=localPrior;
  hero.style.opacity='1';
  svg.setAttribute('viewBox',`0 0 ${geometry.w} ${geometry.h}`);
  svg.style.clipPath=`inset(${geometry.headerHeight}px 0 0)`;
 }
 return {
 measure,
 render(p){
  const pose=pourPoseAt(p),{w,h,base,cx,cy,artW,artH,headerHeight}=geometry;
  pose.contentInset=pose.fill>=1?0:Math.min(h,h*(1-pose.fill)+Math.sin(Math.PI*pose.fill)*(w<600?14:23)+4);
  const rotation=(110-base)*pose.tilt,dx=0,scale=w<600?1-.16*pose.tilt:1;
  const dy=-24*pose.tilt-pose.fill*h*.65,theta=rotation*Math.PI/180;
  bottle.style.transform=`translate(${dx}px,${dy}px) rotate(${rotation}deg) scale(${scale})`;
  bottle.style.visibility=p<.89?'visible':'hidden';controller?.setScrollProgress(pose.cap,p>0);
  const centerX=w/2+scale*((cx-w/2)*Math.cos(theta)-(cy-h/2)*Math.sin(theta))+dx;
  const centerY=h/2+scale*((cx-w/2)*Math.sin(theta)+(cy-h/2)*Math.cos(theta))+dy;
  const a=(base+rotation)*Math.PI/180,lip=artW*.025*scale,neck=artH*.402*scale;
  const x=centerX+Math.cos(a)*lip+Math.sin(a)*neck;
  const y=centerY+Math.sin(a)*lip-Math.cos(a)*neck;
  const idle=p<=.26?'dry':pose.fill===1?'finished':null;
  if(idle){
    if(phase!==idle){
      for(const path of [jet,coat,shine,waveBand,pool,rim,crown])path.setAttribute('d','');
      splash.style.display='none';bubbles.style.display='none';svg.style.visibility='hidden';
      hero.style.clipPath=idle==='dry'?'none':'inset(0 0 100% 0)';
    }
    phase=idle;return pose;
  }
  phase='pouring';svg.style.visibility='visible';
  const level=h*(1-pose.fill),gravity=1450,vx=100*Math.sin(a),vy=Math.max(25,-100*Math.cos(a));
  const fall=Math.max(20,level-y+15),time=(-vy+Math.sqrt(vy*vy+2*gravity*fall))/gravity;
  const endTime=time*pose.front,opening=artW*.042*scale*pose.stream;
  const left=[],right=[],center=[];
  for(let i=0;i<=40;i++){
   const t=endTime*i/40,speed=Math.hypot(vx,vy+gravity*t);
   const xx=x+vx*t+Math.sin(t*22-p*31)*Math.min(4,t*5)*pose.stream;
   const yy=y+vy*t+.5*gravity*t*t;
   const r=opening*Math.sqrt(110/Math.max(110,speed))*(1+.13*Math.sin(t*37-p*53));
   const nx=(vy+gravity*t)/speed,ny=-vx/speed;
   left.push([xx-r*nx,yy-r*ny]);right.push([xx+r*nx,yy+r*ny]);center.push([xx-r*.28*nx,yy-r*.28*ny]);
  }
  const points=arr=>arr.map(([a,b])=>`${a.toFixed(2)},${b.toFixed(2)}`).join(' L');
  const last=right.at(-1),tipRadius=Math.max(.2,opening*.5);
  const shape=pose.stream>.002?`M${points(left)} A${tipRadius} ${tipRadius} 0 0 0 ${last[0]} ${last[1]} L${points(right.reverse().slice(1))} Z`:'';
  jet.setAttribute('d',shape);coat.setAttribute('d',shape);
  const sourceFade=Math.max(0,Math.min(1,(y-headerHeight)/50));
  jet.style.opacity=String(sourceFade);coat.style.opacity=String(sourceFade*.2);shine.style.opacity=String(sourceFade*.45);
  shine.setAttribute('d',pose.stream>.02?`M${points(center)}`:'');
  const impactX=x+vx*time,impact=sourceFade>.1&&pose.front>.999&&pose.stream>.02&&pose.fill>0&&pose.fill<.97;
  const amplitude=Math.sin(Math.PI*pose.fill)*(w<600?14:23);
  const surface=[];
  for(let xx=0;xx<=w+8;xx+=8){
   const distance=xx-impactX;
   const wave=amplitude*(.55*Math.sin(xx*.012+p*28)+.25*Math.sin(xx*.029-p*43));
   const ring=impact?Math.exp(-Math.abs(distance)/140)*Math.sin(Math.abs(distance)*.05-p*76)*amplitude*.65:0;
   surface.push([xx,level+wave+ring]);
  }
  const edge=`M${points(surface)}`;
  // The real project is uncovered by the rising surface, avoiding an opaque
  // white interstitial and the subsequent washed-out whole-page crossfade.
  const reveal=pose.fill>0?`inset(0 0 ${Math.max(0,h-level-amplitude-3)}px 0)`:'none';
  waveBand.setAttribute('d',pose.fill>0?`${edge} L${w} ${level+amplitude+4} L0 ${level+amplitude+4}Z`:'');
  hero.style.clipPath=reveal;
  pool.style.opacity='1';
  const kick=(w<600?17:28)*(0.75+.25*Math.sin(p*83));
  crown.setAttribute('d',impact?`M${impactX-8} ${level+5} Q${impactX-14} ${level-8} ${impactX-25} ${level-kick} Q${impactX-32} ${level-kick-3} ${impactX-28} ${level-kick+7} Q${impactX-18} ${level} ${impactX-38} ${level-3} Q${impactX-22} ${level+7} ${impactX-8} ${level+5} M${impactX+6} ${level+5} Q${impactX+18} ${level-5} ${impactX+25} ${level-kick*.8} Q${impactX+31} ${level-kick*.8-4} ${impactX+29} ${level-kick*.8+5} Q${impactX+18} ${level+1} ${impactX+38} ${level-2} Q${impactX+22} ${level+8} ${impactX+6} ${level+5}`:'');
  pool.setAttribute('d',pose.fill>0?`${edge} L${w} ${h+40} L0 ${h+40} Z`:'');
  rim.setAttribute('d',pose.fill>0&&pose.fill<.99?edge:'');
  splash.style.display=impact?'':'none';
  if(impact)drops.forEach((e,i)=>{
   const age=fract(p*8+i*.618),t=age*.6,sign=i%2?1:-1;
   const xx=impactX+sign*(35+i*7)*t,yy=level-(90+(i%4)*35)*t+380*t*t;
   const visible=impact&&yy<level-2;
   e.setAttribute('cx',xx);e.setAttribute('cy',yy);e.setAttribute('rx',2.3+(i%3));e.setAttribute('ry',4+(i%2)*2);
   e.setAttribute('transform',`rotate(${sign*(age*65-30)} ${xx} ${yy})`);e.style.opacity=visible?String((1-age)*.85):'0';
  });
  const airVisible=pose.fill>.02&&pose.fill<.96;
  bubbles.style.display=airVisible?'':'none';
  if(airVisible)air.forEach((e,i)=>{
   const age=fract(p*4+i*.381),xx=impactX+Math.sin(i*8.3)*Math.min(w*.7,300)+Math.sin(p*30+i)*9;
   const yy=level+18+(1-age)*(55+i%5*23),r=2+(i%4)*1.2;
   e.setAttribute('cx',xx);e.setAttribute('cy',yy);e.setAttribute('r',r);e.style.opacity=pose.fill>.02&&pose.fill<.96&&yy<h-5?String(.25+.4*age):'0';
  });
  hero.style.opacity='1';
  return pose;
 },
 destroy(){svg.remove();hero.style.opacity='';hero.style.clipPath='';}
 };
}
