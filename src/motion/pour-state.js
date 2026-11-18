const clamp=p=>Math.max(0,Math.min(1,Number.isFinite(p)?p:0));
const ease=(p,a,b)=>{const t=clamp((p-a)/(b-a));return t*t*(3-2*t)};
export function pourPoseAt(progress){
 const p=clamp(progress),q=p;
 return {cap:ease(q,.025,.25),tilt:ease(q,.12,.44),front:ease(p,.26,.38),stream:ease(p,.26,.38)*(1-ease(p,.74,.87)),fill:fillVolumeAt(p),work:ease(p,.76,.85),title:ease(p,.87,.94),details:ease(p,.94,1)};
}

// Integrate delivered flow: steady discharge followed by a smooth shutoff.
export function fillVolumeAt(progress) {
 const p=clamp(progress);
 if(p<=.38)return 0;
 if(p>=.87)return 1;
 if(p<=.74)return (p-.38)/.425;
 const u=(p-.74)/.13;
 const volume=(.36+.13*(u-u*u*u+.5*u*u*u*u))/.425;
 return 1-volume<1e-6?1:volume;
}
