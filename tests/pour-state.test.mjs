import test from 'node:test';
import assert from 'node:assert/strict';
import {pourPoseAt} from '../src/motion/pour-state.js';
test('pour phases open before filling and finish on project',()=>{
 assert.equal(pourPoseAt(0).cap,0);assert.equal(pourPoseAt(0).fill,0);
 assert.equal(pourPoseAt(.3).cap,1);assert.equal(pourPoseAt(.3).fill,0);
 assert.equal(pourPoseAt(1).fill,1);assert.equal(pourPoseAt(1).work,1);
});
test('pour retraces exactly and stays finite at boundaries',()=>{
 const sequence=[0,.2,.5,.8,1,.8,.5,.2,0];const seen=new Map();
 for(const p of sequence){const pose=pourPoseAt(p);if(seen.has(p))assert.deepEqual(pose,seen.get(p));seen.set(p,pose);}
 assert.deepEqual(pourPoseAt(-2),pourPoseAt(0));assert.deepEqual(pourPoseAt(2),pourPoseAt(1));
});
test('pool volume rises with delivered flow and stops when flow stops',async()=>{
 const {fillVolumeAt}=await import('../src/motion/pour-state.js');
 assert.equal(fillVolumeAt(.38),0);assert.equal(fillVolumeAt(.87),1);
 const a=fillVolumeAt(.5)-fillVolumeAt(.45),b=fillVolumeAt(.6)-fillVolumeAt(.55);
 assert.ok(Math.abs(a-b)<1e-10);
 let previous=0;for(let p=0;p<=1;p+=.01){const next=fillVolumeAt(p);assert.ok(next>=previous);previous=next;}
});
test('scroll-linked cap and tilt remain continuous between nearby scroll positions',()=>{
 const a=pourPoseAt(.2),b=pourPoseAt(.2001);
 assert.ok(b.cap>a.cap);assert.ok(b.tilt>a.tilt);
 assert.ok(b.cap-a.cap<.002);assert.ok(b.tilt-a.tilt<.002);
});
test('project content waits until the opaque fill and title settle',()=>{
 for(const p of [0,.5,.7,.83,.87,.9,.94])assert.equal(pourPoseAt(p).details,0);
 assert.equal(pourPoseAt(.87).fill,1);assert.equal(pourPoseAt(.87).title,0);
 assert.equal(pourPoseAt(.94).title,1);assert.equal(pourPoseAt(1).details,1);
 assert.equal(pourPoseAt(.87).stream,0);
});
