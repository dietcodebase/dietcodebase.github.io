import * as THREE from './vendor/three.module.min.js';
import { GLTFLoader } from './vendor/loaders/GLTFLoader.js';

const canvas = document.querySelector('#bottle');
const section = document.querySelector('.hero-scroll');
const screen = section.querySelector('.hero-screen');
const title = document.querySelector('.hero-wordmark-wrap');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const clamp = x => Math.max(0, Math.min(1, x));
const smooth = x => { x = clamp(x); return x*x*(3-2*x); };
let renderer;
try { renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true}); }
catch { section.classList.add('scene-fallback'); }
if (renderer) {
  renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 650 ? 1.25 : 1.5));
  renderer.shadowMap.enabled = false;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5,5,3,-3,.1,80);
  camera.position.set(0,0,15);
  const studio = new THREE.Scene();
  studio.background = new THREE.Color('#4d4544');
  [[-5,3,5,3,8],[5,1,3,1,7],[0,6,0,8,2]].forEach(([x,y,z,w,h])=>{
    const card = new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide}));
    card.position.set(x,y,z);card.lookAt(0,0,0);studio.add(card);
  });
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(studio,0).texture;
  pmrem.dispose();
  const bottle = new THREE.Group(); scene.add(bottle);
  // Load the supplied model; the packaged scene contains only the bottle and cap.
  const fallback = new THREE.Mesh(new THREE.CapsuleGeometry(.55,3.4,8,24), new THREE.MeshStandardMaterial({color:0x32141b,roughness:.25,metalness:.1}));
  bottle.add(fallback);
  new GLTFLoader().load('assets/bottle/scene.gltf?v=4', (gltf) => {
    const model = gltf.scene;
    model.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(model);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    let labelMesh;
    model.traverse(obj => { if (obj.isMesh && obj.name.includes('Label')) labelMesh = obj; });
    if (!labelMesh) throw new Error('Bottle label mesh missing');
    const labelBounds = new THREE.Box3().setFromObject(labelMesh);
    const normalized = new THREE.Group();
    const scale = 4.8 / size.y;
    model.scale.setScalar(scale);
    model.position.copy(center).multiplyScalar(-scale);
    normalized.add(model);
    model.traverse((obj) => {
      if (!obj.isMesh) return;
      if (obj.name.includes('Lid')) {
        obj.material = new THREE.MeshStandardMaterial({color:0xa91c2d,metalness:.65,roughness:.27});
      } else if (obj.name.includes('Label')) {
        obj.visible = false; // Rebuild this surface continuously to remove its seam.
      } else if (obj.name.includes('Glass')) {
        obj.material = new THREE.MeshPhysicalMaterial({color:0x8a7772,roughness:.1,metalness:0,transmission:.82,thickness:.15,ior:1.48,transparent:true,opacity:.55,depthWrite:false});
        obj.renderOrder=2;
      } else {
        obj.material = new THREE.MeshPhysicalMaterial({color:0x271015,roughness:.17,metalness:.06,clearcoat:1,clearcoatRoughness:.1});
      }
    });
    bottle.remove(fallback); fallback.geometry.dispose(); fallback.material.dispose();
    bottle.add(normalized);
    // Fit the sticker to the source label's measured radius and height.
    const stickerHeight = (labelBounds.max.y - labelBounds.min.y) * scale;
    const stickerRadius = (labelBounds.max.z - center.z) * scale + .002;
    const sticker = new THREE.Mesh(
      new THREE.CylinderGeometry(stickerRadius, stickerRadius, stickerHeight, 96, 1, true),
      new THREE.MeshBasicMaterial({map:texture, side:THREE.DoubleSide, toneMapped:false})
    );
    sticker.position.y = ((labelBounds.min.y + labelBounds.max.y) / 2 - center.y) * scale;
    sticker.rotation.y = Math.PI;
    sticker.renderOrder = 3;
    bottle.add(sticker);
    update(true);
  }, undefined, (error) => { console.error('Bottle model could not load',error); });
  const labelCanvas=document.createElement('canvas'); labelCanvas.width=2048;labelCanvas.height=512;
  const c=labelCanvas.getContext('2d');
  c.fillStyle = '#e9e8e3';
  c.fillRect(0, 0, labelCanvas.width, labelCanvas.height);
  // Match the site wordmark's italic, tightly spaced type and red full stop.
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillStyle = '#181818';
  c.font = 'italic 900 165px Arial, Helvetica, sans-serif';
  if ('letterSpacing' in c) c.letterSpacing = '-10px';
  c.fillText('diet', 1024, 172);
  const secondLine = 'code.';
  const lineWidth = c.measureText(secondLine).width;
  const codeWidth = c.measureText('code').width;
  c.textAlign = 'left';
  const left = 1024 - lineWidth / 2;
  c.fillText('code', left, 342);
  c.fillStyle = '#b91f2b';
  c.fillText('.', left + codeWidth, 342);
  const texture=new THREE.CanvasTexture(labelCanvas);texture.colorSpace=THREE.SRGBColorSpace;texture.wrapS=THREE.RepeatWrapping;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());

  const shadowCanvas=document.createElement('canvas');shadowCanvas.width=128;shadowCanvas.height=256;
  const sc=shadowCanvas.getContext('2d');const g=sc.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(28,12,14,.32)');g.addColorStop(.45,'rgba(28,12,14,.18)');g.addColorStop(1,'rgba(28,12,14,0)');sc.scale(1,2);sc.fillStyle=g;sc.fillRect(0,0,128,128);
  const shadow=new THREE.Mesh(new THREE.PlaneGeometry(2.8,6),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(shadowCanvas),transparent:true,depthWrite:false}));scene.add(shadow);
  scene.add(new THREE.HemisphereLight(0xffffff,0x6f5654,2));
  const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(-3,6,9);key.castShadow=false;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-12;key.shadow.camera.right=12;key.shadow.camera.top=8;key.shadow.camera.bottom=-8;key.shadow.normalBias=.025;key.shadow.radius=4;scene.add(key);
  const rim=new THREE.DirectionalLight(0xffdad1,2);rim.position.set(4,0,4);scene.add(rim);
  let w=0,h=0,queued=false,visible=true,lastP=-1,metrics=null,forceNext=false;
  section.classList.add('scene-ready');
  function measure() {
    const bounds=screen.getBoundingClientRect(), tb=title.getBoundingClientRect();
    w=bounds.width;h=bounds.height;
    camera.left=-3*w/h;camera.right=3*w/h;camera.updateProjectionMatrix();
    metrics={top:section.getBoundingClientRect().top+scrollY,distance:Math.max(1,section.offsetHeight-h),left:tb.left,width:tb.width};
    update(true);
  }
  function render() {
    queued=false;
    if(!metrics || (!visible&&!forceNext))return;
    const p=reduced.matches?1:clamp((scrollY-metrics.top)/metrics.distance);
    if(p===lastP&&!forceNext)return;
    lastP=p;forceNext=false;
    const mobile=w<650, unit=h/6;
    const size=mobile?Math.min(.40,h/1700):.72;
    const halfWidth=.78*size*unit;
    const startX=Math.max(halfWidth+30,w*(mobile?.22:.18));
    const endX=Math.min(w-halfWidth-22,w*.88);
    const roll=smooth(p/.72),settle=smooth((p-.72)/.12);
    const contactX=THREE.MathUtils.lerp(startX,endX,roll);
    // Keep the original camera projection while drawing only the region that
    // can contain the bottle and its soft shadow. The glass transmission pass
    // otherwise allocates and shades a full-screen render target every frame.
    const cropWidth = Math.ceil(3.6 * size * unit + 36);
    const cropHeight = Math.ceil(6.3 * size * unit + 36);
    const cropLeft = Math.round(contactX - cropWidth / 2);
    const cropTop = Math.round(h * (mobile ? .36 : .4) - cropHeight / 2);
    if (canvas.dataset.cropWidth !== String(cropWidth) || canvas.dataset.cropHeight !== String(cropHeight)) {
      renderer.setSize(cropWidth, cropHeight, false);
      canvas.style.width = cropWidth + 'px';
      canvas.style.height = cropHeight + 'px';
      canvas.dataset.cropWidth = cropWidth;
      canvas.dataset.cropHeight = cropHeight;
    }
    canvas.style.transform = `translate3d(${cropLeft}px, ${cropTop}px, 0)`;
    camera.setViewOffset(w, h, cropLeft, cropTop, cropWidth, cropHeight);
    bottle.scale.setScalar(size);
    bottle.position.set((contactX-w/2)/unit,(h/2-h*(mobile?.36:.4))/unit,0);
    const rotation=-(endX-startX)/unit/(.73*size);
    const finalRotation=Math.round(rotation/(Math.PI*2))*Math.PI*2;
    bottle.rotation.set(0,THREE.MathUtils.lerp(rotation*roll,finalRotation,settle),THREE.MathUtils.lerp(-.12,.08,settle));
    shadow.scale.set(size*.75,size*.85,1);shadow.position.copy(bottle.position);shadow.position.x+=.035;shadow.position.y-=.04;shadow.position.z=-.8;shadow.rotation.z=bottle.rotation.z;
    const reveal=clamp((contactX-metrics.left)/metrics.width);
    screen.style.setProperty('--reveal',reduced.matches?1:reveal);
    screen.style.setProperty('--cue',1-smooth(p/.15));
    const debugStart = performance.now();
    renderer.render(scene,camera);
    canvas.dataset.perf = JSON.stringify({ms:performance.now()-debugStart,calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,pixelRatio:renderer.getPixelRatio(),width:canvas.width,height:canvas.height});
  }
  function update(force=false){forceNext ||= force===true;if(!queued&&(visible||forceNext)){queued=true;requestAnimationFrame(render);}}
  addEventListener('scroll',()=>{if(!reduced.matches)update();},{passive:true});
  new ResizeObserver(measure).observe(screen);
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)update(true);}).observe(screen);
  reduced.addEventListener('change',measure);
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();section.classList.remove('scene-ready');section.classList.add('scene-fallback');});
  measure();
}
