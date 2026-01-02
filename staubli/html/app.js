var Y0=Object.create;var Ya=Object.defineProperty;var J0=Object.getOwnPropertyDescriptor;var Z0=Object.getOwnPropertyNames;var j0=Object.getPrototypeOf,$0=Object.prototype.hasOwnProperty;var K0=(n,t,e)=>t in n?Ya(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var Q0=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports),Ja=(n,t)=>{for(var e in t)Ya(n,e,{get:t[e],enumerable:!0})},tx=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Z0(t))!$0.call(n,s)&&s!==e&&Ya(n,s,{get:()=>t[s],enumerable:!(i=J0(t,s))||i.enumerable});return n};var ex=(n,t,e)=>(e=n!=null?Y0(j0(n)):{},tx(t||!n||!n.__esModule?Ya(e,"default",{value:n,enumerable:!0}):e,n));var go=(n,t,e)=>(K0(n,typeof t!="symbol"?t+"":t,e),e),nx=(n,t,e)=>{if(!t.has(n))throw TypeError("Cannot "+e)};var cn=(n,t,e)=>{if(t.has(n))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(n):t.set(n,e)};var Te=(n,t,e)=>(nx(n,t,"access private method"),e);var Qg=Q0((gh,Kg)=>{(function(n,t){typeof gh=="object"&&typeof Kg<"u"?t(gh):typeof define=="function"&&define.amd?define(["exports"],t):t((n=typeof globalThis<"u"?globalThis:n||self).SVDJS={})})(gh,function(n){"use strict";n.SVD=function(t,e,i,s,r){if(e=e===void 0||e,i=i===void 0||i,r=1e-64/(s=s||Math.pow(2,-52)),!t)throw new TypeError("Matrix a is not defined");var o,a,l,c,h,d,u,f,g,x,m,p,E=t[0].length,b=t.length;if(b<E)throw new TypeError("Invalid matrix: m < n");for(var _=[],T=[],A=[],D=e==="f"?b:E,v=x=u=0;v<b;v++)T[v]=new Array(D).fill(0);for(v=0;v<E;v++)A[v]=new Array(E).fill(0);var w,y=new Array(E).fill(0);for(v=0;v<b;v++)for(o=0;o<E;o++)T[v][o]=t[v][o];for(v=0;v<E;v++){for(_[v]=u,g=0,l=v+1,o=v;o<b;o++)g+=Math.pow(T[o][v],2);if(g<r)u=0;else for(f=(d=T[v][v])*(u=d<0?Math.sqrt(g):-Math.sqrt(g))-g,T[v][v]=d-u,o=l;o<E;o++){for(g=0,a=v;a<b;a++)g+=T[a][v]*T[a][o];for(d=g/f,a=v;a<b;a++)T[a][o]=T[a][o]+d*T[a][v]}for(y[v]=u,g=0,o=l;o<E;o++)g+=Math.pow(T[v][o],2);if(g<r)u=0;else{for(f=(d=T[v][v+1])*(u=d<0?Math.sqrt(g):-Math.sqrt(g))-g,T[v][v+1]=d-u,o=l;o<E;o++)_[o]=T[v][o]/f;for(o=l;o<b;o++){for(g=0,a=l;a<E;a++)g+=T[o][a]*T[v][a];for(a=l;a<E;a++)T[o][a]=T[o][a]+g*_[a]}}x<(m=Math.abs(y[v])+Math.abs(_[v]))&&(x=m)}if(i)for(v=E-1;0<=v;v--){if(u!==0){for(f=T[v][v+1]*u,o=l;o<E;o++)A[o][v]=T[v][o]/f;for(o=l;o<E;o++){for(g=0,a=l;a<E;a++)g+=T[v][a]*A[a][o];for(a=l;a<E;a++)A[a][o]=A[a][o]+g*A[a][v]}}for(o=l;o<E;o++)A[v][o]=0,A[o][v]=0;A[v][v]=1,u=_[v],l=v}if(e){if(e==="f")for(v=E;v<b;v++){for(o=E;o<b;o++)T[v][o]=0;T[v][v]=1}for(v=E-1;0<=v;v--){for(l=v+1,u=y[v],o=l;o<D;o++)T[v][o]=0;if(u!==0){for(f=T[v][v]*u,o=l;o<D;o++){for(g=0,a=l;a<b;a++)g+=T[a][v]*T[a][o];for(d=g/f,a=v;a<b;a++)T[a][o]=T[a][o]+d*T[a][v]}for(o=v;o<b;o++)T[o][v]=T[o][v]/u}else for(o=v;o<b;o++)T[o][v]=0;T[v][v]=T[v][v]+1}}for(s*=x,a=E-1;0<=a;a--)for(var N=0;N<50;N++){for(w=!1,l=a;0<=l;l--){if(Math.abs(_[l])<=s){w=!0;break}if(Math.abs(y[l-1])<=s)break}if(!w){for(h=0,c=l-(g=1),v=l;v<a+1&&(d=g*_[v],_[v]=h*_[v],!(Math.abs(d)<=s));v++)if(u=y[v],y[v]=Math.sqrt(d*d+u*u),h=u/(f=y[v]),g=-d/f,e)for(o=0;o<b;o++)m=T[o][c],p=T[o][v],T[o][c]=m*h+p*g,T[o][v]=-m*g+p*h}if(p=y[a],l===a){if(p<0&&(y[a]=-p,i))for(o=0;o<E;o++)A[o][a]=-A[o][a];break}for(x=y[l],d=(((m=y[a-1])-p)*(m+p)+((u=_[a-1])-(f=_[a]))*(u+f))/(2*f*m),u=Math.sqrt(d*d+1),d=((x-p)*(x+p)+f*(m/(d<0?d-u:d+u)-f))/x,v=l+(g=h=1);v<a+1;v++){if(u=_[v],m=y[v],f=g*u,u*=h,p=Math.sqrt(d*d+f*f),d=x*(h=d/(_[v-1]=p))+u*(g=f/p),u=-x*g+u*h,f=m*g,m*=h,i)for(o=0;o<E;o++)x=A[o][v-1],p=A[o][v],A[o][v-1]=x*h+p*g,A[o][v]=-x*g+p*h;if(p=Math.sqrt(d*d+f*f),d=(h=d/(y[v-1]=p))*u+(g=f/p)*m,x=-g*u+h*m,e)for(o=0;o<b;o++)m=T[o][v-1],p=T[o][v],T[o][v-1]=m*h+p*g,T[o][v]=-m*g+p*h}_[l]=0,_[a]=d,y[a]=x}for(v=0;v<E;v++)y[v]<s&&(y[v]=0);return{u:T,q:y,v:A}},n.VERSION="1.1.1",Object.defineProperty(n,"__esModule",{value:!0})})});var Za=[];function Rf(n){for(let t of n.dependencies)t.delete(n);n.dependencies.clear()}function ix(n,t){t.add(n),n.dependencies.add(t)}function Ge(n){let t=new Set;return[()=>{let s=Za[Za.length-1];return s&&ix(s,t),n},s=>{n=s;for(let r of[...t])r.execute()}]}function Vi(n){let t={execute(){Rf(t),Za.push(t);try{n()}finally{Za.pop()}},dependencies:new Set};return t.execute(),()=>Rf(t)}function Ne(n){let t=document.createElement("template");return t.innerHTML=n.join(""),t}function We({tag:n,opts:t,observedAttributes:e,template:i,stateFn:s,attrsFn:r}){class o extends HTMLElement{constructor(){super();go(this,"eventListeners",[]);go(this,"attrsSignal");go(this,"setAttrsSignal");let c=s?s():void 0,[h,d]=Ge({});this.attrsSignal=h,this.setAttrsSignal=d;let u=i.content;this.appendChild(u.cloneNode(!0)),Vi(()=>{let f=h();if(!f)return;let g=r(c,f,this);this.handleAttrMap(g)})}connectedCallback(){let c=this.getAllAttributes();this.setAttrsSignal(c)}disconnectedCallback(){}adoptedCallback(){console.log("Custom element moved to new page.")}attributeChangedCallback(c,h,d){let u=this.getAllAttributes();this.setAttrsSignal(u)}getAllAttributes(){let c={};for(let h of this.getAttributeNames()){let d=this.getAttribute(h);d!==null&&(c[h]=d)}return c}handleAttrMap(c){for(let{element:h,type:d,listener:u}of this.eventListeners)h.removeEventListener(d,u);this.eventListeners=[];for(let[h,d]of Object.entries(c)){let u=this.querySelectorAll(h),{eventListeners:f,attributes:g,properties:x}=d;for(let m of Array.from(u)){if(f)for(let[p,E]of Object.entries(f))this.eventListeners.push({element:m,type:p,listener:E}),m.addEventListener(p,E);if(x)for(let[p,E]of Object.entries(x))m[p]=E;if(g)for(let[p,E]of Object.entries(g))E?m.setAttribute(p,E):m.removeAttribute(p)}}}}go(o,"observedAttributes",e),customElements.define(n,o,t)}var sx=Ne` <button>SET button-text</button> `;We({tag:"counter-button",observedAttributes:["button-text"],template:sx,stateFn:()=>{let[n,t]=Ge(0);return{count:n,setCount:t}},attrsFn:({count:n,setCount:t},e)=>{let i=()=>{t(n()+1)};return{button:{properties:{innerHTML:`${e["button-text"]} (${n()})`},eventListeners:{click:i}}}}});async function rx(n){return await(await fetch(n)).json()}async function ja(n,t){return await(await fetch(n,{method:"PUT",body:t!==void 0?JSON.stringify(t):void 0})).json()}var xo,eu,wr,$a,tu=class{constructor(){cn(this,xo);cn(this,wr);let[t,e]=Ge(void 0);this.state=t,this.setState=e,this.name="api"}load(){Te(this,wr,$a).call(this,rx("/api/robot"))}async execute(t){await Te(this,wr,$a).call(this,ja(`/api/${t.type}`,t.data))}async elbow(){await Te(this,wr,$a).call(this,ja("/api/elbow"))}async flail(){await Te(this,xo,eu).call(this,ja("/api/flail"))}async reset(){await Te(this,xo,eu).call(this,ja("/api/reset"))}};xo=new WeakSet,eu=async function(t){await t},wr=new WeakSet,$a=async function(t){let e=await t;this.setState({...this.state(),...e})};var _o=new tu,[si,nu]=Ge(_o);We({tag:"robot-button",template:Ne` <button class="robot-button"></button> `,observedAttributes:["method","label"],attrsFn:(n,t)=>{let e=si(),i=t.method;function s(){if(!e)return;e[i].bind(e)()}return{button:{attributes:{disabled:e?"":"disabled"},properties:{innerHTML:t.label},eventListeners:{click:s}}}}});We({tag:"elbow-button",template:Ne` <robot-button method="elbow" label="..."></robot-button> `,attrsFn:(n,t)=>{let i=si()?.state();return{"robot-button":{attributes:{label:i?i.elbow:"Elbow..."}}}}});var Wl="173",Ss={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ws={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},fp=0,zu=1,pp=2;var Vu=1,Xl=2,Ii=3,xi=0,Nn=1,Xn=2,is=0,Bs=1,Hu=2,Gu=3,Wu=4,mp=5,_s=100,gp=101,xp=102,_p=103,yp=104,vp=200,Mp=201,bp=202,Sp=203,bl=204,Sl=205,wp=206,Ep=207,Tp=208,Ap=209,Cp=210,Rp=211,Pp=212,Ip=213,Lp=214,ql=0,Yl=1,Jl=2,ks=3,Zl=4,jl=5,$l=6,Kl=7,Qo=0,Dp=1,Np=2,ss=0,Fp=1,Up=2,Op=3,Bp=4,kp=5,zp=6,Vp=7,Ru="attached",Hp="detached",Xu=300,Qs=301,tr=302,Ql=303,tc=304,ta=306,Zi=1e3,$n=1001,wl=1002,Wn=1003,Gp=1004;var ea=1005;var Gn=1006,ec=1007;var yi=1008;var Li=1009,qu=1010,Yu=1011,qr=1012,nc=1013,Es=1014,vi=1015,Yr=1016,ic=1017,sc=1018,er=1020,Ju=35902,Zu=1021,ju=1022,ni=1023,$u=1024,Ku=1025,Os=1026,zs=1027,Qu=1028,rc=1029,td=1030,oc=1031;var ac=1033,na=33776,ia=33777,sa=33778,ra=33779,lc=35840,cc=35841,hc=35842,uc=35843,dc=36196,fc=37492,pc=37496,mc=37808,gc=37809,xc=37810,_c=37811,yc=37812,vc=37813,Mc=37814,bc=37815,Sc=37816,wc=37817,Ec=37818,Tc=37819,Ac=37820,Cc=37821,oa=36492,Rc=36494,Pc=36495,ed=36283,Ic=36284,Lc=36285,Dc=36286;var Ao=2300,El=2301,Ml=2302,Pu=2400,Iu=2401,Lu=2402,Wp=2500;var Xp=3200,qp=3201;var aa=0,Yp=1,rs="",Ae="srgb",Vs="srgb-linear",Co="linear",Ee="srgb";var Us=7680;var Du=519,Jp=512,Zp=513,jp=514,nd=515,$p=516,Kp=517,Qp=518,tm=519,Tl=35044;var id="300 es",Ti=2e3,Ro=2001;var Ai=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},En=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pf=1234567,Eo=Math.PI/180,Hs=180/Math.PI;function gi(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(En[n&255]+En[n>>8&255]+En[n>>16&255]+En[n>>24&255]+"-"+En[t&255]+En[t>>8&255]+"-"+En[t>>16&15|64]+En[t>>24&255]+"-"+En[e&63|128]+En[e>>8&255]+"-"+En[e>>16&255]+En[e>>24&255]+En[i&255]+En[i>>8&255]+En[i>>16&255]+En[i>>24&255]).toLowerCase()}function ae(n,t,e){return Math.max(t,Math.min(e,n))}function sd(n,t){return(n%t+t)%t}function ox(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function ax(n,t,e){return n!==t?(e-n)/(t-n):0}function To(n,t,e){return(1-e)*n+e*t}function lx(n,t,e,i){return To(n,t,1-Math.exp(-e*i))}function cx(n,t=1){return t-Math.abs(sd(n,t*2)-t)}function hx(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function ux(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function dx(n,t){return n+Math.floor(Math.random()*(t-n+1))}function fx(n,t){return n+Math.random()*(t-n)}function px(n){return n*(.5-Math.random())}function mx(n){n!==void 0&&(Pf=n);let t=Pf+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function gx(n){return n*Eo}function xx(n){return n*Hs}function _x(n){return(n&n-1)===0&&n!==0}function yx(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function vx(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Mx(n,t,e,i,s){let r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),h=o((t+i)/2),d=r((t-i)/2),u=o((t-i)/2),f=r((i-t)/2),g=o((i-t)/2);switch(s){case"XYX":n.set(a*h,l*d,l*u,a*c);break;case"YZY":n.set(l*u,a*h,l*d,a*c);break;case"ZXZ":n.set(l*d,l*u,a*h,a*c);break;case"XZX":n.set(a*h,l*g,l*f,a*c);break;case"YXY":n.set(l*f,a*h,l*g,a*c);break;case"ZYZ":n.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function mi(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function we(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var nn={DEG2RAD:Eo,RAD2DEG:Hs,generateUUID:gi,clamp:ae,euclideanModulo:sd,mapLinear:ox,inverseLerp:ax,lerp:To,damp:lx,pingpong:cx,smoothstep:hx,smootherstep:ux,randInt:dx,randFloat:fx,randFloatSpread:px,seededRandom:mx,degToRad:gx,radToDeg:xx,isPowerOfTwo:_x,ceilPowerOfTwo:yx,floorPowerOfTwo:vx,setQuaternionFromProperEuler:Mx,normalize:we,denormalize:mi},Ot=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ae(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ae(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ie=class n{constructor(t,e,i,s,r,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],x=s[0],m=s[3],p=s[6],E=s[1],b=s[4],_=s[7],T=s[2],A=s[5],D=s[8];return r[0]=o*x+a*E+l*T,r[3]=o*m+a*b+l*A,r[6]=o*p+a*_+l*D,r[1]=c*x+h*E+d*T,r[4]=c*m+h*b+d*A,r[7]=c*p+h*_+d*D,r[2]=u*x+f*E+g*T,r[5]=u*m+f*b+g*A,r[8]=u*p+f*_+g*D,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-i*r*h+i*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,g=e*d+i*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=d*x,t[1]=(s*c-h*i)*x,t[2]=(a*i-s*o)*x,t[3]=u*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=f*x,t[7]=(i*l-c*e)*x,t[8]=(o*e-i*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(iu.makeScale(t,e)),this}rotate(t){return this.premultiply(iu.makeRotation(-t)),this}translate(t,e){return this.premultiply(iu.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},iu=new ie;function rd(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Br(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function em(){let n=Br("canvas");return n.style.display="block",n}var If={};function nr(n){n in If||(If[n]=!0,console.warn(n))}function nm(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}function im(n){let t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function sm(n){let t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var Lf=new ie().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Df=new ie().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function bx(){let n={enabled:!0,workingColorSpace:Vs,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ee&&(s.r=Ji(s.r),s.g=Ji(s.g),s.b=Ji(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ee&&(s.r=Or(s.r),s.g=Or(s.g),s.b=Or(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===rs?Co:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Vs]:{primaries:t,whitePoint:i,transfer:Co,toXYZ:Lf,fromXYZ:Df,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ae},outputColorSpaceConfig:{drawingBufferColorSpace:Ae}},[Ae]:{primaries:t,whitePoint:i,transfer:Ee,toXYZ:Lf,fromXYZ:Df,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ae}}}),n}var le=bx();function Ji(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Or(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Er,Al=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Er===void 0&&(Er=Br("canvas")),Er.width=t.width,Er.height=t.height;let i=Er.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Er}return e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Br("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ji(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ji(e[i]/255)*255):e[i]=Ji(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Sx=0,Po=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Sx++}),this.uuid=gi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(su(s[o].image)):r.push(su(s[o]))}else r=su(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function su(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Al.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var wx=0,Dn=class n extends Ai{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=$n,s=$n,r=Gn,o=yi,a=ni,l=Li,c=n.DEFAULT_ANISOTROPY,h=rs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wx++}),this.uuid=gi(),this.name="",this.source=new Po(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Xu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Zi:t.x=t.x-Math.floor(t.x);break;case $n:t.x=t.x<0?0:1;break;case wl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Zi:t.y=t.y-Math.floor(t.y);break;case $n:t.y=t.y<0?0:1;break;case wl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Dn.DEFAULT_IMAGE=null;Dn.DEFAULT_MAPPING=Xu;Dn.DEFAULT_ANISOTROPY=1;var ce=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let b=(c+1)/2,_=(f+1)/2,T=(p+1)/2,A=(h+u)/4,D=(d+x)/4,v=(g+m)/4;return b>_&&b>T?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=A/i,r=D/i):_>T?_<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),i=A/s,r=v/s):T<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),i=D/r,s=v/r),this.set(i,s,r,e),this}let E=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(E)<.001&&(E=1),this.x=(m-g)/E,this.y=(d-x)/E,this.z=(u-h)/E,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this.z=ae(this.z,t.z,e.z),this.w=ae(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this.z=ae(this.z,t,e),this.w=ae(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ae(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Cl=class extends Ai{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e);let s={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);let r=new Dn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,s=t.textures.length;i<s;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;let e=Object.assign({},t.texture.image);return this.texture.source=new Po(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ci=class extends Cl{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Io=class extends Dn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Wn,this.minFilter=Wn,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var Rl=class extends Dn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Wn,this.minFilter=Wn,this.wrapR=$n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var de=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],h=i[s+2],d=i[s+3],u=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(d!==x||l!==u||c!==f||h!==g){let m=1-a,p=l*u+c*f+h*g+d*x,E=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){let T=Math.sqrt(b),A=Math.atan2(T,p*E);m=Math.sin(m*A)/T,a=Math.sin(a*A)/T}let _=a*E;if(l=l*m+u*_,c=c*m+f*_,h=h*m+g*_,d=d*m+x*_,m===1-a){let T=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=T,c*=T,h*=T,d*=T}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,r,o){let a=i[s],l=i[s+1],c=i[s+2],h=i[s+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*d+l*f-c*u,t[e+1]=l*g+h*u+c*d-a*f,t[e+2]=c*g+h*f+a*u-l*d,t[e+3]=h*g-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(s/2),d=a(r/2),u=l(i/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d+u*f*g;break;case"YZX":this._x=u*h*d+c*f*g,this._y=c*f*d+u*h*g,this._z=c*h*g-u*f*d,this._w=c*h*d-u*f*g;break;case"XZY":this._x=u*h*d-c*f*g,this._y=c*f*d-u*h*g,this._z=c*h*g+u*f*d,this._w=c*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=i+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(i>a&&i>d){let f=2*Math.sqrt(1+i-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-i-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-i-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ae(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-i*c,this._z=r*h+o*c+i*l-s*a,this._w=o*h-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*i+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=o*d+this._w*u,this._x=i*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},F=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Nf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Nf.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),h=2*(a*e-r*s),d=2*(r*i-o*e);return this.x=e+l*c+o*d-a*h,this.y=i+l*h+a*c-r*d,this.z=s+l*d+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ae(this.x,t.x,e.x),this.y=ae(this.y,t.y,e.y),this.z=ae(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ae(this.x,t,e),this.y=ae(this.y,t,e),this.z=ae(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ae(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ru.copy(this).projectOnVector(t),this.sub(ru)}reflect(t){return this.sub(ru.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ae(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ru=new F,Nf=new de,An=class{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(di.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(di.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=di.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,di):di.fromBufferAttribute(r,o),di.applyMatrix4(t.matrixWorld),this.expandByPoint(di);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ka.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ka.copy(i.boundingBox)),Ka.applyMatrix4(t.matrixWorld),this.union(Ka)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,di),di.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(yo),Qa.subVectors(this.max,yo),Tr.subVectors(t.a,yo),Ar.subVectors(t.b,yo),Cr.subVectors(t.c,yo),us.subVectors(Ar,Tr),ds.subVectors(Cr,Ar),Ls.subVectors(Tr,Cr);let e=[0,-us.z,us.y,0,-ds.z,ds.y,0,-Ls.z,Ls.y,us.z,0,-us.x,ds.z,0,-ds.x,Ls.z,0,-Ls.x,-us.y,us.x,0,-ds.y,ds.x,0,-Ls.y,Ls.x,0];return!ou(e,Tr,Ar,Cr,Qa)||(e=[1,0,0,0,1,0,0,0,1],!ou(e,Tr,Ar,Cr,Qa))?!1:(tl.crossVectors(us,ds),e=[tl.x,tl.y,tl.z],ou(e,Tr,Ar,Cr,Qa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,di).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(di).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Hi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Hi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Hi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Hi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Hi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Hi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Hi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Hi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Hi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Hi=[new F,new F,new F,new F,new F,new F,new F,new F],di=new F,Ka=new An,Tr=new F,Ar=new F,Cr=new F,us=new F,ds=new F,Ls=new F,yo=new F,Qa=new F,tl=new F,Ds=new F;function ou(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Ds.fromArray(n,r);let a=s.x*Math.abs(Ds.x)+s.y*Math.abs(Ds.y)+s.z*Math.abs(Ds.z),l=t.dot(Ds),c=e.dot(Ds),h=i.dot(Ds);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Ex=new An,vo=new F,au=new F,Kn=class{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Ex.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;vo.subVectors(t,this.center);let e=vo.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(vo,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(au.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(vo.copy(t.center).add(au)),this.expandByPoint(vo.copy(t.center).sub(au))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Gi=new F,lu=new F,el=new F,fs=new F,cu=new F,nl=new F,hu=new F,ji=class{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Gi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Gi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Gi.copy(this.origin).addScaledVector(this.direction,e),Gi.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){lu.copy(t).add(e).multiplyScalar(.5),el.copy(e).sub(t).normalize(),fs.copy(this.origin).sub(lu);let r=t.distanceTo(e)*.5,o=-this.direction.dot(el),a=fs.dot(this.direction),l=-fs.dot(el),c=fs.lengthSq(),h=Math.abs(1-o*o),d,u,f,g;if(h>0)if(d=o*l-a,u=o*a-l,g=r*h,d>=0)if(u>=-g)if(u<=g){let x=1/h;d*=x,u*=x,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(lu).addScaledVector(el,u),f}intersectSphere(t,e){Gi.subVectors(t.center,this.origin);let i=Gi.dot(this.direction),s=Gi.dot(Gi)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Gi)!==null}intersectTriangle(t,e,i,s,r){cu.subVectors(e,t),nl.subVectors(i,t),hu.crossVectors(cu,nl);let o=this.direction.dot(hu),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;fs.subVectors(this.origin,t);let l=a*this.direction.dot(nl.crossVectors(fs,nl));if(l<0)return null;let c=a*this.direction.dot(cu.cross(fs));if(c<0||l+c>o)return null;let h=-a*fs.dot(hu);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ht=class n{constructor(t,e,i,s,r,o,a,l,c,h,d,u,f,g,x,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,h,d,u,f,g,x,m)}set(t,e,i,s,r,o,a,l,c,h,d,u,f,g,x,m){let p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/Rr.setFromMatrixColumn(t,0).length(),r=1/Rr.setFromMatrixColumn(t,1).length(),o=1/Rr.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let u=o*h,f=o*d,g=a*h,x=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=u-x*c,e[9]=-a*l,e[2]=x-u*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){let u=l*h,f=l*d,g=c*h,x=c*d;e[0]=u+x*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=x+u*a,e[10]=o*l}else if(t.order==="ZXY"){let u=l*h,f=l*d,g=c*h,x=c*d;e[0]=u-x*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=x-u*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let u=o*h,f=o*d,g=a*h,x=a*d;e[0]=l*h,e[4]=g*c-f,e[8]=u*c+x,e[1]=l*d,e[5]=x*c+u,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let u=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=x-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+g,e[10]=u-x*d}else if(t.order==="XZY"){let u=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+x,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=x*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Tx,t,Ax)}lookAt(t,e,i){let s=this.elements;return Zn.subVectors(t,e),Zn.lengthSq()===0&&(Zn.z=1),Zn.normalize(),ps.crossVectors(i,Zn),ps.lengthSq()===0&&(Math.abs(i.z)===1?Zn.x+=1e-4:Zn.z+=1e-4,Zn.normalize(),ps.crossVectors(i,Zn)),ps.normalize(),il.crossVectors(Zn,ps),s[0]=ps.x,s[4]=il.x,s[8]=Zn.x,s[1]=ps.y,s[5]=il.y,s[9]=Zn.y,s[2]=ps.z,s[6]=il.z,s[10]=Zn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],x=i[6],m=i[10],p=i[14],E=i[3],b=i[7],_=i[11],T=i[15],A=s[0],D=s[4],v=s[8],w=s[12],y=s[1],N=s[5],O=s[9],B=s[13],V=s[2],Y=s[6],k=s[10],K=s[14],X=s[3],st=s[7],ut=s[11],ft=s[15];return r[0]=o*A+a*y+l*V+c*X,r[4]=o*D+a*N+l*Y+c*st,r[8]=o*v+a*O+l*k+c*ut,r[12]=o*w+a*B+l*K+c*ft,r[1]=h*A+d*y+u*V+f*X,r[5]=h*D+d*N+u*Y+f*st,r[9]=h*v+d*O+u*k+f*ut,r[13]=h*w+d*B+u*K+f*ft,r[2]=g*A+x*y+m*V+p*X,r[6]=g*D+x*N+m*Y+p*st,r[10]=g*v+x*O+m*k+p*ut,r[14]=g*w+x*B+m*K+p*ft,r[3]=E*A+b*y+_*V+T*X,r[7]=E*D+b*N+_*Y+T*st,r[11]=E*v+b*O+_*k+T*ut,r[15]=E*w+b*B+_*K+T*ft,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15];return g*(+r*l*d-s*c*d-r*a*u+i*c*u+s*a*f-i*l*f)+x*(+e*l*f-e*c*u+r*o*u-s*o*f+s*c*h-r*l*h)+m*(+e*c*d-e*a*f-r*o*d+i*o*f+r*a*h-i*c*h)+p*(-s*a*h-e*l*d+e*a*u+s*o*d-i*o*u+i*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],E=d*m*c-x*u*c+x*l*f-a*m*f-d*l*p+a*u*p,b=g*u*c-h*m*c-g*l*f+o*m*f+h*l*p-o*u*p,_=h*x*c-g*d*c+g*a*f-o*x*f-h*a*p+o*d*p,T=g*d*l-h*x*l-g*a*u+o*x*u+h*a*m-o*d*m,A=e*E+i*b+s*_+r*T;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let D=1/A;return t[0]=E*D,t[1]=(x*u*r-d*m*r-x*s*f+i*m*f+d*s*p-i*u*p)*D,t[2]=(a*m*r-x*l*r+x*s*c-i*m*c-a*s*p+i*l*p)*D,t[3]=(d*l*r-a*u*r-d*s*c+i*u*c+a*s*f-i*l*f)*D,t[4]=b*D,t[5]=(h*m*r-g*u*r+g*s*f-e*m*f-h*s*p+e*u*p)*D,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*p-e*l*p)*D,t[7]=(o*u*r-h*l*r+h*s*c-e*u*c-o*s*f+e*l*f)*D,t[8]=_*D,t[9]=(g*d*r-h*x*r-g*i*f+e*x*f+h*i*p-e*d*p)*D,t[10]=(o*x*r-g*a*r+g*i*c-e*x*c-o*i*p+e*a*p)*D,t[11]=(h*a*r-o*d*r-h*i*c+e*d*c+o*i*f-e*a*f)*D,t[12]=T*D,t[13]=(h*x*s-g*d*s+g*i*u-e*x*u-h*i*m+e*d*m)*D,t[14]=(g*a*s-o*x*s-g*i*l+e*x*l+o*i*m-e*a*m)*D,t[15]=(o*d*s-h*a*s+h*i*l-e*d*l-o*i*u+e*a*u)*D,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+i,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,g=r*d,x=o*h,m=o*d,p=a*d,E=l*c,b=l*h,_=l*d,T=i.x,A=i.y,D=i.z;return s[0]=(1-(x+p))*T,s[1]=(f+_)*T,s[2]=(g-b)*T,s[3]=0,s[4]=(f-_)*A,s[5]=(1-(u+p))*A,s[6]=(m+E)*A,s[7]=0,s[8]=(g+b)*D,s[9]=(m-E)*D,s[10]=(1-(u+x))*D,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=Rr.set(s[0],s[1],s[2]).length(),o=Rr.set(s[4],s[5],s[6]).length(),a=Rr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],fi.copy(this);let c=1/r,h=1/o,d=1/a;return fi.elements[0]*=c,fi.elements[1]*=c,fi.elements[2]*=c,fi.elements[4]*=h,fi.elements[5]*=h,fi.elements[6]*=h,fi.elements[8]*=d,fi.elements[9]*=d,fi.elements[10]*=d,e.setFromRotationMatrix(fi),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=Ti){let l=this.elements,c=2*r/(e-t),h=2*r/(i-s),d=(e+t)/(e-t),u=(i+s)/(i-s),f,g;if(a===Ti)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Ro)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Ti){let l=this.elements,c=1/(e-t),h=1/(i-s),d=1/(o-r),u=(e+t)*c,f=(i+s)*h,g,x;if(a===Ti)g=(o+r)*d,x=-2*d;else if(a===Ro)g=r*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Rr=new F,fi=new Ht,Tx=new F(0,0,0),Ax=new F(1,1,1),ps=new F,il=new F,Zn=new F,Ff=new Ht,Uf=new de,Qe=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(ae(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ae(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ae(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ae(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ae(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ae(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Ff.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ff,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Uf.setFromEuler(this),this.setFromQuaternion(Uf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qe.DEFAULT_ORDER="XYZ";var kr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Cx=0,Of=new F,Pr=new de,Wi=new Ht,sl=new F,Mo=new F,Rx=new F,Px=new de,Bf=new F(1,0,0),kf=new F(0,1,0),zf=new F(0,0,1),Vf={type:"added"},Ix={type:"removed"},Ir={type:"childadded",child:null},uu={type:"childremoved",child:null},Fe=class n extends Ai{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cx++}),this.uuid=gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new F,e=new Qe,i=new de,s=new F(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ht},normalMatrix:{value:new ie}}),this.matrix=new Ht,this.matrixWorld=new Ht,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Pr.setFromAxisAngle(t,e),this.quaternion.multiply(Pr),this}rotateOnWorldAxis(t,e){return Pr.setFromAxisAngle(t,e),this.quaternion.premultiply(Pr),this}rotateX(t){return this.rotateOnAxis(Bf,t)}rotateY(t){return this.rotateOnAxis(kf,t)}rotateZ(t){return this.rotateOnAxis(zf,t)}translateOnAxis(t,e){return Of.copy(t).applyQuaternion(this.quaternion),this.position.add(Of.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Bf,t)}translateY(t){return this.translateOnAxis(kf,t)}translateZ(t){return this.translateOnAxis(zf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Wi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?sl.copy(t):sl.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Mo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Wi.lookAt(Mo,sl,this.up):Wi.lookAt(sl,Mo,this.up),this.quaternion.setFromRotationMatrix(Wi),s&&(Wi.extractRotation(s.matrixWorld),Pr.setFromRotationMatrix(Wi),this.quaternion.premultiply(Pr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Vf),Ir.child=t,this.dispatchEvent(Ir),Ir.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ix),uu.child=t,this.dispatchEvent(uu),uu.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Wi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Wi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Wi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Vf),Ir.child=t,this.dispatchEvent(Ir),Ir.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mo,t,Rx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mo,Px,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};Fe.DEFAULT_UP=new F(0,1,0);Fe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Fe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var pi=new F,Xi=new F,du=new F,qi=new F,Lr=new F,Dr=new F,Hf=new F,fu=new F,pu=new F,mu=new F,gu=new ce,xu=new ce,_u=new ce,xs=class n{constructor(t=new F,e=new F,i=new F){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),pi.subVectors(t,e),s.cross(pi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){pi.subVectors(s,e),Xi.subVectors(i,e),du.subVectors(t,e);let o=pi.dot(pi),a=pi.dot(Xi),l=pi.dot(du),c=Xi.dot(Xi),h=Xi.dot(du),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,g=(o*h-a*l)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,qi)===null?!1:qi.x>=0&&qi.y>=0&&qi.x+qi.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,qi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,qi.x),l.addScaledVector(o,qi.y),l.addScaledVector(a,qi.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return gu.setScalar(0),xu.setScalar(0),_u.setScalar(0),gu.fromBufferAttribute(t,e),xu.fromBufferAttribute(t,i),_u.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(gu,r.x),o.addScaledVector(xu,r.y),o.addScaledVector(_u,r.z),o}static isFrontFacing(t,e,i,s){return pi.subVectors(i,e),Xi.subVectors(t,e),pi.cross(Xi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return pi.subVectors(this.c,this.b),Xi.subVectors(this.a,this.b),pi.cross(Xi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,o,a;Lr.subVectors(s,i),Dr.subVectors(r,i),fu.subVectors(t,i);let l=Lr.dot(fu),c=Dr.dot(fu);if(l<=0&&c<=0)return e.copy(i);pu.subVectors(t,s);let h=Lr.dot(pu),d=Dr.dot(pu);if(h>=0&&d<=h)return e.copy(s);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(i).addScaledVector(Lr,o);mu.subVectors(t,r);let f=Lr.dot(mu),g=Dr.dot(mu);if(g>=0&&f<=g)return e.copy(r);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(Dr,a);let m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Hf.subVectors(r,s),a=(d-h)/(d-h+(f-g)),e.copy(s).addScaledVector(Hf,a);let p=1/(m+x+u);return o=x*p,a=u*p,e.copy(i).addScaledVector(Lr,o).addScaledVector(Dr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},rm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ms={h:0,s:0,l:0},rl={h:0,s:0,l:0};function yu(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var Jt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ae){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,le.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=le.workingColorSpace){return this.r=t,this.g=e,this.b=i,le.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=le.workingColorSpace){if(t=sd(t,1),e=ae(e,0,1),i=ae(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=yu(o,r,t+1/3),this.g=yu(o,r,t),this.b=yu(o,r,t-1/3)}return le.toWorkingColorSpace(this,s),this}setStyle(t,e=Ae){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ae){let i=rm[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ji(t.r),this.g=Ji(t.g),this.b=Ji(t.b),this}copyLinearToSRGB(t){return this.r=Or(t.r),this.g=Or(t.g),this.b=Or(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ae){return le.fromWorkingColorSpace(Tn.copy(this),t),Math.round(ae(Tn.r*255,0,255))*65536+Math.round(ae(Tn.g*255,0,255))*256+Math.round(ae(Tn.b*255,0,255))}getHexString(t=Ae){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=le.workingColorSpace){le.fromWorkingColorSpace(Tn.copy(this),e);let i=Tn.r,s=Tn.g,r=Tn.b,o=Math.max(i,s,r),a=Math.min(i,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=le.workingColorSpace){return le.fromWorkingColorSpace(Tn.copy(this),e),t.r=Tn.r,t.g=Tn.g,t.b=Tn.b,t}getStyle(t=Ae){le.fromWorkingColorSpace(Tn.copy(this),t);let e=Tn.r,i=Tn.g,s=Tn.b;return t!==Ae?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(ms),this.setHSL(ms.h+t,ms.s+e,ms.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ms),t.getHSL(rl);let i=To(ms.h,rl.h,e),s=To(ms.s,rl.s,e),r=To(ms.l,rl.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Tn=new Jt;Jt.NAMES=rm;var Lx=0,oi=class extends Ai{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Lx++}),this.uuid=gi(),this.name="",this.type="Material",this.blending=Bs,this.side=xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bl,this.blendDst=Sl,this.blendEquation=_s,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Jt(0,0,0),this.blendAlpha=0,this.depthFunc=ks,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Du,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Us,this.stencilZFail=Us,this.stencilZPass=Us,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Bs&&(i.blending=this.blending),this.side!==xi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==bl&&(i.blendSrc=this.blendSrc),this.blendDst!==Sl&&(i.blendDst=this.blendDst),this.blendEquation!==_s&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ks&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Du&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Us&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Us&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Us&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},ai=class extends oi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.combine=Qo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var en=new F,ol=new Ot,Dx=0,gn=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Dx++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Tl,this.updateRanges=[],this.gpuType=vi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)ol.fromBufferAttribute(this,e),ol.applyMatrix3(t),this.setXY(e,ol.x,ol.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)en.fromBufferAttribute(this,e),en.applyMatrix3(t),this.setXYZ(e,en.x,en.y,en.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)en.fromBufferAttribute(this,e),en.applyMatrix4(t),this.setXYZ(e,en.x,en.y,en.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)en.fromBufferAttribute(this,e),en.applyNormalMatrix(t),this.setXYZ(e,en.x,en.y,en.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)en.fromBufferAttribute(this,e),en.transformDirection(t),this.setXYZ(e,en.x,en.y,en.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=mi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=we(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=mi(e,this.array)),e}setX(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=mi(e,this.array)),e}setY(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=mi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=mi(e,this.array)),e}setW(t,e){return this.normalized&&(e=we(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),i=we(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),i=we(i,this.array),s=we(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=we(e,this.array),i=we(i,this.array),s=we(s,this.array),r=we(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Tl&&(t.usage=this.usage),t}};var Lo=class extends gn{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Do=class extends gn{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var ee=class extends gn{constructor(t,e,i){super(new Float32Array(t),e,i)}},Nx=0,ri=new Ht,vu=new Fe,Nr=new F,jn=new An,bo=new An,mn=new F,Xe=class n extends Ai{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Nx++}),this.uuid=gi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(rd(t)?Do:Lo)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new ie().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ri.makeRotationFromQuaternion(t),this.applyMatrix4(ri),this}rotateX(t){return ri.makeRotationX(t),this.applyMatrix4(ri),this}rotateY(t){return ri.makeRotationY(t),this.applyMatrix4(ri),this}rotateZ(t){return ri.makeRotationZ(t),this.applyMatrix4(ri),this}translate(t,e,i){return ri.makeTranslation(t,e,i),this.applyMatrix4(ri),this}scale(t,e,i){return ri.makeScale(t,e,i),this.applyMatrix4(ri),this}lookAt(t){return vu.lookAt(t),vu.updateMatrix(),this.applyMatrix4(vu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Nr).negate(),this.translate(Nr.x,Nr.y,Nr.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ee(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new An);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];jn.setFromBufferAttribute(r),this.morphTargetsRelative?(mn.addVectors(this.boundingBox.min,jn.min),this.boundingBox.expandByPoint(mn),mn.addVectors(this.boundingBox.max,jn.max),this.boundingBox.expandByPoint(mn)):(this.boundingBox.expandByPoint(jn.min),this.boundingBox.expandByPoint(jn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Kn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){let i=this.boundingSphere.center;if(jn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];bo.setFromBufferAttribute(a),this.morphTargetsRelative?(mn.addVectors(jn.min,bo.min),jn.expandByPoint(mn),mn.addVectors(jn.max,bo.max),jn.expandByPoint(mn)):(jn.expandByPoint(bo.min),jn.expandByPoint(bo.max))}jn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)mn.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(mn));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)mn.fromBufferAttribute(a,c),l&&(Nr.fromBufferAttribute(t,c),mn.add(Nr)),s=Math.max(s,i.distanceToSquared(mn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new gn(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let v=0;v<i.count;v++)a[v]=new F,l[v]=new F;let c=new F,h=new F,d=new F,u=new Ot,f=new Ot,g=new Ot,x=new F,m=new F;function p(v,w,y){c.fromBufferAttribute(i,v),h.fromBufferAttribute(i,w),d.fromBufferAttribute(i,y),u.fromBufferAttribute(r,v),f.fromBufferAttribute(r,w),g.fromBufferAttribute(r,y),h.sub(c),d.sub(c),f.sub(u),g.sub(u);let N=1/(f.x*g.y-g.x*f.y);isFinite(N)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(N),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(N),a[v].add(x),a[w].add(x),a[y].add(x),l[v].add(m),l[w].add(m),l[y].add(m))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let v=0,w=E.length;v<w;++v){let y=E[v],N=y.start,O=y.count;for(let B=N,V=N+O;B<V;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let b=new F,_=new F,T=new F,A=new F;function D(v){T.fromBufferAttribute(s,v),A.copy(T);let w=a[v];b.copy(w),b.sub(T.multiplyScalar(T.dot(w))).normalize(),_.crossVectors(A,w);let N=_.dot(l[v])<0?-1:1;o.setXYZW(v,b.x,b.y,b.z,N)}for(let v=0,w=E.length;v<w;++v){let y=E[v],N=y.start,O=y.count;for(let B=N,V=N+O;B<V;B+=3)D(t.getX(B+0)),D(t.getX(B+1)),D(t.getX(B+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new gn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let s=new F,r=new F,o=new F,a=new F,l=new F,c=new F,h=new F,d=new F;if(t)for(let u=0,f=t.count;u<f;u+=3){let g=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)mn.fromBufferAttribute(t,e),mn.normalize(),t.setXYZ(e,mn.x,mn.y,mn.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let p=0;p<h;p++)u[g++]=c[f++]}return new gn(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,i);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=t(u,i);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Gf=new Ht,Ns=new ji,al=new Kn,Wf=new F,ll=new F,cl=new F,hl=new F,Mu=new F,ul=new F,Xf=new F,dl=new F,dt=class extends Fe{constructor(t=new Xe,e=new ai){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){ul.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(Mu.fromBufferAttribute(d,t),o?ul.addScaledVector(Mu,h):ul.addScaledVector(Mu.sub(e),h))}e.add(ul)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),al.copy(i.boundingSphere),al.applyMatrix4(r),Ns.copy(t.ray).recast(t.near),!(al.containsPoint(Ns.origin)===!1&&(Ns.intersectSphere(al,Wf)===null||Ns.origin.distanceToSquared(Wf)>(t.far-t.near)**2))&&(Gf.copy(r).invert(),Ns.copy(t.ray).applyMatrix4(Gf),!(i.boundingBox!==null&&Ns.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ns)))}_computeIntersections(t,e,i){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){let m=u[g],p=o[m.materialIndex],E=Math.max(m.start,f.start),b=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=E,T=b;_<T;_+=3){let A=a.getX(_),D=a.getX(_+1),v=a.getX(_+2);s=fl(this,p,t,i,c,h,d,A,D,v),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let E=a.getX(m),b=a.getX(m+1),_=a.getX(m+2);s=fl(this,o,t,i,c,h,d,E,b,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=u.length;g<x;g++){let m=u[g],p=o[m.materialIndex],E=Math.max(m.start,f.start),b=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=E,T=b;_<T;_+=3){let A=_,D=_+1,v=_+2;s=fl(this,p,t,i,c,h,d,A,D,v),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let E=m,b=m+1,_=m+2;s=fl(this,o,t,i,c,h,d,E,b,_),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Fx(n,t,e,i,s,r,o,a){let l;if(t.side===Nn?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===xi,a),l===null)return null;dl.copy(a),dl.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(dl);return c<e.near||c>e.far?null:{distance:c,point:dl.clone(),object:n}}function fl(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,ll),n.getVertexPosition(l,cl),n.getVertexPosition(c,hl);let h=Fx(n,t,e,i,ll,cl,hl,Xf);if(h){let d=new F;xs.getBarycoord(Xf,ll,cl,hl,d),s&&(h.uv=xs.getInterpolatedAttribute(s,a,l,c,d,new Ot)),r&&(h.uv1=xs.getInterpolatedAttribute(r,a,l,c,d,new Ot)),o&&(h.normal=xs.getInterpolatedAttribute(o,a,l,c,d,new F),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new F,materialIndex:0};xs.getNormal(ll,cl,hl,u.normal),h.face=u,h.barycoord=d}return h}var Ue=class n extends Xe{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new ee(c,3)),this.setAttribute("normal",new ee(h,3)),this.setAttribute("uv",new ee(d,2));function g(x,m,p,E,b,_,T,A,D,v,w){let y=_/D,N=T/v,O=_/2,B=T/2,V=A/2,Y=D+1,k=v+1,K=0,X=0,st=new F;for(let ut=0;ut<k;ut++){let ft=ut*N-B;for(let Tt=0;Tt<Y;Tt++){let wt=Tt*y-O;st[x]=wt*E,st[m]=ft*b,st[p]=V,c.push(st.x,st.y,st.z),st[x]=0,st[m]=0,st[p]=A>0?1:-1,h.push(st.x,st.y,st.z),d.push(Tt/D),d.push(1-ut/v),K+=1}}for(let ut=0;ut<v;ut++)for(let ft=0;ft<D;ft++){let Tt=u+ft+Y*ut,wt=u+ft+Y*(ut+1),q=u+(ft+1)+Y*(ut+1),Q=u+(ft+1)+Y*ut;l.push(Tt,wt,Q),l.push(wt,q,Q),X+=6}a.addGroup(f,X,w),f+=X,u+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function ir(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Rn(n){let t={};for(let e=0;e<n.length;e++){let i=ir(n[e]);for(let s in i)t[s]=i[s]}return t}function Ux(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function od(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:le.workingColorSpace}var la={clone:ir,merge:Rn},Ox=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Qn=class extends oi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ox,this.fragmentShader=Bx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ir(t.uniforms),this.uniformsGroups=Ux(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},No=class extends Fe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ht,this.projectionMatrix=new Ht,this.projectionMatrixInverse=new Ht,this.coordinateSystem=Ti}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},gs=new F,qf=new Ot,Yf=new Ot,Ke=class extends No{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Hs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Eo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Hs*2*Math.atan(Math.tan(Eo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){gs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(gs.x,gs.y).multiplyScalar(-t/gs.z),gs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(gs.x,gs.y).multiplyScalar(-t/gs.z)}getViewSize(t,e){return this.getViewBounds(t,qf,Yf),e.subVectors(Yf,qf)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Eo*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Fr=-90,Ur=1,Pl=class extends Fe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ke(Fr,Ur,t,e);s.layers=this.layers,this.add(s);let r=new Ke(Fr,Ur,t,e);r.layers=this.layers,this.add(r);let o=new Ke(Fr,Ur,t,e);o.layers=this.layers,this.add(o);let a=new Ke(Fr,Ur,t,e);a.layers=this.layers,this.add(a);let l=new Ke(Fr,Ur,t,e);l.layers=this.layers,this.add(l);let c=new Ke(Fr,Ur,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Ti)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ro)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Fo=class extends Dn{constructor(t,e,i,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Qs,super(t,e,i,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Il=class extends Ci{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Fo(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Gn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ue(5,5,5),r=new Qn({name:"CubemapFromEquirect",uniforms:ir(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Nn,blending:is});r.uniforms.tEquirect.value=e;let o=new dt(s,r),a=e.minFilter;return e.minFilter===yi&&(e.minFilter=Gn),new Pl(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}},Hn=class extends Fe{constructor(){super(),this.isGroup=!0,this.type="Group"}},kx={type:"move"},zr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,i),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&u>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(kx)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Hn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}};var Gs=class extends Fe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qe,this.environmentIntensity=1,this.environmentRotation=new Qe,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}},Ll=class{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Tl,this.updateRanges=[],this.version=0,this.uuid=gi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[i+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=gi()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ln=new F,_i=class n{constructor(t,e,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Ln.fromBufferAttribute(this,e),Ln.applyMatrix4(t),this.setXYZ(e,Ln.x,Ln.y,Ln.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ln.fromBufferAttribute(this,e),Ln.applyNormalMatrix(t),this.setXYZ(e,Ln.x,Ln.y,Ln.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ln.fromBufferAttribute(this,e),Ln.transformDirection(t),this.setXYZ(e,Ln.x,Ln.y,Ln.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=mi(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=we(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=we(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=we(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=we(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=we(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=mi(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=mi(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=mi(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=mi(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=we(e,this.array),i=we(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=we(e,this.array),i=we(i,this.array),s=we(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=we(e,this.array),i=we(i,this.array),s=we(s,this.array),r=we(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new gn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new n(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let e=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var Jf=new F,Zf=new ce,jf=new ce,zx=new F,$f=new Ht,pl=new F,bu=new Kn,Kf=new Ht,Su=new ji,Uo=class extends dt{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ru,this.bindMatrix=new Ht,this.bindMatrixInverse=new Ht,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let t=this.geometry;this.boundingBox===null&&(this.boundingBox=new An),this.boundingBox.makeEmpty();let e=t.getAttribute("position");for(let i=0;i<e.count;i++)this.getVertexPosition(i,pl),this.boundingBox.expandByPoint(pl)}computeBoundingSphere(){let t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Kn),this.boundingSphere.makeEmpty();let e=t.getAttribute("position");for(let i=0;i<e.count;i++)this.getVertexPosition(i,pl),this.boundingSphere.expandByPoint(pl)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){let i=this.material,s=this.matrixWorld;i!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),bu.copy(this.boundingSphere),bu.applyMatrix4(s),t.ray.intersectsSphere(bu)!==!1&&(Kf.copy(s).invert(),Su.copy(t.ray).applyMatrix4(Kf),!(this.boundingBox!==null&&Su.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,Su)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let t=new ce,e=this.geometry.attributes.skinWeight;for(let i=0,s=e.count;i<s;i++){t.fromBufferAttribute(e,i);let r=1/t.manhattanLength();r!==1/0?t.multiplyScalar(r):t.set(1,0,0,0),e.setXYZW(i,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Ru?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Hp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){let i=this.skeleton,s=this.geometry;Zf.fromBufferAttribute(s.attributes.skinIndex,t),jf.fromBufferAttribute(s.attributes.skinWeight,t),Jf.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let r=0;r<4;r++){let o=jf.getComponent(r);if(o!==0){let a=Zf.getComponent(r);$f.multiplyMatrices(i.bones[a].matrixWorld,i.boneInverses[a]),e.addScaledVector(zx.copy(Jf).applyMatrix4($f),o)}}return e.applyMatrix4(this.bindMatrixInverse)}},Vr=class extends Fe{constructor(){super(),this.isBone=!0,this.type="Bone"}},Oo=class extends Dn{constructor(t=null,e=1,i=1,s,r,o,a,l,c=Wn,h=Wn,d,u){super(null,o,a,l,c,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Qf=new Ht,Vx=new Ht,Bo=class n{constructor(t=[],e=[]){this.uuid=gi(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let i=0,s=this.bones.length;i<s;i++)this.boneInverses.push(new Ht)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){let i=new Ht;this.bones[t]&&i.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(i)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){let i=this.bones[t];i&&i.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){let i=this.bones[t];i&&(i.parent&&i.parent.isBone?(i.matrix.copy(i.parent.matrixWorld).invert(),i.matrix.multiply(i.matrixWorld)):i.matrix.copy(i.matrixWorld),i.matrix.decompose(i.position,i.quaternion,i.scale))}}update(){let t=this.bones,e=this.boneInverses,i=this.boneMatrices,s=this.boneTexture;for(let r=0,o=t.length;r<o;r++){let a=t[r]?t[r].matrixWorld:Vx;Qf.multiplyMatrices(a,e[r]),Qf.toArray(i,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new n(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);let e=new Float32Array(t*t*4);e.set(this.boneMatrices);let i=new Oo(e,t,t,ni,vi);return i.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=i,this}getBoneByName(t){for(let e=0,i=this.bones.length;e<i;e++){let s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let i=0,s=t.bones.length;i<s;i++){let r=t.bones[i],o=e[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Vr),this.bones.push(o),this.boneInverses.push(new Ht().fromArray(t.boneInverses[i]))}return this.init(),this}toJSON(){let t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;let e=this.bones,i=this.boneInverses;for(let s=0,r=e.length;s<r;s++){let o=e[s];t.bones.push(o.uuid);let a=i[s];t.boneInverses.push(a.toArray())}return t}};var wu=new F,Hx=new F,Gx=new ie,Vn=class{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=wu.subVectors(i,e).cross(Hx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(wu),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Gx.getNormalMatrix(t),s=this.coplanarPoint(wu).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},Fs=new Kn,ml=new F,Hr=class{constructor(t=new Vn,e=new Vn,i=new Vn,s=new Vn,r=new Vn,o=new Vn){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Ti){let i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],d=s[6],u=s[7],f=s[8],g=s[9],x=s[10],m=s[11],p=s[12],E=s[13],b=s[14],_=s[15];if(i[0].setComponents(l-r,u-c,m-f,_-p).normalize(),i[1].setComponents(l+r,u+c,m+f,_+p).normalize(),i[2].setComponents(l+o,u+h,m+g,_+E).normalize(),i[3].setComponents(l-o,u-h,m-g,_-E).normalize(),i[4].setComponents(l-a,u-d,m-x,_-b).normalize(),e===Ti)i[5].setComponents(l+a,u+d,m+x,_+b).normalize();else if(e===Ro)i[5].setComponents(a,d,x,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Fs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Fs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Fs)}intersectsSprite(t){return Fs.center.set(0,0,0),Fs.radius=.7071067811865476,Fs.applyMatrix4(t.matrixWorld),this.intersectsSphere(Fs)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(ml.x=s.normal.x>0?t.max.x:t.min.x,ml.y=s.normal.y>0?t.max.y:t.min.y,ml.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ml)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ri=class extends oi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Jt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Dl=new F,Nl=new F,tp=new Ht,So=new ji,gl=new Kn,Eu=new F,ep=new F,Cn=class extends Fe{constructor(t=new Xe,e=new Ri){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Dl.fromBufferAttribute(e,s-1),Nl.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Dl.distanceTo(Nl);t.setAttribute("lineDistance",new ee(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),gl.copy(i.boundingSphere),gl.applyMatrix4(s),gl.radius+=r,t.ray.intersectsSphere(gl)===!1)return;tp.copy(s).invert(),So.copy(t.ray).applyMatrix4(tp);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=c){let p=h.getX(x),E=h.getX(x+1),b=xl(this,t,So,l,p,E,x);b&&e.push(b)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(f),p=xl(this,t,So,l,x,m,g-1);p&&e.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=c){let p=xl(this,t,So,l,x,x+1,x);p&&e.push(p)}if(this.isLineLoop){let x=xl(this,t,So,l,g-1,f,g-1);x&&e.push(x)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function xl(n,t,e,i,s,r,o){let a=n.geometry.attributes.position;if(Dl.fromBufferAttribute(a,s),Nl.fromBufferAttribute(a,r),e.distanceSqToSegment(Dl,Nl,Eu,ep)>i)return;Eu.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Eu);if(!(c<t.near||c>t.far))return{distance:c,point:ep.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}var np=new F,ip=new F,ko=class extends Cn{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)np.fromBufferAttribute(e,s),ip.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+np.distanceTo(ip);t.setAttribute("lineDistance",new ee(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var zo=class extends Dn{constructor(t,e,i,s,r,o,a,l,c,h=Os){if(h!==Os&&h!==zs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Os&&(i=Es),i===void 0&&h===zs&&(i=er),super(null,s,r,o,a,l,h,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Wn,this.minFilter=l!==void 0?l:Wn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}};var Oe=class n extends Xe{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],d=[],u=[],f=[],g=0,x=[],m=i/2,p=0;E(),o===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new ee(d,3)),this.setAttribute("normal",new ee(u,3)),this.setAttribute("uv",new ee(f,2));function E(){let _=new F,T=new F,A=0,D=(e-t)/i;for(let v=0;v<=r;v++){let w=[],y=v/r,N=y*(e-t)+t;for(let O=0;O<=s;O++){let B=O/s,V=B*l+a,Y=Math.sin(V),k=Math.cos(V);T.x=N*Y,T.y=-y*i+m,T.z=N*k,d.push(T.x,T.y,T.z),_.set(Y,D,k).normalize(),u.push(_.x,_.y,_.z),f.push(B,1-y),w.push(g++)}x.push(w)}for(let v=0;v<s;v++)for(let w=0;w<r;w++){let y=x[w][v],N=x[w+1][v],O=x[w+1][v+1],B=x[w][v+1];(t>0||w!==0)&&(h.push(y,N,B),A+=3),(e>0||w!==r-1)&&(h.push(N,O,B),A+=3)}c.addGroup(p,A,0),p+=A}function b(_){let T=g,A=new Ot,D=new F,v=0,w=_===!0?t:e,y=_===!0?1:-1;for(let O=1;O<=s;O++)d.push(0,m*y,0),u.push(0,y,0),f.push(.5,.5),g++;let N=g;for(let O=0;O<=s;O++){let V=O/s*l+a,Y=Math.cos(V),k=Math.sin(V);D.x=w*k,D.y=m*y,D.z=w*Y,d.push(D.x,D.y,D.z),u.push(0,y,0),A.x=Y*.5+.5,A.y=k*.5*y+.5,f.push(A.x,A.y),g++}for(let O=0;O<s;O++){let B=T+O,V=N+O;_===!0?h.push(V,V+1,B):h.push(V+1,V,B),v+=3}c.addGroup(p,v,_===!0?1:2),p+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Fl=class n extends Xe{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};let r=[],o=[];a(s),c(i),h(),this.setAttribute("position",new ee(r,3)),this.setAttribute("normal",new ee(r.slice(),3)),this.setAttribute("uv",new ee(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(E){let b=new F,_=new F,T=new F;for(let A=0;A<e.length;A+=3)f(e[A+0],b),f(e[A+1],_),f(e[A+2],T),l(b,_,T,E)}function l(E,b,_,T){let A=T+1,D=[];for(let v=0;v<=A;v++){D[v]=[];let w=E.clone().lerp(_,v/A),y=b.clone().lerp(_,v/A),N=A-v;for(let O=0;O<=N;O++)O===0&&v===A?D[v][O]=w:D[v][O]=w.clone().lerp(y,O/N)}for(let v=0;v<A;v++)for(let w=0;w<2*(A-v)-1;w++){let y=Math.floor(w/2);w%2===0?(u(D[v][y+1]),u(D[v+1][y]),u(D[v][y])):(u(D[v][y+1]),u(D[v+1][y+1]),u(D[v+1][y]))}}function c(E){let b=new F;for(let _=0;_<r.length;_+=3)b.x=r[_+0],b.y=r[_+1],b.z=r[_+2],b.normalize().multiplyScalar(E),r[_+0]=b.x,r[_+1]=b.y,r[_+2]=b.z}function h(){let E=new F;for(let b=0;b<r.length;b+=3){E.x=r[b+0],E.y=r[b+1],E.z=r[b+2];let _=m(E)/2/Math.PI+.5,T=p(E)/Math.PI+.5;o.push(_,1-T)}g(),d()}function d(){for(let E=0;E<o.length;E+=6){let b=o[E+0],_=o[E+2],T=o[E+4],A=Math.max(b,_,T),D=Math.min(b,_,T);A>.9&&D<.1&&(b<.2&&(o[E+0]+=1),_<.2&&(o[E+2]+=1),T<.2&&(o[E+4]+=1))}}function u(E){r.push(E.x,E.y,E.z)}function f(E,b){let _=E*3;b.x=t[_+0],b.y=t[_+1],b.z=t[_+2]}function g(){let E=new F,b=new F,_=new F,T=new F,A=new Ot,D=new Ot,v=new Ot;for(let w=0,y=0;w<r.length;w+=9,y+=6){E.set(r[w+0],r[w+1],r[w+2]),b.set(r[w+3],r[w+4],r[w+5]),_.set(r[w+6],r[w+7],r[w+8]),A.set(o[y+0],o[y+1]),D.set(o[y+2],o[y+3]),v.set(o[y+4],o[y+5]),T.copy(E).add(b).add(_).divideScalar(3);let N=m(T);x(A,y+0,E,N),x(D,y+2,b,N),x(v,y+4,_,N)}}function x(E,b,_,T){T<0&&E.x===1&&(o[b]=E.x-1),_.x===0&&_.z===0&&(o[b]=T/2/Math.PI+.5)}function m(E){return Math.atan2(E.z,-E.x)}function p(E){return Math.atan2(-E.y,Math.sqrt(E.x*E.x+E.z*E.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.vertices,t.indices,t.radius,t.details)}};var ys=class n extends Fl{constructor(t=1,e=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}},$i=class n extends Xe{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,h=l+1,d=t/a,u=e/l,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let E=p*u-o;for(let b=0;b<c;b++){let _=b*d-r;g.push(_,-E,0),x.push(0,0,1),m.push(b/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let E=0;E<a;E++){let b=E+c*p,_=E+c*(p+1),T=E+1+c*(p+1),A=E+1+c*p;f.push(b,_,A),f.push(_,T,A)}this.setIndex(f),this.setAttribute("position",new ee(g,3)),this.setAttribute("normal",new ee(x,3)),this.setAttribute("uv",new ee(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};var Ki=class n extends Xe{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new F,u=new F,f=[],g=[],x=[],m=[];for(let p=0;p<=i;p++){let E=[],b=p/i,_=0;p===0&&o===0?_=.5/e:p===i&&l===Math.PI&&(_=-.5/e);for(let T=0;T<=e;T++){let A=T/e;d.x=-t*Math.cos(s+A*r)*Math.sin(o+b*a),d.y=t*Math.cos(o+b*a),d.z=t*Math.sin(s+A*r)*Math.sin(o+b*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(A+_,1-b),E.push(c++)}h.push(E)}for(let p=0;p<i;p++)for(let E=0;E<e;E++){let b=h[p][E+1],_=h[p][E],T=h[p+1][E],A=h[p+1][E+1];(p!==0||o>0)&&f.push(b,_,A),(p!==i-1||l<Math.PI)&&f.push(_,T,A)}this.setIndex(f),this.setAttribute("position",new ee(g,3)),this.setAttribute("normal",new ee(x,3)),this.setAttribute("uv",new ee(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Qi=class n extends Xe{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],l=[],c=[],h=new F,d=new F,u=new F;for(let f=0;f<=i;f++)for(let g=0;g<=s;g++){let x=g/s*r,m=f/i*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(x),d.y=(t+e*Math.cos(m))*Math.sin(x),d.z=e*Math.sin(m),a.push(d.x,d.y,d.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(g/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=s;g++){let x=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,p=(s+1)*(f-1)+g,E=(s+1)*f+g;o.push(x,m,E),o.push(m,p,E)}this.setIndex(o),this.setAttribute("position",new ee(a,3)),this.setAttribute("normal",new ee(l,3)),this.setAttribute("uv",new ee(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Vo=class extends Xe{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){let e=[],i=new Set,s=new F,r=new F;if(t.index!==null){let o=t.attributes.position,a=t.index,l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let d=l[c],u=d.start,f=d.count;for(let g=u,x=u+f;g<x;g+=3)for(let m=0;m<3;m++){let p=a.getX(g+m),E=a.getX(g+(m+1)%3);s.fromBufferAttribute(o,p),r.fromBufferAttribute(o,E),sp(s,r,i)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}}else{let o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){let h=3*a+c,d=3*a+(c+1)%3;s.fromBufferAttribute(o,h),r.fromBufferAttribute(o,d),sp(s,r,i)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new ee(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};function sp(n,t,e){let i=`${n.x},${n.y},${n.z}-${t.x},${t.y},${t.z}`,s=`${t.x},${t.y},${t.z}-${n.x},${n.y},${n.z}`;return e.has(i)===!0||e.has(s)===!0?!1:(e.add(i),e.add(s),!0)}var Ho=class extends oi{constructor(t){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Jt(0),this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.fog=t.fog,this}};var li=class extends oi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=aa,this.normalScale=new Ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var vn=class extends oi{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Jt(16777215),this.specular=new Jt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=aa,this.normalScale=new Ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.combine=Qo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var Go=class extends oi{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=aa,this.normalScale=new Ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qe,this.combine=Qo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Ul=class extends oi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ol=class extends oi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function _l(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Wx(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Xx(n){function t(s,r){return n[s]-n[r]}let e=n.length,i=new Array(e);for(let s=0;s!==e;++s)i[s]=s;return i.sort(t),i}function rp(n,t,e){let i=n.length,s=new n.constructor(i);for(let r=0,o=0;o!==i;++r){let a=e[r]*t;for(let l=0;l!==t;++l)s[o++]=n[a+l]}return s}function om(n,t,e,i){let s=1,r=n[0];for(;r!==void 0&&r[i]===void 0;)r=n[s++];if(r===void 0)return;let o=r[i];if(o!==void 0)if(Array.isArray(o))do o=r[i],o!==void 0&&(t.push(r.time),e.push.apply(e,o)),r=n[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[i],o!==void 0&&(t.push(r.time),o.toArray(e,e.length)),r=n[s++];while(r!==void 0);else do o=r[i],o!==void 0&&(t.push(r.time),e.push(o)),r=n[s++];while(r!==void 0)}var Ws=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Bl=class extends Ws{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Pu,endingEnd:Pu}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Iu:r=t,a=2*e-i;break;case Lu:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Iu:o=t,l=2*i-e;break;case Lu:o=1,l=i+s[1]-s[0];break;default:o=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(i-e)/(s-e),x=g*g,m=x*g,p=-u*m+2*u*x-u*g,E=(1+u)*m+(-1.5-2*u)*x+(-.5+u)*g+1,b=(-1-f)*m+(1.5+f)*x+.5*g,_=f*m-f*x;for(let T=0;T!==a;++T)r[T]=p*o[h+T]+E*o[c+T]+b*o[l+T]+_*o[d+T];return r}},kl=class extends Ws{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(i-e)/(s-e),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},zl=class extends Ws{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},ti=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=_l(e,this.TimeBufferType),this.values=_l(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:_l(t.times,Array),values:_l(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new zl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new kl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Bl(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ao:e=this.InterpolantFactoryMethodDiscrete;break;case El:e=this.InterpolantFactoryMethodLinear;break;case Ml:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ao;case this.InterpolantFactoryMethodLinear:return El;case this.InterpolantFactoryMethodSmooth:return Ml}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Wx(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Ml,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let d=a*i,u=d-i,f=d+i;for(let g=0;g!==i;++g){let x=e[d+g];if(x!==e[u+g]||x!==e[f+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let d=a*i,u=o*i;for(let f=0;f!==i;++f)e[u+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};ti.prototype.TimeBufferType=Float32Array;ti.prototype.ValueBufferType=Float32Array;ti.prototype.DefaultInterpolation=El;var ts=class extends ti{constructor(t,e,i){super(t,e,i)}};ts.prototype.ValueTypeName="bool";ts.prototype.ValueBufferType=Array;ts.prototype.DefaultInterpolation=Ao;ts.prototype.InterpolantFactoryMethodLinear=void 0;ts.prototype.InterpolantFactoryMethodSmooth=void 0;var Wo=class extends ti{};Wo.prototype.ValueTypeName="color";var Xs=class extends ti{};Xs.prototype.ValueTypeName="number";var Vl=class extends Ws{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)de.slerpFlat(r,0,o,c-a,o,c,l);return r}},es=class extends ti{InterpolantFactoryMethodLinear(t){return new Vl(this.times,this.values,this.getValueSize(),t)}};es.prototype.ValueTypeName="quaternion";es.prototype.InterpolantFactoryMethodSmooth=void 0;var ns=class extends ti{constructor(t,e,i){super(t,e,i)}};ns.prototype.ValueTypeName="string";ns.prototype.ValueBufferType=Array;ns.prototype.DefaultInterpolation=Ao;ns.prototype.InterpolantFactoryMethodLinear=void 0;ns.prototype.InterpolantFactoryMethodSmooth=void 0;var Pi=class extends ti{};Pi.prototype.ValueTypeName="vector";var Gr=class{constructor(t="",e=-1,i=[],s=Wp){this.name=t,this.tracks=i,this.duration=e,this.blendMode=s,this.uuid=gi(),this.duration<0&&this.resetDuration()}static parse(t){let e=[],i=t.tracks,s=1/(t.fps||1);for(let o=0,a=i.length;o!==a;++o)e.push(Yx(i[o]).scale(s));let r=new this(t.name,t.duration,e,t.blendMode);return r.uuid=t.uuid,r}static toJSON(t){let e=[],i=t.tracks,s={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let r=0,o=i.length;r!==o;++r)e.push(ti.toJSON(i[r]));return s}static CreateFromMorphTargetSequence(t,e,i,s){let r=e.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=Xx(l);l=rp(l,1,h),c=rp(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Xs(".morphTargetInfluences["+e[a].name+"]",l,c).scale(1/i))}return new this(t,-1,o)}static findByName(t,e){let i=t;if(!Array.isArray(t)){let s=t;i=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<i.length;s++)if(i[s].name===e)return i[s];return null}static CreateClipsFromMorphTargetSequences(t,e,i){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=t.length;a<l;a++){let c=t[a],h=c.name.match(r);if(h&&h.length>1){let d=h[1],u=s[d];u||(s[d]=u=[]),u.push(c)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],e,i));return o}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let i=function(d,u,f,g,x){if(f.length!==0){let m=[],p=[];om(f,m,p,g),m.length!==0&&x.push(new d(u,m,p))}},s=[],r=t.name||"default",o=t.fps||30,a=t.blendMode,l=t.length||-1,c=t.hierarchy||[];for(let d=0;d<c.length;d++){let u=c[d].keys;if(!(!u||u.length===0))if(u[0].morphTargets){let f={},g;for(g=0;g<u.length;g++)if(u[g].morphTargets)for(let x=0;x<u[g].morphTargets.length;x++)f[u[g].morphTargets[x]]=-1;for(let x in f){let m=[],p=[];for(let E=0;E!==u[g].morphTargets.length;++E){let b=u[g];m.push(b.time),p.push(b.morphTarget===x?1:0)}s.push(new Xs(".morphTargetInfluence["+x+"]",m,p))}l=f.length*o}else{let f=".bones["+e[d].name+"]";i(Pi,f+".position",u,"pos",s),i(es,f+".quaternion",u,"rot",s),i(Pi,f+".scale",u,"scl",s)}}return s.length===0?null:new this(r,l,s,a)}resetDuration(){let t=this.tracks,e=0;for(let i=0,s=t.length;i!==s;++i){let r=this.tracks[i];e=Math.max(e,r.times[r.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){let t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function qx(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Xs;case"vector":case"vector2":case"vector3":case"vector4":return Pi;case"color":return Wo;case"quaternion":return es;case"bool":case"boolean":return ts;case"string":return ns}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function Yx(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let t=qx(n.type);if(n.times===void 0){let e=[],i=[];om(n.keys,e,i,"value"),n.times=e,n.values=i}return t.parse!==void 0?t.parse(n):new t(n.name,n.times,n.values,n.interpolation)}var Xo={enabled:!1,files:{},add:function(n,t){this.enabled!==!1&&(this.files[n]=t)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}},Wr=class{constructor(t,e,i){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}},Nc=new Wr,ei=class{constructor(t){this.manager=t!==void 0?t:Nc,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};ei.DEFAULT_MATERIAL_NAME="__DEFAULT";var Yi={},Nu=class extends Error{constructor(t,e){super(t),this.response=e}},vs=class extends ei{constructor(t){super(t)}load(t,e,i,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=Xo.get(t);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(Yi[t]!==void 0){Yi[t].push({onLoad:e,onProgress:i,onError:s});return}Yi[t]=[],Yi[t].push({onLoad:e,onProgress:i,onError:s});let o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=Yi[t],d=c.body.getReader(),u=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=u?parseInt(u):0,g=f!==0,x=0,m=new ReadableStream({start(p){E();function E(){d.read().then(({done:b,value:_})=>{if(b)p.close();else{x+=_.byteLength;let T=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let A=0,D=h.length;A<D;A++){let v=h[A];v.onProgress&&v.onProgress(T)}p.enqueue(_),E()}},b=>{p.error(b)})}}});return new Response(m)}else throw new Nu(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Xo.add(t,c);let h=Yi[t];delete Yi[t];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=Yi[t];if(h===void 0)throw this.manager.itemError(t),c;delete Yi[t];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onError&&f.onError(c)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}};var Hl=class extends ei{constructor(t){super(t)}load(t,e,i,s){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=this,o=Xo.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;let a=Br("img");function l(){h(),Xo.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(d){h(),s&&s(d),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}};var qo=class extends ei{constructor(t){super(t)}load(t,e,i,s){let r=this,o=new Oo,a=new vs(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(t,function(l){let c;try{c=r.parse(l)}catch(h){if(s!==void 0)s(h);else{console.error(h);return}}c.image!==void 0?o.image=c.image:c.data!==void 0&&(o.image.width=c.width,o.image.height=c.height,o.image.data=c.data),o.wrapS=c.wrapS!==void 0?c.wrapS:$n,o.wrapT=c.wrapT!==void 0?c.wrapT:$n,o.magFilter=c.magFilter!==void 0?c.magFilter:Gn,o.minFilter=c.minFilter!==void 0?c.minFilter:Gn,o.anisotropy=c.anisotropy!==void 0?c.anisotropy:1,c.colorSpace!==void 0&&(o.colorSpace=c.colorSpace),c.flipY!==void 0&&(o.flipY=c.flipY),c.format!==void 0&&(o.format=c.format),c.type!==void 0&&(o.type=c.type),c.mipmaps!==void 0&&(o.mipmaps=c.mipmaps,o.minFilter=yi),c.mipmapCount===1&&(o.minFilter=Gn),c.generateMipmaps!==void 0&&(o.generateMipmaps=c.generateMipmaps),o.needsUpdate=!0,e&&e(o,c)},i,s),o}},qs=class extends ei{constructor(t){super(t)}load(t,e,i,s){let r=new Dn,o=new Hl(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},i,s),r}},Ys=class extends Fe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}};var Tu=new Ht,op=new F,ap=new F,Yo=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ot(512,512),this.map=null,this.mapPass=null,this.matrix=new Ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Hr,this._frameExtents=new Ot(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;op.setFromMatrixPosition(t.matrixWorld),e.position.copy(op),ap.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ap),e.updateMatrixWorld(),Tu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Tu),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Tu)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},Fu=class extends Yo{constructor(){super(new Ke(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){let e=this.camera,i=Hs*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(i!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},Jo=class extends Ys{constructor(t,e,i=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Fu}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},lp=new Ht,wo=new F,Au=new F,Uu=class extends Yo{constructor(){super(new Ke(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ot(4,2),this._viewportCount=6,this._viewports=[new ce(2,1,1,1),new ce(0,1,1,1),new ce(3,1,1,1),new ce(1,1,1,1),new ce(3,0,1,1),new ce(1,0,1,1)],this._cubeDirections=[new F(1,0,0),new F(-1,0,0),new F(0,0,1),new F(0,0,-1),new F(0,1,0),new F(0,-1,0)],this._cubeUps=[new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,1,0),new F(0,0,1),new F(0,0,-1)]}updateMatrices(t,e=0){let i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),wo.setFromMatrixPosition(t.matrixWorld),i.position.copy(wo),Au.copy(i.position),Au.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(Au),i.updateMatrixWorld(),s.makeTranslation(-wo.x,-wo.y,-wo.z),lp.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lp)}},Zo=class extends Ys{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new Uu}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Js=class extends No{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ou=class extends Yo{constructor(){super(new Js(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Zs=class extends Ys{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Fe.DEFAULT_UP),this.updateMatrix(),this.target=new Fe,this.shadow=new Ou}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},js=class extends Ys{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var $s=class{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let i=0,s=t.length;i<s;i++)e+=String.fromCharCode(t[i]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){let e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}},jo=class extends Xe{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var Gl=class extends Ke{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t,this.index=0}};var ad="\\[\\]\\.:\\/",Jx=new RegExp("["+ad+"]","g"),ld="[^"+ad+"]",Zx="[^"+ad.replace("\\.","")+"]",jx=/((?:WC+[\/:])*)/.source.replace("WC",ld),$x=/(WCOD+)?/.source.replace("WCOD",Zx),Kx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ld),Qx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ld),t_=new RegExp("^"+jx+$x+Kx+Qx+"$"),e_=["material","materials","bones","map"],Bu=class{constructor(t,e,i){let s=i||Ve.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Ve=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Jx,"")}static parseTrackName(t){let e=t_.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);e_.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?a=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ve.Composite=Bu;Ve.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ve.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ve.prototype.GetterByBindingType=[Ve.prototype._getValue_direct,Ve.prototype._getValue_array,Ve.prototype._getValue_arrayElement,Ve.prototype._getValue_toArray];Ve.prototype.SetterByBindingTypeAndVersioning=[[Ve.prototype._setValue_direct,Ve.prototype._setValue_direct_setNeedsUpdate,Ve.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ve.prototype._setValue_array,Ve.prototype._setValue_array_setNeedsUpdate,Ve.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ve.prototype._setValue_arrayElement,Ve.prototype._setValue_arrayElement_setNeedsUpdate,Ve.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ve.prototype._setValue_fromArray,Ve.prototype._setValue_fromArray_setNeedsUpdate,Ve.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var pE=new Float32Array(1);var Ms=class extends Ll{constructor(t,e,i=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){let e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){let e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}};var cp=new Ht,bs=class{constructor(t,e,i=0,s=1/0){this.ray=new ji(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new kr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return cp.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(cp),this}intersectObject(t,e=!0,i=[]){return ku(t,this,i,e),i.sort(hp),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)ku(t[s],this,i,e);return i.sort(hp),i}};function hp(n,t){return n.distance-t.distance}function ku(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){let r=n.children;for(let o=0,a=r.length;o<a;o++)ku(r[o],t,e,!0)}}var Xr=class{constructor(t=1,e=0,i=0){return this.radius=t,this.phi=e,this.theta=i,this}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ae(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(ae(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var up=new F,yl=new F,$o=class{constructor(t=new F,e=new F){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){up.subVectors(t,this.start),yl.subVectors(this.end,this.start);let i=yl.dot(yl),r=yl.dot(up)/i;return e&&(r=ae(r,0,1)),r}closestPointToPoint(t,e,i){let s=this.closestPointToPointParameter(t,e);return this.delta(i).multiplyScalar(s).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};var dp=new F,vl,Cu,Ko=class extends Fe{constructor(t=new F(0,0,1),e=new F(0,0,0),i=1,s=16776960,r=i*.2,o=r*.2){super(),this.type="ArrowHelper",vl===void 0&&(vl=new Xe,vl.setAttribute("position",new ee([0,0,0,0,1,0],3)),Cu=new Oe(0,.5,1,5,1),Cu.translate(0,-.5,0)),this.position.copy(e),this.line=new Cn(vl,new Ri({color:s,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new dt(Cu,new ai({color:s,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(i,r,o)}setDirection(t){if(t.y>.99999)this.quaternion.set(0,0,0,1);else if(t.y<-.99999)this.quaternion.set(1,0,0,0);else{dp.set(t.z,0,-t.x).normalize();let e=Math.acos(t.y);this.quaternion.setFromAxisAngle(dp,e)}}setLength(t,e=t*.2,i=e*.2){this.line.scale.set(1,Math.max(1e-4,t-e),1),this.line.updateMatrix(),this.cone.scale.set(i,e,i),this.cone.position.y=t,this.cone.updateMatrix()}setColor(t){this.line.material.color.set(t),this.cone.material.color.set(t)}copy(t){return super.copy(t,!1),this.line.copy(t.line),this.cone.copy(t.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}};var Ks=class extends Ai{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}};function cd(n,t,e,i){let s=n_(i);switch(e){case Zu:return n*t;case $u:return n*t;case Ku:return n*t*2;case Qu:return n*t/s.components*s.byteLength;case rc:return n*t/s.components*s.byteLength;case td:return n*t*2/s.components*s.byteLength;case oc:return n*t*2/s.components*s.byteLength;case ju:return n*t*3/s.components*s.byteLength;case ni:return n*t*4/s.components*s.byteLength;case ac:return n*t*4/s.components*s.byteLength;case na:case ia:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case sa:case ra:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case cc:case uc:return Math.max(n,16)*Math.max(t,8)/4;case lc:case hc:return Math.max(n,8)*Math.max(t,8)/2;case dc:case fc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case pc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case mc:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case gc:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case xc:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case _c:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case yc:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case vc:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Mc:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case bc:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case Sc:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case wc:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Ec:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Tc:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Ac:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Cc:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case oa:case Rc:case Pc:return Math.ceil(n/4)*Math.ceil(t/4)*16;case ed:case Ic:return Math.ceil(n/4)*Math.ceil(t/4)*8;case Lc:case Dc:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function n_(n){switch(n){case Li:case qu:return{byteLength:1,components:1};case qr:case Yu:case Yr:return{byteLength:2,components:1};case ic:case sc:return{byteLength:2,components:4};case Es:case nc:case vi:return{byteLength:4,components:1};case Ju:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wl);function Pm(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function i_(n){let t=new WeakMap;function e(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,c){let h=l.array,d=l.updateRanges;if(n.bindBuffer(c,a),d.length===0)n.bufferSubData(c,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){let g=d[u],x=d[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){let x=d[f];n.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var s_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,r_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,o_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,a_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,l_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,c_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,h_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,u_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,d_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,f_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,p_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,m_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,g_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,x_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,__=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,y_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,v_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,M_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,b_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,S_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,w_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,E_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,T_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,A_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,C_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,R_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,P_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,I_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,L_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,D_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,N_="gl_FragColor = linearToOutputTexel( gl_FragColor );",F_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,U_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,O_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,B_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,k_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,z_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,V_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,H_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,G_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,W_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,X_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,q_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Y_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,J_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Z_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,j_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,$_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,K_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Q_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ty=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ey=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ny=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,iy=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,sy=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ry=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,oy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ay=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ly=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cy=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,uy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fy=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,py=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,my=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,xy=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_y=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yy=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,vy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,My=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,by=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Sy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ey=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ty=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ay=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ry=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Py=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Iy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ly=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Dy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ny=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Fy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Uy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Oy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,By=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ky=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,zy=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Vy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Hy=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Gy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wy=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Xy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,qy=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Yy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jy=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,$y=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ky=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Qy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ev=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,nv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,iv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ov=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,av=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,hv=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,uv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,dv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,pv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_v=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,bv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,wv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ev=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Tv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Av=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Cv=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Iv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Lv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Dv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Fv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Uv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,oe={alphahash_fragment:s_,alphahash_pars_fragment:r_,alphamap_fragment:o_,alphamap_pars_fragment:a_,alphatest_fragment:l_,alphatest_pars_fragment:c_,aomap_fragment:h_,aomap_pars_fragment:u_,batching_pars_vertex:d_,batching_vertex:f_,begin_vertex:p_,beginnormal_vertex:m_,bsdfs:g_,iridescence_fragment:x_,bumpmap_pars_fragment:__,clipping_planes_fragment:y_,clipping_planes_pars_fragment:v_,clipping_planes_pars_vertex:M_,clipping_planes_vertex:b_,color_fragment:S_,color_pars_fragment:w_,color_pars_vertex:E_,color_vertex:T_,common:A_,cube_uv_reflection_fragment:C_,defaultnormal_vertex:R_,displacementmap_pars_vertex:P_,displacementmap_vertex:I_,emissivemap_fragment:L_,emissivemap_pars_fragment:D_,colorspace_fragment:N_,colorspace_pars_fragment:F_,envmap_fragment:U_,envmap_common_pars_fragment:O_,envmap_pars_fragment:B_,envmap_pars_vertex:k_,envmap_physical_pars_fragment:j_,envmap_vertex:z_,fog_vertex:V_,fog_pars_vertex:H_,fog_fragment:G_,fog_pars_fragment:W_,gradientmap_pars_fragment:X_,lightmap_pars_fragment:q_,lights_lambert_fragment:Y_,lights_lambert_pars_fragment:J_,lights_pars_begin:Z_,lights_toon_fragment:$_,lights_toon_pars_fragment:K_,lights_phong_fragment:Q_,lights_phong_pars_fragment:ty,lights_physical_fragment:ey,lights_physical_pars_fragment:ny,lights_fragment_begin:iy,lights_fragment_maps:sy,lights_fragment_end:ry,logdepthbuf_fragment:oy,logdepthbuf_pars_fragment:ay,logdepthbuf_pars_vertex:ly,logdepthbuf_vertex:cy,map_fragment:hy,map_pars_fragment:uy,map_particle_fragment:dy,map_particle_pars_fragment:fy,metalnessmap_fragment:py,metalnessmap_pars_fragment:my,morphinstance_vertex:gy,morphcolor_vertex:xy,morphnormal_vertex:_y,morphtarget_pars_vertex:yy,morphtarget_vertex:vy,normal_fragment_begin:My,normal_fragment_maps:by,normal_pars_fragment:Sy,normal_pars_vertex:wy,normal_vertex:Ey,normalmap_pars_fragment:Ty,clearcoat_normal_fragment_begin:Ay,clearcoat_normal_fragment_maps:Cy,clearcoat_pars_fragment:Ry,iridescence_pars_fragment:Py,opaque_fragment:Iy,packing:Ly,premultiplied_alpha_fragment:Dy,project_vertex:Ny,dithering_fragment:Fy,dithering_pars_fragment:Uy,roughnessmap_fragment:Oy,roughnessmap_pars_fragment:By,shadowmap_pars_fragment:ky,shadowmap_pars_vertex:zy,shadowmap_vertex:Vy,shadowmask_pars_fragment:Hy,skinbase_vertex:Gy,skinning_pars_vertex:Wy,skinning_vertex:Xy,skinnormal_vertex:qy,specularmap_fragment:Yy,specularmap_pars_fragment:Jy,tonemapping_fragment:Zy,tonemapping_pars_fragment:jy,transmission_fragment:$y,transmission_pars_fragment:Ky,uv_pars_fragment:Qy,uv_pars_vertex:tv,uv_vertex:ev,worldpos_vertex:nv,background_vert:iv,background_frag:sv,backgroundCube_vert:rv,backgroundCube_frag:ov,cube_vert:av,cube_frag:lv,depth_vert:cv,depth_frag:hv,distanceRGBA_vert:uv,distanceRGBA_frag:dv,equirect_vert:fv,equirect_frag:pv,linedashed_vert:mv,linedashed_frag:gv,meshbasic_vert:xv,meshbasic_frag:_v,meshlambert_vert:yv,meshlambert_frag:vv,meshmatcap_vert:Mv,meshmatcap_frag:bv,meshnormal_vert:Sv,meshnormal_frag:wv,meshphong_vert:Ev,meshphong_frag:Tv,meshphysical_vert:Av,meshphysical_frag:Cv,meshtoon_vert:Rv,meshtoon_frag:Pv,points_vert:Iv,points_frag:Lv,shadow_vert:Dv,shadow_frag:Nv,sprite_vert:Fv,sprite_frag:Uv},xt={common:{diffuse:{value:new Jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ie}},envmap:{envMap:{value:null},envMapRotation:{value:new ie},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ie},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0},uvTransform:{value:new ie}},sprite:{diffuse:{value:new Jt(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}}},Fn={basic:{uniforms:Rn([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.fog]),vertexShader:oe.meshbasic_vert,fragmentShader:oe.meshbasic_frag},lambert:{uniforms:Rn([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new Jt(0)}}]),vertexShader:oe.meshlambert_vert,fragmentShader:oe.meshlambert_frag},phong:{uniforms:Rn([xt.common,xt.specularmap,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,xt.lights,{emissive:{value:new Jt(0)},specular:{value:new Jt(1118481)},shininess:{value:30}}]),vertexShader:oe.meshphong_vert,fragmentShader:oe.meshphong_frag},standard:{uniforms:Rn([xt.common,xt.envmap,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.roughnessmap,xt.metalnessmap,xt.fog,xt.lights,{emissive:{value:new Jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:oe.meshphysical_vert,fragmentShader:oe.meshphysical_frag},toon:{uniforms:Rn([xt.common,xt.aomap,xt.lightmap,xt.emissivemap,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.gradientmap,xt.fog,xt.lights,{emissive:{value:new Jt(0)}}]),vertexShader:oe.meshtoon_vert,fragmentShader:oe.meshtoon_frag},matcap:{uniforms:Rn([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,xt.fog,{matcap:{value:null}}]),vertexShader:oe.meshmatcap_vert,fragmentShader:oe.meshmatcap_frag},points:{uniforms:Rn([xt.points,xt.fog]),vertexShader:oe.points_vert,fragmentShader:oe.points_frag},dashed:{uniforms:Rn([xt.common,xt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:oe.linedashed_vert,fragmentShader:oe.linedashed_frag},depth:{uniforms:Rn([xt.common,xt.displacementmap]),vertexShader:oe.depth_vert,fragmentShader:oe.depth_frag},normal:{uniforms:Rn([xt.common,xt.bumpmap,xt.normalmap,xt.displacementmap,{opacity:{value:1}}]),vertexShader:oe.meshnormal_vert,fragmentShader:oe.meshnormal_frag},sprite:{uniforms:Rn([xt.sprite,xt.fog]),vertexShader:oe.sprite_vert,fragmentShader:oe.sprite_frag},background:{uniforms:{uvTransform:{value:new ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:oe.background_vert,fragmentShader:oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ie}},vertexShader:oe.backgroundCube_vert,fragmentShader:oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:oe.cube_vert,fragmentShader:oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:oe.equirect_vert,fragmentShader:oe.equirect_frag},distanceRGBA:{uniforms:Rn([xt.common,xt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:oe.distanceRGBA_vert,fragmentShader:oe.distanceRGBA_frag},shadow:{uniforms:Rn([xt.lights,xt.fog,{color:{value:new Jt(0)},opacity:{value:1}}]),vertexShader:oe.shadow_vert,fragmentShader:oe.shadow_frag}};Fn.physical={uniforms:Rn([Fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ie},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ie},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ie},sheen:{value:0},sheenColor:{value:new Jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ie},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ie},attenuationDistance:{value:0},attenuationColor:{value:new Jt(0)},specularColor:{value:new Jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ie},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ie}}]),vertexShader:oe.meshphysical_vert,fragmentShader:oe.meshphysical_frag};var Fc={r:0,b:0,g:0},sr=new Qe,Ov=new Ht;function Bv(n,t,e,i,s,r,o){let a=new Jt(0),l=r===!0?0:1,c,h,d=null,u=0,f=null;function g(b){let _=b.isScene===!0?b.background:null;return _&&_.isTexture&&(_=(b.backgroundBlurriness>0?e:t).get(_)),_}function x(b){let _=!1,T=g(b);T===null?p(a,l):T&&T.isColor&&(p(T,1),_=!0);let A=n.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(b,_){let T=g(_);T&&(T.isCubeTexture||T.mapping===ta)?(h===void 0&&(h=new dt(new Ue(1,1,1),new Qn({name:"BackgroundCubeMaterial",uniforms:ir(Fn.backgroundCube.uniforms),vertexShader:Fn.backgroundCube.vertexShader,fragmentShader:Fn.backgroundCube.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,D,v){this.matrixWorld.copyPosition(v.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),sr.copy(_.backgroundRotation),sr.x*=-1,sr.y*=-1,sr.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(sr.y*=-1,sr.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ov.makeRotationFromEuler(sr)),h.material.toneMapped=le.getTransfer(T.colorSpace)!==Ee,(d!==T||u!==T.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,d=T,u=T.version,f=n.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new dt(new $i(2,2),new Qn({name:"BackgroundMaterial",uniforms:ir(Fn.background.uniforms),vertexShader:Fn.background.vertexShader,fragmentShader:Fn.background.fragmentShader,side:xi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=le.getTransfer(T.colorSpace)!==Ee,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||u!==T.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=T,u=T.version,f=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,_){b.getRGB(Fc,od(n)),i.buffers.color.setClear(Fc.r,Fc.g,Fc.b,_,o)}function E(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,_=1){a.set(b),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:x,addToRenderList:m,dispose:E}}function kv(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null),r=s,o=!1;function a(y,N,O,B,V){let Y=!1,k=d(B,O,N);r!==k&&(r=k,c(r.object)),Y=f(y,B,O,V),Y&&g(y,B,O,V),V!==null&&t.update(V,n.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,_(y,N,O,B),V!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return n.createVertexArray()}function c(y){return n.bindVertexArray(y)}function h(y){return n.deleteVertexArray(y)}function d(y,N,O){let B=O.wireframe===!0,V=i[y.id];V===void 0&&(V={},i[y.id]=V);let Y=V[N.id];Y===void 0&&(Y={},V[N.id]=Y);let k=Y[B];return k===void 0&&(k=u(l()),Y[B]=k),k}function u(y){let N=[],O=[],B=[];for(let V=0;V<e;V++)N[V]=0,O[V]=0,B[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:N,enabledAttributes:O,attributeDivisors:B,object:y,attributes:{},index:null}}function f(y,N,O,B){let V=r.attributes,Y=N.attributes,k=0,K=O.getAttributes();for(let X in K)if(K[X].location>=0){let ut=V[X],ft=Y[X];if(ft===void 0&&(X==="instanceMatrix"&&y.instanceMatrix&&(ft=y.instanceMatrix),X==="instanceColor"&&y.instanceColor&&(ft=y.instanceColor)),ut===void 0||ut.attribute!==ft||ft&&ut.data!==ft.data)return!0;k++}return r.attributesNum!==k||r.index!==B}function g(y,N,O,B){let V={},Y=N.attributes,k=0,K=O.getAttributes();for(let X in K)if(K[X].location>=0){let ut=Y[X];ut===void 0&&(X==="instanceMatrix"&&y.instanceMatrix&&(ut=y.instanceMatrix),X==="instanceColor"&&y.instanceColor&&(ut=y.instanceColor));let ft={};ft.attribute=ut,ut&&ut.data&&(ft.data=ut.data),V[X]=ft,k++}r.attributes=V,r.attributesNum=k,r.index=B}function x(){let y=r.newAttributes;for(let N=0,O=y.length;N<O;N++)y[N]=0}function m(y){p(y,0)}function p(y,N){let O=r.newAttributes,B=r.enabledAttributes,V=r.attributeDivisors;O[y]=1,B[y]===0&&(n.enableVertexAttribArray(y),B[y]=1),V[y]!==N&&(n.vertexAttribDivisor(y,N),V[y]=N)}function E(){let y=r.newAttributes,N=r.enabledAttributes;for(let O=0,B=N.length;O<B;O++)N[O]!==y[O]&&(n.disableVertexAttribArray(O),N[O]=0)}function b(y,N,O,B,V,Y,k){k===!0?n.vertexAttribIPointer(y,N,O,V,Y):n.vertexAttribPointer(y,N,O,B,V,Y)}function _(y,N,O,B){x();let V=B.attributes,Y=O.getAttributes(),k=N.defaultAttributeValues;for(let K in Y){let X=Y[K];if(X.location>=0){let st=V[K];if(st===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(st=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(st=y.instanceColor)),st!==void 0){let ut=st.normalized,ft=st.itemSize,Tt=t.get(st);if(Tt===void 0)continue;let wt=Tt.buffer,q=Tt.type,Q=Tt.bytesPerElement,et=q===n.INT||q===n.UNSIGNED_INT||st.gpuType===nc;if(st.isInterleavedBufferAttribute){let nt=st.data,_t=nt.stride,Qt=st.offset;if(nt.isInstancedInterleavedBuffer){for(let Gt=0;Gt<X.locationSize;Gt++)p(X.location+Gt,nt.meshPerAttribute);y.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let Gt=0;Gt<X.locationSize;Gt++)m(X.location+Gt);n.bindBuffer(n.ARRAY_BUFFER,wt);for(let Gt=0;Gt<X.locationSize;Gt++)b(X.location+Gt,ft/X.locationSize,q,ut,_t*Q,(Qt+ft/X.locationSize*Gt)*Q,et)}else{if(st.isInstancedBufferAttribute){for(let nt=0;nt<X.locationSize;nt++)p(X.location+nt,st.meshPerAttribute);y.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let nt=0;nt<X.locationSize;nt++)m(X.location+nt);n.bindBuffer(n.ARRAY_BUFFER,wt);for(let nt=0;nt<X.locationSize;nt++)b(X.location+nt,ft/X.locationSize,q,ut,ft*Q,ft/X.locationSize*nt*Q,et)}}else if(k!==void 0){let ut=k[K];if(ut!==void 0)switch(ut.length){case 2:n.vertexAttrib2fv(X.location,ut);break;case 3:n.vertexAttrib3fv(X.location,ut);break;case 4:n.vertexAttrib4fv(X.location,ut);break;default:n.vertexAttrib1fv(X.location,ut)}}}}E()}function T(){v();for(let y in i){let N=i[y];for(let O in N){let B=N[O];for(let V in B)h(B[V].object),delete B[V];delete N[O]}delete i[y]}}function A(y){if(i[y.id]===void 0)return;let N=i[y.id];for(let O in N){let B=N[O];for(let V in B)h(B[V].object),delete B[V];delete N[O]}delete i[y.id]}function D(y){for(let N in i){let O=i[N];if(O[y.id]===void 0)continue;let B=O[y.id];for(let V in B)h(B[V].object),delete B[V];delete O[y.id]}}function v(){w(),o=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:v,resetDefaultState:w,dispose:T,releaseStatesOfGeometry:A,releaseStatesOfProgram:D,initAttributes:x,enableAttribute:m,disableUnusedAttributes:E}}function zv(n,t,e){let i;function s(c){i=c}function r(c,h){n.drawArrays(i,c,h),e.update(h,i,1)}function o(c,h,d){d!==0&&(n.drawArraysInstanced(i,c,h,d),e.update(h,i,d))}function a(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];e.update(f,i,1)}function l(c,h,d,u){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,u,0,d);let g=0;for(let x=0;x<d;x++)g+=h[x]*u[x];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Vv(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let D=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(D){return!(D!==ni&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(D){let v=D===Yr&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(D!==Li&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==vi&&!v)}function l(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:E,maxVaryings:b,maxFragmentUniforms:_,vertexTextures:T,maxSamples:A}}function Hv(n){let t=this,e=null,i=0,s=!1,r=!1,o=new Vn,a=new ie,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||i!==0||s;return s=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){let g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=n.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let E=r?0:i,b=E*4,_=p.clippingState||null;l.value=_,_=h(g,u,b,f);for(let T=0;T!==b;++T)_[T]=e[T];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,f,g){let x=d!==null?d.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let p=f+x*4,E=u.matrixWorldInverse;a.getNormalMatrix(E),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,_=f;b!==x;++b,_+=4)o.copy(d[b]).applyMatrix4(E,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function Gv(n){let t=new WeakMap;function e(o,a){return a===Ql?o.mapping=Qs:a===tc&&(o.mapping=tr),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Ql||a===tc)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Il(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var Zr=4,am=[.125,.215,.35,.446,.526,.582],ar=20,hd=new Js,lm=new Jt,ud=null,dd=0,fd=0,pd=!1,or=(1+Math.sqrt(5))/2,Jr=1/or,cm=[new F(-or,Jr,0),new F(or,Jr,0),new F(-Jr,0,or),new F(Jr,0,or),new F(0,or,-Jr),new F(0,or,Jr),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)],Bc=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){ud=this._renderer.getRenderTarget(),dd=this._renderer.getActiveCubeFace(),fd=this._renderer.getActiveMipmapLevel(),pd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=dm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=um(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ud,dd,fd),this._renderer.xr.enabled=pd,t.scissorTest=!1,Uc(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Qs||t.mapping===tr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ud=this._renderer.getRenderTarget(),dd=this._renderer.getActiveCubeFace(),fd=this._renderer.getActiveMipmapLevel(),pd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Gn,minFilter:Gn,generateMipmaps:!1,type:Yr,format:ni,colorSpace:Vs,depthBuffer:!1},s=hm(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=hm(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Wv(r)),this._blurMaterial=Xv(r,t,e)}return s}_compileMaterial(t){let e=new dt(this._lodPlanes[0],t);this._renderer.compile(e,hd)}_sceneToCubeUV(t,e,i,s){let a=new Ke(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(lm),h.toneMapping=ss,h.autoClear=!1;let f=new ai({name:"PMREM.Background",side:Nn,depthWrite:!1,depthTest:!1}),g=new dt(new Ue,f),x=!1,m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,x=!0):(f.color.copy(lm),x=!0);for(let p=0;p<6;p++){let E=p%3;E===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):E===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));let b=this._cubeSize;Uc(s,E*b,p>2?b:0,b,b),h.setRenderTarget(s),x&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===Qs||t.mapping===tr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=dm()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=um());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new dt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Uc(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,hd)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=cm[(s-r-1)%cm.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,d=new dt(this._lodPlanes[s],c),u=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ar-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):ar;m>ar&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ar}`);let p=[],E=0;for(let D=0;D<ar;++D){let v=D/x,w=Math.exp(-v*v/2);p.push(w),D===0?E+=w:D<m&&(E+=2*w)}for(let D=0;D<p.length;D++)p[D]=p[D]/E;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);let{_lodMax:b}=this;u.dTheta.value=g,u.mipInt.value=b-i;let _=this._sizeLods[s],T=3*_*(s>b-Zr?s-b+Zr:0),A=4*(this._cubeSize-_);Uc(e,T,A,3*_,2*_),l.setRenderTarget(e),l.render(d,hd)}};function Wv(n){let t=[],e=[],i=[],s=n,r=n-Zr+1+am.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Zr?l=am[o-n+Zr-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,x=3,m=2,p=1,E=new Float32Array(x*g*f),b=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let A=0;A<f;A++){let D=A%3*2/3-1,v=A>2?0:-1,w=[D,v,0,D+2/3,v,0,D+2/3,v+1,0,D,v,0,D+2/3,v+1,0,D,v+1,0];E.set(w,x*g*A),b.set(u,m*g*A);let y=[A,A,A,A,A,A];_.set(y,p*g*A)}let T=new Xe;T.setAttribute("position",new gn(E,x)),T.setAttribute("uv",new gn(b,m)),T.setAttribute("faceIndex",new gn(_,p)),t.push(T),s>Zr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function hm(n,t,e){let i=new Ci(n,t,e);return i.texture.mapping=ta,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Uc(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Xv(n,t,e){let i=new Float32Array(ar),s=new F(0,1,0);return new Qn({name:"SphericalGaussianBlur",defines:{n:ar,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:wd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:is,depthTest:!1,depthWrite:!1})}function um(){return new Qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:is,depthTest:!1,depthWrite:!1})}function dm(){return new Qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:is,depthTest:!1,depthWrite:!1})}function wd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function qv(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===Ql||l===tc,h=l===Qs||l===tr;if(c||h){let d=t.get(a),u=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==u)return e===null&&(e=new Bc(n)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&s(f)?(e===null&&(e=new Bc(n)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function Yv(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&nr("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Jv(n,t,e,i){let s={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",o),delete s[u.id];let f=r.get(u);f&&(t.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return s[u.id]===!0||(u.addEventListener("dispose",o),s[u.id]=!0,e.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)t.update(u[f],n.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,g=d.attributes.position,x=0;if(f!==null){let E=f.array;x=f.version;for(let b=0,_=E.length;b<_;b+=3){let T=E[b+0],A=E[b+1],D=E[b+2];u.push(T,A,A,D,D,T)}}else if(g!==void 0){let E=g.array;x=g.version;for(let b=0,_=E.length/3-1;b<_;b+=3){let T=b+0,A=b+1,D=b+2;u.push(T,A,A,D,D,T)}}else return;let m=new(rd(u)?Do:Lo)(u,1);m.version=x;let p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function Zv(n,t,e){let i;function s(u){i=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){n.drawElements(i,f,r,u*o),e.update(f,i,1)}function c(u,f,g){g!==0&&(n.drawElementsInstanced(i,f,r,u*o,g),e.update(f,i,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,i,1)}function d(u,f,g,x){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)c(u[p]/o,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,u,0,x,0,g);let p=0;for(let E=0;E<g;E++)p+=f[E]*x[E];e.update(p,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function jv(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function $v(n,t,e){let i=new WeakMap,s=new ce;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=i.get(a);if(u===void 0||u.count!==d){let w=function(){D.dispose(),i.delete(a),a.removeEventListener("dispose",w)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],E=a.morphAttributes.color||[],b=0;f===!0&&(b=1),g===!0&&(b=2),x===!0&&(b=3);let _=a.attributes.position.count*b,T=1;_>t.maxTextureSize&&(T=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);let A=new Float32Array(_*T*4*d),D=new Io(A,_,T,d);D.type=vi,D.needsUpdate=!0;let v=b*4;for(let y=0;y<d;y++){let N=m[y],O=p[y],B=E[y],V=_*T*4*y;for(let Y=0;Y<N.count;Y++){let k=Y*v;f===!0&&(s.fromBufferAttribute(N,Y),A[V+k+0]=s.x,A[V+k+1]=s.y,A[V+k+2]=s.z,A[V+k+3]=0),g===!0&&(s.fromBufferAttribute(O,Y),A[V+k+4]=s.x,A[V+k+5]=s.y,A[V+k+6]=s.z,A[V+k+7]=0),x===!0&&(s.fromBufferAttribute(B,Y),A[V+k+8]=s.x,A[V+k+9]=s.y,A[V+k+10]=s.z,A[V+k+11]=B.itemSize===4?s.w:1)}}u={count:d,texture:D,size:new Ot(_,T)},i.set(a,u),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function Kv(n,t,e,i){let s=new WeakMap;function r(l){let c=i.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var Im=new Dn,fm=new zo(1,1),Lm=new Io,Dm=new Rl,Nm=new Fo,pm=[],mm=[],gm=new Float32Array(16),xm=new Float32Array(9),_m=new Float32Array(4);function $r(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=pm[s];if(r===void 0&&(r=new Float32Array(s),pm[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function hn(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function un(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function zc(n,t){let e=mm[t];e===void 0&&(e=new Int32Array(t),mm[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Qv(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function tM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(hn(e,t))return;n.uniform2fv(this.addr,t),un(e,t)}}function eM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(hn(e,t))return;n.uniform3fv(this.addr,t),un(e,t)}}function nM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(hn(e,t))return;n.uniform4fv(this.addr,t),un(e,t)}}function iM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(hn(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),un(e,t)}else{if(hn(e,i))return;_m.set(i),n.uniformMatrix2fv(this.addr,!1,_m),un(e,i)}}function sM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(hn(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),un(e,t)}else{if(hn(e,i))return;xm.set(i),n.uniformMatrix3fv(this.addr,!1,xm),un(e,i)}}function rM(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(hn(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),un(e,t)}else{if(hn(e,i))return;gm.set(i),n.uniformMatrix4fv(this.addr,!1,gm),un(e,i)}}function oM(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function aM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(hn(e,t))return;n.uniform2iv(this.addr,t),un(e,t)}}function lM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(hn(e,t))return;n.uniform3iv(this.addr,t),un(e,t)}}function cM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(hn(e,t))return;n.uniform4iv(this.addr,t),un(e,t)}}function hM(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function uM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(hn(e,t))return;n.uniform2uiv(this.addr,t),un(e,t)}}function dM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(hn(e,t))return;n.uniform3uiv(this.addr,t),un(e,t)}}function fM(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(hn(e,t))return;n.uniform4uiv(this.addr,t),un(e,t)}}function pM(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(fm.compareFunction=nd,r=fm):r=Im,e.setTexture2D(t||r,s)}function mM(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Dm,s)}function gM(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Nm,s)}function xM(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Lm,s)}function _M(n){switch(n){case 5126:return Qv;case 35664:return tM;case 35665:return eM;case 35666:return nM;case 35674:return iM;case 35675:return sM;case 35676:return rM;case 5124:case 35670:return oM;case 35667:case 35671:return aM;case 35668:case 35672:return lM;case 35669:case 35673:return cM;case 5125:return hM;case 36294:return uM;case 36295:return dM;case 36296:return fM;case 35678:case 36198:case 36298:case 36306:case 35682:return pM;case 35679:case 36299:case 36307:return mM;case 35680:case 36300:case 36308:case 36293:return gM;case 36289:case 36303:case 36311:case 36292:return xM}}function yM(n,t){n.uniform1fv(this.addr,t)}function vM(n,t){let e=$r(t,this.size,2);n.uniform2fv(this.addr,e)}function MM(n,t){let e=$r(t,this.size,3);n.uniform3fv(this.addr,e)}function bM(n,t){let e=$r(t,this.size,4);n.uniform4fv(this.addr,e)}function SM(n,t){let e=$r(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function wM(n,t){let e=$r(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function EM(n,t){let e=$r(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function TM(n,t){n.uniform1iv(this.addr,t)}function AM(n,t){n.uniform2iv(this.addr,t)}function CM(n,t){n.uniform3iv(this.addr,t)}function RM(n,t){n.uniform4iv(this.addr,t)}function PM(n,t){n.uniform1uiv(this.addr,t)}function IM(n,t){n.uniform2uiv(this.addr,t)}function LM(n,t){n.uniform3uiv(this.addr,t)}function DM(n,t){n.uniform4uiv(this.addr,t)}function NM(n,t,e){let i=this.cache,s=t.length,r=zc(e,s);hn(i,r)||(n.uniform1iv(this.addr,r),un(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Im,r[o])}function FM(n,t,e){let i=this.cache,s=t.length,r=zc(e,s);hn(i,r)||(n.uniform1iv(this.addr,r),un(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Dm,r[o])}function UM(n,t,e){let i=this.cache,s=t.length,r=zc(e,s);hn(i,r)||(n.uniform1iv(this.addr,r),un(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Nm,r[o])}function OM(n,t,e){let i=this.cache,s=t.length,r=zc(e,s);hn(i,r)||(n.uniform1iv(this.addr,r),un(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Lm,r[o])}function BM(n){switch(n){case 5126:return yM;case 35664:return vM;case 35665:return MM;case 35666:return bM;case 35674:return SM;case 35675:return wM;case 35676:return EM;case 5124:case 35670:return TM;case 35667:case 35671:return AM;case 35668:case 35672:return CM;case 35669:case 35673:return RM;case 5125:return PM;case 36294:return IM;case 36295:return LM;case 36296:return DM;case 35678:case 36198:case 36298:case 36306:case 35682:return NM;case 35679:case 36299:case 36307:return FM;case 35680:case 36300:case 36308:case 36293:return UM;case 36289:case 36303:case 36311:case 36292:return OM}}var gd=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=_M(e.type)}},xd=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=BM(e.type)}},_d=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],i)}}},md=/(\w+)(\])?(\[|\.)?/g;function ym(n,t){n.seq.push(t),n.map[t.id]=t}function kM(n,t,e){let i=n.name,s=i.length;for(md.lastIndex=0;;){let r=md.exec(i),o=md.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){ym(e,c===void 0?new gd(a,n,t):new xd(a,n,t));break}else{let d=e.map[a];d===void 0&&(d=new _d(a),ym(e,d)),e=d}}}var jr=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);kM(r,o,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&i.push(o)}return i}};function vm(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var zM=37297,VM=0;function HM(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}var Mm=new ie;function GM(n){le._getMatrix(Mm,le.workingColorSpace,n);let t=`mat3( ${Mm.elements.map(e=>e.toFixed(4))} )`;switch(le.getTransfer(n)){case Co:return[t,"LinearTransferOETF"];case Ee:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function bm(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+HM(n.getShaderSource(t),o)}else return s}function WM(n,t){let e=GM(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function XM(n,t){let e;switch(t){case Fp:e="Linear";break;case Up:e="Reinhard";break;case Op:e="Cineon";break;case Bp:e="ACESFilmic";break;case zp:e="AgX";break;case Vp:e="Neutral";break;case kp:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Oc=new F;function qM(){le.getLuminanceCoefficients(Oc);let n=Oc.x.toFixed(4),t=Oc.y.toFixed(4),e=Oc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function YM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ca).join(`
`)}function JM(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function ZM(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function ca(n){return n!==""}function Sm(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function wm(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var jM=/^[ \t]*#include +<([\w\d./]+)>/gm;function yd(n){return n.replace(jM,KM)}var $M=new Map;function KM(n,t){let e=oe[t];if(e===void 0){let i=$M.get(t);if(i!==void 0)e=oe[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return yd(e)}var QM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Em(n){return n.replace(QM,t1)}function t1(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Tm(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function e1(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Vu?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Xl?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Ii&&(t="SHADOWMAP_TYPE_VSM"),t}function n1(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Qs:case tr:t="ENVMAP_TYPE_CUBE";break;case ta:t="ENVMAP_TYPE_CUBE_UV";break}return t}function i1(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case tr:t="ENVMAP_MODE_REFRACTION";break}return t}function s1(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Qo:t="ENVMAP_BLENDING_MULTIPLY";break;case Dp:t="ENVMAP_BLENDING_MIX";break;case Np:t="ENVMAP_BLENDING_ADD";break}return t}function r1(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function o1(n,t,e,i){let s=n.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=e1(e),c=n1(e),h=i1(e),d=s1(e),u=r1(e),f=YM(e),g=JM(r),x=s.createProgram(),m,p,E=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ca).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ca).join(`
`),p.length>0&&(p+=`
`)):(m=[Tm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ca).join(`
`),p=[Tm(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ss?"#define TONE_MAPPING":"",e.toneMapping!==ss?oe.tonemapping_pars_fragment:"",e.toneMapping!==ss?XM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",oe.colorspace_pars_fragment,WM("linearToOutputTexel",e.outputColorSpace),qM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ca).join(`
`)),o=yd(o),o=Sm(o,e),o=wm(o,e),a=yd(a),a=Sm(a,e),a=wm(a,e),o=Em(o),a=Em(a),e.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===id?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===id?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let b=E+m+o,_=E+p+a,T=vm(s,s.VERTEX_SHADER,b),A=vm(s,s.FRAGMENT_SHADER,_);s.attachShader(x,T),s.attachShader(x,A),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function D(N){if(n.debug.checkShaderErrors){let O=s.getProgramInfoLog(x).trim(),B=s.getShaderInfoLog(T).trim(),V=s.getShaderInfoLog(A).trim(),Y=!0,k=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Y=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,T,A);else{let K=bm(s,T,"vertex"),X=bm(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+O+`
`+K+`
`+X)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(B===""||V==="")&&(k=!1);k&&(N.diagnostics={runnable:Y,programLog:O,vertexShader:{log:B,prefix:m},fragmentShader:{log:V,prefix:p}})}s.deleteShader(T),s.deleteShader(A),v=new jr(s,x),w=ZM(s,x)}let v;this.getUniforms=function(){return v===void 0&&D(this),v};let w;this.getAttributes=function(){return w===void 0&&D(this),w};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(x,zM)),y},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=VM++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=A,this}var a1=0,vd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Md(t),e.set(t,i)),i}},Md=class{constructor(t){this.id=a1++,this.code=t,this.usedTimes=0}};function l1(n,t,e,i,s,r,o){let a=new kr,l=new vd,c=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,y,N,O,B){let V=O.fog,Y=B.geometry,k=w.isMeshStandardMaterial?O.environment:null,K=(w.isMeshStandardMaterial?e:t).get(w.envMap||k),X=K&&K.mapping===ta?K.image.height:null,st=g[w.type];w.precision!==null&&(f=s.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));let ut=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,ft=ut!==void 0?ut.length:0,Tt=0;Y.morphAttributes.position!==void 0&&(Tt=1),Y.morphAttributes.normal!==void 0&&(Tt=2),Y.morphAttributes.color!==void 0&&(Tt=3);let wt,q,Q,et;if(st){let se=Fn[st];wt=se.vertexShader,q=se.fragmentShader}else wt=w.vertexShader,q=w.fragmentShader,l.update(w),Q=l.getVertexShaderID(w),et=l.getFragmentShaderID(w);let nt=n.getRenderTarget(),_t=n.state.buffers.depth.getReversed(),Qt=B.isInstancedMesh===!0,Gt=B.isBatchedMesh===!0,Je=!!w.map,ke=!!w.matcap,fe=!!K,z=!!w.aoMap,On=!!w.lightMap,he=!!w.bumpMap,ue=!!w.normalMap,kt=!!w.displacementMap,Re=!!w.emissiveMap,Bt=!!w.metalnessMap,U=!!w.roughnessMap,C=w.anisotropy>0,J=w.clearcoat>0,ot=w.dispersion>0,lt=w.iridescence>0,rt=w.sheen>0,Nt=w.transmission>0,Mt=C&&!!w.anisotropyMap,Rt=J&&!!w.clearcoatMap,me=J&&!!w.clearcoatNormalMap,mt=J&&!!w.clearcoatRoughnessMap,Pt=lt&&!!w.iridescenceMap,Xt=lt&&!!w.iridescenceThicknessMap,jt=rt&&!!w.sheenColorMap,It=rt&&!!w.sheenRoughnessMap,pe=!!w.specularMap,ne=!!w.specularColorMap,be=!!w.specularIntensityMap,G=Nt&&!!w.transmissionMap,vt=Nt&&!!w.thicknessMap,tt=!!w.gradientMap,at=!!w.alphaMap,Et=w.alphaTest>0,bt=!!w.alphaHash,te=!!w.extensions,ze=ss;w.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(ze=n.toneMapping);let pn={shaderID:st,shaderType:w.type,shaderName:w.name,vertexShader:wt,fragmentShader:q,defines:w.defines,customVertexShaderID:Q,customFragmentShaderID:et,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:Gt,batchingColor:Gt&&B._colorsTexture!==null,instancing:Qt,instancingColor:Qt&&B.instanceColor!==null,instancingMorph:Qt&&B.morphTexture!==null,supportsVertexTextures:u,outputColorSpace:nt===null?n.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Vs,alphaToCoverage:!!w.alphaToCoverage,map:Je,matcap:ke,envMap:fe,envMapMode:fe&&K.mapping,envMapCubeUVHeight:X,aoMap:z,lightMap:On,bumpMap:he,normalMap:ue,displacementMap:u&&kt,emissiveMap:Re,normalMapObjectSpace:ue&&w.normalMapType===Yp,normalMapTangentSpace:ue&&w.normalMapType===aa,metalnessMap:Bt,roughnessMap:U,anisotropy:C,anisotropyMap:Mt,clearcoat:J,clearcoatMap:Rt,clearcoatNormalMap:me,clearcoatRoughnessMap:mt,dispersion:ot,iridescence:lt,iridescenceMap:Pt,iridescenceThicknessMap:Xt,sheen:rt,sheenColorMap:jt,sheenRoughnessMap:It,specularMap:pe,specularColorMap:ne,specularIntensityMap:be,transmission:Nt,transmissionMap:G,thicknessMap:vt,gradientMap:tt,opaque:w.transparent===!1&&w.blending===Bs&&w.alphaToCoverage===!1,alphaMap:at,alphaTest:Et,alphaHash:bt,combine:w.combine,mapUv:Je&&x(w.map.channel),aoMapUv:z&&x(w.aoMap.channel),lightMapUv:On&&x(w.lightMap.channel),bumpMapUv:he&&x(w.bumpMap.channel),normalMapUv:ue&&x(w.normalMap.channel),displacementMapUv:kt&&x(w.displacementMap.channel),emissiveMapUv:Re&&x(w.emissiveMap.channel),metalnessMapUv:Bt&&x(w.metalnessMap.channel),roughnessMapUv:U&&x(w.roughnessMap.channel),anisotropyMapUv:Mt&&x(w.anisotropyMap.channel),clearcoatMapUv:Rt&&x(w.clearcoatMap.channel),clearcoatNormalMapUv:me&&x(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:mt&&x(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Pt&&x(w.iridescenceMap.channel),iridescenceThicknessMapUv:Xt&&x(w.iridescenceThicknessMap.channel),sheenColorMapUv:jt&&x(w.sheenColorMap.channel),sheenRoughnessMapUv:It&&x(w.sheenRoughnessMap.channel),specularMapUv:pe&&x(w.specularMap.channel),specularColorMapUv:ne&&x(w.specularColorMap.channel),specularIntensityMapUv:be&&x(w.specularIntensityMap.channel),transmissionMapUv:G&&x(w.transmissionMap.channel),thicknessMapUv:vt&&x(w.thicknessMap.channel),alphaMapUv:at&&x(w.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(ue||C),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!Y.attributes.uv&&(Je||at),fog:!!V,useFog:w.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:_t,skinning:B.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:ft,morphTextureStride:Tt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&N.length>0,shadowMapType:n.shadowMap.type,toneMapping:ze,decodeVideoTexture:Je&&w.map.isVideoTexture===!0&&le.getTransfer(w.map.colorSpace)===Ee,decodeVideoTextureEmissive:Re&&w.emissiveMap.isVideoTexture===!0&&le.getTransfer(w.emissiveMap.colorSpace)===Ee,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Xn,flipSided:w.side===Nn,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:te&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(te&&w.extensions.multiDraw===!0||Gt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return pn.vertexUv1s=c.has(1),pn.vertexUv2s=c.has(2),pn.vertexUv3s=c.has(3),c.clear(),pn}function p(w){let y=[];if(w.shaderID?y.push(w.shaderID):(y.push(w.customVertexShaderID),y.push(w.customFragmentShaderID)),w.defines!==void 0)for(let N in w.defines)y.push(N),y.push(w.defines[N]);return w.isRawShaderMaterial===!1&&(E(y,w),b(y,w),y.push(n.outputColorSpace)),y.push(w.customProgramCacheKey),y.join()}function E(w,y){w.push(y.precision),w.push(y.outputColorSpace),w.push(y.envMapMode),w.push(y.envMapCubeUVHeight),w.push(y.mapUv),w.push(y.alphaMapUv),w.push(y.lightMapUv),w.push(y.aoMapUv),w.push(y.bumpMapUv),w.push(y.normalMapUv),w.push(y.displacementMapUv),w.push(y.emissiveMapUv),w.push(y.metalnessMapUv),w.push(y.roughnessMapUv),w.push(y.anisotropyMapUv),w.push(y.clearcoatMapUv),w.push(y.clearcoatNormalMapUv),w.push(y.clearcoatRoughnessMapUv),w.push(y.iridescenceMapUv),w.push(y.iridescenceThicknessMapUv),w.push(y.sheenColorMapUv),w.push(y.sheenRoughnessMapUv),w.push(y.specularMapUv),w.push(y.specularColorMapUv),w.push(y.specularIntensityMapUv),w.push(y.transmissionMapUv),w.push(y.thicknessMapUv),w.push(y.combine),w.push(y.fogExp2),w.push(y.sizeAttenuation),w.push(y.morphTargetsCount),w.push(y.morphAttributeCount),w.push(y.numDirLights),w.push(y.numPointLights),w.push(y.numSpotLights),w.push(y.numSpotLightMaps),w.push(y.numHemiLights),w.push(y.numRectAreaLights),w.push(y.numDirLightShadows),w.push(y.numPointLightShadows),w.push(y.numSpotLightShadows),w.push(y.numSpotLightShadowsWithMaps),w.push(y.numLightProbes),w.push(y.shadowMapType),w.push(y.toneMapping),w.push(y.numClippingPlanes),w.push(y.numClipIntersection),w.push(y.depthPacking)}function b(w,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),w.push(a.mask)}function _(w){let y=g[w.type],N;if(y){let O=Fn[y];N=la.clone(O.uniforms)}else N=w.uniforms;return N}function T(w,y){let N;for(let O=0,B=h.length;O<B;O++){let V=h[O];if(V.cacheKey===y){N=V,++N.usedTimes;break}}return N===void 0&&(N=new o1(n,y,w,r),h.push(N)),N}function A(w){if(--w.usedTimes===0){let y=h.indexOf(w);h[y]=h[h.length-1],h.pop(),w.destroy()}}function D(w){l.remove(w)}function v(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:T,releaseProgram:A,releaseShaderCache:D,programs:h,dispose:v}}function c1(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function h1(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Am(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Cm(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(d,u,f,g,x,m){let p=n[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},n[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=x,p.group=m),t++,p}function a(d,u,f,g,x,m){let p=o(d,u,f,g,x,m);f.transmission>0?i.push(p):f.transparent===!0?s.push(p):e.push(p)}function l(d,u,f,g,x,m){let p=o(d,u,f,g,x,m);f.transmission>0?i.unshift(p):f.transparent===!0?s.unshift(p):e.unshift(p)}function c(d,u){e.length>1&&e.sort(d||h1),i.length>1&&i.sort(u||Am),s.length>1&&s.sort(u||Am)}function h(){for(let d=t,u=n.length;d<u;d++){let f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function u1(){let n=new WeakMap;function t(i,s){let r=n.get(i),o;return r===void 0?(o=new Cm,n.set(i,[o])):s>=r.length?(o=new Cm,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function d1(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Jt};break;case"SpotLight":e={position:new F,direction:new F,color:new Jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Jt,groundColor:new Jt};break;case"RectAreaLight":e={color:new Jt,position:new F,halfWidth:new F,halfHeight:new F};break}return n[t.id]=e,e}}}function f1(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var p1=0;function m1(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function g1(n){let t=new d1,e=f1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);let s=new F,r=new Ht,o=new Ht;function a(c){let h=0,d=0,u=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,E=0,b=0,_=0,T=0,A=0,D=0;c.sort(m1);for(let w=0,y=c.length;w<y;w++){let N=c[w],O=N.color,B=N.intensity,V=N.distance,Y=N.shadow&&N.shadow.map?N.shadow.map.texture:null;if(N.isAmbientLight)h+=O.r*B,d+=O.g*B,u+=O.b*B;else if(N.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(N.sh.coefficients[k],B);D++}else if(N.isDirectionalLight){let k=t.get(N);if(k.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let K=N.shadow,X=e.get(N);X.shadowIntensity=K.intensity,X.shadowBias=K.bias,X.shadowNormalBias=K.normalBias,X.shadowRadius=K.radius,X.shadowMapSize=K.mapSize,i.directionalShadow[f]=X,i.directionalShadowMap[f]=Y,i.directionalShadowMatrix[f]=N.shadow.matrix,E++}i.directional[f]=k,f++}else if(N.isSpotLight){let k=t.get(N);k.position.setFromMatrixPosition(N.matrixWorld),k.color.copy(O).multiplyScalar(B),k.distance=V,k.coneCos=Math.cos(N.angle),k.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),k.decay=N.decay,i.spot[x]=k;let K=N.shadow;if(N.map&&(i.spotLightMap[T]=N.map,T++,K.updateMatrices(N),N.castShadow&&A++),i.spotLightMatrix[x]=K.matrix,N.castShadow){let X=e.get(N);X.shadowIntensity=K.intensity,X.shadowBias=K.bias,X.shadowNormalBias=K.normalBias,X.shadowRadius=K.radius,X.shadowMapSize=K.mapSize,i.spotShadow[x]=X,i.spotShadowMap[x]=Y,_++}x++}else if(N.isRectAreaLight){let k=t.get(N);k.color.copy(O).multiplyScalar(B),k.halfWidth.set(N.width*.5,0,0),k.halfHeight.set(0,N.height*.5,0),i.rectArea[m]=k,m++}else if(N.isPointLight){let k=t.get(N);if(k.color.copy(N.color).multiplyScalar(N.intensity),k.distance=N.distance,k.decay=N.decay,N.castShadow){let K=N.shadow,X=e.get(N);X.shadowIntensity=K.intensity,X.shadowBias=K.bias,X.shadowNormalBias=K.normalBias,X.shadowRadius=K.radius,X.shadowMapSize=K.mapSize,X.shadowCameraNear=K.camera.near,X.shadowCameraFar=K.camera.far,i.pointShadow[g]=X,i.pointShadowMap[g]=Y,i.pointShadowMatrix[g]=N.shadow.matrix,b++}i.point[g]=k,g++}else if(N.isHemisphereLight){let k=t.get(N);k.skyColor.copy(N.color).multiplyScalar(B),k.groundColor.copy(N.groundColor).multiplyScalar(B),i.hemi[p]=k,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=xt.LTC_FLOAT_1,i.rectAreaLTC2=xt.LTC_FLOAT_2):(i.rectAreaLTC1=xt.LTC_HALF_1,i.rectAreaLTC2=xt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;let v=i.hash;(v.directionalLength!==f||v.pointLength!==g||v.spotLength!==x||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==E||v.numPointShadows!==b||v.numSpotShadows!==_||v.numSpotMaps!==T||v.numLightProbes!==D)&&(i.directional.length=f,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=_+T-A,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=D,v.directionalLength=f,v.pointLength=g,v.spotLength=x,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=E,v.numPointShadows=b,v.numSpotShadows=_,v.numSpotMaps=T,v.numLightProbes=D,i.version=p1++)}function l(c,h){let d=0,u=0,f=0,g=0,x=0,m=h.matrixWorldInverse;for(let p=0,E=c.length;p<E;p++){let b=c[p];if(b.isDirectionalLight){let _=i.directional[d];_.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),d++}else if(b.isSpotLight){let _=i.spot[f];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(m),f++}else if(b.isRectAreaLight){let _=i.rectArea[g];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),_.halfWidth.set(b.width*.5,0,0),_.halfHeight.set(0,b.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){let _=i.point[u];_.position.setFromMatrixPosition(b.matrixWorld),_.position.applyMatrix4(m),u++}else if(b.isHemisphereLight){let _=i.hemi[x];_.direction.setFromMatrixPosition(b.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:i}}function Rm(n){let t=new g1(n),e=[],i=[];function s(h){c.camera=h,e.length=0,i.length=0}function r(h){e.push(h)}function o(h){i.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}let c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function x1(n){let t=new WeakMap;function e(s,r=0){let o=t.get(s),a;return o===void 0?(a=new Rm(n),t.set(s,[a])):r>=o.length?(a=new Rm(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}var _1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,y1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function v1(n,t,e){let i=new Hr,s=new Ot,r=new Ot,o=new ce,a=new Ul({depthPacking:qp}),l=new Ol,c={},h=e.maxTextureSize,d={[xi]:Nn,[Nn]:xi,[Xn]:Xn},u=new Qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:_1,fragmentShader:y1}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let g=new Xe;g.setAttribute("position",new gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new dt(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vu;let p=this.type;this.render=function(A,D,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;let w=n.getRenderTarget(),y=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),O=n.state;O.setBlending(is),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);let B=p!==Ii&&this.type===Ii,V=p===Ii&&this.type!==Ii;for(let Y=0,k=A.length;Y<k;Y++){let K=A[Y],X=K.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);let st=X.getFrameExtents();if(s.multiply(st),r.copy(X.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/st.x),s.x=r.x*st.x,X.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/st.y),s.y=r.y*st.y,X.mapSize.y=r.y)),X.map===null||B===!0||V===!0){let ft=this.type!==Ii?{minFilter:Wn,magFilter:Wn}:{};X.map!==null&&X.map.dispose(),X.map=new Ci(s.x,s.y,ft),X.map.texture.name=K.name+".shadowMap",X.camera.updateProjectionMatrix()}n.setRenderTarget(X.map),n.clear();let ut=X.getViewportCount();for(let ft=0;ft<ut;ft++){let Tt=X.getViewport(ft);o.set(r.x*Tt.x,r.y*Tt.y,r.x*Tt.z,r.y*Tt.w),O.viewport(o),X.updateMatrices(K,ft),i=X.getFrustum(),_(D,v,X.camera,K,this.type)}X.isPointLightShadow!==!0&&this.type===Ii&&E(X,v),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(w,y,N)};function E(A,D){let v=t.update(x);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Ci(s.x,s.y)),u.uniforms.shadow_pass.value=A.map.texture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(D,null,v,u,x,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(D,null,v,f,x,null)}function b(A,D,v,w){let y=null,N=v.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(N!==void 0)y=N;else if(y=v.isPointLight===!0?l:a,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){let O=y.uuid,B=D.uuid,V=c[O];V===void 0&&(V={},c[O]=V);let Y=V[B];Y===void 0&&(Y=y.clone(),V[B]=Y,D.addEventListener("dispose",T)),y=Y}if(y.visible=D.visible,y.wireframe=D.wireframe,w===Ii?y.side=D.shadowSide!==null?D.shadowSide:D.side:y.side=D.shadowSide!==null?D.shadowSide:d[D.side],y.alphaMap=D.alphaMap,y.alphaTest=D.alphaTest,y.map=D.map,y.clipShadows=D.clipShadows,y.clippingPlanes=D.clippingPlanes,y.clipIntersection=D.clipIntersection,y.displacementMap=D.displacementMap,y.displacementScale=D.displacementScale,y.displacementBias=D.displacementBias,y.wireframeLinewidth=D.wireframeLinewidth,y.linewidth=D.linewidth,v.isPointLight===!0&&y.isMeshDistanceMaterial===!0){let O=n.properties.get(y);O.light=v}return y}function _(A,D,v,w,y){if(A.visible===!1)return;if(A.layers.test(D.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&y===Ii)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,A.matrixWorld);let B=t.update(A),V=A.material;if(Array.isArray(V)){let Y=B.groups;for(let k=0,K=Y.length;k<K;k++){let X=Y[k],st=V[X.materialIndex];if(st&&st.visible){let ut=b(A,st,w,y);A.onBeforeShadow(n,A,D,v,B,ut,X),n.renderBufferDirect(v,null,B,ut,A,X),A.onAfterShadow(n,A,D,v,B,ut,X)}}}else if(V.visible){let Y=b(A,V,w,y);A.onBeforeShadow(n,A,D,v,B,Y,null),n.renderBufferDirect(v,null,B,Y,A,null),A.onAfterShadow(n,A,D,v,B,Y,null)}}let O=A.children;for(let B=0,V=O.length;B<V;B++)_(O[B],D,v,w,y)}function T(A){A.target.removeEventListener("dispose",T);for(let v in c){let w=c[v],y=A.target.uuid;y in w&&(w[y].dispose(),delete w[y])}}}var M1={[ql]:Yl,[Jl]:$l,[Zl]:Kl,[ks]:jl,[Yl]:ql,[$l]:Jl,[Kl]:Zl,[jl]:ks};function b1(n,t){function e(){let G=!1,vt=new ce,tt=null,at=new ce(0,0,0,0);return{setMask:function(Et){tt!==Et&&!G&&(n.colorMask(Et,Et,Et,Et),tt=Et)},setLocked:function(Et){G=Et},setClear:function(Et,bt,te,ze,pn){pn===!0&&(Et*=ze,bt*=ze,te*=ze),vt.set(Et,bt,te,ze),at.equals(vt)===!1&&(n.clearColor(Et,bt,te,ze),at.copy(vt))},reset:function(){G=!1,tt=null,at.set(-1,0,0,0)}}}function i(){let G=!1,vt=!1,tt=null,at=null,Et=null;return{setReversed:function(bt){if(vt!==bt){let te=t.get("EXT_clip_control");vt?te.clipControlEXT(te.LOWER_LEFT_EXT,te.ZERO_TO_ONE_EXT):te.clipControlEXT(te.LOWER_LEFT_EXT,te.NEGATIVE_ONE_TO_ONE_EXT);let ze=Et;Et=null,this.setClear(ze)}vt=bt},getReversed:function(){return vt},setTest:function(bt){bt?nt(n.DEPTH_TEST):_t(n.DEPTH_TEST)},setMask:function(bt){tt!==bt&&!G&&(n.depthMask(bt),tt=bt)},setFunc:function(bt){if(vt&&(bt=M1[bt]),at!==bt){switch(bt){case ql:n.depthFunc(n.NEVER);break;case Yl:n.depthFunc(n.ALWAYS);break;case Jl:n.depthFunc(n.LESS);break;case ks:n.depthFunc(n.LEQUAL);break;case Zl:n.depthFunc(n.EQUAL);break;case jl:n.depthFunc(n.GEQUAL);break;case $l:n.depthFunc(n.GREATER);break;case Kl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}at=bt}},setLocked:function(bt){G=bt},setClear:function(bt){Et!==bt&&(vt&&(bt=1-bt),n.clearDepth(bt),Et=bt)},reset:function(){G=!1,tt=null,at=null,Et=null,vt=!1}}}function s(){let G=!1,vt=null,tt=null,at=null,Et=null,bt=null,te=null,ze=null,pn=null;return{setTest:function(se){G||(se?nt(n.STENCIL_TEST):_t(n.STENCIL_TEST))},setMask:function(se){vt!==se&&!G&&(n.stencilMask(se),vt=se)},setFunc:function(se,Bn,ui){(tt!==se||at!==Bn||Et!==ui)&&(n.stencilFunc(se,Bn,ui),tt=se,at=Bn,Et=ui)},setOp:function(se,Bn,ui){(bt!==se||te!==Bn||ze!==ui)&&(n.stencilOp(se,Bn,ui),bt=se,te=Bn,ze=ui)},setLocked:function(se){G=se},setClear:function(se){pn!==se&&(n.clearStencil(se),pn=se)},reset:function(){G=!1,vt=null,tt=null,at=null,Et=null,bt=null,te=null,ze=null,pn=null}}}let r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap,h={},d={},u=new WeakMap,f=[],g=null,x=!1,m=null,p=null,E=null,b=null,_=null,T=null,A=null,D=new Jt(0,0,0),v=0,w=!1,y=null,N=null,O=null,B=null,V=null,Y=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,K=0,X=n.getParameter(n.VERSION);X.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(X)[1]),k=K>=1):X.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),k=K>=2);let st=null,ut={},ft=n.getParameter(n.SCISSOR_BOX),Tt=n.getParameter(n.VIEWPORT),wt=new ce().fromArray(ft),q=new ce().fromArray(Tt);function Q(G,vt,tt,at){let Et=new Uint8Array(4),bt=n.createTexture();n.bindTexture(G,bt),n.texParameteri(G,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(G,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let te=0;te<tt;te++)G===n.TEXTURE_3D||G===n.TEXTURE_2D_ARRAY?n.texImage3D(vt,0,n.RGBA,1,1,at,0,n.RGBA,n.UNSIGNED_BYTE,Et):n.texImage2D(vt+te,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Et);return bt}let et={};et[n.TEXTURE_2D]=Q(n.TEXTURE_2D,n.TEXTURE_2D,1),et[n.TEXTURE_CUBE_MAP]=Q(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),et[n.TEXTURE_2D_ARRAY]=Q(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),et[n.TEXTURE_3D]=Q(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),nt(n.DEPTH_TEST),o.setFunc(ks),he(!1),ue(zu),nt(n.CULL_FACE),z(is);function nt(G){h[G]!==!0&&(n.enable(G),h[G]=!0)}function _t(G){h[G]!==!1&&(n.disable(G),h[G]=!1)}function Qt(G,vt){return d[G]!==vt?(n.bindFramebuffer(G,vt),d[G]=vt,G===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=vt),G===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=vt),!0):!1}function Gt(G,vt){let tt=f,at=!1;if(G){tt=u.get(vt),tt===void 0&&(tt=[],u.set(vt,tt));let Et=G.textures;if(tt.length!==Et.length||tt[0]!==n.COLOR_ATTACHMENT0){for(let bt=0,te=Et.length;bt<te;bt++)tt[bt]=n.COLOR_ATTACHMENT0+bt;tt.length=Et.length,at=!0}}else tt[0]!==n.BACK&&(tt[0]=n.BACK,at=!0);at&&n.drawBuffers(tt)}function Je(G){return g!==G?(n.useProgram(G),g=G,!0):!1}let ke={[_s]:n.FUNC_ADD,[gp]:n.FUNC_SUBTRACT,[xp]:n.FUNC_REVERSE_SUBTRACT};ke[_p]=n.MIN,ke[yp]=n.MAX;let fe={[vp]:n.ZERO,[Mp]:n.ONE,[bp]:n.SRC_COLOR,[bl]:n.SRC_ALPHA,[Cp]:n.SRC_ALPHA_SATURATE,[Tp]:n.DST_COLOR,[wp]:n.DST_ALPHA,[Sp]:n.ONE_MINUS_SRC_COLOR,[Sl]:n.ONE_MINUS_SRC_ALPHA,[Ap]:n.ONE_MINUS_DST_COLOR,[Ep]:n.ONE_MINUS_DST_ALPHA,[Rp]:n.CONSTANT_COLOR,[Pp]:n.ONE_MINUS_CONSTANT_COLOR,[Ip]:n.CONSTANT_ALPHA,[Lp]:n.ONE_MINUS_CONSTANT_ALPHA};function z(G,vt,tt,at,Et,bt,te,ze,pn,se){if(G===is){x===!0&&(_t(n.BLEND),x=!1);return}if(x===!1&&(nt(n.BLEND),x=!0),G!==mp){if(G!==m||se!==w){if((p!==_s||_!==_s)&&(n.blendEquation(n.FUNC_ADD),p=_s,_=_s),se)switch(G){case Bs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Hu:n.blendFunc(n.ONE,n.ONE);break;case Gu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Wu:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case Bs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Hu:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Gu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Wu:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}E=null,b=null,T=null,A=null,D.set(0,0,0),v=0,m=G,w=se}return}Et=Et||vt,bt=bt||tt,te=te||at,(vt!==p||Et!==_)&&(n.blendEquationSeparate(ke[vt],ke[Et]),p=vt,_=Et),(tt!==E||at!==b||bt!==T||te!==A)&&(n.blendFuncSeparate(fe[tt],fe[at],fe[bt],fe[te]),E=tt,b=at,T=bt,A=te),(ze.equals(D)===!1||pn!==v)&&(n.blendColor(ze.r,ze.g,ze.b,pn),D.copy(ze),v=pn),m=G,w=!1}function On(G,vt){G.side===Xn?_t(n.CULL_FACE):nt(n.CULL_FACE);let tt=G.side===Nn;vt&&(tt=!tt),he(tt),G.blending===Bs&&G.transparent===!1?z(is):z(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),o.setFunc(G.depthFunc),o.setTest(G.depthTest),o.setMask(G.depthWrite),r.setMask(G.colorWrite);let at=G.stencilWrite;a.setTest(at),at&&(a.setMask(G.stencilWriteMask),a.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),a.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),Re(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?nt(n.SAMPLE_ALPHA_TO_COVERAGE):_t(n.SAMPLE_ALPHA_TO_COVERAGE)}function he(G){y!==G&&(G?n.frontFace(n.CW):n.frontFace(n.CCW),y=G)}function ue(G){G!==fp?(nt(n.CULL_FACE),G!==N&&(G===zu?n.cullFace(n.BACK):G===pp?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):_t(n.CULL_FACE),N=G}function kt(G){G!==O&&(k&&n.lineWidth(G),O=G)}function Re(G,vt,tt){G?(nt(n.POLYGON_OFFSET_FILL),(B!==vt||V!==tt)&&(n.polygonOffset(vt,tt),B=vt,V=tt)):_t(n.POLYGON_OFFSET_FILL)}function Bt(G){G?nt(n.SCISSOR_TEST):_t(n.SCISSOR_TEST)}function U(G){G===void 0&&(G=n.TEXTURE0+Y-1),st!==G&&(n.activeTexture(G),st=G)}function C(G,vt,tt){tt===void 0&&(st===null?tt=n.TEXTURE0+Y-1:tt=st);let at=ut[tt];at===void 0&&(at={type:void 0,texture:void 0},ut[tt]=at),(at.type!==G||at.texture!==vt)&&(st!==tt&&(n.activeTexture(tt),st=tt),n.bindTexture(G,vt||et[G]),at.type=G,at.texture=vt)}function J(){let G=ut[st];G!==void 0&&G.type!==void 0&&(n.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function ot(){try{n.compressedTexImage2D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function lt(){try{n.compressedTexImage3D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function rt(){try{n.texSubImage2D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Nt(){try{n.texSubImage3D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Mt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Rt(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function me(){try{n.texStorage2D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function mt(){try{n.texStorage3D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Pt(){try{n.texImage2D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Xt(){try{n.texImage3D.apply(n,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function jt(G){wt.equals(G)===!1&&(n.scissor(G.x,G.y,G.z,G.w),wt.copy(G))}function It(G){q.equals(G)===!1&&(n.viewport(G.x,G.y,G.z,G.w),q.copy(G))}function pe(G,vt){let tt=c.get(vt);tt===void 0&&(tt=new WeakMap,c.set(vt,tt));let at=tt.get(G);at===void 0&&(at=n.getUniformBlockIndex(vt,G.name),tt.set(G,at))}function ne(G,vt){let at=c.get(vt).get(G);l.get(vt)!==at&&(n.uniformBlockBinding(vt,at,G.__bindingPointIndex),l.set(vt,at))}function be(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},st=null,ut={},d={},u=new WeakMap,f=[],g=null,x=!1,m=null,p=null,E=null,b=null,_=null,T=null,A=null,D=new Jt(0,0,0),v=0,w=!1,y=null,N=null,O=null,B=null,V=null,wt.set(0,0,n.canvas.width,n.canvas.height),q.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:nt,disable:_t,bindFramebuffer:Qt,drawBuffers:Gt,useProgram:Je,setBlending:z,setMaterial:On,setFlipSided:he,setCullFace:ue,setLineWidth:kt,setPolygonOffset:Re,setScissorTest:Bt,activeTexture:U,bindTexture:C,unbindTexture:J,compressedTexImage2D:ot,compressedTexImage3D:lt,texImage2D:Pt,texImage3D:Xt,updateUBOMapping:pe,uniformBlockBinding:ne,texStorage2D:me,texStorage3D:mt,texSubImage2D:rt,texSubImage3D:Nt,compressedTexSubImage2D:Mt,compressedTexSubImage3D:Rt,scissor:jt,viewport:It,reset:be}}function S1(n,t,e,i,s,r,o){let a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ot,h=new WeakMap,d,u=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(U,C){return f?new OffscreenCanvas(U,C):Br("canvas")}function x(U,C,J){let ot=1,lt=Bt(U);if((lt.width>J||lt.height>J)&&(ot=J/Math.max(lt.width,lt.height)),ot<1)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap||typeof VideoFrame<"u"&&U instanceof VideoFrame){let rt=Math.floor(ot*lt.width),Nt=Math.floor(ot*lt.height);d===void 0&&(d=g(rt,Nt));let Mt=C?g(rt,Nt):d;return Mt.width=rt,Mt.height=Nt,Mt.getContext("2d").drawImage(U,0,0,rt,Nt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+lt.width+"x"+lt.height+") to ("+rt+"x"+Nt+")."),Mt}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+lt.width+"x"+lt.height+")."),U;return U}function m(U){return U.generateMipmaps}function p(U){n.generateMipmap(U)}function E(U){return U.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:U.isWebGL3DRenderTarget?n.TEXTURE_3D:U.isWebGLArrayRenderTarget||U.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(U,C,J,ot,lt=!1){if(U!==null){if(n[U]!==void 0)return n[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let rt=C;if(C===n.RED&&(J===n.FLOAT&&(rt=n.R32F),J===n.HALF_FLOAT&&(rt=n.R16F),J===n.UNSIGNED_BYTE&&(rt=n.R8)),C===n.RED_INTEGER&&(J===n.UNSIGNED_BYTE&&(rt=n.R8UI),J===n.UNSIGNED_SHORT&&(rt=n.R16UI),J===n.UNSIGNED_INT&&(rt=n.R32UI),J===n.BYTE&&(rt=n.R8I),J===n.SHORT&&(rt=n.R16I),J===n.INT&&(rt=n.R32I)),C===n.RG&&(J===n.FLOAT&&(rt=n.RG32F),J===n.HALF_FLOAT&&(rt=n.RG16F),J===n.UNSIGNED_BYTE&&(rt=n.RG8)),C===n.RG_INTEGER&&(J===n.UNSIGNED_BYTE&&(rt=n.RG8UI),J===n.UNSIGNED_SHORT&&(rt=n.RG16UI),J===n.UNSIGNED_INT&&(rt=n.RG32UI),J===n.BYTE&&(rt=n.RG8I),J===n.SHORT&&(rt=n.RG16I),J===n.INT&&(rt=n.RG32I)),C===n.RGB_INTEGER&&(J===n.UNSIGNED_BYTE&&(rt=n.RGB8UI),J===n.UNSIGNED_SHORT&&(rt=n.RGB16UI),J===n.UNSIGNED_INT&&(rt=n.RGB32UI),J===n.BYTE&&(rt=n.RGB8I),J===n.SHORT&&(rt=n.RGB16I),J===n.INT&&(rt=n.RGB32I)),C===n.RGBA_INTEGER&&(J===n.UNSIGNED_BYTE&&(rt=n.RGBA8UI),J===n.UNSIGNED_SHORT&&(rt=n.RGBA16UI),J===n.UNSIGNED_INT&&(rt=n.RGBA32UI),J===n.BYTE&&(rt=n.RGBA8I),J===n.SHORT&&(rt=n.RGBA16I),J===n.INT&&(rt=n.RGBA32I)),C===n.RGB&&J===n.UNSIGNED_INT_5_9_9_9_REV&&(rt=n.RGB9_E5),C===n.RGBA){let Nt=lt?Co:le.getTransfer(ot);J===n.FLOAT&&(rt=n.RGBA32F),J===n.HALF_FLOAT&&(rt=n.RGBA16F),J===n.UNSIGNED_BYTE&&(rt=Nt===Ee?n.SRGB8_ALPHA8:n.RGBA8),J===n.UNSIGNED_SHORT_4_4_4_4&&(rt=n.RGBA4),J===n.UNSIGNED_SHORT_5_5_5_1&&(rt=n.RGB5_A1)}return(rt===n.R16F||rt===n.R32F||rt===n.RG16F||rt===n.RG32F||rt===n.RGBA16F||rt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function _(U,C){let J;return U?C===null||C===Es||C===er?J=n.DEPTH24_STENCIL8:C===vi?J=n.DEPTH32F_STENCIL8:C===qr&&(J=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===Es||C===er?J=n.DEPTH_COMPONENT24:C===vi?J=n.DEPTH_COMPONENT32F:C===qr&&(J=n.DEPTH_COMPONENT16),J}function T(U,C){return m(U)===!0||U.isFramebufferTexture&&U.minFilter!==Wn&&U.minFilter!==Gn?Math.log2(Math.max(C.width,C.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?C.mipmaps.length:1}function A(U){let C=U.target;C.removeEventListener("dispose",A),v(C),C.isVideoTexture&&h.delete(C)}function D(U){let C=U.target;C.removeEventListener("dispose",D),y(C)}function v(U){let C=i.get(U);if(C.__webglInit===void 0)return;let J=U.source,ot=u.get(J);if(ot){let lt=ot[C.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&w(U),Object.keys(ot).length===0&&u.delete(J)}i.remove(U)}function w(U){let C=i.get(U);n.deleteTexture(C.__webglTexture);let J=U.source,ot=u.get(J);delete ot[C.__cacheKey],o.memory.textures--}function y(U){let C=i.get(U);if(U.depthTexture&&(U.depthTexture.dispose(),i.remove(U.depthTexture)),U.isWebGLCubeRenderTarget)for(let ot=0;ot<6;ot++){if(Array.isArray(C.__webglFramebuffer[ot]))for(let lt=0;lt<C.__webglFramebuffer[ot].length;lt++)n.deleteFramebuffer(C.__webglFramebuffer[ot][lt]);else n.deleteFramebuffer(C.__webglFramebuffer[ot]);C.__webglDepthbuffer&&n.deleteRenderbuffer(C.__webglDepthbuffer[ot])}else{if(Array.isArray(C.__webglFramebuffer))for(let ot=0;ot<C.__webglFramebuffer.length;ot++)n.deleteFramebuffer(C.__webglFramebuffer[ot]);else n.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&n.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&n.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let ot=0;ot<C.__webglColorRenderbuffer.length;ot++)C.__webglColorRenderbuffer[ot]&&n.deleteRenderbuffer(C.__webglColorRenderbuffer[ot]);C.__webglDepthRenderbuffer&&n.deleteRenderbuffer(C.__webglDepthRenderbuffer)}let J=U.textures;for(let ot=0,lt=J.length;ot<lt;ot++){let rt=i.get(J[ot]);rt.__webglTexture&&(n.deleteTexture(rt.__webglTexture),o.memory.textures--),i.remove(J[ot])}i.remove(U)}let N=0;function O(){N=0}function B(){let U=N;return U>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+s.maxTextures),N+=1,U}function V(U){let C=[];return C.push(U.wrapS),C.push(U.wrapT),C.push(U.wrapR||0),C.push(U.magFilter),C.push(U.minFilter),C.push(U.anisotropy),C.push(U.internalFormat),C.push(U.format),C.push(U.type),C.push(U.generateMipmaps),C.push(U.premultiplyAlpha),C.push(U.flipY),C.push(U.unpackAlignment),C.push(U.colorSpace),C.join()}function Y(U,C){let J=i.get(U);if(U.isVideoTexture&&kt(U),U.isRenderTargetTexture===!1&&U.version>0&&J.__version!==U.version){let ot=U.image;if(ot===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(J,U,C);return}}e.bindTexture(n.TEXTURE_2D,J.__webglTexture,n.TEXTURE0+C)}function k(U,C){let J=i.get(U);if(U.version>0&&J.__version!==U.version){q(J,U,C);return}e.bindTexture(n.TEXTURE_2D_ARRAY,J.__webglTexture,n.TEXTURE0+C)}function K(U,C){let J=i.get(U);if(U.version>0&&J.__version!==U.version){q(J,U,C);return}e.bindTexture(n.TEXTURE_3D,J.__webglTexture,n.TEXTURE0+C)}function X(U,C){let J=i.get(U);if(U.version>0&&J.__version!==U.version){Q(J,U,C);return}e.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture,n.TEXTURE0+C)}let st={[Zi]:n.REPEAT,[$n]:n.CLAMP_TO_EDGE,[wl]:n.MIRRORED_REPEAT},ut={[Wn]:n.NEAREST,[Gp]:n.NEAREST_MIPMAP_NEAREST,[ea]:n.NEAREST_MIPMAP_LINEAR,[Gn]:n.LINEAR,[ec]:n.LINEAR_MIPMAP_NEAREST,[yi]:n.LINEAR_MIPMAP_LINEAR},ft={[Jp]:n.NEVER,[tm]:n.ALWAYS,[Zp]:n.LESS,[nd]:n.LEQUAL,[jp]:n.EQUAL,[Qp]:n.GEQUAL,[$p]:n.GREATER,[Kp]:n.NOTEQUAL};function Tt(U,C){if(C.type===vi&&t.has("OES_texture_float_linear")===!1&&(C.magFilter===Gn||C.magFilter===ec||C.magFilter===ea||C.magFilter===yi||C.minFilter===Gn||C.minFilter===ec||C.minFilter===ea||C.minFilter===yi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(U,n.TEXTURE_WRAP_S,st[C.wrapS]),n.texParameteri(U,n.TEXTURE_WRAP_T,st[C.wrapT]),(U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY)&&n.texParameteri(U,n.TEXTURE_WRAP_R,st[C.wrapR]),n.texParameteri(U,n.TEXTURE_MAG_FILTER,ut[C.magFilter]),n.texParameteri(U,n.TEXTURE_MIN_FILTER,ut[C.minFilter]),C.compareFunction&&(n.texParameteri(U,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(U,n.TEXTURE_COMPARE_FUNC,ft[C.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===Wn||C.minFilter!==ea&&C.minFilter!==yi||C.type===vi&&t.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||i.get(C).__currentAnisotropy){let J=t.get("EXT_texture_filter_anisotropic");n.texParameterf(U,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),i.get(C).__currentAnisotropy=C.anisotropy}}}function wt(U,C){let J=!1;U.__webglInit===void 0&&(U.__webglInit=!0,C.addEventListener("dispose",A));let ot=C.source,lt=u.get(ot);lt===void 0&&(lt={},u.set(ot,lt));let rt=V(C);if(rt!==U.__cacheKey){lt[rt]===void 0&&(lt[rt]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,J=!0),lt[rt].usedTimes++;let Nt=lt[U.__cacheKey];Nt!==void 0&&(lt[U.__cacheKey].usedTimes--,Nt.usedTimes===0&&w(C)),U.__cacheKey=rt,U.__webglTexture=lt[rt].texture}return J}function q(U,C,J){let ot=n.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(ot=n.TEXTURE_2D_ARRAY),C.isData3DTexture&&(ot=n.TEXTURE_3D);let lt=wt(U,C),rt=C.source;e.bindTexture(ot,U.__webglTexture,n.TEXTURE0+J);let Nt=i.get(rt);if(rt.version!==Nt.__version||lt===!0){e.activeTexture(n.TEXTURE0+J);let Mt=le.getPrimaries(le.workingColorSpace),Rt=C.colorSpace===rs?null:le.getPrimaries(C.colorSpace),me=C.colorSpace===rs||Mt===Rt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,C.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,C.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);let mt=x(C.image,!1,s.maxTextureSize);mt=Re(C,mt);let Pt=r.convert(C.format,C.colorSpace),Xt=r.convert(C.type),jt=b(C.internalFormat,Pt,Xt,C.colorSpace,C.isVideoTexture);Tt(ot,C);let It,pe=C.mipmaps,ne=C.isVideoTexture!==!0,be=Nt.__version===void 0||lt===!0,G=rt.dataReady,vt=T(C,mt);if(C.isDepthTexture)jt=_(C.format===zs,C.type),be&&(ne?e.texStorage2D(n.TEXTURE_2D,1,jt,mt.width,mt.height):e.texImage2D(n.TEXTURE_2D,0,jt,mt.width,mt.height,0,Pt,Xt,null));else if(C.isDataTexture)if(pe.length>0){ne&&be&&e.texStorage2D(n.TEXTURE_2D,vt,jt,pe[0].width,pe[0].height);for(let tt=0,at=pe.length;tt<at;tt++)It=pe[tt],ne?G&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,It.width,It.height,Pt,Xt,It.data):e.texImage2D(n.TEXTURE_2D,tt,jt,It.width,It.height,0,Pt,Xt,It.data);C.generateMipmaps=!1}else ne?(be&&e.texStorage2D(n.TEXTURE_2D,vt,jt,mt.width,mt.height),G&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,mt.width,mt.height,Pt,Xt,mt.data)):e.texImage2D(n.TEXTURE_2D,0,jt,mt.width,mt.height,0,Pt,Xt,mt.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){ne&&be&&e.texStorage3D(n.TEXTURE_2D_ARRAY,vt,jt,pe[0].width,pe[0].height,mt.depth);for(let tt=0,at=pe.length;tt<at;tt++)if(It=pe[tt],C.format!==ni)if(Pt!==null)if(ne){if(G)if(C.layerUpdates.size>0){let Et=cd(It.width,It.height,C.format,C.type);for(let bt of C.layerUpdates){let te=It.data.subarray(bt*Et/It.data.BYTES_PER_ELEMENT,(bt+1)*Et/It.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,bt,It.width,It.height,1,Pt,te)}C.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,It.width,It.height,mt.depth,Pt,It.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,tt,jt,It.width,It.height,mt.depth,0,It.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ne?G&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,tt,0,0,0,It.width,It.height,mt.depth,Pt,Xt,It.data):e.texImage3D(n.TEXTURE_2D_ARRAY,tt,jt,It.width,It.height,mt.depth,0,Pt,Xt,It.data)}else{ne&&be&&e.texStorage2D(n.TEXTURE_2D,vt,jt,pe[0].width,pe[0].height);for(let tt=0,at=pe.length;tt<at;tt++)It=pe[tt],C.format!==ni?Pt!==null?ne?G&&e.compressedTexSubImage2D(n.TEXTURE_2D,tt,0,0,It.width,It.height,Pt,It.data):e.compressedTexImage2D(n.TEXTURE_2D,tt,jt,It.width,It.height,0,It.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ne?G&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,It.width,It.height,Pt,Xt,It.data):e.texImage2D(n.TEXTURE_2D,tt,jt,It.width,It.height,0,Pt,Xt,It.data)}else if(C.isDataArrayTexture)if(ne){if(be&&e.texStorage3D(n.TEXTURE_2D_ARRAY,vt,jt,mt.width,mt.height,mt.depth),G)if(C.layerUpdates.size>0){let tt=cd(mt.width,mt.height,C.format,C.type);for(let at of C.layerUpdates){let Et=mt.data.subarray(at*tt/mt.data.BYTES_PER_ELEMENT,(at+1)*tt/mt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,at,mt.width,mt.height,1,Pt,Xt,Et)}C.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,mt.width,mt.height,mt.depth,Pt,Xt,mt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,jt,mt.width,mt.height,mt.depth,0,Pt,Xt,mt.data);else if(C.isData3DTexture)ne?(be&&e.texStorage3D(n.TEXTURE_3D,vt,jt,mt.width,mt.height,mt.depth),G&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,mt.width,mt.height,mt.depth,Pt,Xt,mt.data)):e.texImage3D(n.TEXTURE_3D,0,jt,mt.width,mt.height,mt.depth,0,Pt,Xt,mt.data);else if(C.isFramebufferTexture){if(be)if(ne)e.texStorage2D(n.TEXTURE_2D,vt,jt,mt.width,mt.height);else{let tt=mt.width,at=mt.height;for(let Et=0;Et<vt;Et++)e.texImage2D(n.TEXTURE_2D,Et,jt,tt,at,0,Pt,Xt,null),tt>>=1,at>>=1}}else if(pe.length>0){if(ne&&be){let tt=Bt(pe[0]);e.texStorage2D(n.TEXTURE_2D,vt,jt,tt.width,tt.height)}for(let tt=0,at=pe.length;tt<at;tt++)It=pe[tt],ne?G&&e.texSubImage2D(n.TEXTURE_2D,tt,0,0,Pt,Xt,It):e.texImage2D(n.TEXTURE_2D,tt,jt,Pt,Xt,It);C.generateMipmaps=!1}else if(ne){if(be){let tt=Bt(mt);e.texStorage2D(n.TEXTURE_2D,vt,jt,tt.width,tt.height)}G&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Pt,Xt,mt)}else e.texImage2D(n.TEXTURE_2D,0,jt,Pt,Xt,mt);m(C)&&p(ot),Nt.__version=rt.version,C.onUpdate&&C.onUpdate(C)}U.__version=C.version}function Q(U,C,J){if(C.image.length!==6)return;let ot=wt(U,C),lt=C.source;e.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+J);let rt=i.get(lt);if(lt.version!==rt.__version||ot===!0){e.activeTexture(n.TEXTURE0+J);let Nt=le.getPrimaries(le.workingColorSpace),Mt=C.colorSpace===rs?null:le.getPrimaries(C.colorSpace),Rt=C.colorSpace===rs||Nt===Mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,C.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,C.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Rt);let me=C.isCompressedTexture||C.image[0].isCompressedTexture,mt=C.image[0]&&C.image[0].isDataTexture,Pt=[];for(let at=0;at<6;at++)!me&&!mt?Pt[at]=x(C.image[at],!0,s.maxCubemapSize):Pt[at]=mt?C.image[at].image:C.image[at],Pt[at]=Re(C,Pt[at]);let Xt=Pt[0],jt=r.convert(C.format,C.colorSpace),It=r.convert(C.type),pe=b(C.internalFormat,jt,It,C.colorSpace),ne=C.isVideoTexture!==!0,be=rt.__version===void 0||ot===!0,G=lt.dataReady,vt=T(C,Xt);Tt(n.TEXTURE_CUBE_MAP,C);let tt;if(me){ne&&be&&e.texStorage2D(n.TEXTURE_CUBE_MAP,vt,pe,Xt.width,Xt.height);for(let at=0;at<6;at++){tt=Pt[at].mipmaps;for(let Et=0;Et<tt.length;Et++){let bt=tt[Et];C.format!==ni?jt!==null?ne?G&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Et,0,0,bt.width,bt.height,jt,bt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Et,pe,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ne?G&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Et,0,0,bt.width,bt.height,jt,It,bt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Et,pe,bt.width,bt.height,0,jt,It,bt.data)}}}else{if(tt=C.mipmaps,ne&&be){tt.length>0&&vt++;let at=Bt(Pt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,vt,pe,at.width,at.height)}for(let at=0;at<6;at++)if(mt){ne?G&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,Pt[at].width,Pt[at].height,jt,It,Pt[at].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,pe,Pt[at].width,Pt[at].height,0,jt,It,Pt[at].data);for(let Et=0;Et<tt.length;Et++){let te=tt[Et].image[at].image;ne?G&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Et+1,0,0,te.width,te.height,jt,It,te.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Et+1,pe,te.width,te.height,0,jt,It,te.data)}}else{ne?G&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,jt,It,Pt[at]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,pe,jt,It,Pt[at]);for(let Et=0;Et<tt.length;Et++){let bt=tt[Et];ne?G&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Et+1,0,0,jt,It,bt.image[at]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Et+1,pe,jt,It,bt.image[at])}}}m(C)&&p(n.TEXTURE_CUBE_MAP),rt.__version=lt.version,C.onUpdate&&C.onUpdate(C)}U.__version=C.version}function et(U,C,J,ot,lt,rt){let Nt=r.convert(J.format,J.colorSpace),Mt=r.convert(J.type),Rt=b(J.internalFormat,Nt,Mt,J.colorSpace),me=i.get(C),mt=i.get(J);if(mt.__renderTarget=C,!me.__hasExternalTextures){let Pt=Math.max(1,C.width>>rt),Xt=Math.max(1,C.height>>rt);lt===n.TEXTURE_3D||lt===n.TEXTURE_2D_ARRAY?e.texImage3D(lt,rt,Rt,Pt,Xt,C.depth,0,Nt,Mt,null):e.texImage2D(lt,rt,Rt,Pt,Xt,0,Nt,Mt,null)}e.bindFramebuffer(n.FRAMEBUFFER,U),ue(C)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ot,lt,mt.__webglTexture,0,he(C)):(lt===n.TEXTURE_2D||lt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ot,lt,mt.__webglTexture,rt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function nt(U,C,J){if(n.bindRenderbuffer(n.RENDERBUFFER,U),C.depthBuffer){let ot=C.depthTexture,lt=ot&&ot.isDepthTexture?ot.type:null,rt=_(C.stencilBuffer,lt),Nt=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Mt=he(C);ue(C)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Mt,rt,C.width,C.height):J?n.renderbufferStorageMultisample(n.RENDERBUFFER,Mt,rt,C.width,C.height):n.renderbufferStorage(n.RENDERBUFFER,rt,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Nt,n.RENDERBUFFER,U)}else{let ot=C.textures;for(let lt=0;lt<ot.length;lt++){let rt=ot[lt],Nt=r.convert(rt.format,rt.colorSpace),Mt=r.convert(rt.type),Rt=b(rt.internalFormat,Nt,Mt,rt.colorSpace),me=he(C);J&&ue(C)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,me,Rt,C.width,C.height):ue(C)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,me,Rt,C.width,C.height):n.renderbufferStorage(n.RENDERBUFFER,Rt,C.width,C.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function _t(U,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,U),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let ot=i.get(C.depthTexture);ot.__renderTarget=C,(!ot.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),Y(C.depthTexture,0);let lt=ot.__webglTexture,rt=he(C);if(C.depthTexture.format===Os)ue(C)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,lt,0,rt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,lt,0);else if(C.depthTexture.format===zs)ue(C)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,lt,0,rt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,lt,0);else throw new Error("Unknown depthTexture format")}function Qt(U){let C=i.get(U),J=U.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==U.depthTexture){let ot=U.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),ot){let lt=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,ot.removeEventListener("dispose",lt)};ot.addEventListener("dispose",lt),C.__depthDisposeCallback=lt}C.__boundDepthTexture=ot}if(U.depthTexture&&!C.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");_t(C.__webglFramebuffer,U)}else if(J){C.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)if(e.bindFramebuffer(n.FRAMEBUFFER,C.__webglFramebuffer[ot]),C.__webglDepthbuffer[ot]===void 0)C.__webglDepthbuffer[ot]=n.createRenderbuffer(),nt(C.__webglDepthbuffer[ot],U,!1);else{let lt=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,rt=C.__webglDepthbuffer[ot];n.bindRenderbuffer(n.RENDERBUFFER,rt),n.framebufferRenderbuffer(n.FRAMEBUFFER,lt,n.RENDERBUFFER,rt)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=n.createRenderbuffer(),nt(C.__webglDepthbuffer,U,!1);else{let ot=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,lt=C.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,lt),n.framebufferRenderbuffer(n.FRAMEBUFFER,ot,n.RENDERBUFFER,lt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Gt(U,C,J){let ot=i.get(U);C!==void 0&&et(ot.__webglFramebuffer,U,U.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),J!==void 0&&Qt(U)}function Je(U){let C=U.texture,J=i.get(U),ot=i.get(C);U.addEventListener("dispose",D);let lt=U.textures,rt=U.isWebGLCubeRenderTarget===!0,Nt=lt.length>1;if(Nt||(ot.__webglTexture===void 0&&(ot.__webglTexture=n.createTexture()),ot.__version=C.version,o.memory.textures++),rt){J.__webglFramebuffer=[];for(let Mt=0;Mt<6;Mt++)if(C.mipmaps&&C.mipmaps.length>0){J.__webglFramebuffer[Mt]=[];for(let Rt=0;Rt<C.mipmaps.length;Rt++)J.__webglFramebuffer[Mt][Rt]=n.createFramebuffer()}else J.__webglFramebuffer[Mt]=n.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){J.__webglFramebuffer=[];for(let Mt=0;Mt<C.mipmaps.length;Mt++)J.__webglFramebuffer[Mt]=n.createFramebuffer()}else J.__webglFramebuffer=n.createFramebuffer();if(Nt)for(let Mt=0,Rt=lt.length;Mt<Rt;Mt++){let me=i.get(lt[Mt]);me.__webglTexture===void 0&&(me.__webglTexture=n.createTexture(),o.memory.textures++)}if(U.samples>0&&ue(U)===!1){J.__webglMultisampledFramebuffer=n.createFramebuffer(),J.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let Mt=0;Mt<lt.length;Mt++){let Rt=lt[Mt];J.__webglColorRenderbuffer[Mt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,J.__webglColorRenderbuffer[Mt]);let me=r.convert(Rt.format,Rt.colorSpace),mt=r.convert(Rt.type),Pt=b(Rt.internalFormat,me,mt,Rt.colorSpace,U.isXRRenderTarget===!0),Xt=he(U);n.renderbufferStorageMultisample(n.RENDERBUFFER,Xt,Pt,U.width,U.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Mt,n.RENDERBUFFER,J.__webglColorRenderbuffer[Mt])}n.bindRenderbuffer(n.RENDERBUFFER,null),U.depthBuffer&&(J.__webglDepthRenderbuffer=n.createRenderbuffer(),nt(J.__webglDepthRenderbuffer,U,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(rt){e.bindTexture(n.TEXTURE_CUBE_MAP,ot.__webglTexture),Tt(n.TEXTURE_CUBE_MAP,C);for(let Mt=0;Mt<6;Mt++)if(C.mipmaps&&C.mipmaps.length>0)for(let Rt=0;Rt<C.mipmaps.length;Rt++)et(J.__webglFramebuffer[Mt][Rt],U,C,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Rt);else et(J.__webglFramebuffer[Mt],U,C,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0);m(C)&&p(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Nt){for(let Mt=0,Rt=lt.length;Mt<Rt;Mt++){let me=lt[Mt],mt=i.get(me);e.bindTexture(n.TEXTURE_2D,mt.__webglTexture),Tt(n.TEXTURE_2D,me),et(J.__webglFramebuffer,U,me,n.COLOR_ATTACHMENT0+Mt,n.TEXTURE_2D,0),m(me)&&p(n.TEXTURE_2D)}e.unbindTexture()}else{let Mt=n.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(Mt=U.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Mt,ot.__webglTexture),Tt(Mt,C),C.mipmaps&&C.mipmaps.length>0)for(let Rt=0;Rt<C.mipmaps.length;Rt++)et(J.__webglFramebuffer[Rt],U,C,n.COLOR_ATTACHMENT0,Mt,Rt);else et(J.__webglFramebuffer,U,C,n.COLOR_ATTACHMENT0,Mt,0);m(C)&&p(Mt),e.unbindTexture()}U.depthBuffer&&Qt(U)}function ke(U){let C=U.textures;for(let J=0,ot=C.length;J<ot;J++){let lt=C[J];if(m(lt)){let rt=E(U),Nt=i.get(lt).__webglTexture;e.bindTexture(rt,Nt),p(rt),e.unbindTexture()}}}let fe=[],z=[];function On(U){if(U.samples>0){if(ue(U)===!1){let C=U.textures,J=U.width,ot=U.height,lt=n.COLOR_BUFFER_BIT,rt=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Nt=i.get(U),Mt=C.length>1;if(Mt)for(let Rt=0;Rt<C.length;Rt++)e.bindFramebuffer(n.FRAMEBUFFER,Nt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Rt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Nt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Rt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Nt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Nt.__webglFramebuffer);for(let Rt=0;Rt<C.length;Rt++){if(U.resolveDepthBuffer&&(U.depthBuffer&&(lt|=n.DEPTH_BUFFER_BIT),U.stencilBuffer&&U.resolveStencilBuffer&&(lt|=n.STENCIL_BUFFER_BIT)),Mt){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Nt.__webglColorRenderbuffer[Rt]);let me=i.get(C[Rt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,me,0)}n.blitFramebuffer(0,0,J,ot,0,0,J,ot,lt,n.NEAREST),l===!0&&(fe.length=0,z.length=0,fe.push(n.COLOR_ATTACHMENT0+Rt),U.depthBuffer&&U.resolveDepthBuffer===!1&&(fe.push(rt),z.push(rt),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,z)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,fe))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Mt)for(let Rt=0;Rt<C.length;Rt++){e.bindFramebuffer(n.FRAMEBUFFER,Nt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Rt,n.RENDERBUFFER,Nt.__webglColorRenderbuffer[Rt]);let me=i.get(C[Rt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Nt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Rt,n.TEXTURE_2D,me,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Nt.__webglMultisampledFramebuffer)}else if(U.depthBuffer&&U.resolveDepthBuffer===!1&&l){let C=U.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[C])}}}function he(U){return Math.min(s.maxSamples,U.samples)}function ue(U){let C=i.get(U);return U.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function kt(U){let C=o.render.frame;h.get(U)!==C&&(h.set(U,C),U.update())}function Re(U,C){let J=U.colorSpace,ot=U.format,lt=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||J!==Vs&&J!==rs&&(le.getTransfer(J)===Ee?(ot!==ni||lt!==Li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",J)),C}function Bt(U){return typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement?(c.width=U.naturalWidth||U.width,c.height=U.naturalHeight||U.height):typeof VideoFrame<"u"&&U instanceof VideoFrame?(c.width=U.displayWidth,c.height=U.displayHeight):(c.width=U.width,c.height=U.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=O,this.setTexture2D=Y,this.setTexture2DArray=k,this.setTexture3D=K,this.setTextureCube=X,this.rebindTextures=Gt,this.setupRenderTarget=Je,this.updateRenderTargetMipmap=ke,this.updateMultisampleRenderTarget=On,this.setupDepthRenderbuffer=Qt,this.setupFrameBufferTexture=et,this.useMultisampledRTT=ue}function w1(n,t){function e(i,s=rs){let r,o=le.getTransfer(s);if(i===Li)return n.UNSIGNED_BYTE;if(i===ic)return n.UNSIGNED_SHORT_4_4_4_4;if(i===sc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Ju)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===qu)return n.BYTE;if(i===Yu)return n.SHORT;if(i===qr)return n.UNSIGNED_SHORT;if(i===nc)return n.INT;if(i===Es)return n.UNSIGNED_INT;if(i===vi)return n.FLOAT;if(i===Yr)return n.HALF_FLOAT;if(i===Zu)return n.ALPHA;if(i===ju)return n.RGB;if(i===ni)return n.RGBA;if(i===$u)return n.LUMINANCE;if(i===Ku)return n.LUMINANCE_ALPHA;if(i===Os)return n.DEPTH_COMPONENT;if(i===zs)return n.DEPTH_STENCIL;if(i===Qu)return n.RED;if(i===rc)return n.RED_INTEGER;if(i===td)return n.RG;if(i===oc)return n.RG_INTEGER;if(i===ac)return n.RGBA_INTEGER;if(i===na||i===ia||i===sa||i===ra)if(o===Ee)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===na)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===na)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ia)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===sa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ra)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===lc||i===cc||i===hc||i===uc)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===lc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===cc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===hc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===uc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===dc||i===fc||i===pc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===dc||i===fc)return o===Ee?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===pc)return o===Ee?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===mc||i===gc||i===xc||i===_c||i===yc||i===vc||i===Mc||i===bc||i===Sc||i===wc||i===Ec||i===Tc||i===Ac||i===Cc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===mc)return o===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===gc)return o===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===xc)return o===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===_c)return o===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===yc)return o===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===vc)return o===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Mc)return o===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===bc)return o===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Sc)return o===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===wc)return o===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ec)return o===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Tc)return o===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ac)return o===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Cc)return o===Ee?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===oa||i===Rc||i===Pc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===oa)return o===Ee?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Rc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Pc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ed||i===Ic||i===Lc||i===Dc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===oa)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ic)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Lc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Dc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===er?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var E1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,T1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,bd=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){let s=new Dn,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Qn({vertexShader:E1,fragmentShader:T1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new dt(new $i(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Sd=class extends Ai{constructor(t,e){super();let i=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,g=null,x=new bd,m=e.getContextAttributes(),p=null,E=null,b=[],_=[],T=new Ot,A=null,D=new Ke;D.viewport=new ce;let v=new Ke;v.viewport=new ce;let w=[D,v],y=new Gl,N=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Q=b[q];return Q===void 0&&(Q=new zr,b[q]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(q){let Q=b[q];return Q===void 0&&(Q=new zr,b[q]=Q),Q.getGripSpace()},this.getHand=function(q){let Q=b[q];return Q===void 0&&(Q=new zr,b[q]=Q),Q.getHandSpace()};function B(q){let Q=_.indexOf(q.inputSource);if(Q===-1)return;let et=b[Q];et!==void 0&&(et.update(q.inputSource,q.frame,c||o),et.dispatchEvent({type:q.type,data:q.inputSource}))}function V(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",Y);for(let q=0;q<b.length;q++){let Q=_[q];Q!==null&&(_[q]=null,b[q].disconnect(Q))}N=null,O=null,x.reset(),t.setRenderTarget(p),f=null,u=null,d=null,s=null,E=null,wt.stop(),i.isPresenting=!1,t.setPixelRatio(A),t.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",V),s.addEventListener("inputsourceschange",Y),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(T),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let et=null,nt=null,_t=null;m.depth&&(_t=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=m.stencil?zs:Os,nt=m.stencil?er:Es);let Qt={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:r};d=new XRWebGLBinding(s,e),u=d.createProjectionLayer(Qt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),E=new Ci(u.textureWidth,u.textureHeight,{format:ni,type:Li,depthTexture:new zo(u.textureWidth,u.textureHeight,nt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}else{let et={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),E=new Ci(f.framebufferWidth,f.framebufferHeight,{format:ni,type:Li,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),wt.setContext(s),wt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Y(q){for(let Q=0;Q<q.removed.length;Q++){let et=q.removed[Q],nt=_.indexOf(et);nt>=0&&(_[nt]=null,b[nt].disconnect(et))}for(let Q=0;Q<q.added.length;Q++){let et=q.added[Q],nt=_.indexOf(et);if(nt===-1){for(let Qt=0;Qt<b.length;Qt++)if(Qt>=_.length){_.push(et),nt=Qt;break}else if(_[Qt]===null){_[Qt]=et,nt=Qt;break}if(nt===-1)break}let _t=b[nt];_t&&_t.connect(et)}}let k=new F,K=new F;function X(q,Q,et){k.setFromMatrixPosition(Q.matrixWorld),K.setFromMatrixPosition(et.matrixWorld);let nt=k.distanceTo(K),_t=Q.projectionMatrix.elements,Qt=et.projectionMatrix.elements,Gt=_t[14]/(_t[10]-1),Je=_t[14]/(_t[10]+1),ke=(_t[9]+1)/_t[5],fe=(_t[9]-1)/_t[5],z=(_t[8]-1)/_t[0],On=(Qt[8]+1)/Qt[0],he=Gt*z,ue=Gt*On,kt=nt/(-z+On),Re=kt*-z;if(Q.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Re),q.translateZ(kt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),_t[10]===-1)q.projectionMatrix.copy(Q.projectionMatrix),q.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let Bt=Gt+kt,U=Je+kt,C=he-Re,J=ue+(nt-Re),ot=ke*Je/U*Bt,lt=fe*Je/U*Bt;q.projectionMatrix.makePerspective(C,J,ot,lt,Bt,U),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function st(q,Q){Q===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Q.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let Q=q.near,et=q.far;x.texture!==null&&(x.depthNear>0&&(Q=x.depthNear),x.depthFar>0&&(et=x.depthFar)),y.near=v.near=D.near=Q,y.far=v.far=D.far=et,(N!==y.near||O!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),N=y.near,O=y.far),D.layers.mask=q.layers.mask|2,v.layers.mask=q.layers.mask|4,y.layers.mask=D.layers.mask|v.layers.mask;let nt=q.parent,_t=y.cameras;st(y,nt);for(let Qt=0;Qt<_t.length;Qt++)st(_t[Qt],nt);_t.length===2?X(y,D,v):y.projectionMatrix.copy(D.projectionMatrix),ut(q,y,nt)};function ut(q,Q,et){et===null?q.matrix.copy(Q.matrixWorld):(q.matrix.copy(et.matrixWorld),q.matrix.invert(),q.matrix.multiply(Q.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(Q.projectionMatrix),q.projectionMatrixInverse.copy(Q.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Hs*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(q){l=q,u!==null&&(u.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let ft=null;function Tt(q,Q){if(h=Q.getViewerPose(c||o),g=Q,h!==null){let et=h.views;f!==null&&(t.setRenderTargetFramebuffer(E,f.framebuffer),t.setRenderTarget(E));let nt=!1;et.length!==y.cameras.length&&(y.cameras.length=0,nt=!0);for(let Gt=0;Gt<et.length;Gt++){let Je=et[Gt],ke=null;if(f!==null)ke=f.getViewport(Je);else{let z=d.getViewSubImage(u,Je);ke=z.viewport,Gt===0&&(t.setRenderTargetTextures(E,z.colorTexture,u.ignoreDepthValues?void 0:z.depthStencilTexture),t.setRenderTarget(E))}let fe=w[Gt];fe===void 0&&(fe=new Ke,fe.layers.enable(Gt),fe.viewport=new ce,w[Gt]=fe),fe.matrix.fromArray(Je.transform.matrix),fe.matrix.decompose(fe.position,fe.quaternion,fe.scale),fe.projectionMatrix.fromArray(Je.projectionMatrix),fe.projectionMatrixInverse.copy(fe.projectionMatrix).invert(),fe.viewport.set(ke.x,ke.y,ke.width,ke.height),Gt===0&&(y.matrix.copy(fe.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),nt===!0&&y.cameras.push(fe)}let _t=s.enabledFeatures;if(_t&&_t.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&d){let Gt=d.getDepthInformation(et[0]);Gt&&Gt.isValid&&Gt.texture&&x.init(t,Gt,s.renderState)}}for(let et=0;et<b.length;et++){let nt=_[et],_t=b[et];nt!==null&&_t!==void 0&&_t.update(nt,Q,c||o)}ft&&ft(q,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),g=null}let wt=new Pm;wt.setAnimationLoop(Tt),this.setAnimationLoop=function(q){ft=q},this.dispose=function(){}}},rr=new Qe,A1=new Ht;function C1(n,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,od(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,E,b,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,E,b):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Nn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Nn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let E=t.get(p),b=E.envMap,_=E.envMapRotation;b&&(m.envMap.value=b,rr.copy(_),rr.x*=-1,rr.y*=-1,rr.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(rr.y*=-1,rr.z*=-1),m.envMapRotation.value.setFromMatrix4(A1.makeRotationFromEuler(rr)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,E,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*E,m.scale.value=b*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,E){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Nn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=E.texture,m.transmissionSamplerSize.value.set(E.width,E.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let E=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(E.matrixWorld),m.nearDistance.value=E.shadow.camera.near,m.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function R1(n,t,e,i){let s={},r={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,b){let _=b.program;i.uniformBlockBinding(E,_)}function c(E,b){let _=s[E.id];_===void 0&&(g(E),_=h(E),s[E.id]=_,E.addEventListener("dispose",m));let T=b.program;i.updateUBOMapping(E,T);let A=t.render.frame;r[E.id]!==A&&(u(E),r[E.id]=A)}function h(E){let b=d();E.__bindingPointIndex=b;let _=n.createBuffer(),T=E.__size,A=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,T,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,_),_}function d(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(E){let b=s[E.id],_=E.uniforms,T=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let A=0,D=_.length;A<D;A++){let v=Array.isArray(_[A])?_[A]:[_[A]];for(let w=0,y=v.length;w<y;w++){let N=v[w];if(f(N,A,w,T)===!0){let O=N.__offset,B=Array.isArray(N.value)?N.value:[N.value],V=0;for(let Y=0;Y<B.length;Y++){let k=B[Y],K=x(k);typeof k=="number"||typeof k=="boolean"?(N.__data[0]=k,n.bufferSubData(n.UNIFORM_BUFFER,O+V,N.__data)):k.isMatrix3?(N.__data[0]=k.elements[0],N.__data[1]=k.elements[1],N.__data[2]=k.elements[2],N.__data[3]=0,N.__data[4]=k.elements[3],N.__data[5]=k.elements[4],N.__data[6]=k.elements[5],N.__data[7]=0,N.__data[8]=k.elements[6],N.__data[9]=k.elements[7],N.__data[10]=k.elements[8],N.__data[11]=0):(k.toArray(N.__data,V),V+=K.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,O,N.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(E,b,_,T){let A=E.value,D=b+"_"+_;if(T[D]===void 0)return typeof A=="number"||typeof A=="boolean"?T[D]=A:T[D]=A.clone(),!0;{let v=T[D];if(typeof A=="number"||typeof A=="boolean"){if(v!==A)return T[D]=A,!0}else if(v.equals(A)===!1)return v.copy(A),!0}return!1}function g(E){let b=E.uniforms,_=0,T=16;for(let D=0,v=b.length;D<v;D++){let w=Array.isArray(b[D])?b[D]:[b[D]];for(let y=0,N=w.length;y<N;y++){let O=w[y],B=Array.isArray(O.value)?O.value:[O.value];for(let V=0,Y=B.length;V<Y;V++){let k=B[V],K=x(k),X=_%T,st=X%K.boundary,ut=X+st;_+=st,ut!==0&&T-ut<K.storage&&(_+=T-ut),O.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=_,_+=K.storage}}}let A=_%T;return A>0&&(_+=T-A),E.__size=_,E.__cache={},this}function x(E){let b={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(b.boundary=4,b.storage=4):E.isVector2?(b.boundary=8,b.storage=8):E.isVector3||E.isColor?(b.boundary=16,b.storage=12):E.isVector4?(b.boundary=16,b.storage=16):E.isMatrix3?(b.boundary=48,b.storage=48):E.isMatrix4?(b.boundary=64,b.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),b}function m(E){let b=E.target;b.removeEventListener("dispose",m);let _=o.indexOf(b.__bindingPointIndex);o.splice(_,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(let E in s)n.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}var kc=class{constructor(t={}){let{canvas:e=em(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:u=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,p=null,E=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ae,this.toneMapping=ss,this.toneMappingExposure=1;let _=this,T=!1,A=0,D=0,v=null,w=-1,y=null,N=new ce,O=new ce,B=null,V=new Jt(0),Y=0,k=e.width,K=e.height,X=1,st=null,ut=null,ft=new ce(0,0,k,K),Tt=new ce(0,0,k,K),wt=!1,q=new Hr,Q=!1,et=!1;this.transmissionResolutionScale=1;let nt=new Ht,_t=new Ht,Qt=new F,Gt=new ce,Je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ke=!1;function fe(){return v===null?X:1}let z=i;function On(P,H){return e.getContext(P,H)}try{let P={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Wl}`),e.addEventListener("webglcontextlost",at,!1),e.addEventListener("webglcontextrestored",Et,!1),e.addEventListener("webglcontextcreationerror",bt,!1),z===null){let H="webgl2";if(z=On(H,P),z===null)throw On(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let he,ue,kt,Re,Bt,U,C,J,ot,lt,rt,Nt,Mt,Rt,me,mt,Pt,Xt,jt,It,pe,ne,be,G;function vt(){he=new Yv(z),he.init(),ne=new w1(z,he),ue=new Vv(z,he,t,ne),kt=new b1(z,he),ue.reverseDepthBuffer&&u&&kt.buffers.depth.setReversed(!0),Re=new jv(z),Bt=new c1,U=new S1(z,he,kt,Bt,ue,ne,Re),C=new Gv(_),J=new qv(_),ot=new i_(z),be=new kv(z,ot),lt=new Jv(z,ot,Re,be),rt=new Kv(z,lt,ot,Re),jt=new $v(z,ue,U),mt=new Hv(Bt),Nt=new l1(_,C,J,he,ue,be,mt),Mt=new C1(_,Bt),Rt=new u1,me=new x1(he),Xt=new Bv(_,C,J,kt,rt,f,l),Pt=new v1(_,rt,ue),G=new R1(z,Re,ue,kt),It=new zv(z,he,Re),pe=new Zv(z,he,Re),Re.programs=Nt.programs,_.capabilities=ue,_.extensions=he,_.properties=Bt,_.renderLists=Rt,_.shadowMap=Pt,_.state=kt,_.info=Re}vt();let tt=new Sd(_,z);this.xr=tt,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let P=he.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){let P=he.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(P){P!==void 0&&(X=P,this.setSize(k,K,!1))},this.getSize=function(P){return P.set(k,K)},this.setSize=function(P,H,Z=!0){if(tt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=P,K=H,e.width=Math.floor(P*X),e.height=Math.floor(H*X),Z===!0&&(e.style.width=P+"px",e.style.height=H+"px"),this.setViewport(0,0,P,H)},this.getDrawingBufferSize=function(P){return P.set(k*X,K*X).floor()},this.setDrawingBufferSize=function(P,H,Z){k=P,K=H,X=Z,e.width=Math.floor(P*Z),e.height=Math.floor(H*Z),this.setViewport(0,0,P,H)},this.getCurrentViewport=function(P){return P.copy(N)},this.getViewport=function(P){return P.copy(ft)},this.setViewport=function(P,H,Z,j){P.isVector4?ft.set(P.x,P.y,P.z,P.w):ft.set(P,H,Z,j),kt.viewport(N.copy(ft).multiplyScalar(X).round())},this.getScissor=function(P){return P.copy(Tt)},this.setScissor=function(P,H,Z,j){P.isVector4?Tt.set(P.x,P.y,P.z,P.w):Tt.set(P,H,Z,j),kt.scissor(O.copy(Tt).multiplyScalar(X).round())},this.getScissorTest=function(){return wt},this.setScissorTest=function(P){kt.setScissorTest(wt=P)},this.setOpaqueSort=function(P){st=P},this.setTransparentSort=function(P){ut=P},this.getClearColor=function(P){return P.copy(Xt.getClearColor())},this.setClearColor=function(){Xt.setClearColor.apply(Xt,arguments)},this.getClearAlpha=function(){return Xt.getClearAlpha()},this.setClearAlpha=function(){Xt.setClearAlpha.apply(Xt,arguments)},this.clear=function(P=!0,H=!0,Z=!0){let j=0;if(P){let W=!1;if(v!==null){let pt=v.texture.format;W=pt===ac||pt===oc||pt===rc}if(W){let pt=v.texture.type,yt=pt===Li||pt===Es||pt===qr||pt===er||pt===ic||pt===sc,At=Xt.getClearColor(),Lt=Xt.getClearAlpha(),$t=At.r,Kt=At.g,zt=At.b;yt?(g[0]=$t,g[1]=Kt,g[2]=zt,g[3]=Lt,z.clearBufferuiv(z.COLOR,0,g)):(x[0]=$t,x[1]=Kt,x[2]=zt,x[3]=Lt,z.clearBufferiv(z.COLOR,0,x))}else j|=z.COLOR_BUFFER_BIT}H&&(j|=z.DEPTH_BUFFER_BIT),Z&&(j|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",at,!1),e.removeEventListener("webglcontextrestored",Et,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),Xt.dispose(),Rt.dispose(),me.dispose(),Bt.dispose(),C.dispose(),J.dispose(),rt.dispose(),be.dispose(),G.dispose(),Nt.dispose(),tt.dispose(),tt.removeEventListener("sessionstart",Va),tt.removeEventListener("sessionend",Ha),Bi.stop()};function at(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Et(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let P=Re.autoReset,H=Pt.enabled,Z=Pt.autoUpdate,j=Pt.needsUpdate,W=Pt.type;vt(),Re.autoReset=P,Pt.enabled=H,Pt.autoUpdate=Z,Pt.needsUpdate=j,Pt.type=W}function bt(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function te(P){let H=P.target;H.removeEventListener("dispose",te),ze(H)}function ze(P){pn(P),Bt.remove(P)}function pn(P){let H=Bt.get(P).programs;H!==void 0&&(H.forEach(function(Z){Nt.releaseProgram(Z)}),P.isShaderMaterial&&Nt.releaseShaderCache(P))}this.renderBufferDirect=function(P,H,Z,j,W,pt){H===null&&(H=Je);let yt=W.isMesh&&W.matrixWorld.determinant()<0,At=Jh(P,H,Z,j,W);kt.setMaterial(j,yt);let Lt=Z.index,$t=1;if(j.wireframe===!0){if(Lt=lt.getWireframeAttribute(Z),Lt===void 0)return;$t=2}let Kt=Z.drawRange,zt=Z.attributes.position,re=Kt.start*$t,_e=(Kt.start+Kt.count)*$t;pt!==null&&(re=Math.max(re,pt.start*$t),_e=Math.min(_e,(pt.start+pt.count)*$t)),Lt!==null?(re=Math.max(re,0),_e=Math.min(_e,Lt.count)):zt!=null&&(re=Math.max(re,0),_e=Math.min(_e,zt.count));let Ze=_e-re;if(Ze<0||Ze===1/0)return;be.setup(W,j,At,Z,Lt);let He,ge=It;if(Lt!==null&&(He=ot.get(Lt),ge=pe,ge.setIndex(He)),W.isMesh)j.wireframe===!0?(kt.setLineWidth(j.wireframeLinewidth*fe()),ge.setMode(z.LINES)):ge.setMode(z.TRIANGLES);else if(W.isLine){let Wt=j.linewidth;Wt===void 0&&(Wt=1),kt.setLineWidth(Wt*fe()),W.isLineSegments?ge.setMode(z.LINES):W.isLineLoop?ge.setMode(z.LINE_LOOP):ge.setMode(z.LINE_STRIP)}else W.isPoints?ge.setMode(z.POINTS):W.isSprite&&ge.setMode(z.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)ge.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(he.get("WEBGL_multi_draw"))ge.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let Wt=W._multiDrawStarts,an=W._multiDrawCounts,ye=W._multiDrawCount,kn=Lt?ot.get(Lt).bytesPerElement:1,De=Bt.get(j).currentProgram.getUniforms();for(let yn=0;yn<ye;yn++)De.setValue(z,"_gl_DrawID",yn),ge.render(Wt[yn]/kn,an[yn])}else if(W.isInstancedMesh)ge.renderInstances(re,Ze,W.count);else if(Z.isInstancedBufferGeometry){let Wt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,an=Math.min(Z.instanceCount,Wt);ge.renderInstances(re,Ze,an)}else ge.render(re,Ze)};function se(P,H,Z){P.transparent===!0&&P.side===Xn&&P.forceSinglePass===!1?(P.side=Nn,P.needsUpdate=!0,Mr(P,H,Z),P.side=xi,P.needsUpdate=!0,Mr(P,H,Z),P.side=Xn):Mr(P,H,Z)}this.compile=function(P,H,Z=null){Z===null&&(Z=P),p=me.get(Z),p.init(H),b.push(p),Z.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),P!==Z&&P.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),p.setupLights();let j=new Set;return P.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let pt=W.material;if(pt)if(Array.isArray(pt))for(let yt=0;yt<pt.length;yt++){let At=pt[yt];se(At,Z,W),j.add(At)}else se(pt,Z,W),j.add(pt)}),b.pop(),p=null,j},this.compileAsync=function(P,H,Z=null){let j=this.compile(P,H,Z);return new Promise(W=>{function pt(){if(j.forEach(function(yt){Bt.get(yt).currentProgram.isReady()&&j.delete(yt)}),j.size===0){W(P);return}setTimeout(pt,10)}he.get("KHR_parallel_shader_compile")!==null?pt():setTimeout(pt,10)})};let Bn=null;function ui(P){Bn&&Bn(P)}function Va(){Bi.stop()}function Ha(){Bi.start()}let Bi=new Pm;Bi.setAnimationLoop(ui),typeof self<"u"&&Bi.setContext(self),this.setAnimationLoop=function(P){Bn=P,tt.setAnimationLoop(P),P===null?Bi.stop():Bi.start()},tt.addEventListener("sessionstart",Va),tt.addEventListener("sessionend",Ha),this.render=function(P,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),tt.enabled===!0&&tt.isPresenting===!0&&(tt.cameraAutoUpdate===!0&&tt.updateCamera(H),H=tt.getCamera()),P.isScene===!0&&P.onBeforeRender(_,P,H,v),p=me.get(P,b.length),p.init(H),b.push(p),_t.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),q.setFromProjectionMatrix(_t),et=this.localClippingEnabled,Q=mt.init(this.clippingPlanes,et),m=Rt.get(P,E.length),m.init(),E.push(m),tt.enabled===!0&&tt.isPresenting===!0){let pt=_.xr.getDepthSensingMesh();pt!==null&&fo(pt,H,-1/0,_.sortObjects)}fo(P,H,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(st,ut),ke=tt.enabled===!1||tt.isPresenting===!1||tt.hasDepthSensing()===!1,ke&&Xt.addToRenderList(m,P),this.info.render.frame++,Q===!0&&mt.beginShadows();let Z=p.state.shadowsArray;Pt.render(Z,P,H),Q===!0&&mt.endShadows(),this.info.autoReset===!0&&this.info.reset();let j=m.opaque,W=m.transmissive;if(p.setupLights(),H.isArrayCamera){let pt=H.cameras;if(W.length>0)for(let yt=0,At=pt.length;yt<At;yt++){let Lt=pt[yt];po(j,W,P,Lt)}ke&&Xt.render(P);for(let yt=0,At=pt.length;yt<At;yt++){let Lt=pt[yt];Ga(m,P,Lt,Lt.viewport)}}else W.length>0&&po(j,W,P,H),ke&&Xt.render(P),Ga(m,P,H);v!==null&&D===0&&(U.updateMultisampleRenderTarget(v),U.updateRenderTargetMipmap(v)),P.isScene===!0&&P.onAfterRender(_,P,H),be.resetDefaultState(),w=-1,y=null,b.pop(),b.length>0?(p=b[b.length-1],Q===!0&&mt.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,E.pop(),E.length>0?m=E[E.length-1]:m=null};function fo(P,H,Z,j){if(P.visible===!1)return;if(P.layers.test(H.layers)){if(P.isGroup)Z=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(H);else if(P.isLight)p.pushLight(P),P.castShadow&&p.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||q.intersectsSprite(P)){j&&Gt.setFromMatrixPosition(P.matrixWorld).applyMatrix4(_t);let yt=rt.update(P),At=P.material;At.visible&&m.push(P,yt,At,Z,Gt.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||q.intersectsObject(P))){let yt=rt.update(P),At=P.material;if(j&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),Gt.copy(P.boundingSphere.center)):(yt.boundingSphere===null&&yt.computeBoundingSphere(),Gt.copy(yt.boundingSphere.center)),Gt.applyMatrix4(P.matrixWorld).applyMatrix4(_t)),Array.isArray(At)){let Lt=yt.groups;for(let $t=0,Kt=Lt.length;$t<Kt;$t++){let zt=Lt[$t],re=At[zt.materialIndex];re&&re.visible&&m.push(P,yt,re,Z,Gt.z,zt)}}else At.visible&&m.push(P,yt,At,Z,Gt.z,null)}}let pt=P.children;for(let yt=0,At=pt.length;yt<At;yt++)fo(pt[yt],H,Z,j)}function Ga(P,H,Z,j){let W=P.opaque,pt=P.transmissive,yt=P.transparent;p.setupLightsView(Z),Q===!0&&mt.setGlobalState(_.clippingPlanes,Z),j&&kt.viewport(N.copy(j)),W.length>0&&vr(W,H,Z),pt.length>0&&vr(pt,H,Z),yt.length>0&&vr(yt,H,Z),kt.buffers.depth.setTest(!0),kt.buffers.depth.setMask(!0),kt.buffers.color.setMask(!0),kt.setPolygonOffset(!1)}function po(P,H,Z,j){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[j.id]===void 0&&(p.state.transmissionRenderTarget[j.id]=new Ci(1,1,{generateMipmaps:!0,type:he.has("EXT_color_buffer_half_float")||he.has("EXT_color_buffer_float")?Yr:Li,minFilter:yi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:le.workingColorSpace}));let pt=p.state.transmissionRenderTarget[j.id],yt=j.viewport||N;pt.setSize(yt.z*_.transmissionResolutionScale,yt.w*_.transmissionResolutionScale);let At=_.getRenderTarget();_.setRenderTarget(pt),_.getClearColor(V),Y=_.getClearAlpha(),Y<1&&_.setClearColor(16777215,.5),_.clear(),ke&&Xt.render(Z);let Lt=_.toneMapping;_.toneMapping=ss;let $t=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),p.setupLightsView(j),Q===!0&&mt.setGlobalState(_.clippingPlanes,j),vr(P,Z,j),U.updateMultisampleRenderTarget(pt),U.updateRenderTargetMipmap(pt),he.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let zt=0,re=H.length;zt<re;zt++){let _e=H[zt],Ze=_e.object,He=_e.geometry,ge=_e.material,Wt=_e.group;if(ge.side===Xn&&Ze.layers.test(j.layers)){let an=ge.side;ge.side=Nn,ge.needsUpdate=!0,mo(Ze,Z,j,He,ge,Wt),ge.side=an,ge.needsUpdate=!0,Kt=!0}}Kt===!0&&(U.updateMultisampleRenderTarget(pt),U.updateRenderTargetMipmap(pt))}_.setRenderTarget(At),_.setClearColor(V,Y),$t!==void 0&&(j.viewport=$t),_.toneMapping=Lt}function vr(P,H,Z){let j=H.isScene===!0?H.overrideMaterial:null;for(let W=0,pt=P.length;W<pt;W++){let yt=P[W],At=yt.object,Lt=yt.geometry,$t=j===null?yt.material:j,Kt=yt.group;At.layers.test(Z.layers)&&mo(At,H,Z,Lt,$t,Kt)}}function mo(P,H,Z,j,W,pt){P.onBeforeRender(_,H,Z,j,W,pt),P.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),W.onBeforeRender(_,H,Z,j,P,pt),W.transparent===!0&&W.side===Xn&&W.forceSinglePass===!1?(W.side=Nn,W.needsUpdate=!0,_.renderBufferDirect(Z,H,j,W,P,pt),W.side=xi,W.needsUpdate=!0,_.renderBufferDirect(Z,H,j,W,P,pt),W.side=Xn):_.renderBufferDirect(Z,H,j,W,P,pt),P.onAfterRender(_,H,Z,j,W,pt)}function Mr(P,H,Z){H.isScene!==!0&&(H=Je);let j=Bt.get(P),W=p.state.lights,pt=p.state.shadowsArray,yt=W.state.version,At=Nt.getParameters(P,W.state,pt,H,Z),Lt=Nt.getProgramCacheKey(At),$t=j.programs;j.environment=P.isMeshStandardMaterial?H.environment:null,j.fog=H.fog,j.envMap=(P.isMeshStandardMaterial?J:C).get(P.envMap||j.environment),j.envMapRotation=j.environment!==null&&P.envMap===null?H.environmentRotation:P.envMapRotation,$t===void 0&&(P.addEventListener("dispose",te),$t=new Map,j.programs=$t);let Kt=$t.get(Lt);if(Kt!==void 0){if(j.currentProgram===Kt&&j.lightsStateVersion===yt)return Xa(P,At),Kt}else At.uniforms=Nt.getUniforms(P),P.onBeforeCompile(At,_),Kt=Nt.acquireProgram(At,Lt),$t.set(Lt,Kt),j.uniforms=At.uniforms;let zt=j.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(zt.clippingPlanes=mt.uniform),Xa(P,At),j.needsLights=jh(P),j.lightsStateVersion=yt,j.needsLights&&(zt.ambientLightColor.value=W.state.ambient,zt.lightProbe.value=W.state.probe,zt.directionalLights.value=W.state.directional,zt.directionalLightShadows.value=W.state.directionalShadow,zt.spotLights.value=W.state.spot,zt.spotLightShadows.value=W.state.spotShadow,zt.rectAreaLights.value=W.state.rectArea,zt.ltc_1.value=W.state.rectAreaLTC1,zt.ltc_2.value=W.state.rectAreaLTC2,zt.pointLights.value=W.state.point,zt.pointLightShadows.value=W.state.pointShadow,zt.hemisphereLights.value=W.state.hemi,zt.directionalShadowMap.value=W.state.directionalShadowMap,zt.directionalShadowMatrix.value=W.state.directionalShadowMatrix,zt.spotShadowMap.value=W.state.spotShadowMap,zt.spotLightMatrix.value=W.state.spotLightMatrix,zt.spotLightMap.value=W.state.spotLightMap,zt.pointShadowMap.value=W.state.pointShadowMap,zt.pointShadowMatrix.value=W.state.pointShadowMatrix),j.currentProgram=Kt,j.uniformsList=null,Kt}function Wa(P){if(P.uniformsList===null){let H=P.currentProgram.getUniforms();P.uniformsList=jr.seqWithValue(H.seq,P.uniforms)}return P.uniformsList}function Xa(P,H){let Z=Bt.get(P);Z.outputColorSpace=H.outputColorSpace,Z.batching=H.batching,Z.batchingColor=H.batchingColor,Z.instancing=H.instancing,Z.instancingColor=H.instancingColor,Z.instancingMorph=H.instancingMorph,Z.skinning=H.skinning,Z.morphTargets=H.morphTargets,Z.morphNormals=H.morphNormals,Z.morphColors=H.morphColors,Z.morphTargetsCount=H.morphTargetsCount,Z.numClippingPlanes=H.numClippingPlanes,Z.numIntersection=H.numClipIntersection,Z.vertexAlphas=H.vertexAlphas,Z.vertexTangents=H.vertexTangents,Z.toneMapping=H.toneMapping}function Jh(P,H,Z,j,W){H.isScene!==!0&&(H=Je),U.resetTextureUnits();let pt=H.fog,yt=j.isMeshStandardMaterial?H.environment:null,At=v===null?_.outputColorSpace:v.isXRRenderTarget===!0?v.texture.colorSpace:Vs,Lt=(j.isMeshStandardMaterial?J:C).get(j.envMap||yt),$t=j.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Kt=!!Z.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),zt=!!Z.morphAttributes.position,re=!!Z.morphAttributes.normal,_e=!!Z.morphAttributes.color,Ze=ss;j.toneMapped&&(v===null||v.isXRRenderTarget===!0)&&(Ze=_.toneMapping);let He=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ge=He!==void 0?He.length:0,Wt=Bt.get(j),an=p.state.lights;if(Q===!0&&(et===!0||P!==y)){let tn=P===y&&j.id===w;mt.setState(j,P,tn)}let ye=!1;j.version===Wt.__version?(Wt.needsLights&&Wt.lightsStateVersion!==an.state.version||Wt.outputColorSpace!==At||W.isBatchedMesh&&Wt.batching===!1||!W.isBatchedMesh&&Wt.batching===!0||W.isBatchedMesh&&Wt.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Wt.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Wt.instancing===!1||!W.isInstancedMesh&&Wt.instancing===!0||W.isSkinnedMesh&&Wt.skinning===!1||!W.isSkinnedMesh&&Wt.skinning===!0||W.isInstancedMesh&&Wt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Wt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Wt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Wt.instancingMorph===!1&&W.morphTexture!==null||Wt.envMap!==Lt||j.fog===!0&&Wt.fog!==pt||Wt.numClippingPlanes!==void 0&&(Wt.numClippingPlanes!==mt.numPlanes||Wt.numIntersection!==mt.numIntersection)||Wt.vertexAlphas!==$t||Wt.vertexTangents!==Kt||Wt.morphTargets!==zt||Wt.morphNormals!==re||Wt.morphColors!==_e||Wt.toneMapping!==Ze||Wt.morphTargetsCount!==ge)&&(ye=!0):(ye=!0,Wt.__version=j.version);let kn=Wt.currentProgram;ye===!0&&(kn=Mr(j,H,W));let De=!1,yn=!1,Is=!1,Pe=kn.getUniforms(),In=Wt.uniforms;if(kt.useProgram(kn.program)&&(De=!0,yn=!0,Is=!0),j.id!==w&&(w=j.id,yn=!0),De||y!==P){kt.buffers.depth.getReversed()?(nt.copy(P.projectionMatrix),im(nt),sm(nt),Pe.setValue(z,"projectionMatrix",nt)):Pe.setValue(z,"projectionMatrix",P.projectionMatrix),Pe.setValue(z,"viewMatrix",P.matrixWorldInverse);let ln=Pe.map.cameraPosition;ln!==void 0&&ln.setValue(z,Qt.setFromMatrixPosition(P.matrixWorld)),ue.logarithmicDepthBuffer&&Pe.setValue(z,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&Pe.setValue(z,"isOrthographic",P.isOrthographicCamera===!0),y!==P&&(y=P,yn=!0,Is=!0)}if(W.isSkinnedMesh){Pe.setOptional(z,W,"bindMatrix"),Pe.setOptional(z,W,"bindMatrixInverse");let tn=W.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),Pe.setValue(z,"boneTexture",tn.boneTexture,U))}W.isBatchedMesh&&(Pe.setOptional(z,W,"batchingTexture"),Pe.setValue(z,"batchingTexture",W._matricesTexture,U),Pe.setOptional(z,W,"batchingIdTexture"),Pe.setValue(z,"batchingIdTexture",W._indirectTexture,U),Pe.setOptional(z,W,"batchingColorTexture"),W._colorsTexture!==null&&Pe.setValue(z,"batchingColorTexture",W._colorsTexture,U));let wn=Z.morphAttributes;if((wn.position!==void 0||wn.normal!==void 0||wn.color!==void 0)&&jt.update(W,Z,kn),(yn||Wt.receiveShadow!==W.receiveShadow)&&(Wt.receiveShadow=W.receiveShadow,Pe.setValue(z,"receiveShadow",W.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(In.envMap.value=Lt,In.flipEnvMap.value=Lt.isCubeTexture&&Lt.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&H.environment!==null&&(In.envMapIntensity.value=H.environmentIntensity),yn&&(Pe.setValue(z,"toneMappingExposure",_.toneMappingExposure),Wt.needsLights&&Zh(In,Is),pt&&j.fog===!0&&Mt.refreshFogUniforms(In,pt),Mt.refreshMaterialUniforms(In,j,X,K,p.state.transmissionRenderTarget[P.id]),jr.upload(z,Wa(Wt),In,U)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(jr.upload(z,Wa(Wt),In,U),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&Pe.setValue(z,"center",W.center),Pe.setValue(z,"modelViewMatrix",W.modelViewMatrix),Pe.setValue(z,"normalMatrix",W.normalMatrix),Pe.setValue(z,"modelMatrix",W.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){let tn=j.uniformsGroups;for(let ln=0,br=tn.length;ln<br;ln++){let ki=tn[ln];G.update(ki,kn),G.bind(ki,kn)}}return kn}function Zh(P,H){P.ambientLightColor.needsUpdate=H,P.lightProbe.needsUpdate=H,P.directionalLights.needsUpdate=H,P.directionalLightShadows.needsUpdate=H,P.pointLights.needsUpdate=H,P.pointLightShadows.needsUpdate=H,P.spotLights.needsUpdate=H,P.spotLightShadows.needsUpdate=H,P.rectAreaLights.needsUpdate=H,P.hemisphereLights.needsUpdate=H}function jh(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return v},this.setRenderTargetTextures=function(P,H,Z){Bt.get(P.texture).__webglTexture=H,Bt.get(P.depthTexture).__webglTexture=Z;let j=Bt.get(P);j.__hasExternalTextures=!0,j.__autoAllocateDepthBuffer=Z===void 0,j.__autoAllocateDepthBuffer||he.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(P,H){let Z=Bt.get(P);Z.__webglFramebuffer=H,Z.__useDefaultFramebuffer=H===void 0};let $h=z.createFramebuffer();this.setRenderTarget=function(P,H=0,Z=0){v=P,A=H,D=Z;let j=!0,W=null,pt=!1,yt=!1;if(P){let Lt=Bt.get(P);if(Lt.__useDefaultFramebuffer!==void 0)kt.bindFramebuffer(z.FRAMEBUFFER,null),j=!1;else if(Lt.__webglFramebuffer===void 0)U.setupRenderTarget(P);else if(Lt.__hasExternalTextures)U.rebindTextures(P,Bt.get(P.texture).__webglTexture,Bt.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){let zt=P.depthTexture;if(Lt.__boundDepthTexture!==zt){if(zt!==null&&Bt.has(zt)&&(P.width!==zt.image.width||P.height!==zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");U.setupDepthRenderbuffer(P)}}let $t=P.texture;($t.isData3DTexture||$t.isDataArrayTexture||$t.isCompressedArrayTexture)&&(yt=!0);let Kt=Bt.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(Kt[H])?W=Kt[H][Z]:W=Kt[H],pt=!0):P.samples>0&&U.useMultisampledRTT(P)===!1?W=Bt.get(P).__webglMultisampledFramebuffer:Array.isArray(Kt)?W=Kt[Z]:W=Kt,N.copy(P.viewport),O.copy(P.scissor),B=P.scissorTest}else N.copy(ft).multiplyScalar(X).floor(),O.copy(Tt).multiplyScalar(X).floor(),B=wt;if(Z!==0&&(W=$h),kt.bindFramebuffer(z.FRAMEBUFFER,W)&&j&&kt.drawBuffers(P,W),kt.viewport(N),kt.scissor(O),kt.setScissorTest(B),pt){let Lt=Bt.get(P.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+H,Lt.__webglTexture,Z)}else if(yt){let Lt=Bt.get(P.texture),$t=H;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Lt.__webglTexture,Z,$t)}else if(P!==null&&Z!==0){let Lt=Bt.get(P.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,Lt.__webglTexture,Z)}w=-1},this.readRenderTargetPixels=function(P,H,Z,j,W,pt,yt){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let At=Bt.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&yt!==void 0&&(At=At[yt]),At){kt.bindFramebuffer(z.FRAMEBUFFER,At);try{let Lt=P.texture,$t=Lt.format,Kt=Lt.type;if(!ue.textureFormatReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ue.textureTypeReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=P.width-j&&Z>=0&&Z<=P.height-W&&z.readPixels(H,Z,j,W,ne.convert($t),ne.convert(Kt),pt)}finally{let Lt=v!==null?Bt.get(v).__webglFramebuffer:null;kt.bindFramebuffer(z.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(P,H,Z,j,W,pt,yt){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let At=Bt.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&yt!==void 0&&(At=At[yt]),At){let Lt=P.texture,$t=Lt.format,Kt=Lt.type;if(!ue.textureFormatReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ue.textureTypeReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=P.width-j&&Z>=0&&Z<=P.height-W){kt.bindFramebuffer(z.FRAMEBUFFER,At);let zt=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,zt),z.bufferData(z.PIXEL_PACK_BUFFER,pt.byteLength,z.STREAM_READ),z.readPixels(H,Z,j,W,ne.convert($t),ne.convert(Kt),0);let re=v!==null?Bt.get(v).__webglFramebuffer:null;kt.bindFramebuffer(z.FRAMEBUFFER,re);let _e=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await nm(z,_e,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,zt),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,pt),z.deleteBuffer(zt),z.deleteSync(_e),pt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(P,H=null,Z=0){P.isTexture!==!0&&(nr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,P=arguments[1]);let j=Math.pow(2,-Z),W=Math.floor(P.image.width*j),pt=Math.floor(P.image.height*j),yt=H!==null?H.x:0,At=H!==null?H.y:0;U.setTexture2D(P,0),z.copyTexSubImage2D(z.TEXTURE_2D,Z,0,0,yt,At,W,pt),kt.unbindTexture()};let Kh=z.createFramebuffer(),Qh=z.createFramebuffer();this.copyTextureToTexture=function(P,H,Z=null,j=null,W=0,pt=null){P.isTexture!==!0&&(nr("WebGLRenderer: copyTextureToTexture function signature has changed."),j=arguments[0]||null,P=arguments[1],H=arguments[2],pt=arguments[3]||0,Z=null),pt===null&&(W!==0?(nr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),pt=W,W=0):pt=0);let yt,At,Lt,$t,Kt,zt,re,_e,Ze,He=P.isCompressedTexture?P.mipmaps[pt]:P.image;if(Z!==null)yt=Z.max.x-Z.min.x,At=Z.max.y-Z.min.y,Lt=Z.isBox3?Z.max.z-Z.min.z:1,$t=Z.min.x,Kt=Z.min.y,zt=Z.isBox3?Z.min.z:0;else{let wn=Math.pow(2,-W);yt=Math.floor(He.width*wn),At=Math.floor(He.height*wn),P.isDataArrayTexture?Lt=He.depth:P.isData3DTexture?Lt=Math.floor(He.depth*wn):Lt=1,$t=0,Kt=0,zt=0}j!==null?(re=j.x,_e=j.y,Ze=j.z):(re=0,_e=0,Ze=0);let ge=ne.convert(H.format),Wt=ne.convert(H.type),an;H.isData3DTexture?(U.setTexture3D(H,0),an=z.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(U.setTexture2DArray(H,0),an=z.TEXTURE_2D_ARRAY):(U.setTexture2D(H,0),an=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,H.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,H.unpackAlignment);let ye=z.getParameter(z.UNPACK_ROW_LENGTH),kn=z.getParameter(z.UNPACK_IMAGE_HEIGHT),De=z.getParameter(z.UNPACK_SKIP_PIXELS),yn=z.getParameter(z.UNPACK_SKIP_ROWS),Is=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,He.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,He.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,$t),z.pixelStorei(z.UNPACK_SKIP_ROWS,Kt),z.pixelStorei(z.UNPACK_SKIP_IMAGES,zt);let Pe=P.isDataArrayTexture||P.isData3DTexture,In=H.isDataArrayTexture||H.isData3DTexture;if(P.isDepthTexture){let wn=Bt.get(P),tn=Bt.get(H),ln=Bt.get(wn.__renderTarget),br=Bt.get(tn.__renderTarget);kt.bindFramebuffer(z.READ_FRAMEBUFFER,ln.__webglFramebuffer),kt.bindFramebuffer(z.DRAW_FRAMEBUFFER,br.__webglFramebuffer);for(let ki=0;ki<Lt;ki++)Pe&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Bt.get(P).__webglTexture,W,zt+ki),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,Bt.get(H).__webglTexture,pt,Ze+ki)),z.blitFramebuffer($t,Kt,yt,At,re,_e,yt,At,z.DEPTH_BUFFER_BIT,z.NEAREST);kt.bindFramebuffer(z.READ_FRAMEBUFFER,null),kt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(W!==0||P.isRenderTargetTexture||Bt.has(P)){let wn=Bt.get(P),tn=Bt.get(H);kt.bindFramebuffer(z.READ_FRAMEBUFFER,Kh),kt.bindFramebuffer(z.DRAW_FRAMEBUFFER,Qh);for(let ln=0;ln<Lt;ln++)Pe?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,wn.__webglTexture,W,zt+ln):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,wn.__webglTexture,W),In?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,tn.__webglTexture,pt,Ze+ln):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,tn.__webglTexture,pt),W!==0?z.blitFramebuffer($t,Kt,yt,At,re,_e,yt,At,z.COLOR_BUFFER_BIT,z.NEAREST):In?z.copyTexSubImage3D(an,pt,re,_e,Ze+ln,$t,Kt,yt,At):z.copyTexSubImage2D(an,pt,re,_e,$t,Kt,yt,At);kt.bindFramebuffer(z.READ_FRAMEBUFFER,null),kt.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else In?P.isDataTexture||P.isData3DTexture?z.texSubImage3D(an,pt,re,_e,Ze,yt,At,Lt,ge,Wt,He.data):H.isCompressedArrayTexture?z.compressedTexSubImage3D(an,pt,re,_e,Ze,yt,At,Lt,ge,He.data):z.texSubImage3D(an,pt,re,_e,Ze,yt,At,Lt,ge,Wt,He):P.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,pt,re,_e,yt,At,ge,Wt,He.data):P.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,pt,re,_e,He.width,He.height,ge,He.data):z.texSubImage2D(z.TEXTURE_2D,pt,re,_e,yt,At,ge,Wt,He);z.pixelStorei(z.UNPACK_ROW_LENGTH,ye),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,kn),z.pixelStorei(z.UNPACK_SKIP_PIXELS,De),z.pixelStorei(z.UNPACK_SKIP_ROWS,yn),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Is),pt===0&&H.generateMipmaps&&z.generateMipmap(an),kt.unbindTexture()},this.copyTextureToTexture3D=function(P,H,Z=null,j=null,W=0){return P.isTexture!==!0&&(nr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Z=arguments[0]||null,j=arguments[1]||null,P=arguments[2],H=arguments[3],W=arguments[4]||0),nr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(P,H,Z,j,W)},this.initRenderTarget=function(P){Bt.get(P).__webglFramebuffer===void 0&&U.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?U.setTextureCube(P,0):P.isData3DTexture?U.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?U.setTexture2DArray(P,0):U.setTexture2D(P,0),kt.unbindTexture()},this.resetState=function(){A=0,D=0,v=null,kt.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=le._getDrawingBufferColorSpace(t),e.unpackColorSpace=le._getUnpackColorSpace()}};var Kr=class extends ei{constructor(t){super(t)}load(t,e,i,s){let r=this,o=new vs(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(t,function(a){try{e(r.parse(a))}catch(l){s?s(l):console.error(l),r.manager.itemError(t)}},i,s)}parse(t){function e(c){let h=new DataView(c),d=32/8*3+32/8*3*3+16/8,u=h.getUint32(80,!0);if(80+32/8+u*d===h.byteLength)return!0;let g=[115,111,108,105,100];for(let x=0;x<5;x++)if(i(g,h,x))return!1;return!0}function i(c,h,d){for(let u=0,f=c.length;u<f;u++)if(c[u]!==h.getUint8(d+u))return!1;return!0}function s(c){let h=new DataView(c),d=h.getUint32(80,!0),u,f,g,x=!1,m,p,E,b,_;for(let N=0;N<80-10;N++)h.getUint32(N,!1)==1129270351&&h.getUint8(N+4)==82&&h.getUint8(N+5)==61&&(x=!0,m=new Float32Array(d*3*3),p=h.getUint8(N+6)/255,E=h.getUint8(N+7)/255,b=h.getUint8(N+8)/255,_=h.getUint8(N+9)/255);let T=84,A=12*4+2,D=new Xe,v=new Float32Array(d*3*3),w=new Float32Array(d*3*3),y=new Jt;for(let N=0;N<d;N++){let O=T+N*A,B=h.getFloat32(O,!0),V=h.getFloat32(O+4,!0),Y=h.getFloat32(O+8,!0);if(x){let k=h.getUint16(O+48,!0);k&32768?(u=p,f=E,g=b):(u=(k&31)/31,f=(k>>5&31)/31,g=(k>>10&31)/31)}for(let k=1;k<=3;k++){let K=O+k*12,X=N*3*3+(k-1)*3;v[X]=h.getFloat32(K,!0),v[X+1]=h.getFloat32(K+4,!0),v[X+2]=h.getFloat32(K+8,!0),w[X]=B,w[X+1]=V,w[X+2]=Y,x&&(y.setRGB(u,f,g,Ae),m[X]=y.r,m[X+1]=y.g,m[X+2]=y.b)}}return D.setAttribute("position",new gn(v,3)),D.setAttribute("normal",new gn(w,3)),x&&(D.setAttribute("color",new gn(m,3)),D.hasColors=!0,D.alpha=_),D}function r(c){let h=new Xe,d=/solid([\s\S]*?)endsolid/g,u=/facet([\s\S]*?)endfacet/g,f=/solid\s(.+)/,g=0,x=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,m=new RegExp("vertex"+x+x+x,"g"),p=new RegExp("normal"+x+x+x,"g"),E=[],b=[],_=[],T=new F,A,D=0,v=0,w=0;for(;(A=d.exec(c))!==null;){v=w;let y=A[0],N=(A=f.exec(y))!==null?A[1]:"";for(_.push(N);(A=u.exec(y))!==null;){let V=0,Y=0,k=A[0];for(;(A=p.exec(k))!==null;)T.x=parseFloat(A[1]),T.y=parseFloat(A[2]),T.z=parseFloat(A[3]),Y++;for(;(A=m.exec(k))!==null;)E.push(parseFloat(A[1]),parseFloat(A[2]),parseFloat(A[3])),b.push(T.x,T.y,T.z),V++,w++;Y!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+g),V!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+g),g++}let O=v,B=w-v;h.userData.groupNames=_,h.addGroup(O,B,D),D++}return h.setAttribute("position",new ee(E,3)),h.setAttribute("normal",new ee(b,3)),h}function o(c){return typeof c!="string"?new TextDecoder().decode(c):c}function a(c){if(typeof c=="string"){let h=new Uint8Array(c.length);for(let d=0;d<c.length;d++)h[d]=c.charCodeAt(d)&255;return h.buffer||h}else return c}let l=a(t);return e(l)?s(l):r(o(t))}};var ha=class extends qo{constructor(t){super(t)}parse(t){function e(k){switch(k.image_type){case u:case x:if(k.colormap_length>256||k.colormap_size!==24||k.colormap_type!==1)throw new Error("THREE.TGALoader: Invalid type colormap data for indexed type.");break;case f:case g:case m:case p:if(k.colormap_type)throw new Error("THREE.TGALoader: Invalid type colormap data for colormap type.");break;case d:throw new Error("THREE.TGALoader: No data.");default:throw new Error("THREE.TGALoader: Invalid type "+k.image_type)}if(k.width<=0||k.height<=0)throw new Error("THREE.TGALoader: Invalid image size.");if(k.pixel_size!==8&&k.pixel_size!==16&&k.pixel_size!==24&&k.pixel_size!==32)throw new Error("THREE.TGALoader: Invalid pixel size "+k.pixel_size)}function i(k,K,X,st,ut){let ft,Tt,wt=X.pixel_size>>3,q=X.width*X.height*wt;if(K&&(Tt=ut.subarray(st,st+=X.colormap_length*(X.colormap_size>>3))),k){ft=new Uint8Array(q);let Q,et,nt,_t=0,Qt=new Uint8Array(wt);for(;_t<q;)if(Q=ut[st++],et=(Q&127)+1,Q&128){for(nt=0;nt<wt;++nt)Qt[nt]=ut[st++];for(nt=0;nt<et;++nt)ft.set(Qt,_t+nt*wt);_t+=wt*et}else{for(et*=wt,nt=0;nt<et;++nt)ft[_t+nt]=ut[st++];_t+=et}}else ft=ut.subarray(st,st+=K?X.width*X.height:q);return{pixel_data:ft,palettes:Tt}}function s(k,K,X,st,ut,ft,Tt,wt,q){let Q=q,et,nt=0,_t,Qt,Gt=y.width;for(Qt=K;Qt!==st;Qt+=X)for(_t=ut;_t!==Tt;_t+=ft,nt++)et=wt[nt],k[(_t+Gt*Qt)*4+3]=255,k[(_t+Gt*Qt)*4+2]=Q[et*3+0],k[(_t+Gt*Qt)*4+1]=Q[et*3+1],k[(_t+Gt*Qt)*4+0]=Q[et*3+2];return k}function r(k,K,X,st,ut,ft,Tt,wt){let q,Q=0,et,nt,_t=y.width;for(nt=K;nt!==st;nt+=X)for(et=ut;et!==Tt;et+=ft,Q+=2)q=wt[Q+0]+(wt[Q+1]<<8),k[(et+_t*nt)*4+0]=(q&31744)>>7,k[(et+_t*nt)*4+1]=(q&992)>>2,k[(et+_t*nt)*4+2]=(q&31)<<3,k[(et+_t*nt)*4+3]=q&32768?0:255;return k}function o(k,K,X,st,ut,ft,Tt,wt){let q=0,Q,et,nt=y.width;for(et=K;et!==st;et+=X)for(Q=ut;Q!==Tt;Q+=ft,q+=3)k[(Q+nt*et)*4+3]=255,k[(Q+nt*et)*4+2]=wt[q+0],k[(Q+nt*et)*4+1]=wt[q+1],k[(Q+nt*et)*4+0]=wt[q+2];return k}function a(k,K,X,st,ut,ft,Tt,wt){let q=0,Q,et,nt=y.width;for(et=K;et!==st;et+=X)for(Q=ut;Q!==Tt;Q+=ft,q+=4)k[(Q+nt*et)*4+2]=wt[q+0],k[(Q+nt*et)*4+1]=wt[q+1],k[(Q+nt*et)*4+0]=wt[q+2],k[(Q+nt*et)*4+3]=wt[q+3];return k}function l(k,K,X,st,ut,ft,Tt,wt){let q,Q=0,et,nt,_t=y.width;for(nt=K;nt!==st;nt+=X)for(et=ut;et!==Tt;et+=ft,Q++)q=wt[Q],k[(et+_t*nt)*4+0]=q,k[(et+_t*nt)*4+1]=q,k[(et+_t*nt)*4+2]=q,k[(et+_t*nt)*4+3]=255;return k}function c(k,K,X,st,ut,ft,Tt,wt){let q=0,Q,et,nt=y.width;for(et=K;et!==st;et+=X)for(Q=ut;Q!==Tt;Q+=ft,q+=2)k[(Q+nt*et)*4+0]=wt[q+0],k[(Q+nt*et)*4+1]=wt[q+0],k[(Q+nt*et)*4+2]=wt[q+0],k[(Q+nt*et)*4+3]=wt[q+1];return k}function h(k,K,X,st,ut){let ft,Tt,wt,q,Q,et;switch((y.flags&E)>>b){default:case A:ft=0,wt=1,Q=K,Tt=0,q=1,et=X;break;case _:ft=0,wt=1,Q=K,Tt=X-1,q=-1,et=-1;break;case D:ft=K-1,wt=-1,Q=-1,Tt=0,q=1,et=X;break;case T:ft=K-1,wt=-1,Q=-1,Tt=X-1,q=-1,et=-1;break}if(B)switch(y.pixel_size){case 8:l(k,Tt,q,et,ft,wt,Q,st);break;case 16:c(k,Tt,q,et,ft,wt,Q,st);break;default:throw new Error("THREE.TGALoader: Format not supported.")}else switch(y.pixel_size){case 8:s(k,Tt,q,et,ft,wt,Q,st,ut);break;case 16:r(k,Tt,q,et,ft,wt,Q,st);break;case 24:o(k,Tt,q,et,ft,wt,Q,st);break;case 32:a(k,Tt,q,et,ft,wt,Q,st);break;default:throw new Error("THREE.TGALoader: Format not supported.")}return k}let d=0,u=1,f=2,g=3,x=9,m=10,p=11,E=48,b=4,_=0,T=1,A=2,D=3;if(t.length<19)throw new Error("THREE.TGALoader: Not enough data to contain header.");let v=0,w=new Uint8Array(t),y={id_length:w[v++],colormap_type:w[v++],image_type:w[v++],colormap_index:w[v++]|w[v++]<<8,colormap_length:w[v++]|w[v++]<<8,colormap_size:w[v++],origin:[w[v++]|w[v++]<<8,w[v++]|w[v++]<<8],width:w[v++]|w[v++]<<8,height:w[v++]|w[v++]<<8,pixel_size:w[v++],flags:w[v++]};if(e(y),y.id_length+v>t.length)throw new Error("THREE.TGALoader: No data.");v+=y.id_length;let N=!1,O=!1,B=!1;switch(y.image_type){case x:N=!0,O=!0;break;case u:O=!0;break;case m:N=!0;break;case f:break;case p:N=!0,B=!0;break;case g:B=!0;break}let V=new Uint8Array(y.width*y.height*4),Y=i(N,O,y,v,w);return h(V,y.width,y.height,Y.pixel_data,Y.palettes),{data:V,width:y.width,height:y.height,flipY:!0,generateMipmaps:!0,minFilter:yi}}};var Vc=class extends ei{load(t,e,i,s){let r=this,o=r.path===""?$s.extractUrlBase(t):r.path,a=new vs(r.manager);a.setPath(r.path),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(t,function(l){try{e(r.parse(l,o))}catch(c){s?s(c):console.error(c),r.manager.itemError(t)}},i,s)}parse(t,e){function i(S,M){let I=[],R=S.childNodes;for(let L=0,$=R.length;L<$;L++){let it=R[L];it.nodeName===M&&I.push(it)}return I}function s(S){if(S.length===0)return[];let M=S.trim().split(/\s+/),I=new Array(M.length);for(let R=0,L=M.length;R<L;R++)I[R]=M[R];return I}function r(S){if(S.length===0)return[];let M=S.trim().split(/\s+/),I=new Array(M.length);for(let R=0,L=M.length;R<L;R++)I[R]=parseFloat(M[R]);return I}function o(S){if(S.length===0)return[];let M=S.trim().split(/\s+/),I=new Array(M.length);for(let R=0,L=M.length;R<L;R++)I[R]=parseInt(M[R]);return I}function a(S){return S.substring(1)}function l(){return"three_default_"+ki++}function c(S){return Object.keys(S).length===0}function h(S){return{unit:d(i(S,"unit")[0]),upAxis:u(i(S,"up_axis")[0])}}function d(S){return S!==void 0&&S.hasAttribute("meter")===!0?parseFloat(S.getAttribute("meter")):1}function u(S){return S!==void 0?S.textContent:"Y_UP"}function f(S,M,I,R){let L=i(S,M)[0];if(L!==void 0){let $=i(L,I);for(let it=0;it<$.length;it++)R($[it])}}function g(S,M){for(let I in S){let R=S[I];R.build=M(S[I])}}function x(S,M){return S.build!==void 0||(S.build=M(S)),S.build}function m(S){let M={sources:{},samplers:{},channels:{}},I=!1;for(let R=0,L=S.childNodes.length;R<L;R++){let $=S.childNodes[R];if($.nodeType!==1)continue;let it;switch($.nodeName){case"source":it=$.getAttribute("id"),M.sources[it]=tt($);break;case"sampler":it=$.getAttribute("id"),M.samplers[it]=p($);break;case"channel":it=$.getAttribute("target"),M.channels[it]=E($);break;case"animation":m($),I=!0;break;default:console.log($)}}I===!1&&(Zt.animations[S.getAttribute("id")||nn.generateUUID()]=M)}function p(S){let M={inputs:{}};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"input":let $=a(L.getAttribute("source")),it=L.getAttribute("semantic");M.inputs[it]=$;break}}return M}function E(S){let M={},R=S.getAttribute("target").split("/"),L=R.shift(),$=R.shift(),it=$.indexOf("(")!==-1,Ct=$.indexOf(".")!==-1;if(Ct)R=$.split("."),$=R.shift(),M.member=R.shift();else if(it){let gt=$.split("(");$=gt.shift();for(let St=0;St<gt.length;St++)gt[St]=parseInt(gt[St].replace(/\)/,""));M.indices=gt}return M.id=L,M.sid=$,M.arraySyntax=it,M.memberSyntax=Ct,M.sampler=a(S.getAttribute("source")),M}function b(S){let M=[],I=S.channels,R=S.samplers,L=S.sources;for(let $ in I)if(I.hasOwnProperty($)){let it=I[$],Ct=R[it.sampler],gt=Ct.inputs.INPUT,St=Ct.inputs.OUTPUT,Ut=L[gt],ct=L[St],Ft=T(it,Ut,ct);y(Ft,M)}return M}function _(S){return x(Zt.animations[S],b)}function T(S,M,I){let R=Zt.nodes[S.id],L=re(R.id),$=R.transforms[S.sid],it=R.matrix.clone().transpose(),Ct,gt,St,Ut,ct,Ft,Dt={};switch($){case"matrix":for(St=0,Ut=M.array.length;St<Ut;St++)if(Ct=M.array[St],gt=St*I.stride,Dt[Ct]===void 0&&(Dt[Ct]={}),S.arraySyntax===!0){let je=I.array[gt],Se=S.indices[0]+4*S.indices[1];Dt[Ct][Se]=je}else for(ct=0,Ft=I.stride;ct<Ft;ct++)Dt[Ct][ct]=I.array[gt+ct];break;case"translate":console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.',$);break;case"rotate":console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.',$);break;case"scale":console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.',$);break}let qt=A(Dt,it);return{name:L.uuid,keyframes:qt}}function A(S,M){let I=[];for(let L in S)I.push({time:parseFloat(L),value:S[L]});I.sort(R);for(let L=0;L<16;L++)N(I,L,M.elements[L]);return I;function R(L,$){return L.time-$.time}}let D=new F,v=new F,w=new de;function y(S,M){let I=S.keyframes,R=S.name,L=[],$=[],it=[],Ct=[];for(let gt=0,St=I.length;gt<St;gt++){let Ut=I[gt],ct=Ut.time,Ft=Ut.value;H.fromArray(Ft).transpose(),H.decompose(D,w,v),L.push(ct),$.push(D.x,D.y,D.z),it.push(w.x,w.y,w.z,w.w),Ct.push(v.x,v.y,v.z)}return $.length>0&&M.push(new Pi(R+".position",L,$)),it.length>0&&M.push(new es(R+".quaternion",L,it)),Ct.length>0&&M.push(new Pi(R+".scale",L,Ct)),M}function N(S,M,I){let R,L=!0,$,it;for($=0,it=S.length;$<it;$++)R=S[$],R.value[M]===void 0?R.value[M]=null:L=!1;if(L===!0)for($=0,it=S.length;$<it;$++)R=S[$],R.value[M]=I;else O(S,M)}function O(S,M){let I,R;for(let L=0,$=S.length;L<$;L++){let it=S[L];if(it.value[M]===null){if(I=B(S,L,M),R=V(S,L,M),I===null){it.value[M]=R.value[M];continue}if(R===null){it.value[M]=I.value[M];continue}Y(it,I,R,M)}}}function B(S,M,I){for(;M>=0;){let R=S[M];if(R.value[I]!==null)return R;M--}return null}function V(S,M,I){for(;M<S.length;){let R=S[M];if(R.value[I]!==null)return R;M++}return null}function Y(S,M,I,R){if(I.time-M.time===0){S.value[R]=M.value[R];return}S.value[R]=(S.time-M.time)*(I.value[R]-M.value[R])/(I.time-M.time)+M.value[R]}function k(S){let M={name:S.getAttribute("id")||"default",start:parseFloat(S.getAttribute("start")||0),end:parseFloat(S.getAttribute("end")||0),animations:[]};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"instance_animation":M.animations.push(a(L.getAttribute("url")));break}}Zt.clips[S.getAttribute("id")]=M}function K(S){let M=[],I=S.name,R=S.end-S.start||-1,L=S.animations;for(let $=0,it=L.length;$<it;$++){let Ct=_(L[$]);for(let gt=0,St=Ct.length;gt<St;gt++)M.push(Ct[gt])}return new Gr(I,R,M)}function X(S){return x(Zt.clips[S],K)}function st(S){let M={};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"skin":M.id=a(L.getAttribute("source")),M.skin=ut(L);break;case"morph":M.id=a(L.getAttribute("source")),console.warn("THREE.ColladaLoader: Morph target animation not supported yet.");break}}Zt.controllers[S.getAttribute("id")]=M}function ut(S){let M={sources:{}};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"bind_shape_matrix":M.bindShapeMatrix=r(L.textContent);break;case"source":let $=L.getAttribute("id");M.sources[$]=tt(L);break;case"joints":M.joints=ft(L);break;case"vertex_weights":M.vertexWeights=Tt(L);break}}return M}function ft(S){let M={inputs:{}};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"input":let $=L.getAttribute("semantic"),it=a(L.getAttribute("source"));M.inputs[$]=it;break}}return M}function Tt(S){let M={inputs:{}};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"input":let $=L.getAttribute("semantic"),it=a(L.getAttribute("source")),Ct=parseInt(L.getAttribute("offset"));M.inputs[$]={id:it,offset:Ct};break;case"vcount":M.vcount=o(L.textContent);break;case"v":M.v=o(L.textContent);break}}return M}function wt(S){let M={id:S.id},I=Zt.geometries[M.id];return S.skin!==void 0&&(M.skin=q(S.skin),I.sources.skinIndices=M.skin.indices,I.sources.skinWeights=M.skin.weights),M}function q(S){let I={joints:[],indices:{array:[],stride:4},weights:{array:[],stride:4}},R=S.sources,L=S.vertexWeights,$=L.vcount,it=L.v,Ct=L.inputs.JOINT.offset,gt=L.inputs.WEIGHT.offset,St=S.sources[S.joints.inputs.JOINT],Ut=S.sources[S.joints.inputs.INV_BIND_MATRIX],ct=R[L.inputs.WEIGHT.id].array,Ft=0,Dt,qt,Vt;for(Dt=0,Vt=$.length;Dt<Vt;Dt++){let Se=$[Dt],ve=[];for(qt=0;qt<Se;qt++){let Me=it[Ft+Ct],zi=it[Ft+gt],zn=ct[zi];ve.push({index:Me,weight:zn}),Ft+=2}for(ve.sort(je),qt=0;qt<4;qt++){let Me=ve[qt];Me!==void 0?(I.indices.array.push(Me.index),I.weights.array.push(Me.weight)):(I.indices.array.push(0),I.weights.array.push(0))}}for(S.bindShapeMatrix?I.bindMatrix=new Ht().fromArray(S.bindShapeMatrix).transpose():I.bindMatrix=new Ht().identity(),Dt=0,Vt=St.array.length;Dt<Vt;Dt++){let Se=St.array[Dt],ve=new Ht().fromArray(Ut.array,Dt*Ut.stride).transpose();I.joints.push({name:Se,boneInverse:ve})}return I;function je(Se,ve){return ve.weight-Se.weight}}function Q(S){return x(Zt.controllers[S],wt)}function et(S){let M={init_from:i(S,"init_from")[0].textContent};Zt.images[S.getAttribute("id")]=M}function nt(S){return S.build!==void 0?S.build:S.init_from}function _t(S){let M=Zt.images[S];return M!==void 0?x(M,nt):(console.warn("THREE.ColladaLoader: Couldn't find image with ID:",S),null)}function Qt(S){let M={};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"profile_COMMON":M.profile=Gt(L);break}}Zt.effects[S.getAttribute("id")]=M}function Gt(S){let M={surfaces:{},samplers:{}};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"newparam":Je(L,M);break;case"technique":M.technique=z(L);break;case"extra":M.extra=Bt(L);break}}return M}function Je(S,M){let I=S.getAttribute("sid");for(let R=0,L=S.childNodes.length;R<L;R++){let $=S.childNodes[R];if($.nodeType===1)switch($.nodeName){case"surface":M.surfaces[I]=ke($);break;case"sampler2D":M.samplers[I]=fe($);break}}}function ke(S){let M={};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"init_from":M.init_from=L.textContent;break}}return M}function fe(S){let M={};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"source":M.source=L.textContent;break}}return M}function z(S){let M={};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"constant":case"lambert":case"blinn":case"phong":M.type=L.nodeName,M.parameters=On(L);break;case"extra":M.extra=Bt(L);break}}return M}function On(S){let M={};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"emission":case"diffuse":case"specular":case"bump":case"ambient":case"shininess":case"transparency":M[L.nodeName]=he(L);break;case"transparent":M[L.nodeName]={opaque:L.hasAttribute("opaque")?L.getAttribute("opaque"):"A_ONE",data:he(L)};break}}return M}function he(S){let M={};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"color":M[L.nodeName]=r(L.textContent);break;case"float":M[L.nodeName]=parseFloat(L.textContent);break;case"texture":M[L.nodeName]={id:L.getAttribute("texture"),extra:ue(L)};break}}return M}function ue(S){let M={technique:{}};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"extra":kt(L,M);break}}return M}function kt(S,M){for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"technique":Re(L,M);break}}}function Re(S,M){for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"repeatU":case"repeatV":case"offsetU":case"offsetV":M.technique[L.nodeName]=parseFloat(L.textContent);break;case"wrapU":case"wrapV":L.textContent.toUpperCase()==="TRUE"?M.technique[L.nodeName]=1:L.textContent.toUpperCase()==="FALSE"?M.technique[L.nodeName]=0:M.technique[L.nodeName]=parseInt(L.textContent);break;case"bump":M[L.nodeName]=C(L);break}}}function Bt(S){let M={};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"technique":M.technique=U(L);break}}return M}function U(S){let M={};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"double_sided":M[L.nodeName]=parseInt(L.textContent);break;case"bump":M[L.nodeName]=C(L);break}}return M}function C(S){let M={};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"texture":M[L.nodeName]={id:L.getAttribute("texture"),texcoord:L.getAttribute("texcoord"),extra:ue(L)};break}}return M}function J(S){return S}function ot(S){return x(Zt.effects[S],J)}function lt(S){let M={name:S.getAttribute("name")};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"instance_effect":M.url=a(L.getAttribute("url"));break}}Zt.materials[S.getAttribute("id")]=M}function rt(S){let M,I=S.slice((S.lastIndexOf(".")-1>>>0)+2);switch(I=I.toLowerCase(),I){case"tga":M=wn;break;default:M=In}return M}function Nt(S){let M=ot(S.url),I=M.profile.technique,R;switch(I.type){case"phong":case"blinn":R=new vn;break;case"lambert":R=new Go;break;default:R=new ai;break}R.name=S.name||"";function L(gt,St=null){let Ut=M.profile.samplers[gt.id],ct=null;if(Ut!==void 0){let Ft=M.profile.surfaces[Ut.source];ct=_t(Ft.init_from)}else console.warn("THREE.ColladaLoader: Undefined sampler. Access image directly (see #12530)."),ct=_t(gt.id);if(ct!==null){let Ft=rt(ct);if(Ft!==void 0){let Dt=Ft.load(ct),qt=gt.extra;if(qt!==void 0&&qt.technique!==void 0&&c(qt.technique)===!1){let Vt=qt.technique;Dt.wrapS=Vt.wrapU?Zi:$n,Dt.wrapT=Vt.wrapV?Zi:$n,Dt.offset.set(Vt.offsetU||0,Vt.offsetV||0),Dt.repeat.set(Vt.repeatU||1,Vt.repeatV||1)}else Dt.wrapS=Zi,Dt.wrapT=Zi;return St!==null&&(Dt.colorSpace=St),Dt}else return console.warn("THREE.ColladaLoader: Loader for texture %s not found.",ct),null}else return console.warn("THREE.ColladaLoader: Couldn't create texture with ID:",gt.id),null}let $=I.parameters;for(let gt in $){let St=$[gt];switch(gt){case"diffuse":St.color&&R.color.fromArray(St.color),St.texture&&(R.map=L(St.texture,Ae));break;case"specular":St.color&&R.specular&&R.specular.fromArray(St.color),St.texture&&(R.specularMap=L(St.texture));break;case"bump":St.texture&&(R.normalMap=L(St.texture));break;case"ambient":St.texture&&(R.lightMap=L(St.texture,Ae));break;case"shininess":St.float&&R.shininess&&(R.shininess=St.float);break;case"emission":St.color&&R.emissive&&R.emissive.fromArray(St.color),St.texture&&(R.emissiveMap=L(St.texture,Ae));break}}le.toWorkingColorSpace(R.color,Ae),R.specular&&le.toWorkingColorSpace(R.specular,Ae),R.emissive&&le.toWorkingColorSpace(R.emissive,Ae);let it=$.transparent,Ct=$.transparency;if(Ct===void 0&&it&&(Ct={float:1}),it===void 0&&Ct&&(it={opaque:"A_ONE",data:{color:[1,1,1,1]}}),it&&Ct)if(it.data.texture)R.transparent=!0;else{let gt=it.data.color;switch(it.opaque){case"A_ONE":R.opacity=gt[3]*Ct.float;break;case"RGB_ZERO":R.opacity=1-gt[0]*Ct.float;break;case"A_ZERO":R.opacity=1-gt[3]*Ct.float;break;case"RGB_ONE":R.opacity=gt[0]*Ct.float;break;default:console.warn('THREE.ColladaLoader: Invalid opaque type "%s" of transparent tag.',it.opaque)}R.opacity<1&&(R.transparent=!0)}if(I.extra!==void 0&&I.extra.technique!==void 0){let gt=I.extra.technique;for(let St in gt){let Ut=gt[St];switch(St){case"double_sided":R.side=Ut===1?Xn:xi;break;case"bump":R.normalMap=L(Ut.texture),R.normalScale=new Ot(1,1);break}}}return R}function Mt(S){return x(Zt.materials[S],Nt)}function Rt(S){let M={name:S.getAttribute("name")};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"optics":M.optics=me(L);break}}Zt.cameras[S.getAttribute("id")]=M}function me(S){for(let M=0;M<S.childNodes.length;M++){let I=S.childNodes[M];switch(I.nodeName){case"technique_common":return mt(I)}}return{}}function mt(S){let M={};for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];switch(R.nodeName){case"perspective":case"orthographic":M.technique=R.nodeName,M.parameters=Pt(R);break}}return M}function Pt(S){let M={};for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];switch(R.nodeName){case"xfov":case"yfov":case"xmag":case"ymag":case"znear":case"zfar":case"aspect_ratio":M[R.nodeName]=parseFloat(R.textContent);break}}return M}function Xt(S){let M;switch(S.optics.technique){case"perspective":M=new Ke(S.optics.parameters.yfov,S.optics.parameters.aspect_ratio,S.optics.parameters.znear,S.optics.parameters.zfar);break;case"orthographic":let I=S.optics.parameters.ymag,R=S.optics.parameters.xmag,L=S.optics.parameters.aspect_ratio;R=R===void 0?I*L:R,I=I===void 0?R/L:I,R*=.5,I*=.5,M=new Js(-R,R,I,-I,S.optics.parameters.znear,S.optics.parameters.zfar);break;default:M=new Ke;break}return M.name=S.name||"",M}function jt(S){let M=Zt.cameras[S];return M!==void 0?x(M,Xt):(console.warn("THREE.ColladaLoader: Couldn't find camera with ID:",S),null)}function It(S){let M={};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"technique_common":M=pe(L);break}}Zt.lights[S.getAttribute("id")]=M}function pe(S){let M={};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"directional":case"point":case"spot":case"ambient":M.technique=L.nodeName,M.parameters=ne(L)}}return M}function ne(S){let M={};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"color":let $=r(L.textContent);M.color=new Jt().fromArray($),le.toWorkingColorSpace(M.color,Ae);break;case"falloff_angle":M.falloffAngle=parseFloat(L.textContent);break;case"quadratic_attenuation":let it=parseFloat(L.textContent);M.distance=it?Math.sqrt(1/it):0;break}}return M}function be(S){let M;switch(S.technique){case"directional":M=new Zs;break;case"point":M=new Zo;break;case"spot":M=new Jo;break;case"ambient":M=new js;break}return S.parameters.color&&M.color.copy(S.parameters.color),S.parameters.distance&&(M.distance=S.parameters.distance),M}function G(S){let M=Zt.lights[S];return M!==void 0?x(M,be):(console.warn("THREE.ColladaLoader: Couldn't find light with ID:",S),null)}function vt(S){let M={name:S.getAttribute("name"),sources:{},vertices:{},primitives:[]},I=i(S,"mesh")[0];if(I!==void 0){for(let R=0;R<I.childNodes.length;R++){let L=I.childNodes[R];if(L.nodeType!==1)continue;let $=L.getAttribute("id");switch(L.nodeName){case"source":M.sources[$]=tt(L);break;case"vertices":M.vertices=at(L);break;case"polygons":console.warn("THREE.ColladaLoader: Unsupported primitive type: ",L.nodeName);break;case"lines":case"linestrips":case"polylist":case"triangles":M.primitives.push(Et(L));break;default:console.log(L)}}Zt.geometries[S.getAttribute("id")]=M}}function tt(S){let M={array:[],stride:3};for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];if(R.nodeType===1)switch(R.nodeName){case"float_array":M.array=r(R.textContent);break;case"Name_array":M.array=s(R.textContent);break;case"technique_common":let L=i(R,"accessor")[0];L!==void 0&&(M.stride=parseInt(L.getAttribute("stride")));break}}return M}function at(S){let M={};for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];R.nodeType===1&&(M[R.getAttribute("semantic")]=a(R.getAttribute("source")))}return M}function Et(S){let M={type:S.nodeName,material:S.getAttribute("material"),count:parseInt(S.getAttribute("count")),inputs:{},stride:0,hasUV:!1};for(let I=0,R=S.childNodes.length;I<R;I++){let L=S.childNodes[I];if(L.nodeType===1)switch(L.nodeName){case"input":let $=a(L.getAttribute("source")),it=L.getAttribute("semantic"),Ct=parseInt(L.getAttribute("offset")),gt=parseInt(L.getAttribute("set")),St=gt>0?it+gt:it;M.inputs[St]={id:$,offset:Ct},M.stride=Math.max(M.stride,Ct+1),it==="TEXCOORD"&&(M.hasUV=!0);break;case"vcount":M.vcount=o(L.textContent);break;case"p":M.p=o(L.textContent);break}}return M}function bt(S){let M={};for(let I=0;I<S.length;I++){let R=S[I];M[R.type]===void 0&&(M[R.type]=[]),M[R.type].push(R)}return M}function te(S){let M=0;for(let I=0,R=S.length;I<R;I++)S[I].hasUV===!0&&M++;M>0&&M<S.length&&(S.uvsNeedsFix=!0)}function ze(S){let M={},I=S.sources,R=S.vertices,L=S.primitives;if(L.length===0)return{};let $=bt(L);for(let it in $){let Ct=$[it];te(Ct),M[it]=pn(Ct,I,R)}return M}function pn(S,M,I){let R={},L={array:[],stride:0},$={array:[],stride:0},it={array:[],stride:0},Ct={array:[],stride:0},gt={array:[],stride:0},St={array:[],stride:4},Ut={array:[],stride:4},ct=new Xe,Ft=[],Dt=0;for(let qt=0;qt<S.length;qt++){let Vt=S[qt],je=Vt.inputs,Se=0;switch(Vt.type){case"lines":case"linestrips":Se=Vt.count*2;break;case"triangles":Se=Vt.count*3;break;case"polylist":for(let ve=0;ve<Vt.count;ve++){let Me=Vt.vcount[ve];switch(Me){case 3:Se+=3;break;case 4:Se+=6;break;default:Se+=(Me-2)*3;break}}break;default:console.warn("THREE.ColladaLoader: Unknown primitive type:",Vt.type)}ct.addGroup(Dt,Se,qt),Dt+=Se,Vt.material&&Ft.push(Vt.material);for(let ve in je){let Me=je[ve];switch(ve){case"VERTEX":for(let zi in I){let zn=I[zi];switch(zi){case"POSITION":let Sr=L.array.length;if(se(Vt,M[zn],Me.offset,L.array),L.stride=M[zn].stride,M.skinWeights&&M.skinIndices&&(se(Vt,M.skinIndices,Me.offset,St.array),se(Vt,M.skinWeights,Me.offset,Ut.array)),Vt.hasUV===!1&&S.uvsNeedsFix===!0){let q0=(L.array.length-Sr)/L.stride;for(let Cf=0;Cf<q0;Cf++)it.array.push(0,0)}break;case"NORMAL":se(Vt,M[zn],Me.offset,$.array),$.stride=M[zn].stride;break;case"COLOR":se(Vt,M[zn],Me.offset,gt.array),gt.stride=M[zn].stride;break;case"TEXCOORD":se(Vt,M[zn],Me.offset,it.array),it.stride=M[zn].stride;break;case"TEXCOORD1":se(Vt,M[zn],Me.offset,Ct.array),it.stride=M[zn].stride;break;default:console.warn('THREE.ColladaLoader: Semantic "%s" not handled in geometry build process.',zi)}}break;case"NORMAL":se(Vt,M[Me.id],Me.offset,$.array),$.stride=M[Me.id].stride;break;case"COLOR":se(Vt,M[Me.id],Me.offset,gt.array,!0),gt.stride=M[Me.id].stride;break;case"TEXCOORD":se(Vt,M[Me.id],Me.offset,it.array),it.stride=M[Me.id].stride;break;case"TEXCOORD1":se(Vt,M[Me.id],Me.offset,Ct.array),Ct.stride=M[Me.id].stride;break}}}return L.array.length>0&&ct.setAttribute("position",new ee(L.array,L.stride)),$.array.length>0&&ct.setAttribute("normal",new ee($.array,$.stride)),gt.array.length>0&&ct.setAttribute("color",new ee(gt.array,gt.stride)),it.array.length>0&&ct.setAttribute("uv",new ee(it.array,it.stride)),Ct.array.length>0&&ct.setAttribute("uv1",new ee(Ct.array,Ct.stride)),St.array.length>0&&ct.setAttribute("skinIndex",new ee(St.array,St.stride)),Ut.array.length>0&&ct.setAttribute("skinWeight",new ee(Ut.array,Ut.stride)),R.data=ct,R.type=S[0].type,R.materialKeys=Ft,R}function se(S,M,I,R,L=!1){let $=S.p,it=S.stride,Ct=S.vcount;function gt(ct){let Ft=$[ct+I]*Ut,Dt=Ft+Ut;for(;Ft<Dt;Ft++)R.push(St[Ft]);if(L){let qt=R.length-Ut-1;tn.setRGB(R[qt+0],R[qt+1],R[qt+2],Ae),R[qt+0]=tn.r,R[qt+1]=tn.g,R[qt+2]=tn.b}}let St=M.array,Ut=M.stride;if(S.vcount!==void 0){let ct=0;for(let Ft=0,Dt=Ct.length;Ft<Dt;Ft++){let qt=Ct[Ft];if(qt===4){let Vt=ct+it*0,je=ct+it*1,Se=ct+it*2,ve=ct+it*3;gt(Vt),gt(je),gt(ve),gt(je),gt(Se),gt(ve)}else if(qt===3){let Vt=ct+it*0,je=ct+it*1,Se=ct+it*2;gt(Vt),gt(je),gt(Se)}else if(qt>4)for(let Vt=1,je=qt-2;Vt<=je;Vt++){let Se=ct+it*0,ve=ct+it*Vt,Me=ct+it*(Vt+1);gt(Se),gt(ve),gt(Me)}ct+=it*qt}}else for(let ct=0,Ft=$.length;ct<Ft;ct+=it)gt(ct)}function Bn(S){return x(Zt.geometries[S],ze)}function ui(S){let M={name:S.getAttribute("name")||"",joints:{},links:[]};for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];if(R.nodeType===1)switch(R.nodeName){case"technique_common":Bi(R,M);break}}Zt.kinematicsModels[S.getAttribute("id")]=M}function Va(S){return S.build!==void 0?S.build:S}function Ha(S){return x(Zt.kinematicsModels[S],Va)}function Bi(S,M){for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];if(R.nodeType===1)switch(R.nodeName){case"joint":M.joints[R.getAttribute("sid")]=fo(R);break;case"link":M.links.push(po(R));break}}}function fo(S){let M;for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];if(R.nodeType===1)switch(R.nodeName){case"prismatic":case"revolute":M=Ga(R);break}}return M}function Ga(S){let M={sid:S.getAttribute("sid"),name:S.getAttribute("name")||"",axis:new F,limits:{min:0,max:0},type:S.nodeName,static:!1,zeroPosition:0,middlePosition:0};for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];if(R.nodeType===1)switch(R.nodeName){case"axis":let L=r(R.textContent);M.axis.fromArray(L);break;case"limits":let $=R.getElementsByTagName("max")[0],it=R.getElementsByTagName("min")[0];M.limits.max=parseFloat($.textContent),M.limits.min=parseFloat(it.textContent);break}}return M.limits.min>=M.limits.max&&(M.static=!0),M.middlePosition=(M.limits.min+M.limits.max)/2,M}function po(S){let M={sid:S.getAttribute("sid"),name:S.getAttribute("name")||"",attachments:[],transforms:[]};for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];if(R.nodeType===1)switch(R.nodeName){case"attachment_full":M.attachments.push(vr(R));break;case"matrix":case"translate":case"rotate":M.transforms.push(mo(R));break}}return M}function vr(S){let M={joint:S.getAttribute("joint").split("/").pop(),transforms:[],links:[]};for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];if(R.nodeType===1)switch(R.nodeName){case"link":M.links.push(po(R));break;case"matrix":case"translate":case"rotate":M.transforms.push(mo(R));break}}return M}function mo(S){let M={type:S.nodeName},I=r(S.textContent);switch(M.type){case"matrix":M.obj=new Ht,M.obj.fromArray(I).transpose();break;case"translate":M.obj=new F,M.obj.fromArray(I);break;case"rotate":M.obj=new F,M.obj.fromArray(I),M.angle=nn.degToRad(I[3]);break}return M}function Mr(S){let M={name:S.getAttribute("name")||"",rigidBodies:{}};for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];if(R.nodeType===1)switch(R.nodeName){case"rigid_body":M.rigidBodies[R.getAttribute("name")]={},Wa(R,M.rigidBodies[R.getAttribute("name")]);break}}Zt.physicsModels[S.getAttribute("id")]=M}function Wa(S,M){for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];if(R.nodeType===1)switch(R.nodeName){case"technique_common":Xa(R,M);break}}}function Xa(S,M){for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];if(R.nodeType===1)switch(R.nodeName){case"inertia":M.inertia=r(R.textContent);break;case"mass":M.mass=r(R.textContent)[0];break}}}function Jh(S){let M={bindJointAxis:[]};for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];if(R.nodeType===1)switch(R.nodeName){case"bind_joint_axis":M.bindJointAxis.push(Zh(R));break}}Zt.kinematicsScenes[a(S.getAttribute("url"))]=M}function Zh(S){let M={target:S.getAttribute("target").split("/").pop()};for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];if(R.nodeType===1)switch(R.nodeName){case"axis":let L=R.getElementsByTagName("param")[0];M.axis=L.textContent;let $=M.axis.split("inst_").pop().split("axis")[0];M.jointIndex=$.substring(0,$.length-1);break}}return M}function jh(S){return S.build!==void 0?S.build:S}function $h(S){return x(Zt.kinematicsScenes[S],jh)}function Kh(){let S=Object.keys(Zt.kinematicsModels)[0],M=Object.keys(Zt.kinematicsScenes)[0],I=Object.keys(Zt.visualScenes)[0];if(S===void 0||M===void 0)return;let R=Ha(S),L=$h(M),$=ge(I),it=L.bindJointAxis,Ct={};for(let Ut=0,ct=it.length;Ut<ct;Ut++){let Ft=it[Ut],Dt=De.querySelector('[sid="'+Ft.target+'"]');if(Dt){let qt=Dt.parentElement;gt(Ft.jointIndex,qt)}}function gt(Ut,ct){let Ft=ct.getAttribute("name"),Dt=R.joints[Ut];$.traverse(function(qt){qt.name===Ft&&(Ct[Ut]={object:qt,transforms:Qh(ct),joint:Dt,position:Dt.zeroPosition})})}let St=new Ht;br={joints:R&&R.joints,getJointValue:function(Ut){let ct=Ct[Ut];if(ct)return ct.position;console.warn("THREE.ColladaLoader: Joint "+Ut+" doesn't exist.")},setJointValue:function(Ut,ct){let Ft=Ct[Ut];if(Ft){let Dt=Ft.joint;if(ct>Dt.limits.max||ct<Dt.limits.min)console.warn("THREE.ColladaLoader: Joint "+Ut+" value "+ct+" outside of limits (min: "+Dt.limits.min+", max: "+Dt.limits.max+").");else if(Dt.static)console.warn("THREE.ColladaLoader: Joint "+Ut+" is static.");else{let qt=Ft.object,Vt=Dt.axis,je=Ft.transforms;H.identity();for(let Se=0;Se<je.length;Se++){let ve=je[Se];if(ve.sid&&ve.sid.indexOf(Ut)!==-1)switch(Dt.type){case"revolute":H.multiply(St.makeRotationAxis(Vt,nn.degToRad(ct)));break;case"prismatic":H.multiply(St.makeTranslation(Vt.x*ct,Vt.y*ct,Vt.z*ct));break;default:console.warn("THREE.ColladaLoader: Unknown joint type: "+Dt.type);break}else switch(ve.type){case"matrix":H.multiply(ve.obj);break;case"translate":H.multiply(St.makeTranslation(ve.obj.x,ve.obj.y,ve.obj.z));break;case"scale":H.scale(ve.obj);break;case"rotate":H.multiply(St.makeRotationAxis(ve.obj,ve.angle));break}}qt.matrix.copy(H),qt.matrix.decompose(qt.position,qt.quaternion,qt.scale),Ct[Ut].position=ct}}else console.log("THREE.ColladaLoader: "+Ut+" does not exist.")}}}function Qh(S){let M=[],I=De.querySelector('[id="'+S.id+'"]');for(let R=0;R<I.childNodes.length;R++){let L=I.childNodes[R];if(L.nodeType!==1)continue;let $,it;switch(L.nodeName){case"matrix":$=r(L.textContent);let Ct=new Ht().fromArray($).transpose();M.push({sid:L.getAttribute("sid"),type:L.nodeName,obj:Ct});break;case"translate":case"scale":$=r(L.textContent),it=new F().fromArray($),M.push({sid:L.getAttribute("sid"),type:L.nodeName,obj:it});break;case"rotate":$=r(L.textContent),it=new F().fromArray($);let gt=nn.degToRad($[3]);M.push({sid:L.getAttribute("sid"),type:L.nodeName,obj:it,angle:gt});break}}return M}function P(S){let M=S.getElementsByTagName("node");for(let I=0;I<M.length;I++){let R=M[I];R.hasAttribute("id")===!1&&R.setAttribute("id",l())}}let H=new Ht,Z=new F;function j(S){let M={name:S.getAttribute("name")||"",type:S.getAttribute("type"),id:S.getAttribute("id"),sid:S.getAttribute("sid"),matrix:new Ht,nodes:[],instanceCameras:[],instanceControllers:[],instanceLights:[],instanceGeometries:[],instanceNodes:[],transforms:{}};for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];if(R.nodeType!==1)continue;let L;switch(R.nodeName){case"node":M.nodes.push(R.getAttribute("id")),j(R);break;case"instance_camera":M.instanceCameras.push(a(R.getAttribute("url")));break;case"instance_controller":M.instanceControllers.push(W(R));break;case"instance_light":M.instanceLights.push(a(R.getAttribute("url")));break;case"instance_geometry":M.instanceGeometries.push(W(R));break;case"instance_node":M.instanceNodes.push(a(R.getAttribute("url")));break;case"matrix":L=r(R.textContent),M.matrix.multiply(H.fromArray(L).transpose()),M.transforms[R.getAttribute("sid")]=R.nodeName;break;case"translate":L=r(R.textContent),Z.fromArray(L),M.matrix.multiply(H.makeTranslation(Z.x,Z.y,Z.z)),M.transforms[R.getAttribute("sid")]=R.nodeName;break;case"rotate":L=r(R.textContent);let $=nn.degToRad(L[3]);M.matrix.multiply(H.makeRotationAxis(Z.fromArray(L),$)),M.transforms[R.getAttribute("sid")]=R.nodeName;break;case"scale":L=r(R.textContent),M.matrix.scale(Z.fromArray(L)),M.transforms[R.getAttribute("sid")]=R.nodeName;break;case"extra":break;default:console.log(R)}}return zt(M.id)?console.warn("THREE.ColladaLoader: There is already a node with ID %s. Exclude current node from further processing.",M.id):Zt.nodes[M.id]=M,M}function W(S){let M={id:a(S.getAttribute("url")),materials:{},skeletons:[]};for(let I=0;I<S.childNodes.length;I++){let R=S.childNodes[I];switch(R.nodeName){case"bind_material":let L=R.getElementsByTagName("instance_material");for(let $=0;$<L.length;$++){let it=L[$],Ct=it.getAttribute("symbol"),gt=it.getAttribute("target");M.materials[Ct]=a(gt)}break;case"skeleton":M.skeletons.push(a(R.textContent));break;default:break}}return M}function pt(S,M){let I=[],R=[],L,$,it;for(L=0;L<S.length;L++){let St=S[L],Ut;if(zt(St))Ut=re(St),yt(Ut,M,I);else if(He(St)){let Ft=Zt.visualScenes[St].children;for(let Dt=0;Dt<Ft.length;Dt++){let qt=Ft[Dt];if(qt.type==="JOINT"){let Vt=re(qt.id);yt(Vt,M,I)}}}else console.error("THREE.ColladaLoader: Unable to find root bone of skeleton with ID:",St)}for(L=0;L<M.length;L++)for($=0;$<I.length;$++)if(it=I[$],it.bone.name===M[L].name){R[L]=it,it.processed=!0;break}for(L=0;L<I.length;L++)it=I[L],it.processed===!1&&(R.push(it),it.processed=!0);let Ct=[],gt=[];for(L=0;L<R.length;L++)it=R[L],Ct.push(it.bone),gt.push(it.boneInverse);return new Bo(Ct,gt)}function yt(S,M,I){S.traverse(function(R){if(R.isBone===!0){let L;for(let $=0;$<M.length;$++){let it=M[$];if(it.name===R.name){L=it.boneInverse;break}}L===void 0&&(L=new Ht),I.push({bone:R,boneInverse:L,processed:!1})}})}function At(S){let M=[],I=S.matrix,R=S.nodes,L=S.type,$=S.instanceCameras,it=S.instanceControllers,Ct=S.instanceLights,gt=S.instanceGeometries,St=S.instanceNodes;for(let ct=0,Ft=R.length;ct<Ft;ct++)M.push(re(R[ct]));for(let ct=0,Ft=$.length;ct<Ft;ct++){let Dt=jt($[ct]);Dt!==null&&M.push(Dt.clone())}for(let ct=0,Ft=it.length;ct<Ft;ct++){let Dt=it[ct],qt=Q(Dt.id),Vt=Bn(qt.id),je=Kt(Vt,Dt.materials),Se=Dt.skeletons,ve=qt.skin.joints,Me=pt(Se,ve);for(let zi=0,zn=je.length;zi<zn;zi++){let Sr=je[zi];Sr.isSkinnedMesh&&(Sr.bind(Me,qt.skin.bindMatrix),Sr.normalizeSkinWeights()),M.push(Sr)}}for(let ct=0,Ft=Ct.length;ct<Ft;ct++){let Dt=G(Ct[ct]);Dt!==null&&M.push(Dt.clone())}for(let ct=0,Ft=gt.length;ct<Ft;ct++){let Dt=gt[ct],qt=Bn(Dt.id),Vt=Kt(qt,Dt.materials);for(let je=0,Se=Vt.length;je<Se;je++)M.push(Vt[je])}for(let ct=0,Ft=St.length;ct<Ft;ct++)M.push(re(St[ct]).clone());let Ut;if(R.length===0&&M.length===1)Ut=M[0];else{Ut=L==="JOINT"?new Vr:new Hn;for(let ct=0;ct<M.length;ct++)Ut.add(M[ct])}return Ut.name=L==="JOINT"?S.sid:S.name,Ut.matrix.copy(I),Ut.matrix.decompose(Ut.position,Ut.quaternion,Ut.scale),Ut}let Lt=new ai({name:ei.DEFAULT_MATERIAL_NAME,color:16711935});function $t(S,M){let I=[];for(let R=0,L=S.length;R<L;R++){let $=M[S[R]];$===void 0?(console.warn("THREE.ColladaLoader: Material with key %s not found. Apply fallback material.",S[R]),I.push(Lt)):I.push(Mt($))}return I}function Kt(S,M){let I=[];for(let R in S){let L=S[R],$=$t(L.materialKeys,M);if($.length===0&&(R==="lines"||R==="linestrips"?$.push(new Ri):$.push(new vn)),R==="lines"||R==="linestrips")for(let St=0,Ut=$.length;St<Ut;St++){let ct=$[St];if(ct.isMeshPhongMaterial===!0||ct.isMeshLambertMaterial===!0){let Ft=new Ri;Ft.color.copy(ct.color),Ft.opacity=ct.opacity,Ft.transparent=ct.transparent,$[St]=Ft}}let it=L.data.attributes.skinIndex!==void 0,Ct=$.length===1?$[0]:$,gt;switch(R){case"lines":gt=new ko(L.data,Ct);break;case"linestrips":gt=new Cn(L.data,Ct);break;case"triangles":case"polylist":it?gt=new Uo(L.data,Ct):gt=new dt(L.data,Ct);break}I.push(gt)}return I}function zt(S){return Zt.nodes[S]!==void 0}function re(S){return x(Zt.nodes[S],At)}function _e(S){let M={name:S.getAttribute("name"),children:[]};P(S);let I=i(S,"node");for(let R=0;R<I.length;R++)M.children.push(j(I[R]));Zt.visualScenes[S.getAttribute("id")]=M}function Ze(S){let M=new Hn;M.name=S.name;let I=S.children;for(let R=0;R<I.length;R++){let L=I[R];M.add(re(L.id))}return M}function He(S){return Zt.visualScenes[S]!==void 0}function ge(S){return x(Zt.visualScenes[S],Ze)}function Wt(S){let M=i(S,"instance_visual_scene")[0];return ge(a(M.getAttribute("url")))}function an(){let S=Zt.clips;if(c(S)===!0){if(c(Zt.animations)===!1){let M=[];for(let I in Zt.animations){let R=_(I);for(let L=0,$=R.length;L<$;L++)M.push(R[L])}ln.push(new Gr("default",-1,M))}}else for(let M in S)ln.push(X(M))}function ye(S){let M="",I=[S];for(;I.length;){let R=I.shift();R.nodeType===Node.TEXT_NODE?M+=R.textContent:(M+=`
`,I.push.apply(I,R.childNodes))}return M.trim()}if(t.length===0)return{scene:new Gs};let kn=new DOMParser().parseFromString(t,"application/xml"),De=i(kn,"COLLADA")[0],yn=kn.getElementsByTagName("parsererror")[0];if(yn!==void 0){let S=i(yn,"div")[0],M;return S?M=S.textContent:M=ye(yn),console.error(`THREE.ColladaLoader: Failed to parse collada file.
`,M),null}let Is=De.getAttribute("version");console.debug("THREE.ColladaLoader: File version",Is);let Pe=h(i(De,"asset")[0]),In=new qs(this.manager);In.setPath(this.resourcePath||e).setCrossOrigin(this.crossOrigin);let wn;ha&&(wn=new ha(this.manager),wn.setPath(this.resourcePath||e));let tn=new Jt,ln=[],br={},ki=0,Zt={animations:{},clips:{},controllers:{},images:{},effects:{},materials:{},cameras:{},lights:{},geometries:{},nodes:{},visualScenes:{},kinematicsModels:{},physicsModels:{},kinematicsScenes:{}};f(De,"library_animations","animation",m),f(De,"library_animation_clips","animation_clip",k),f(De,"library_controllers","controller",st),f(De,"library_images","image",et),f(De,"library_effects","effect",Qt),f(De,"library_materials","material",lt),f(De,"library_cameras","camera",Rt),f(De,"library_lights","light",It),f(De,"library_geometries","geometry",vt),f(De,"library_nodes","node",j),f(De,"library_visual_scenes","visual_scene",_e),f(De,"library_kinematics_models","kinematics_model",ui),f(De,"library_physics_models","physics_model",Mr),f(De,"scene","instance_kinematics_scene",Jh),g(Zt.animations,b),g(Zt.clips,K),g(Zt.controllers,wt),g(Zt.images,nt),g(Zt.effects,J),g(Zt.materials,Nt),g(Zt.cameras,Xt),g(Zt.lights,be),g(Zt.geometries,ze),g(Zt.visualScenes,Ze),an(),Kh();let qa=Wt(i(De,"scene")[0]);return qa.animations=ln,Pe.upAxis==="Z_UP"&&(console.warn("THREE.ColladaLoader: You are loading an asset with a Z-UP coordinate system. The loader just rotates the asset to transform it into Y-UP. The vertex data are not converted, see #24289."),qa.rotation.set(-Math.PI/2,0,0)),qa.scale.multiplyScalar(Pe.unit),{get animations(){return console.warn("THREE.ColladaLoader: Please access animations over scene.animations now."),ln},kinematics:br,library:Zt,scene:qa}}};var Fm=new F,I1=new Qe,Hc=new Ht,Ts=new Ht,Gc=new de,Wc=new F(1,1,1),Xc=new F,Qr=class extends Fe{constructor(...t){super(...t),this.urdfNode=null,this.urdfName=""}copy(t,e){return super.copy(t,e),this.urdfNode=t.urdfNode,this.urdfName=t.urdfName,this}},qc=class extends Qr{constructor(...t){super(...t),this.isURDFCollider=!0,this.type="URDFCollider"}},Yc=class extends Qr{constructor(...t){super(...t),this.isURDFVisual=!0,this.type="URDFVisual"}},ua=class extends Qr{constructor(...t){super(...t),this.isURDFLink=!0,this.type="URDFLink"}},da=class extends Qr{get jointType(){return this._jointType}set jointType(t){if(this.jointType!==t)switch(this._jointType=t,this.matrixWorldNeedsUpdate=!0,t){case"fixed":this.jointValue=[];break;case"continuous":case"revolute":case"prismatic":this.jointValue=new Array(1).fill(0);break;case"planar":this.jointValue=new Array(3).fill(0),this.axis=new F(0,0,1);break;case"floating":this.jointValue=new Array(6).fill(0);break}}get angle(){return this.jointValue[0]}constructor(...t){super(...t),this.isURDFJoint=!0,this.type="URDFJoint",this.jointValue=null,this.jointType="fixed",this.axis=new F(1,0,0),this.limit={lower:0,upper:0},this.ignoreLimits=!1,this.origPosition=null,this.origQuaternion=null,this.mimicJoints=[]}copy(t,e){return super.copy(t,e),this.jointType=t.jointType,this.axis=t.axis.clone(),this.limit.lower=t.limit.lower,this.limit.upper=t.limit.upper,this.ignoreLimits=!1,this.jointValue=[...t.jointValue],this.origPosition=t.origPosition?t.origPosition.clone():null,this.origQuaternion=t.origQuaternion?t.origQuaternion.clone():null,this.mimicJoints=[...t.mimicJoints],this}setJointValue(...t){t=t.map(i=>i===null?null:parseFloat(i)),(!this.origPosition||!this.origQuaternion)&&(this.origPosition=this.position.clone(),this.origQuaternion=this.quaternion.clone());let e=!1;switch(this.mimicJoints.forEach(i=>{e=i.updateFromMimickedJoint(...t)||e}),this.jointType){case"fixed":return e;case"continuous":case"revolute":{let i=t[0];return i==null||i===this.jointValue[0]?e:(!this.ignoreLimits&&this.jointType==="revolute"&&(i=Math.min(this.limit.upper,i),i=Math.max(this.limit.lower,i)),this.quaternion.setFromAxisAngle(this.axis,i).premultiply(this.origQuaternion),this.jointValue[0]!==i?(this.jointValue[0]=i,this.matrixWorldNeedsUpdate=!0,!0):e)}case"prismatic":{let i=t[0];return i==null||i===this.jointValue[0]?e:(this.ignoreLimits||(i=Math.min(this.limit.upper,i),i=Math.max(this.limit.lower,i)),this.position.copy(this.origPosition),Fm.copy(this.axis).applyEuler(this.rotation),this.position.addScaledVector(Fm,i),this.jointValue[0]!==i?(this.jointValue[0]=i,this.matrixWorldNeedsUpdate=!0,!0):e)}case"floating":return this.jointValue.every((i,s)=>t[s]===i||t[s]===null)?e:(this.jointValue[0]=t[0]!==null?t[0]:this.jointValue[0],this.jointValue[1]=t[1]!==null?t[1]:this.jointValue[1],this.jointValue[2]=t[2]!==null?t[2]:this.jointValue[2],this.jointValue[3]=t[3]!==null?t[3]:this.jointValue[3],this.jointValue[4]=t[4]!==null?t[4]:this.jointValue[4],this.jointValue[5]=t[5]!==null?t[5]:this.jointValue[5],Ts.compose(this.origPosition,this.origQuaternion,Wc),Gc.setFromEuler(I1.set(this.jointValue[3],this.jointValue[4],this.jointValue[5],"XYZ")),Xc.set(this.jointValue[0],this.jointValue[1],this.jointValue[2]),Hc.compose(Xc,Gc,Wc),Ts.premultiply(Hc),this.position.setFromMatrixPosition(Ts),this.rotation.setFromRotationMatrix(Ts),this.matrixWorldNeedsUpdate=!0,!0);case"planar":return this.jointValue.every((i,s)=>t[s]===i||t[s]===null)?e:(this.jointValue[0]=t[0]!==null?t[0]:this.jointValue[0],this.jointValue[1]=t[1]!==null?t[1]:this.jointValue[1],this.jointValue[2]=t[2]!==null?t[2]:this.jointValue[2],Ts.compose(this.origPosition,this.origQuaternion,Wc),Gc.setFromAxisAngle(this.axis,this.jointValue[2]),Xc.set(this.jointValue[0],this.jointValue[1],0),Hc.compose(Xc,Gc,Wc),Ts.premultiply(Hc),this.position.setFromMatrixPosition(Ts),this.rotation.setFromRotationMatrix(Ts),this.matrixWorldNeedsUpdate=!0,!0)}return e}},fa=class extends da{constructor(...t){super(...t),this.type="URDFMimicJoint",this.mimicJoint=null,this.offset=0,this.multiplier=1}updateFromMimickedJoint(...t){let e=t.map(i=>i*this.multiplier+this.offset);return super.setJointValue(...e)}copy(t,e){return super.copy(t,e),this.mimicJoint=t.mimicJoint,this.offset=t.offset,this.multiplier=t.multiplier,this}},Jc=class extends ua{constructor(...t){super(...t),this.isURDFRobot=!0,this.urdfNode=null,this.urdfRobotNode=null,this.robotName=null,this.links=null,this.joints=null,this.colliders=null,this.visual=null,this.frames=null}copy(t,e){super.copy(t,e),this.urdfRobotNode=t.urdfRobotNode,this.robotName=t.robotName,this.links={},this.joints={},this.colliders={},this.visual={},this.traverse(i=>{i.isURDFJoint&&i.urdfName in t.joints&&(this.joints[i.urdfName]=i),i.isURDFLink&&i.urdfName in t.links&&(this.links[i.urdfName]=i),i.isURDFCollider&&i.urdfName in t.colliders&&(this.colliders[i.urdfName]=i),i.isURDFVisual&&i.urdfName in t.visual&&(this.visual[i.urdfName]=i)});for(let i in this.joints)this.joints[i].mimicJoints=this.joints[i].mimicJoints.map(s=>this.joints[s.name]);return this.frames={...this.colliders,...this.visual,...this.links,...this.joints},this}getFrame(t){return this.frames[t]}setJointValue(t,...e){let i=this.joints[t];return i?i.setJointValue(...e):!1}setJointValues(t){let e=!1;for(let i in t){let s=t[i];Array.isArray(s)?e=this.setJointValue(i,...s)||e:e=this.setJointValue(i,s)||e}return e}};var Ed=new de,Um=new Qe;function to(n){return n?n.trim().split(/\s+/g).map(t=>parseFloat(t)):[0,0,0]}function Om(n,t,e=!1){e||n.rotation.set(0,0,0),Um.set(t[0],t[1],t[2],"ZYX"),Ed.setFromEuler(Um),Ed.multiply(n.quaternion),n.quaternion.copy(Ed)}var pa=class{constructor(t){this.manager=t||Nc,this.loadMeshCb=this.defaultMeshLoader.bind(this),this.parseVisual=!0,this.parseCollision=!1,this.packages="",this.workingPath="",this.fetchOptions={}}loadAsync(t){return new Promise((e,i)=>{this.load(t,e,null,i)})}load(t,e,i,s){let r=this.manager,o=$s.extractUrlBase(t),a=this.manager.resolveURL(t);r.itemStart(a),fetch(a,this.fetchOptions).then(l=>{if(l.ok)return i&&i(null),l.text();throw new Error(`URDFLoader: Failed to load url '${a}' with error code ${l.status} : ${l.statusText}.`)}).then(l=>{let c=this.parse(l,this.workingPath||o);e(c),r.itemEnd(a)}).catch(l=>{s?s(l):console.error("URDFLoader: Error loading file.",l),r.itemError(a),r.itemEnd(a)})}parse(t,e=this.workingPath){let i=this.packages,s=this.loadMeshCb,r=this.parseVisual,o=this.parseCollision,a=this.manager,l={},c={},h={};function d(E){if(!/^package:\/\//.test(E))return e?e+E:E;let[b,_]=E.replace(/^package:\/\//,"").split(/\/(.+)/);if(typeof i=="string")return i.endsWith(b)?i+"/"+_:i+"/"+b+"/"+_;if(i instanceof Function)return i(b)+"/"+_;if(typeof i=="object")return b in i?i[b]+"/"+_:(console.error(`URDFLoader : ${b} not found in provided package list.`),null)}function u(E){let b;E instanceof Document?b=[...E.children]:E instanceof Element?b=[E]:b=[...new DOMParser().parseFromString(E,"text/xml").children];let _=b.filter(T=>T.nodeName==="robot").pop();return f(_)}function f(E){let b=[...E.children],_=b.filter(N=>N.nodeName.toLowerCase()==="link"),T=b.filter(N=>N.nodeName.toLowerCase()==="joint"),A=b.filter(N=>N.nodeName.toLowerCase()==="material"),D=new Jc;D.robotName=E.getAttribute("name"),D.urdfRobotNode=E,A.forEach(N=>{let O=N.getAttribute("name");h[O]=m(N)});let v={},w={};_.forEach(N=>{let O=N.getAttribute("name"),B=E.querySelector(`child[link="${O}"]`)===null;l[O]=x(N,v,w,B?D:null)}),T.forEach(N=>{let O=N.getAttribute("name");c[O]=g(N)}),D.joints=c,D.links=l,D.colliders=w,D.visual=v;let y=Object.values(c);return y.forEach(N=>{N instanceof fa&&c[N.mimicJoint].mimicJoints.push(N)}),y.forEach(N=>{let O=new Set,B=V=>{if(O.has(V))throw new Error("URDFLoader: Detected an infinite loop of mimic joints.");O.add(V),V.mimicJoints.forEach(Y=>{B(Y)})};B(N)}),D.frames={...w,...v,...l,...c},D}function g(E){let b=[...E.children],_=E.getAttribute("type"),T,A=b.find(O=>O.nodeName.toLowerCase()==="mimic");A?(T=new fa,T.mimicJoint=A.getAttribute("joint"),T.multiplier=parseFloat(A.getAttribute("multiplier")||1),T.offset=parseFloat(A.getAttribute("offset")||0)):T=new da,T.urdfNode=E,T.name=E.getAttribute("name"),T.urdfName=T.name,T.jointType=_;let D=null,v=null,w=[0,0,0],y=[0,0,0];b.forEach(O=>{let B=O.nodeName.toLowerCase();B==="origin"?(w=to(O.getAttribute("xyz")),y=to(O.getAttribute("rpy"))):B==="child"?v=l[O.getAttribute("link")]:B==="parent"?D=l[O.getAttribute("link")]:B==="limit"&&(T.limit.lower=parseFloat(O.getAttribute("lower")||T.limit.lower),T.limit.upper=parseFloat(O.getAttribute("upper")||T.limit.upper))}),D.add(T),T.add(v),Om(T,y),T.position.set(w[0],w[1],w[2]);let N=b.filter(O=>O.nodeName.toLowerCase()==="axis")[0];if(N){let O=N.getAttribute("xyz").split(/\s+/g).map(B=>parseFloat(B));T.axis=new F(O[0],O[1],O[2]),T.axis.normalize()}return T}function x(E,b,_,T=null){T===null&&(T=new ua);let A=[...E.children];return T.name=E.getAttribute("name"),T.urdfName=T.name,T.urdfNode=E,r&&A.filter(v=>v.nodeName.toLowerCase()==="visual").forEach(v=>{let w=p(v,h);if(T.add(w),v.hasAttribute("name")){let y=v.getAttribute("name");w.name=y,w.urdfName=y,b[y]=w}}),o&&A.filter(v=>v.nodeName.toLowerCase()==="collision").forEach(v=>{let w=p(v);if(T.add(w),v.hasAttribute("name")){let y=v.getAttribute("name");w.name=y,w.urdfName=y,_[y]=w}}),T}function m(E){let b=[...E.children],_=new vn;return _.name=E.getAttribute("name")||"",b.forEach(T=>{let A=T.nodeName.toLowerCase();if(A==="color"){let D=T.getAttribute("rgba").split(/\s/g).map(v=>parseFloat(v));_.color.setRGB(D[0],D[1],D[2]),_.opacity=D[3],_.transparent=D[3]<1,_.depthWrite=!_.transparent}else if(A==="texture"){let D=T.getAttribute("filename");if(D){let v=new qs(a),w=d(D);_.map=v.load(w),_.map.colorSpace=Ae}}}),_}function p(E,b={}){let _=E.nodeName.toLowerCase()==="collision",T=[...E.children],A=null,D=T.filter(w=>w.nodeName.toLowerCase()==="material")[0];if(D){let w=D.getAttribute("name");w&&w in b?A=b[w]:A=m(D)}else A=new vn;let v=_?new qc:new Yc;return v.urdfNode=E,T.forEach(w=>{let y=w.nodeName.toLowerCase();if(y==="geometry"){let N=w.children[0].nodeName.toLowerCase();if(N==="mesh"){let O=w.children[0].getAttribute("filename"),B=d(O);if(B!==null){let V=w.children[0].getAttribute("scale");if(V){let Y=to(V);v.scale.set(Y[0],Y[1],Y[2])}s(B,a,(Y,k)=>{k?console.error("URDFLoader: Error loading mesh.",k):Y&&(Y instanceof dt&&(Y.material=A),Y.position.set(0,0,0),Y.quaternion.identity(),v.add(Y))})}}else if(N==="box"){let O=new dt;O.geometry=new Ue(1,1,1),O.material=A;let B=to(w.children[0].getAttribute("size"));O.scale.set(B[0],B[1],B[2]),v.add(O)}else if(N==="sphere"){let O=new dt;O.geometry=new Ki(1,30,30),O.material=A;let B=parseFloat(w.children[0].getAttribute("radius"))||0;O.scale.set(B,B,B),v.add(O)}else if(N==="cylinder"){let O=new dt;O.geometry=new Oe(1,1,1,30),O.material=A;let B=parseFloat(w.children[0].getAttribute("radius"))||0,V=parseFloat(w.children[0].getAttribute("length"))||0;O.scale.set(B,V,B),O.rotation.set(Math.PI/2,0,0),v.add(O)}}else if(y==="origin"){let N=to(w.getAttribute("xyz")),O=to(w.getAttribute("rpy"));v.position.set(N[0],N[1],N[2]),v.rotation.set(0,0,0),Om(v,O)}}),v}return u(t)}defaultMeshLoader(t,e,i){/\.stl$/i.test(t)?new Kr(e).load(t,r=>{let o=new dt(r,new vn);i(o)}):/\.dae$/i.test(t)?new Vc(e).load(t,r=>i(r.scene)):console.warn(`URDFLoader: Could not load model at ${t}.
No loader available`)}};var Bm={type:"change"},Ad={type:"start"},zm={type:"end"},Zc=new ji,km=new Vn,L1=Math.cos(70*nn.DEG2RAD),dn=new F,qn=2*Math.PI,Ce={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Td=1e-6,jc=class extends Ks{constructor(t,e=null){super(t,e),this.state=Ce.NONE,this.enabled=!0,this.target=new F,this.cursor=new F,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ss.ROTATE,MIDDLE:Ss.DOLLY,RIGHT:Ss.PAN},this.touches={ONE:ws.ROTATE,TWO:ws.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new F,this._lastQuaternion=new de,this._lastTargetPosition=new F,this._quat=new de().setFromUnitVectors(t.up,new F(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Xr,this._sphericalDelta=new Xr,this._scale=1,this._panOffset=new F,this._rotateStart=new Ot,this._rotateEnd=new Ot,this._rotateDelta=new Ot,this._panStart=new Ot,this._panEnd=new Ot,this._panDelta=new Ot,this._dollyStart=new Ot,this._dollyEnd=new Ot,this._dollyDelta=new Ot,this._dollyDirection=new F,this._mouse=new Ot,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=N1.bind(this),this._onPointerDown=D1.bind(this),this._onPointerUp=F1.bind(this),this._onContextMenu=H1.bind(this),this._onMouseWheel=B1.bind(this),this._onKeyDown=k1.bind(this),this._onTouchStart=z1.bind(this),this._onTouchMove=V1.bind(this),this._onMouseDown=U1.bind(this),this._onMouseMove=O1.bind(this),this._interceptControlDown=G1.bind(this),this._interceptControlUp=W1.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Bm),this.update(),this.state=Ce.NONE}update(t=null){let e=this.object.position;dn.copy(e).sub(this.target),dn.applyQuaternion(this._quat),this._spherical.setFromVector3(dn),this.autoRotate&&this.state===Ce.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=qn:i>Math.PI&&(i-=qn),s<-Math.PI?s+=qn:s>Math.PI&&(s-=qn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(dn.setFromSpherical(this._spherical),dn.applyQuaternion(this._quatInverse),e.copy(this.target).add(dn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=dn.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new F(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new F(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=dn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Zc.origin.copy(this.object.position),Zc.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Zc.direction))<L1?this.object.lookAt(this.target):(km.setFromNormalAndCoplanarPoint(this.object.up,this.target),Zc.intersectPlane(km,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Td||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Td||this._lastTargetPosition.distanceToSquared(this.target)>Td?(this.dispatchEvent(Bm),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?qn/60*this.autoRotateSpeed*t:qn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){dn.setFromMatrixColumn(e,0),dn.multiplyScalar(-t),this._panOffset.add(dn)}_panUp(t,e){this.screenSpacePanning===!0?dn.setFromMatrixColumn(e,1):(dn.setFromMatrixColumn(e,0),dn.crossVectors(this.object.up,dn)),dn.multiplyScalar(t),this._panOffset.add(dn)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;dn.copy(s).sub(this.target);let r=dn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(qn*this._rotateDelta.x/e.clientHeight),this._rotateUp(qn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-qn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(qn*this._rotateDelta.x/e.clientHeight),this._rotateUp(qn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Ot,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function D1(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function N1(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function F1(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(zm),this.state=Ce.NONE;break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function U1(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case Ss.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=Ce.DOLLY;break;case Ss.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Ce.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Ce.ROTATE}break;case Ss.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=Ce.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=Ce.PAN}break;default:this.state=Ce.NONE}this.state!==Ce.NONE&&this.dispatchEvent(Ad)}function O1(n){switch(this.state){case Ce.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case Ce.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case Ce.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function B1(n){this.enabled===!1||this.enableZoom===!1||this.state!==Ce.NONE||(n.preventDefault(),this.dispatchEvent(Ad),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(zm))}function k1(n){this.enabled!==!1&&this._handleKeyDown(n)}function z1(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ws.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=Ce.TOUCH_ROTATE;break;case ws.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=Ce.TOUCH_PAN;break;default:this.state=Ce.NONE}break;case 2:switch(this.touches.TWO){case ws.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=Ce.TOUCH_DOLLY_PAN;break;case ws.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=Ce.TOUCH_DOLLY_ROTATE;break;default:this.state=Ce.NONE}break;default:this.state=Ce.NONE}this.state!==Ce.NONE&&this.dispatchEvent(Ad)}function V1(n){switch(this._trackPointer(n),this.state){case Ce.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case Ce.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case Ce.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case Ce.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=Ce.NONE}}function H1(n){this.enabled!==!1&&n.preventDefault()}function G1(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function W1(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var $c=new F,Vm=new F,Kc=new An,Qc=class{constructor(){let t,e,i,s;t=new Gs,t.background=new Jt(2503224),e=new Ke,e.position.set(2,2,2),e.lookAt(0,0,0),e.layers.enable(1),e.up.set(0,0,1),i=new kc({antialias:!0}),i.outputEncoding=Ae,i.shadowMap.enabled=!0,i.shadowMap.type=Xl;let r=new Zs(16777215,1);r.castShadow=!0,r.shadow.mapSize.setScalar(1024),r.position.set(5,5,30),t.add(r);let o=new js(16777215,.2);t.add(o);let a=new dt(new $i,new Ho({opacity:.25}));a.scale.setScalar(30),a.receiveShadow=!0,t.add(a),s=new jc(e,i.domElement),s.addEventListener("change",()=>this.render()),s.minDistance=.5,s.target.y=1,this.renderer=i,this.camera=e,this.scene=t,this.orbit=s,s.update()}fitCameraToSelection(t,e=1.2){let i=this.orbit,s=this.camera;Kc.makeEmpty();for(let h of t)Kc.expandByObject(h);Kc.getSize($c),Kc.getCenter(Vm);let o=Math.max($c.x,$c.y,$c.z)/(2*Math.atan(Math.PI*s.fov/360)),a=o/s.aspect,l=e*Math.max(o,a),c=i.target.clone().sub(s.position).normalize().multiplyScalar(l);i.maxDistance=l*10,i.target.copy(Vm),s.near=l/100,s.far=l*100,s.updateProjectionMatrix(),s.position.copy(i.target).sub(c),i.update()}render(){this.renderer.render(this.scene,this.camera)}},Hm="#FFFF00",Jm=new vn({shininess:10,color:Hm,emissive:Hm,emissiveIntensity:.25,opacity:.2,transparent:!0}),Gm="#FFFFFF",Zm=new vn({shininess:10,color:Gm,emissive:Gm,emissiveIntensity:.25,opacity:.2,transparent:!0}),Wm="#AAAAAA",jm=new vn({shininess:10,color:Wm,emissive:Wm,emissiveIntensity:.25,opacity:1,transparent:!1}),Xm="#FF0000",$m=new vn({shininess:10,color:Xm,emissive:Xm,emissiveIntensity:.25,opacity:.2,transparent:!0}),qm="#FFFFFF",Km=new vn({shininess:10,color:qm,emissive:qm,emissiveIntensity:.25}),Ym="#00FF00",Cd=new vn({shininess:10,color:Ym,emissive:Ym,emissiveIntensity:.25,opacity:1,transparent:!0,depthTest:!1});function X1(n){return n.isURDFJoint&&n.jointType!=="fixed"}function q1(n){let t=n;for(;t;){if(X1(t))return t;t=t.parent}return t}var Rd=new F,Pd=new F,eo=new F,Yn=new F,Qm=new F,ma=new F,ga=new F,Mi=new Vn,Id=class{constructor(t){this.enabled=!0,this.scene=t,this.raycaster=new bs,this.initialGrabPoint=new F,this.hitDistance=-1,this.hovered=null,this.manipulating=null}update(){let{raycaster:t,hovered:e,manipulating:i,scene:s}=this;if(i)return;let r=null,o=t.intersectObject(s,!0);if(o.length!==0){let a=o[0];this.hitDistance=a.distance,r=q1(a.object),this.initialGrabPoint.copy(a.point)}r!==e&&(e&&this.onUnhover(e),this.hovered=r,r&&this.onHover(r))}updateJoint(t,e){t.setJointValue(e)}onDragStart(t){}onDragEnd(t){}onHover(t){}onUnhover(t){}getRevoluteDelta(t,e,i){return Yn.copy(t.axis).transformDirection(t.matrixWorld).normalize(),eo.set(0,0,0).applyMatrix4(t.matrixWorld),Mi.setFromNormalAndCoplanarPoint(Yn,eo),Mi.projectPoint(e,ma),Mi.projectPoint(i,ga),ma.sub(eo),ga.sub(eo),Yn.crossVectors(ma,ga),Math.sign(Yn.dot(Mi.normal))*ga.angleTo(ma)}getPrismaticDelta(t,e,i){return Yn.subVectors(i,e),Mi.normal.copy(t.axis).transformDirection(t.parent.matrixWorld).normalize(),Yn.dot(Mi.normal)}moveRay(t){let{raycaster:e,hitDistance:i,manipulating:s}=this,{ray:r}=e;if(s){r.at(i,Rd),t.at(i,Pd);let o=0;s.jointType==="revolute"||s.jointType==="continuous"?o=this.getRevoluteDelta(s,Rd,Pd):s.jointType==="prismatic"&&(o=this.getPrismaticDelta(s,Rd,Pd)),o&&this.updateJoint(s,s.angle+o)}this.raycaster.ray.copy(t),this.update()}setGrabbed(t){let{hovered:e,manipulating:i}=this;if(t){if(i!==null||e===null)return;this.manipulating=e,this.onDragStart(e)}else{if(this.manipulating===null)return;this.onDragEnd(this.manipulating),this.manipulating=null,this.update()}}},th=class extends Id{constructor(t,e,i){super(t),this.camera=e,this.domElement=i;let s=new bs,r=new Ot;function o(a){let l=i.getBoundingClientRect();r.x=(a.clientX-l.left)/l.width*2-1,r.y=-((a.clientY-l.top)/l.height)*2+1}this._mouseDown=a=>{o(a),s.setFromCamera(r,this.camera),this.moveRay(s.ray),this.setGrabbed(!0)},this._mouseMove=a=>{o(a),s.setFromCamera(r,this.camera),this.moveRay(s.ray)},this._mouseUp=a=>{o(a),s.setFromCamera(r,this.camera),this.moveRay(s.ray),this.setGrabbed(!1)},i.addEventListener("mousedown",this._mouseDown),i.addEventListener("mousemove",this._mouseMove),i.addEventListener("mouseup",this._mouseUp)}getRevoluteDelta(t,e,i){let{camera:s,initialGrabPoint:r}=this;return Yn.copy(t.axis).transformDirection(t.matrixWorld).normalize(),eo.set(0,0,0).applyMatrix4(t.matrixWorld),Mi.setFromNormalAndCoplanarPoint(Yn,eo),Yn.copy(s.position).sub(r).normalize(),Math.abs(Yn.dot(Mi.normal))>.3?super.getRevoluteDelta(t,e,i):(Yn.set(0,1,0).transformDirection(s.matrixWorld),Mi.projectPoint(e,ma),Mi.projectPoint(i,ga),Yn.set(0,0,-1).transformDirection(s.matrixWorld),Yn.cross(Mi.normal),Qm.subVectors(i,e),Yn.dot(Qm))}dispose(){let{domElement:t}=this;t.removeEventListener("mousedown",this._mouseDown),t.removeEventListener("mousemove",this._mouseMove),t.removeEventListener("mouseup",this._mouseUp)}};var lr=new bs,Pn=new F,As=new F,qe=new de,tg={X:new F(1,0,0),Y:new F(0,1,0),Z:new F(0,0,1)},Ld={type:"change"},eg={type:"mouseDown",mode:null},ng={type:"mouseUp",mode:null},ig={type:"objectChange"},Ma=class extends Ks{constructor(t,e=null){super(void 0,e);let i=new Nd(this);this._root=i;let s=new Fd;this._gizmo=s,i.add(s);let r=new Ud;this._plane=r,i.add(r);let o=this;function a(b,_){let T=_;Object.defineProperty(o,b,{get:function(){return T!==void 0?T:_},set:function(A){T!==A&&(T=A,r[b]=A,s[b]=A,o.dispatchEvent({type:b+"-changed",value:A}),o.dispatchEvent(Ld))}}),o[b]=_,r[b]=_,s[b]=_}a("camera",t),a("object",void 0),a("enabled",!0),a("axis",null),a("mode","translate"),a("translationSnap",null),a("rotationSnap",null),a("scaleSnap",null),a("space","world"),a("size",1),a("dragging",!1),a("showX",!0),a("showY",!0),a("showZ",!0),a("minX",-1/0),a("maxX",1/0),a("minY",-1/0),a("maxY",1/0),a("minZ",-1/0),a("maxZ",1/0);let l=new F,c=new F,h=new de,d=new de,u=new F,f=new de,g=new F,x=new F,m=new F,p=0,E=new F;a("worldPosition",l),a("worldPositionStart",c),a("worldQuaternion",h),a("worldQuaternionStart",d),a("cameraPosition",u),a("cameraQuaternion",f),a("pointStart",g),a("pointEnd",x),a("rotationAxis",m),a("rotationAngle",p),a("eye",E),this._offset=new F,this._startNorm=new F,this._endNorm=new F,this._cameraScale=new F,this._parentPosition=new F,this._parentQuaternion=new de,this._parentQuaternionInv=new de,this._parentScale=new F,this._worldScaleStart=new F,this._worldQuaternionInv=new de,this._worldScale=new F,this._positionStart=new F,this._quaternionStart=new de,this._scaleStart=new F,this._getPointer=Y1.bind(this),this._onPointerDown=Z1.bind(this),this._onPointerHover=J1.bind(this),this._onPointerMove=j1.bind(this),this._onPointerUp=$1.bind(this),e!==null&&this.connect()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointermove",this._onPointerHover),this.domElement.addEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerHover),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.style.touchAction="auto"}getHelper(){return this._root}pointerHover(t){if(this.object===void 0||this.dragging===!0)return;t!==null&&lr.setFromCamera(t,this.camera);let e=Dd(this._gizmo.picker[this.mode],lr);e?this.axis=e.object.name:this.axis=null}pointerDown(t){if(!(this.object===void 0||this.dragging===!0||t!=null&&t.button!==0)&&this.axis!==null){t!==null&&lr.setFromCamera(t,this.camera);let e=Dd(this._plane,lr,!0);e&&(this.object.updateMatrixWorld(),this.object.parent.updateMatrixWorld(),this._positionStart.copy(this.object.position),this._quaternionStart.copy(this.object.quaternion),this._scaleStart.copy(this.object.scale),this.object.matrixWorld.decompose(this.worldPositionStart,this.worldQuaternionStart,this._worldScaleStart),this.pointStart.copy(e.point).sub(this.worldPositionStart)),this.dragging=!0,eg.mode=this.mode,this.dispatchEvent(eg)}}pointerMove(t){let e=this.axis,i=this.mode,s=this.object,r=this.space;if(i==="scale"?r="local":(e==="E"||e==="XYZE"||e==="XYZ")&&(r="world"),s===void 0||e===null||this.dragging===!1||t!==null&&t.button!==-1)return;t!==null&&lr.setFromCamera(t,this.camera);let o=Dd(this._plane,lr,!0);if(o){if(this.pointEnd.copy(o.point).sub(this.worldPositionStart),i==="translate")this._offset.copy(this.pointEnd).sub(this.pointStart),r==="local"&&e!=="XYZ"&&this._offset.applyQuaternion(this._worldQuaternionInv),e.indexOf("X")===-1&&(this._offset.x=0),e.indexOf("Y")===-1&&(this._offset.y=0),e.indexOf("Z")===-1&&(this._offset.z=0),r==="local"&&e!=="XYZ"?this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale):this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale),s.position.copy(this._offset).add(this._positionStart),this.translationSnap&&(r==="local"&&(s.position.applyQuaternion(qe.copy(this._quaternionStart).invert()),e.search("X")!==-1&&(s.position.x=Math.round(s.position.x/this.translationSnap)*this.translationSnap),e.search("Y")!==-1&&(s.position.y=Math.round(s.position.y/this.translationSnap)*this.translationSnap),e.search("Z")!==-1&&(s.position.z=Math.round(s.position.z/this.translationSnap)*this.translationSnap),s.position.applyQuaternion(this._quaternionStart)),r==="world"&&(s.parent&&s.position.add(Pn.setFromMatrixPosition(s.parent.matrixWorld)),e.search("X")!==-1&&(s.position.x=Math.round(s.position.x/this.translationSnap)*this.translationSnap),e.search("Y")!==-1&&(s.position.y=Math.round(s.position.y/this.translationSnap)*this.translationSnap),e.search("Z")!==-1&&(s.position.z=Math.round(s.position.z/this.translationSnap)*this.translationSnap),s.parent&&s.position.sub(Pn.setFromMatrixPosition(s.parent.matrixWorld)))),s.position.x=Math.max(this.minX,Math.min(this.maxX,s.position.x)),s.position.y=Math.max(this.minY,Math.min(this.maxY,s.position.y)),s.position.z=Math.max(this.minZ,Math.min(this.maxZ,s.position.z));else if(i==="scale"){if(e.search("XYZ")!==-1){let a=this.pointEnd.length()/this.pointStart.length();this.pointEnd.dot(this.pointStart)<0&&(a*=-1),As.set(a,a,a)}else Pn.copy(this.pointStart),As.copy(this.pointEnd),Pn.applyQuaternion(this._worldQuaternionInv),As.applyQuaternion(this._worldQuaternionInv),As.divide(Pn),e.search("X")===-1&&(As.x=1),e.search("Y")===-1&&(As.y=1),e.search("Z")===-1&&(As.z=1);s.scale.copy(this._scaleStart).multiply(As),this.scaleSnap&&(e.search("X")!==-1&&(s.scale.x=Math.round(s.scale.x/this.scaleSnap)*this.scaleSnap||this.scaleSnap),e.search("Y")!==-1&&(s.scale.y=Math.round(s.scale.y/this.scaleSnap)*this.scaleSnap||this.scaleSnap),e.search("Z")!==-1&&(s.scale.z=Math.round(s.scale.z/this.scaleSnap)*this.scaleSnap||this.scaleSnap))}else if(i==="rotate"){this._offset.copy(this.pointEnd).sub(this.pointStart);let a=20/this.worldPosition.distanceTo(Pn.setFromMatrixPosition(this.camera.matrixWorld)),l=!1;e==="XYZE"?(this.rotationAxis.copy(this._offset).cross(this.eye).normalize(),this.rotationAngle=this._offset.dot(Pn.copy(this.rotationAxis).cross(this.eye))*a):(e==="X"||e==="Y"||e==="Z")&&(this.rotationAxis.copy(tg[e]),Pn.copy(tg[e]),r==="local"&&Pn.applyQuaternion(this.worldQuaternion),Pn.cross(this.eye),Pn.length()===0?l=!0:this.rotationAngle=this._offset.dot(Pn.normalize())*a),(e==="E"||l)&&(this.rotationAxis.copy(this.eye),this.rotationAngle=this.pointEnd.angleTo(this.pointStart),this._startNorm.copy(this.pointStart).normalize(),this._endNorm.copy(this.pointEnd).normalize(),this.rotationAngle*=this._endNorm.cross(this._startNorm).dot(this.eye)<0?1:-1),this.rotationSnap&&(this.rotationAngle=Math.round(this.rotationAngle/this.rotationSnap)*this.rotationSnap),r==="local"&&e!=="E"&&e!=="XYZE"?(s.quaternion.copy(this._quaternionStart),s.quaternion.multiply(qe.setFromAxisAngle(this.rotationAxis,this.rotationAngle)).normalize()):(this.rotationAxis.applyQuaternion(this._parentQuaternionInv),s.quaternion.copy(qe.setFromAxisAngle(this.rotationAxis,this.rotationAngle)),s.quaternion.multiply(this._quaternionStart).normalize())}this.dispatchEvent(Ld),this.dispatchEvent(ig)}}pointerUp(t){t!==null&&t.button!==0||(this.dragging&&this.axis!==null&&(ng.mode=this.mode,this.dispatchEvent(ng)),this.dragging=!1,this.axis=null)}dispose(){this.disconnect(),this._root.dispose()}attach(t){return this.object=t,this._root.visible=!0,this}detach(){return this.object=void 0,this.axis=null,this._root.visible=!1,this}reset(){this.enabled&&this.dragging&&(this.object.position.copy(this._positionStart),this.object.quaternion.copy(this._quaternionStart),this.object.scale.copy(this._scaleStart),this.dispatchEvent(Ld),this.dispatchEvent(ig),this.pointStart.copy(this.pointEnd))}getRaycaster(){return lr}getMode(){return this.mode}setMode(t){this.mode=t}setTranslationSnap(t){this.translationSnap=t}setRotationSnap(t){this.rotationSnap=t}setScaleSnap(t){this.scaleSnap=t}setSize(t){this.size=t}setSpace(t){this.space=t}};function Y1(n){if(this.domElement.ownerDocument.pointerLockElement)return{x:0,y:0,button:n.button};{let t=this.domElement.getBoundingClientRect();return{x:(n.clientX-t.left)/t.width*2-1,y:-(n.clientY-t.top)/t.height*2+1,button:n.button}}}function J1(n){if(this.enabled)switch(n.pointerType){case"mouse":case"pen":this.pointerHover(this._getPointer(n));break}}function Z1(n){this.enabled&&(document.pointerLockElement||this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.pointerHover(this._getPointer(n)),this.pointerDown(this._getPointer(n)))}function j1(n){this.enabled&&this.pointerMove(this._getPointer(n))}function $1(n){this.enabled&&(this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.pointerUp(this._getPointer(n)))}function Dd(n,t,e){let i=t.intersectObject(n,!0);for(let s=0;s<i.length;s++)if(i[s].object.visible||e)return i[s];return!1}var eh=new Qe,Ie=new F(0,1,0),sg=new F(0,0,0),rg=new Ht,nh=new de,sh=new de,Di=new F,og=new Ht,ya=new F(1,0,0),cr=new F(0,1,0),va=new F(0,0,1),ih=new F,xa=new F,_a=new F,Nd=class extends Fe{constructor(t){super(),this.isTransformControlsRoot=!0,this.controls=t,this.visible=!1}updateMatrixWorld(t){let e=this.controls;e.object!==void 0&&(e.object.updateMatrixWorld(),e.object.parent===null?console.error("TransformControls: The attached 3D object must be a part of the scene graph."):e.object.parent.matrixWorld.decompose(e._parentPosition,e._parentQuaternion,e._parentScale),e.object.matrixWorld.decompose(e.worldPosition,e.worldQuaternion,e._worldScale),e._parentQuaternionInv.copy(e._parentQuaternion).invert(),e._worldQuaternionInv.copy(e.worldQuaternion).invert()),e.camera.updateMatrixWorld(),e.camera.matrixWorld.decompose(e.cameraPosition,e.cameraQuaternion,e._cameraScale),e.camera.isOrthographicCamera?e.camera.getWorldDirection(e.eye).negate():e.eye.copy(e.cameraPosition).sub(e.worldPosition).normalize(),super.updateMatrixWorld(t)}dispose(){this.traverse(function(t){t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()})}},Fd=class extends Fe{constructor(){super(),this.isTransformControlsGizmo=!0,this.type="TransformControlsGizmo";let t=new ai({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),e=new Ri({depthTest:!1,depthWrite:!1,fog:!1,toneMapped:!1,transparent:!0}),i=t.clone();i.opacity=.15;let s=e.clone();s.opacity=.5;let r=t.clone();r.color.setHex(16711680);let o=t.clone();o.color.setHex(65280);let a=t.clone();a.color.setHex(255);let l=t.clone();l.color.setHex(16711680),l.opacity=.5;let c=t.clone();c.color.setHex(65280),c.opacity=.5;let h=t.clone();h.color.setHex(255),h.opacity=.5;let d=t.clone();d.opacity=.25;let u=t.clone();u.color.setHex(16776960),u.opacity=.25,t.clone().color.setHex(16776960);let g=t.clone();g.color.setHex(7895160);let x=new Oe(0,.04,.1,12);x.translate(0,.05,0);let m=new Ue(.08,.08,.08);m.translate(0,.04,0);let p=new Xe;p.setAttribute("position",new ee([0,0,0,1,0,0],3));let E=new Oe(.0075,.0075,.5,3);E.translate(0,.25,0);function b(Y,k){let K=new Qi(Y,.0075,3,64,k*Math.PI*2);return K.rotateY(Math.PI/2),K.rotateX(Math.PI/2),K}function _(){let Y=new Xe;return Y.setAttribute("position",new ee([0,0,0,1,1,1],3)),Y}let T={X:[[new dt(x,r),[.5,0,0],[0,0,-Math.PI/2]],[new dt(x,r),[-.5,0,0],[0,0,Math.PI/2]],[new dt(E,r),[0,0,0],[0,0,-Math.PI/2]]],Y:[[new dt(x,o),[0,.5,0]],[new dt(x,o),[0,-.5,0],[Math.PI,0,0]],[new dt(E,o)]],Z:[[new dt(x,a),[0,0,.5],[Math.PI/2,0,0]],[new dt(x,a),[0,0,-.5],[-Math.PI/2,0,0]],[new dt(E,a),null,[Math.PI/2,0,0]]],XYZ:[[new dt(new ys(.1,0),d.clone()),[0,0,0]]],XY:[[new dt(new Ue(.15,.15,.01),h.clone()),[.15,.15,0]]],YZ:[[new dt(new Ue(.15,.15,.01),l.clone()),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new dt(new Ue(.15,.15,.01),c.clone()),[.15,0,.15],[-Math.PI/2,0,0]]]},A={X:[[new dt(new Oe(.2,0,.6,4),i),[.3,0,0],[0,0,-Math.PI/2]],[new dt(new Oe(.2,0,.6,4),i),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new dt(new Oe(.2,0,.6,4),i),[0,.3,0]],[new dt(new Oe(.2,0,.6,4),i),[0,-.3,0],[0,0,Math.PI]]],Z:[[new dt(new Oe(.2,0,.6,4),i),[0,0,.3],[Math.PI/2,0,0]],[new dt(new Oe(.2,0,.6,4),i),[0,0,-.3],[-Math.PI/2,0,0]]],XYZ:[[new dt(new ys(.2,0),i)]],XY:[[new dt(new Ue(.2,.2,.01),i),[.15,.15,0]]],YZ:[[new dt(new Ue(.2,.2,.01),i),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new dt(new Ue(.2,.2,.01),i),[.15,0,.15],[-Math.PI/2,0,0]]]},D={START:[[new dt(new ys(.01,2),s),null,null,null,"helper"]],END:[[new dt(new ys(.01,2),s),null,null,null,"helper"]],DELTA:[[new Cn(_(),s),null,null,null,"helper"]],X:[[new Cn(p,s.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new Cn(p,s.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new Cn(p,s.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]},v={XYZE:[[new dt(b(.5,1),g),null,[0,Math.PI/2,0]]],X:[[new dt(b(.5,.5),r)]],Y:[[new dt(b(.5,.5),o),null,[0,0,-Math.PI/2]]],Z:[[new dt(b(.5,.5),a),null,[0,Math.PI/2,0]]],E:[[new dt(b(.75,1),u),null,[0,Math.PI/2,0]]]},w={AXIS:[[new Cn(p,s.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]]},y={XYZE:[[new dt(new Ki(.25,10,8),i)]],X:[[new dt(new Qi(.5,.1,4,24),i),[0,0,0],[0,-Math.PI/2,-Math.PI/2]]],Y:[[new dt(new Qi(.5,.1,4,24),i),[0,0,0],[Math.PI/2,0,0]]],Z:[[new dt(new Qi(.5,.1,4,24),i),[0,0,0],[0,0,-Math.PI/2]]],E:[[new dt(new Qi(.75,.1,2,24),i)]]},N={X:[[new dt(m,r),[.5,0,0],[0,0,-Math.PI/2]],[new dt(E,r),[0,0,0],[0,0,-Math.PI/2]],[new dt(m,r),[-.5,0,0],[0,0,Math.PI/2]]],Y:[[new dt(m,o),[0,.5,0]],[new dt(E,o)],[new dt(m,o),[0,-.5,0],[0,0,Math.PI]]],Z:[[new dt(m,a),[0,0,.5],[Math.PI/2,0,0]],[new dt(E,a),[0,0,0],[Math.PI/2,0,0]],[new dt(m,a),[0,0,-.5],[-Math.PI/2,0,0]]],XY:[[new dt(new Ue(.15,.15,.01),h),[.15,.15,0]]],YZ:[[new dt(new Ue(.15,.15,.01),l),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new dt(new Ue(.15,.15,.01),c),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new dt(new Ue(.1,.1,.1),d.clone())]]},O={X:[[new dt(new Oe(.2,0,.6,4),i),[.3,0,0],[0,0,-Math.PI/2]],[new dt(new Oe(.2,0,.6,4),i),[-.3,0,0],[0,0,Math.PI/2]]],Y:[[new dt(new Oe(.2,0,.6,4),i),[0,.3,0]],[new dt(new Oe(.2,0,.6,4),i),[0,-.3,0],[0,0,Math.PI]]],Z:[[new dt(new Oe(.2,0,.6,4),i),[0,0,.3],[Math.PI/2,0,0]],[new dt(new Oe(.2,0,.6,4),i),[0,0,-.3],[-Math.PI/2,0,0]]],XY:[[new dt(new Ue(.2,.2,.01),i),[.15,.15,0]]],YZ:[[new dt(new Ue(.2,.2,.01),i),[0,.15,.15],[0,Math.PI/2,0]]],XZ:[[new dt(new Ue(.2,.2,.01),i),[.15,0,.15],[-Math.PI/2,0,0]]],XYZ:[[new dt(new Ue(.2,.2,.2),i),[0,0,0]]]},B={X:[[new Cn(p,s.clone()),[-1e3,0,0],null,[1e6,1,1],"helper"]],Y:[[new Cn(p,s.clone()),[0,-1e3,0],[0,0,Math.PI/2],[1e6,1,1],"helper"]],Z:[[new Cn(p,s.clone()),[0,0,-1e3],[0,-Math.PI/2,0],[1e6,1,1],"helper"]]};function V(Y){let k=new Fe;for(let K in Y)for(let X=Y[K].length;X--;){let st=Y[K][X][0].clone(),ut=Y[K][X][1],ft=Y[K][X][2],Tt=Y[K][X][3],wt=Y[K][X][4];st.name=K,st.tag=wt,ut&&st.position.set(ut[0],ut[1],ut[2]),ft&&st.rotation.set(ft[0],ft[1],ft[2]),Tt&&st.scale.set(Tt[0],Tt[1],Tt[2]),st.updateMatrix();let q=st.geometry.clone();q.applyMatrix4(st.matrix),st.geometry=q,st.renderOrder=1/0,st.position.set(0,0,0),st.rotation.set(0,0,0),st.scale.set(1,1,1),k.add(st)}return k}this.gizmo={},this.picker={},this.helper={},this.add(this.gizmo.translate=V(T)),this.add(this.gizmo.rotate=V(v)),this.add(this.gizmo.scale=V(N)),this.add(this.picker.translate=V(A)),this.add(this.picker.rotate=V(y)),this.add(this.picker.scale=V(O)),this.add(this.helper.translate=V(D)),this.add(this.helper.rotate=V(w)),this.add(this.helper.scale=V(B)),this.picker.translate.visible=!1,this.picker.rotate.visible=!1,this.picker.scale.visible=!1}updateMatrixWorld(t){let i=(this.mode==="scale"?"local":this.space)==="local"?this.worldQuaternion:sh;this.gizmo.translate.visible=this.mode==="translate",this.gizmo.rotate.visible=this.mode==="rotate",this.gizmo.scale.visible=this.mode==="scale",this.helper.translate.visible=this.mode==="translate",this.helper.rotate.visible=this.mode==="rotate",this.helper.scale.visible=this.mode==="scale";let s=[];s=s.concat(this.picker[this.mode].children),s=s.concat(this.gizmo[this.mode].children),s=s.concat(this.helper[this.mode].children);for(let r=0;r<s.length;r++){let o=s[r];o.visible=!0,o.rotation.set(0,0,0),o.position.copy(this.worldPosition);let a;if(this.camera.isOrthographicCamera?a=(this.camera.top-this.camera.bottom)/this.camera.zoom:a=this.worldPosition.distanceTo(this.cameraPosition)*Math.min(1.9*Math.tan(Math.PI*this.camera.fov/360)/this.camera.zoom,7),o.scale.set(1,1,1).multiplyScalar(a*this.size/4),o.tag==="helper"){o.visible=!1,o.name==="AXIS"?(o.visible=!!this.axis,this.axis==="X"&&(qe.setFromEuler(eh.set(0,0,0)),o.quaternion.copy(i).multiply(qe),Math.abs(Ie.copy(ya).applyQuaternion(i).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Y"&&(qe.setFromEuler(eh.set(0,0,Math.PI/2)),o.quaternion.copy(i).multiply(qe),Math.abs(Ie.copy(cr).applyQuaternion(i).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="Z"&&(qe.setFromEuler(eh.set(0,Math.PI/2,0)),o.quaternion.copy(i).multiply(qe),Math.abs(Ie.copy(va).applyQuaternion(i).dot(this.eye))>.9&&(o.visible=!1)),this.axis==="XYZE"&&(qe.setFromEuler(eh.set(0,Math.PI/2,0)),Ie.copy(this.rotationAxis),o.quaternion.setFromRotationMatrix(rg.lookAt(sg,Ie,cr)),o.quaternion.multiply(qe),o.visible=this.dragging),this.axis==="E"&&(o.visible=!1)):o.name==="START"?(o.position.copy(this.worldPositionStart),o.visible=this.dragging):o.name==="END"?(o.position.copy(this.worldPosition),o.visible=this.dragging):o.name==="DELTA"?(o.position.copy(this.worldPositionStart),o.quaternion.copy(this.worldQuaternionStart),Pn.set(1e-10,1e-10,1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1),Pn.applyQuaternion(this.worldQuaternionStart.clone().invert()),o.scale.copy(Pn),o.visible=this.dragging):(o.quaternion.copy(i),this.dragging?o.position.copy(this.worldPositionStart):o.position.copy(this.worldPosition),this.axis&&(o.visible=this.axis.search(o.name)!==-1));continue}o.quaternion.copy(i),this.mode==="translate"||this.mode==="scale"?(o.name==="X"&&Math.abs(Ie.copy(ya).applyQuaternion(i).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Y"&&Math.abs(Ie.copy(cr).applyQuaternion(i).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="Z"&&Math.abs(Ie.copy(va).applyQuaternion(i).dot(this.eye))>.99&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XY"&&Math.abs(Ie.copy(va).applyQuaternion(i).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="YZ"&&Math.abs(Ie.copy(ya).applyQuaternion(i).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1),o.name==="XZ"&&Math.abs(Ie.copy(cr).applyQuaternion(i).dot(this.eye))<.2&&(o.scale.set(1e-10,1e-10,1e-10),o.visible=!1)):this.mode==="rotate"&&(nh.copy(i),Ie.copy(this.eye).applyQuaternion(qe.copy(i).invert()),o.name.search("E")!==-1&&o.quaternion.setFromRotationMatrix(rg.lookAt(this.eye,sg,cr)),o.name==="X"&&(qe.setFromAxisAngle(ya,Math.atan2(-Ie.y,Ie.z)),qe.multiplyQuaternions(nh,qe),o.quaternion.copy(qe)),o.name==="Y"&&(qe.setFromAxisAngle(cr,Math.atan2(Ie.x,Ie.z)),qe.multiplyQuaternions(nh,qe),o.quaternion.copy(qe)),o.name==="Z"&&(qe.setFromAxisAngle(va,Math.atan2(Ie.y,Ie.x)),qe.multiplyQuaternions(nh,qe),o.quaternion.copy(qe))),o.visible=o.visible&&(o.name.indexOf("X")===-1||this.showX),o.visible=o.visible&&(o.name.indexOf("Y")===-1||this.showY),o.visible=o.visible&&(o.name.indexOf("Z")===-1||this.showZ),o.visible=o.visible&&(o.name.indexOf("E")===-1||this.showX&&this.showY&&this.showZ),o.material._color=o.material._color||o.material.color.clone(),o.material._opacity=o.material._opacity||o.material.opacity,o.material.color.copy(o.material._color),o.material.opacity=o.material._opacity,this.enabled&&this.axis&&(o.name===this.axis||this.axis.split("").some(function(l){return o.name===l}))&&(o.material.color.setHex(16776960),o.material.opacity=1)}super.updateMatrixWorld(t)}},Ud=class extends dt{constructor(){super(new $i(1e5,1e5,2,2),new ai({visible:!1,wireframe:!0,side:Xn,transparent:!0,opacity:.1,toneMapped:!1})),this.isTransformControlsPlane=!0,this.type="TransformControlsPlane"}updateMatrixWorld(t){let e=this.space;switch(this.position.copy(this.worldPosition),this.mode==="scale"&&(e="local"),ih.copy(ya).applyQuaternion(e==="local"?this.worldQuaternion:sh),xa.copy(cr).applyQuaternion(e==="local"?this.worldQuaternion:sh),_a.copy(va).applyQuaternion(e==="local"?this.worldQuaternion:sh),Ie.copy(xa),this.mode){case"translate":case"scale":switch(this.axis){case"X":Ie.copy(this.eye).cross(ih),Di.copy(ih).cross(Ie);break;case"Y":Ie.copy(this.eye).cross(xa),Di.copy(xa).cross(Ie);break;case"Z":Ie.copy(this.eye).cross(_a),Di.copy(_a).cross(Ie);break;case"XY":Di.copy(_a);break;case"YZ":Di.copy(ih);break;case"XZ":Ie.copy(_a),Di.copy(xa);break;case"XYZ":case"E":Di.set(0,0,0);break}break;case"rotate":default:Di.set(0,0,0)}Di.length()===0?this.quaternion.copy(this.cameraQuaternion):(og.lookAt(Pn.set(0,0,0),Di,Ie),this.quaternion.setFromRotationMatrix(og)),super.updateMatrixWorld(t)}};var xe=1e-6,$e=typeof Float32Array<"u"?Float32Array:Array,ci=Math.random;var EC=Math.PI/180;Math.hypot||(Math.hypot=function(){for(var n=0,t=arguments.length;t--;)n+=arguments[t]*arguments[t];return Math.sqrt(n)});function ag(){var n=new $e(9);return $e!=Float32Array&&(n[1]=0,n[2]=0,n[3]=0,n[5]=0,n[6]=0,n[7]=0),n[0]=1,n[4]=1,n[8]=1,n}var Yt={};Ja(Yt,{add:()=>Ub,adjoint:()=>ob,clone:()=>tb,copy:()=>eb,create:()=>Q1,determinant:()=>ab,equals:()=>zb,exactEquals:()=>kb,frob:()=>Fb,fromQuat:()=>Eb,fromQuat2:()=>vb,fromRotation:()=>gb,fromRotationTranslation:()=>hg,fromRotationTranslationScale:()=>Sb,fromRotationTranslationScaleOrigin:()=>wb,fromScaling:()=>mb,fromTranslation:()=>pb,fromValues:()=>nb,fromXRotation:()=>xb,fromYRotation:()=>_b,fromZRotation:()=>yb,frustum:()=>Tb,getRotation:()=>bb,getScaling:()=>ug,getTranslation:()=>Mb,identity:()=>lg,invert:()=>rb,lookAt:()=>Lb,mul:()=>Vb,multiply:()=>cg,multiplyScalar:()=>Ob,multiplyScalarAndAdd:()=>Bb,ortho:()=>Pb,orthoNO:()=>fg,orthoZO:()=>Ib,perspective:()=>Ab,perspectiveFromFieldOfView:()=>Rb,perspectiveNO:()=>dg,perspectiveZO:()=>Cb,rotate:()=>hb,rotateX:()=>ub,rotateY:()=>db,rotateZ:()=>fb,scale:()=>cb,set:()=>ib,str:()=>Nb,sub:()=>Hb,subtract:()=>pg,targetTo:()=>Db,translate:()=>lb,transpose:()=>sb});function Q1(){var n=new $e(16);return $e!=Float32Array&&(n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0),n[0]=1,n[5]=1,n[10]=1,n[15]=1,n}function tb(n){var t=new $e(16);return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],t}function eb(n,t){return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n}function nb(n,t,e,i,s,r,o,a,l,c,h,d,u,f,g,x){var m=new $e(16);return m[0]=n,m[1]=t,m[2]=e,m[3]=i,m[4]=s,m[5]=r,m[6]=o,m[7]=a,m[8]=l,m[9]=c,m[10]=h,m[11]=d,m[12]=u,m[13]=f,m[14]=g,m[15]=x,m}function ib(n,t,e,i,s,r,o,a,l,c,h,d,u,f,g,x,m){return n[0]=t,n[1]=e,n[2]=i,n[3]=s,n[4]=r,n[5]=o,n[6]=a,n[7]=l,n[8]=c,n[9]=h,n[10]=d,n[11]=u,n[12]=f,n[13]=g,n[14]=x,n[15]=m,n}function lg(n){return n[0]=1,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=1,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=1,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function sb(n,t){if(n===t){var e=t[1],i=t[2],s=t[3],r=t[6],o=t[7],a=t[11];n[1]=t[4],n[2]=t[8],n[3]=t[12],n[4]=e,n[6]=t[9],n[7]=t[13],n[8]=i,n[9]=r,n[11]=t[14],n[12]=s,n[13]=o,n[14]=a}else n[0]=t[0],n[1]=t[4],n[2]=t[8],n[3]=t[12],n[4]=t[1],n[5]=t[5],n[6]=t[9],n[7]=t[13],n[8]=t[2],n[9]=t[6],n[10]=t[10],n[11]=t[14],n[12]=t[3],n[13]=t[7],n[14]=t[11],n[15]=t[15];return n}function rb(n,t){var e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],E=e*a-i*o,b=e*l-s*o,_=e*c-r*o,T=i*l-s*a,A=i*c-r*a,D=s*c-r*l,v=h*x-d*g,w=h*m-u*g,y=h*p-f*g,N=d*m-u*x,O=d*p-f*x,B=u*p-f*m,V=E*B-b*O+_*N+T*y-A*w+D*v;return V?(V=1/V,n[0]=(a*B-l*O+c*N)*V,n[1]=(s*O-i*B-r*N)*V,n[2]=(x*D-m*A+p*T)*V,n[3]=(u*A-d*D-f*T)*V,n[4]=(l*y-o*B-c*w)*V,n[5]=(e*B-s*y+r*w)*V,n[6]=(m*_-g*D-p*b)*V,n[7]=(h*D-u*_+f*b)*V,n[8]=(o*O-a*y+c*v)*V,n[9]=(i*y-e*O-r*v)*V,n[10]=(g*A-x*_+p*E)*V,n[11]=(d*_-h*A-f*E)*V,n[12]=(a*w-o*N-l*v)*V,n[13]=(e*N-i*w+s*v)*V,n[14]=(x*b-g*T-m*E)*V,n[15]=(h*T-d*b+u*E)*V,n):null}function ob(n,t){var e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15];return n[0]=a*(u*p-f*m)-d*(l*p-c*m)+x*(l*f-c*u),n[1]=-(i*(u*p-f*m)-d*(s*p-r*m)+x*(s*f-r*u)),n[2]=i*(l*p-c*m)-a*(s*p-r*m)+x*(s*c-r*l),n[3]=-(i*(l*f-c*u)-a*(s*f-r*u)+d*(s*c-r*l)),n[4]=-(o*(u*p-f*m)-h*(l*p-c*m)+g*(l*f-c*u)),n[5]=e*(u*p-f*m)-h*(s*p-r*m)+g*(s*f-r*u),n[6]=-(e*(l*p-c*m)-o*(s*p-r*m)+g*(s*c-r*l)),n[7]=e*(l*f-c*u)-o*(s*f-r*u)+h*(s*c-r*l),n[8]=o*(d*p-f*x)-h*(a*p-c*x)+g*(a*f-c*d),n[9]=-(e*(d*p-f*x)-h*(i*p-r*x)+g*(i*f-r*d)),n[10]=e*(a*p-c*x)-o*(i*p-r*x)+g*(i*c-r*a),n[11]=-(e*(a*f-c*d)-o*(i*f-r*d)+h*(i*c-r*a)),n[12]=-(o*(d*m-u*x)-h*(a*m-l*x)+g*(a*u-l*d)),n[13]=e*(d*m-u*x)-h*(i*m-s*x)+g*(i*u-s*d),n[14]=-(e*(a*m-l*x)-o*(i*m-s*x)+g*(i*l-s*a)),n[15]=e*(a*u-l*d)-o*(i*u-s*d)+h*(i*l-s*a),n}function ab(n){var t=n[0],e=n[1],i=n[2],s=n[3],r=n[4],o=n[5],a=n[6],l=n[7],c=n[8],h=n[9],d=n[10],u=n[11],f=n[12],g=n[13],x=n[14],m=n[15],p=t*o-e*r,E=t*a-i*r,b=t*l-s*r,_=e*a-i*o,T=e*l-s*o,A=i*l-s*a,D=c*g-h*f,v=c*x-d*f,w=c*m-u*f,y=h*x-d*g,N=h*m-u*g,O=d*m-u*x;return p*O-E*N+b*y+_*w-T*v+A*D}function cg(n,t,e){var i=t[0],s=t[1],r=t[2],o=t[3],a=t[4],l=t[5],c=t[6],h=t[7],d=t[8],u=t[9],f=t[10],g=t[11],x=t[12],m=t[13],p=t[14],E=t[15],b=e[0],_=e[1],T=e[2],A=e[3];return n[0]=b*i+_*a+T*d+A*x,n[1]=b*s+_*l+T*u+A*m,n[2]=b*r+_*c+T*f+A*p,n[3]=b*o+_*h+T*g+A*E,b=e[4],_=e[5],T=e[6],A=e[7],n[4]=b*i+_*a+T*d+A*x,n[5]=b*s+_*l+T*u+A*m,n[6]=b*r+_*c+T*f+A*p,n[7]=b*o+_*h+T*g+A*E,b=e[8],_=e[9],T=e[10],A=e[11],n[8]=b*i+_*a+T*d+A*x,n[9]=b*s+_*l+T*u+A*m,n[10]=b*r+_*c+T*f+A*p,n[11]=b*o+_*h+T*g+A*E,b=e[12],_=e[13],T=e[14],A=e[15],n[12]=b*i+_*a+T*d+A*x,n[13]=b*s+_*l+T*u+A*m,n[14]=b*r+_*c+T*f+A*p,n[15]=b*o+_*h+T*g+A*E,n}function lb(n,t,e){var i=e[0],s=e[1],r=e[2],o,a,l,c,h,d,u,f,g,x,m,p;return t===n?(n[12]=t[0]*i+t[4]*s+t[8]*r+t[12],n[13]=t[1]*i+t[5]*s+t[9]*r+t[13],n[14]=t[2]*i+t[6]*s+t[10]*r+t[14],n[15]=t[3]*i+t[7]*s+t[11]*r+t[15]):(o=t[0],a=t[1],l=t[2],c=t[3],h=t[4],d=t[5],u=t[6],f=t[7],g=t[8],x=t[9],m=t[10],p=t[11],n[0]=o,n[1]=a,n[2]=l,n[3]=c,n[4]=h,n[5]=d,n[6]=u,n[7]=f,n[8]=g,n[9]=x,n[10]=m,n[11]=p,n[12]=o*i+h*s+g*r+t[12],n[13]=a*i+d*s+x*r+t[13],n[14]=l*i+u*s+m*r+t[14],n[15]=c*i+f*s+p*r+t[15]),n}function cb(n,t,e){var i=e[0],s=e[1],r=e[2];return n[0]=t[0]*i,n[1]=t[1]*i,n[2]=t[2]*i,n[3]=t[3]*i,n[4]=t[4]*s,n[5]=t[5]*s,n[6]=t[6]*s,n[7]=t[7]*s,n[8]=t[8]*r,n[9]=t[9]*r,n[10]=t[10]*r,n[11]=t[11]*r,n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15],n}function hb(n,t,e,i){var s=i[0],r=i[1],o=i[2],a=Math.hypot(s,r,o),l,c,h,d,u,f,g,x,m,p,E,b,_,T,A,D,v,w,y,N,O,B,V,Y;return a<xe?null:(a=1/a,s*=a,r*=a,o*=a,l=Math.sin(e),c=Math.cos(e),h=1-c,d=t[0],u=t[1],f=t[2],g=t[3],x=t[4],m=t[5],p=t[6],E=t[7],b=t[8],_=t[9],T=t[10],A=t[11],D=s*s*h+c,v=r*s*h+o*l,w=o*s*h-r*l,y=s*r*h-o*l,N=r*r*h+c,O=o*r*h+s*l,B=s*o*h+r*l,V=r*o*h-s*l,Y=o*o*h+c,n[0]=d*D+x*v+b*w,n[1]=u*D+m*v+_*w,n[2]=f*D+p*v+T*w,n[3]=g*D+E*v+A*w,n[4]=d*y+x*N+b*O,n[5]=u*y+m*N+_*O,n[6]=f*y+p*N+T*O,n[7]=g*y+E*N+A*O,n[8]=d*B+x*V+b*Y,n[9]=u*B+m*V+_*Y,n[10]=f*B+p*V+T*Y,n[11]=g*B+E*V+A*Y,t!==n&&(n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n)}function ub(n,t,e){var i=Math.sin(e),s=Math.cos(e),r=t[4],o=t[5],a=t[6],l=t[7],c=t[8],h=t[9],d=t[10],u=t[11];return t!==n&&(n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n[4]=r*s+c*i,n[5]=o*s+h*i,n[6]=a*s+d*i,n[7]=l*s+u*i,n[8]=c*s-r*i,n[9]=h*s-o*i,n[10]=d*s-a*i,n[11]=u*s-l*i,n}function db(n,t,e){var i=Math.sin(e),s=Math.cos(e),r=t[0],o=t[1],a=t[2],l=t[3],c=t[8],h=t[9],d=t[10],u=t[11];return t!==n&&(n[4]=t[4],n[5]=t[5],n[6]=t[6],n[7]=t[7],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n[0]=r*s-c*i,n[1]=o*s-h*i,n[2]=a*s-d*i,n[3]=l*s-u*i,n[8]=r*i+c*s,n[9]=o*i+h*s,n[10]=a*i+d*s,n[11]=l*i+u*s,n}function fb(n,t,e){var i=Math.sin(e),s=Math.cos(e),r=t[0],o=t[1],a=t[2],l=t[3],c=t[4],h=t[5],d=t[6],u=t[7];return t!==n&&(n[8]=t[8],n[9]=t[9],n[10]=t[10],n[11]=t[11],n[12]=t[12],n[13]=t[13],n[14]=t[14],n[15]=t[15]),n[0]=r*s+c*i,n[1]=o*s+h*i,n[2]=a*s+d*i,n[3]=l*s+u*i,n[4]=c*s-r*i,n[5]=h*s-o*i,n[6]=d*s-a*i,n[7]=u*s-l*i,n}function pb(n,t){return n[0]=1,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=1,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=1,n[11]=0,n[12]=t[0],n[13]=t[1],n[14]=t[2],n[15]=1,n}function mb(n,t){return n[0]=t[0],n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=t[1],n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=t[2],n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function gb(n,t,e){var i=e[0],s=e[1],r=e[2],o=Math.hypot(i,s,r),a,l,c;return o<xe?null:(o=1/o,i*=o,s*=o,r*=o,a=Math.sin(t),l=Math.cos(t),c=1-l,n[0]=i*i*c+l,n[1]=s*i*c+r*a,n[2]=r*i*c-s*a,n[3]=0,n[4]=i*s*c-r*a,n[5]=s*s*c+l,n[6]=r*s*c+i*a,n[7]=0,n[8]=i*r*c+s*a,n[9]=s*r*c-i*a,n[10]=r*r*c+l,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n)}function xb(n,t){var e=Math.sin(t),i=Math.cos(t);return n[0]=1,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=i,n[6]=e,n[7]=0,n[8]=0,n[9]=-e,n[10]=i,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function _b(n,t){var e=Math.sin(t),i=Math.cos(t);return n[0]=i,n[1]=0,n[2]=-e,n[3]=0,n[4]=0,n[5]=1,n[6]=0,n[7]=0,n[8]=e,n[9]=0,n[10]=i,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function yb(n,t){var e=Math.sin(t),i=Math.cos(t);return n[0]=i,n[1]=e,n[2]=0,n[3]=0,n[4]=-e,n[5]=i,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=1,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function hg(n,t,e){var i=t[0],s=t[1],r=t[2],o=t[3],a=i+i,l=s+s,c=r+r,h=i*a,d=i*l,u=i*c,f=s*l,g=s*c,x=r*c,m=o*a,p=o*l,E=o*c;return n[0]=1-(f+x),n[1]=d+E,n[2]=u-p,n[3]=0,n[4]=d-E,n[5]=1-(h+x),n[6]=g+m,n[7]=0,n[8]=u+p,n[9]=g-m,n[10]=1-(h+f),n[11]=0,n[12]=e[0],n[13]=e[1],n[14]=e[2],n[15]=1,n}function vb(n,t){var e=new $e(3),i=-t[0],s=-t[1],r=-t[2],o=t[3],a=t[4],l=t[5],c=t[6],h=t[7],d=i*i+s*s+r*r+o*o;return d>0?(e[0]=(a*o+h*i+l*r-c*s)*2/d,e[1]=(l*o+h*s+c*i-a*r)*2/d,e[2]=(c*o+h*r+a*s-l*i)*2/d):(e[0]=(a*o+h*i+l*r-c*s)*2,e[1]=(l*o+h*s+c*i-a*r)*2,e[2]=(c*o+h*r+a*s-l*i)*2),hg(n,t,e),n}function Mb(n,t){return n[0]=t[12],n[1]=t[13],n[2]=t[14],n}function ug(n,t){var e=t[0],i=t[1],s=t[2],r=t[4],o=t[5],a=t[6],l=t[8],c=t[9],h=t[10];return n[0]=Math.hypot(e,i,s),n[1]=Math.hypot(r,o,a),n[2]=Math.hypot(l,c,h),n}function bb(n,t){var e=new $e(3);ug(e,t);var i=1/e[0],s=1/e[1],r=1/e[2],o=t[0]*i,a=t[1]*s,l=t[2]*r,c=t[4]*i,h=t[5]*s,d=t[6]*r,u=t[8]*i,f=t[9]*s,g=t[10]*r,x=o+h+g,m=0;return x>0?(m=Math.sqrt(x+1)*2,n[3]=.25*m,n[0]=(d-f)/m,n[1]=(u-l)/m,n[2]=(a-c)/m):o>h&&o>g?(m=Math.sqrt(1+o-h-g)*2,n[3]=(d-f)/m,n[0]=.25*m,n[1]=(a+c)/m,n[2]=(u+l)/m):h>g?(m=Math.sqrt(1+h-o-g)*2,n[3]=(u-l)/m,n[0]=(a+c)/m,n[1]=.25*m,n[2]=(d+f)/m):(m=Math.sqrt(1+g-o-h)*2,n[3]=(a-c)/m,n[0]=(u+l)/m,n[1]=(d+f)/m,n[2]=.25*m),n}function Sb(n,t,e,i){var s=t[0],r=t[1],o=t[2],a=t[3],l=s+s,c=r+r,h=o+o,d=s*l,u=s*c,f=s*h,g=r*c,x=r*h,m=o*h,p=a*l,E=a*c,b=a*h,_=i[0],T=i[1],A=i[2];return n[0]=(1-(g+m))*_,n[1]=(u+b)*_,n[2]=(f-E)*_,n[3]=0,n[4]=(u-b)*T,n[5]=(1-(d+m))*T,n[6]=(x+p)*T,n[7]=0,n[8]=(f+E)*A,n[9]=(x-p)*A,n[10]=(1-(d+g))*A,n[11]=0,n[12]=e[0],n[13]=e[1],n[14]=e[2],n[15]=1,n}function wb(n,t,e,i,s){var r=t[0],o=t[1],a=t[2],l=t[3],c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,g=r*d,x=o*h,m=o*d,p=a*d,E=l*c,b=l*h,_=l*d,T=i[0],A=i[1],D=i[2],v=s[0],w=s[1],y=s[2],N=(1-(x+p))*T,O=(f+_)*T,B=(g-b)*T,V=(f-_)*A,Y=(1-(u+p))*A,k=(m+E)*A,K=(g+b)*D,X=(m-E)*D,st=(1-(u+x))*D;return n[0]=N,n[1]=O,n[2]=B,n[3]=0,n[4]=V,n[5]=Y,n[6]=k,n[7]=0,n[8]=K,n[9]=X,n[10]=st,n[11]=0,n[12]=e[0]+v-(N*v+V*w+K*y),n[13]=e[1]+w-(O*v+Y*w+X*y),n[14]=e[2]+y-(B*v+k*w+st*y),n[15]=1,n}function Eb(n,t){var e=t[0],i=t[1],s=t[2],r=t[3],o=e+e,a=i+i,l=s+s,c=e*o,h=i*o,d=i*a,u=s*o,f=s*a,g=s*l,x=r*o,m=r*a,p=r*l;return n[0]=1-d-g,n[1]=h+p,n[2]=u-m,n[3]=0,n[4]=h-p,n[5]=1-c-g,n[6]=f+x,n[7]=0,n[8]=u+m,n[9]=f-x,n[10]=1-c-d,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,n}function Tb(n,t,e,i,s,r,o){var a=1/(e-t),l=1/(s-i),c=1/(r-o);return n[0]=r*2*a,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=r*2*l,n[6]=0,n[7]=0,n[8]=(e+t)*a,n[9]=(s+i)*l,n[10]=(o+r)*c,n[11]=-1,n[12]=0,n[13]=0,n[14]=o*r*2*c,n[15]=0,n}function dg(n,t,e,i,s){var r=1/Math.tan(t/2),o;return n[0]=r/e,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=r,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[11]=-1,n[12]=0,n[13]=0,n[15]=0,s!=null&&s!==1/0?(o=1/(i-s),n[10]=(s+i)*o,n[14]=2*s*i*o):(n[10]=-1,n[14]=-2*i),n}var Ab=dg;function Cb(n,t,e,i,s){var r=1/Math.tan(t/2),o;return n[0]=r/e,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=r,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[11]=-1,n[12]=0,n[13]=0,n[15]=0,s!=null&&s!==1/0?(o=1/(i-s),n[10]=s*o,n[14]=s*i*o):(n[10]=-1,n[14]=-i),n}function Rb(n,t,e,i){var s=Math.tan(t.upDegrees*Math.PI/180),r=Math.tan(t.downDegrees*Math.PI/180),o=Math.tan(t.leftDegrees*Math.PI/180),a=Math.tan(t.rightDegrees*Math.PI/180),l=2/(o+a),c=2/(s+r);return n[0]=l,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=c,n[6]=0,n[7]=0,n[8]=-((o-a)*l*.5),n[9]=(s-r)*c*.5,n[10]=i/(e-i),n[11]=-1,n[12]=0,n[13]=0,n[14]=i*e/(e-i),n[15]=0,n}function fg(n,t,e,i,s,r,o){var a=1/(t-e),l=1/(i-s),c=1/(r-o);return n[0]=-2*a,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=-2*l,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=2*c,n[11]=0,n[12]=(t+e)*a,n[13]=(s+i)*l,n[14]=(o+r)*c,n[15]=1,n}var Pb=fg;function Ib(n,t,e,i,s,r,o){var a=1/(t-e),l=1/(i-s),c=1/(r-o);return n[0]=-2*a,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=-2*l,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[10]=c,n[11]=0,n[12]=(t+e)*a,n[13]=(s+i)*l,n[14]=r*c,n[15]=1,n}function Lb(n,t,e,i){var s,r,o,a,l,c,h,d,u,f,g=t[0],x=t[1],m=t[2],p=i[0],E=i[1],b=i[2],_=e[0],T=e[1],A=e[2];return Math.abs(g-_)<xe&&Math.abs(x-T)<xe&&Math.abs(m-A)<xe?lg(n):(h=g-_,d=x-T,u=m-A,f=1/Math.hypot(h,d,u),h*=f,d*=f,u*=f,s=E*u-b*d,r=b*h-p*u,o=p*d-E*h,f=Math.hypot(s,r,o),f?(f=1/f,s*=f,r*=f,o*=f):(s=0,r=0,o=0),a=d*o-u*r,l=u*s-h*o,c=h*r-d*s,f=Math.hypot(a,l,c),f?(f=1/f,a*=f,l*=f,c*=f):(a=0,l=0,c=0),n[0]=s,n[1]=a,n[2]=h,n[3]=0,n[4]=r,n[5]=l,n[6]=d,n[7]=0,n[8]=o,n[9]=c,n[10]=u,n[11]=0,n[12]=-(s*g+r*x+o*m),n[13]=-(a*g+l*x+c*m),n[14]=-(h*g+d*x+u*m),n[15]=1,n)}function Db(n,t,e,i){var s=t[0],r=t[1],o=t[2],a=i[0],l=i[1],c=i[2],h=s-e[0],d=r-e[1],u=o-e[2],f=h*h+d*d+u*u;f>0&&(f=1/Math.sqrt(f),h*=f,d*=f,u*=f);var g=l*u-c*d,x=c*h-a*u,m=a*d-l*h;return f=g*g+x*x+m*m,f>0&&(f=1/Math.sqrt(f),g*=f,x*=f,m*=f),n[0]=g,n[1]=x,n[2]=m,n[3]=0,n[4]=d*m-u*x,n[5]=u*g-h*m,n[6]=h*x-d*g,n[7]=0,n[8]=h,n[9]=d,n[10]=u,n[11]=0,n[12]=s,n[13]=r,n[14]=o,n[15]=1,n}function Nb(n){return"mat4("+n[0]+", "+n[1]+", "+n[2]+", "+n[3]+", "+n[4]+", "+n[5]+", "+n[6]+", "+n[7]+", "+n[8]+", "+n[9]+", "+n[10]+", "+n[11]+", "+n[12]+", "+n[13]+", "+n[14]+", "+n[15]+")"}function Fb(n){return Math.hypot(n[0],n[1],n[2],n[3],n[4],n[5],n[6],n[7],n[8],n[9],n[10],n[11],n[12],n[13],n[14],n[15])}function Ub(n,t,e){return n[0]=t[0]+e[0],n[1]=t[1]+e[1],n[2]=t[2]+e[2],n[3]=t[3]+e[3],n[4]=t[4]+e[4],n[5]=t[5]+e[5],n[6]=t[6]+e[6],n[7]=t[7]+e[7],n[8]=t[8]+e[8],n[9]=t[9]+e[9],n[10]=t[10]+e[10],n[11]=t[11]+e[11],n[12]=t[12]+e[12],n[13]=t[13]+e[13],n[14]=t[14]+e[14],n[15]=t[15]+e[15],n}function pg(n,t,e){return n[0]=t[0]-e[0],n[1]=t[1]-e[1],n[2]=t[2]-e[2],n[3]=t[3]-e[3],n[4]=t[4]-e[4],n[5]=t[5]-e[5],n[6]=t[6]-e[6],n[7]=t[7]-e[7],n[8]=t[8]-e[8],n[9]=t[9]-e[9],n[10]=t[10]-e[10],n[11]=t[11]-e[11],n[12]=t[12]-e[12],n[13]=t[13]-e[13],n[14]=t[14]-e[14],n[15]=t[15]-e[15],n}function Ob(n,t,e){return n[0]=t[0]*e,n[1]=t[1]*e,n[2]=t[2]*e,n[3]=t[3]*e,n[4]=t[4]*e,n[5]=t[5]*e,n[6]=t[6]*e,n[7]=t[7]*e,n[8]=t[8]*e,n[9]=t[9]*e,n[10]=t[10]*e,n[11]=t[11]*e,n[12]=t[12]*e,n[13]=t[13]*e,n[14]=t[14]*e,n[15]=t[15]*e,n}function Bb(n,t,e,i){return n[0]=t[0]+e[0]*i,n[1]=t[1]+e[1]*i,n[2]=t[2]+e[2]*i,n[3]=t[3]+e[3]*i,n[4]=t[4]+e[4]*i,n[5]=t[5]+e[5]*i,n[6]=t[6]+e[6]*i,n[7]=t[7]+e[7]*i,n[8]=t[8]+e[8]*i,n[9]=t[9]+e[9]*i,n[10]=t[10]+e[10]*i,n[11]=t[11]+e[11]*i,n[12]=t[12]+e[12]*i,n[13]=t[13]+e[13]*i,n[14]=t[14]+e[14]*i,n[15]=t[15]+e[15]*i,n}function kb(n,t){return n[0]===t[0]&&n[1]===t[1]&&n[2]===t[2]&&n[3]===t[3]&&n[4]===t[4]&&n[5]===t[5]&&n[6]===t[6]&&n[7]===t[7]&&n[8]===t[8]&&n[9]===t[9]&&n[10]===t[10]&&n[11]===t[11]&&n[12]===t[12]&&n[13]===t[13]&&n[14]===t[14]&&n[15]===t[15]}function zb(n,t){var e=n[0],i=n[1],s=n[2],r=n[3],o=n[4],a=n[5],l=n[6],c=n[7],h=n[8],d=n[9],u=n[10],f=n[11],g=n[12],x=n[13],m=n[14],p=n[15],E=t[0],b=t[1],_=t[2],T=t[3],A=t[4],D=t[5],v=t[6],w=t[7],y=t[8],N=t[9],O=t[10],B=t[11],V=t[12],Y=t[13],k=t[14],K=t[15];return Math.abs(e-E)<=xe*Math.max(1,Math.abs(e),Math.abs(E))&&Math.abs(i-b)<=xe*Math.max(1,Math.abs(i),Math.abs(b))&&Math.abs(s-_)<=xe*Math.max(1,Math.abs(s),Math.abs(_))&&Math.abs(r-T)<=xe*Math.max(1,Math.abs(r),Math.abs(T))&&Math.abs(o-A)<=xe*Math.max(1,Math.abs(o),Math.abs(A))&&Math.abs(a-D)<=xe*Math.max(1,Math.abs(a),Math.abs(D))&&Math.abs(l-v)<=xe*Math.max(1,Math.abs(l),Math.abs(v))&&Math.abs(c-w)<=xe*Math.max(1,Math.abs(c),Math.abs(w))&&Math.abs(h-y)<=xe*Math.max(1,Math.abs(h),Math.abs(y))&&Math.abs(d-N)<=xe*Math.max(1,Math.abs(d),Math.abs(N))&&Math.abs(u-O)<=xe*Math.max(1,Math.abs(u),Math.abs(O))&&Math.abs(f-B)<=xe*Math.max(1,Math.abs(f),Math.abs(B))&&Math.abs(g-V)<=xe*Math.max(1,Math.abs(g),Math.abs(V))&&Math.abs(x-Y)<=xe*Math.max(1,Math.abs(x),Math.abs(Y))&&Math.abs(m-k)<=xe*Math.max(1,Math.abs(m),Math.abs(k))&&Math.abs(p-K)<=xe*Math.max(1,Math.abs(p),Math.abs(K))}var Vb=cg,Hb=pg;var bi={};Ja(bi,{add:()=>cw,calculateW:()=>KS,clone:()=>rw,conjugate:()=>nw,copy:()=>aw,create:()=>jd,dot:()=>Ng,equals:()=>mw,exactEquals:()=>pw,exp:()=>Pg,fromEuler:()=>iw,fromMat3:()=>Lg,fromValues:()=>ow,getAngle:()=>JS,getAxisAngle:()=>YS,identity:()=>qS,invert:()=>ew,len:()=>dw,length:()=>Fg,lerp:()=>uw,ln:()=>Ig,mul:()=>hw,multiply:()=>Rg,normalize:()=>$d,pow:()=>QS,random:()=>tw,rotateX:()=>ZS,rotateY:()=>jS,rotateZ:()=>$S,rotationTo:()=>gw,scale:()=>Dg,set:()=>lw,setAxes:()=>_w,setAxisAngle:()=>Cg,slerp:()=>hh,sqlerp:()=>xw,sqrLen:()=>fw,squaredLength:()=>Ug,str:()=>sw});var Le={};Ja(Le,{add:()=>qb,angle:()=>dS,bezier:()=>sS,ceil:()=>Yb,clone:()=>Gb,copy:()=>Wb,create:()=>rh,cross:()=>Sa,dist:()=>vS,distance:()=>yg,div:()=>yS,divide:()=>_g,dot:()=>ah,equals:()=>gS,exactEquals:()=>mS,floor:()=>Jb,forEach:()=>SS,fromValues:()=>oh,hermite:()=>iS,inverse:()=>eS,len:()=>Bd,length:()=>mg,lerp:()=>nS,max:()=>jb,min:()=>Zb,mul:()=>_S,multiply:()=>xg,negate:()=>tS,normalize:()=>Od,random:()=>rS,rotateX:()=>cS,rotateY:()=>hS,rotateZ:()=>uS,round:()=>$b,scale:()=>Kb,scaleAndAdd:()=>Qb,set:()=>Xb,sqrDist:()=>MS,sqrLen:()=>bS,squaredDistance:()=>vg,squaredLength:()=>Mg,str:()=>pS,sub:()=>xS,subtract:()=>gg,transformMat3:()=>aS,transformMat4:()=>oS,transformQuat:()=>lS,zero:()=>fS});function rh(){var n=new $e(3);return $e!=Float32Array&&(n[0]=0,n[1]=0,n[2]=0),n}function Gb(n){var t=new $e(3);return t[0]=n[0],t[1]=n[1],t[2]=n[2],t}function mg(n){var t=n[0],e=n[1],i=n[2];return Math.hypot(t,e,i)}function oh(n,t,e){var i=new $e(3);return i[0]=n,i[1]=t,i[2]=e,i}function Wb(n,t){return n[0]=t[0],n[1]=t[1],n[2]=t[2],n}function Xb(n,t,e,i){return n[0]=t,n[1]=e,n[2]=i,n}function qb(n,t,e){return n[0]=t[0]+e[0],n[1]=t[1]+e[1],n[2]=t[2]+e[2],n}function gg(n,t,e){return n[0]=t[0]-e[0],n[1]=t[1]-e[1],n[2]=t[2]-e[2],n}function xg(n,t,e){return n[0]=t[0]*e[0],n[1]=t[1]*e[1],n[2]=t[2]*e[2],n}function _g(n,t,e){return n[0]=t[0]/e[0],n[1]=t[1]/e[1],n[2]=t[2]/e[2],n}function Yb(n,t){return n[0]=Math.ceil(t[0]),n[1]=Math.ceil(t[1]),n[2]=Math.ceil(t[2]),n}function Jb(n,t){return n[0]=Math.floor(t[0]),n[1]=Math.floor(t[1]),n[2]=Math.floor(t[2]),n}function Zb(n,t,e){return n[0]=Math.min(t[0],e[0]),n[1]=Math.min(t[1],e[1]),n[2]=Math.min(t[2],e[2]),n}function jb(n,t,e){return n[0]=Math.max(t[0],e[0]),n[1]=Math.max(t[1],e[1]),n[2]=Math.max(t[2],e[2]),n}function $b(n,t){return n[0]=Math.round(t[0]),n[1]=Math.round(t[1]),n[2]=Math.round(t[2]),n}function Kb(n,t,e){return n[0]=t[0]*e,n[1]=t[1]*e,n[2]=t[2]*e,n}function Qb(n,t,e,i){return n[0]=t[0]+e[0]*i,n[1]=t[1]+e[1]*i,n[2]=t[2]+e[2]*i,n}function yg(n,t){var e=t[0]-n[0],i=t[1]-n[1],s=t[2]-n[2];return Math.hypot(e,i,s)}function vg(n,t){var e=t[0]-n[0],i=t[1]-n[1],s=t[2]-n[2];return e*e+i*i+s*s}function Mg(n){var t=n[0],e=n[1],i=n[2];return t*t+e*e+i*i}function tS(n,t){return n[0]=-t[0],n[1]=-t[1],n[2]=-t[2],n}function eS(n,t){return n[0]=1/t[0],n[1]=1/t[1],n[2]=1/t[2],n}function Od(n,t){var e=t[0],i=t[1],s=t[2],r=e*e+i*i+s*s;return r>0&&(r=1/Math.sqrt(r)),n[0]=t[0]*r,n[1]=t[1]*r,n[2]=t[2]*r,n}function ah(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function Sa(n,t,e){var i=t[0],s=t[1],r=t[2],o=e[0],a=e[1],l=e[2];return n[0]=s*l-r*a,n[1]=r*o-i*l,n[2]=i*a-s*o,n}function nS(n,t,e,i){var s=t[0],r=t[1],o=t[2];return n[0]=s+i*(e[0]-s),n[1]=r+i*(e[1]-r),n[2]=o+i*(e[2]-o),n}function iS(n,t,e,i,s,r){var o=r*r,a=o*(2*r-3)+1,l=o*(r-2)+r,c=o*(r-1),h=o*(3-2*r);return n[0]=t[0]*a+e[0]*l+i[0]*c+s[0]*h,n[1]=t[1]*a+e[1]*l+i[1]*c+s[1]*h,n[2]=t[2]*a+e[2]*l+i[2]*c+s[2]*h,n}function sS(n,t,e,i,s,r){var o=1-r,a=o*o,l=r*r,c=a*o,h=3*r*a,d=3*l*o,u=l*r;return n[0]=t[0]*c+e[0]*h+i[0]*d+s[0]*u,n[1]=t[1]*c+e[1]*h+i[1]*d+s[1]*u,n[2]=t[2]*c+e[2]*h+i[2]*d+s[2]*u,n}function rS(n,t){t=t||1;var e=ci()*2*Math.PI,i=ci()*2-1,s=Math.sqrt(1-i*i)*t;return n[0]=Math.cos(e)*s,n[1]=Math.sin(e)*s,n[2]=i*t,n}function oS(n,t,e){var i=t[0],s=t[1],r=t[2],o=e[3]*i+e[7]*s+e[11]*r+e[15];return o=o||1,n[0]=(e[0]*i+e[4]*s+e[8]*r+e[12])/o,n[1]=(e[1]*i+e[5]*s+e[9]*r+e[13])/o,n[2]=(e[2]*i+e[6]*s+e[10]*r+e[14])/o,n}function aS(n,t,e){var i=t[0],s=t[1],r=t[2];return n[0]=i*e[0]+s*e[3]+r*e[6],n[1]=i*e[1]+s*e[4]+r*e[7],n[2]=i*e[2]+s*e[5]+r*e[8],n}function lS(n,t,e){var i=e[0],s=e[1],r=e[2],o=e[3],a=t[0],l=t[1],c=t[2],h=s*c-r*l,d=r*a-i*c,u=i*l-s*a,f=s*u-r*d,g=r*h-i*u,x=i*d-s*h,m=o*2;return h*=m,d*=m,u*=m,f*=2,g*=2,x*=2,n[0]=a+h+f,n[1]=l+d+g,n[2]=c+u+x,n}function cS(n,t,e,i){var s=[],r=[];return s[0]=t[0]-e[0],s[1]=t[1]-e[1],s[2]=t[2]-e[2],r[0]=s[0],r[1]=s[1]*Math.cos(i)-s[2]*Math.sin(i),r[2]=s[1]*Math.sin(i)+s[2]*Math.cos(i),n[0]=r[0]+e[0],n[1]=r[1]+e[1],n[2]=r[2]+e[2],n}function hS(n,t,e,i){var s=[],r=[];return s[0]=t[0]-e[0],s[1]=t[1]-e[1],s[2]=t[2]-e[2],r[0]=s[2]*Math.sin(i)+s[0]*Math.cos(i),r[1]=s[1],r[2]=s[2]*Math.cos(i)-s[0]*Math.sin(i),n[0]=r[0]+e[0],n[1]=r[1]+e[1],n[2]=r[2]+e[2],n}function uS(n,t,e,i){var s=[],r=[];return s[0]=t[0]-e[0],s[1]=t[1]-e[1],s[2]=t[2]-e[2],r[0]=s[0]*Math.cos(i)-s[1]*Math.sin(i),r[1]=s[0]*Math.sin(i)+s[1]*Math.cos(i),r[2]=s[2],n[0]=r[0]+e[0],n[1]=r[1]+e[1],n[2]=r[2]+e[2],n}function dS(n,t){var e=n[0],i=n[1],s=n[2],r=t[0],o=t[1],a=t[2],l=Math.sqrt(e*e+i*i+s*s),c=Math.sqrt(r*r+o*o+a*a),h=l*c,d=h&&ah(n,t)/h;return Math.acos(Math.min(Math.max(d,-1),1))}function fS(n){return n[0]=0,n[1]=0,n[2]=0,n}function pS(n){return"vec3("+n[0]+", "+n[1]+", "+n[2]+")"}function mS(n,t){return n[0]===t[0]&&n[1]===t[1]&&n[2]===t[2]}function gS(n,t){var e=n[0],i=n[1],s=n[2],r=t[0],o=t[1],a=t[2];return Math.abs(e-r)<=xe*Math.max(1,Math.abs(e),Math.abs(r))&&Math.abs(i-o)<=xe*Math.max(1,Math.abs(i),Math.abs(o))&&Math.abs(s-a)<=xe*Math.max(1,Math.abs(s),Math.abs(a))}var xS=gg,_S=xg,yS=_g,vS=yg,MS=vg,Bd=mg,bS=Mg,SS=function(){var n=rh();return function(t,e,i,s,r,o){var a,l;for(e||(e=3),i||(i=0),s?l=Math.min(s*e+i,t.length):l=t.length,a=i;a<l;a+=e)n[0]=t[a],n[1]=t[a+1],n[2]=t[a+2],r(n,n,o),t[a]=n[0],t[a+1]=n[1],t[a+2]=n[2];return t}}();var xn={};Ja(xn,{add:()=>Gd,ceil:()=>wS,clone:()=>kd,copy:()=>Vd,create:()=>bg,cross:()=>LS,dist:()=>VS,distance:()=>Tg,div:()=>zS,divide:()=>Eg,dot:()=>qd,equals:()=>Zd,exactEquals:()=>Jd,floor:()=>ES,forEach:()=>XS,fromValues:()=>zd,inverse:()=>IS,len:()=>GS,length:()=>lh,lerp:()=>Yd,max:()=>AS,min:()=>TS,mul:()=>kS,multiply:()=>wg,negate:()=>PS,normalize:()=>Xd,random:()=>DS,round:()=>CS,scale:()=>Wd,scaleAndAdd:()=>RS,set:()=>Hd,sqrDist:()=>HS,sqrLen:()=>WS,squaredDistance:()=>Ag,squaredLength:()=>ch,str:()=>OS,sub:()=>BS,subtract:()=>Sg,transformMat4:()=>NS,transformQuat:()=>FS,zero:()=>US});function bg(){var n=new $e(4);return $e!=Float32Array&&(n[0]=0,n[1]=0,n[2]=0,n[3]=0),n}function kd(n){var t=new $e(4);return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t}function zd(n,t,e,i){var s=new $e(4);return s[0]=n,s[1]=t,s[2]=e,s[3]=i,s}function Vd(n,t){return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n}function Hd(n,t,e,i,s){return n[0]=t,n[1]=e,n[2]=i,n[3]=s,n}function Gd(n,t,e){return n[0]=t[0]+e[0],n[1]=t[1]+e[1],n[2]=t[2]+e[2],n[3]=t[3]+e[3],n}function Sg(n,t,e){return n[0]=t[0]-e[0],n[1]=t[1]-e[1],n[2]=t[2]-e[2],n[3]=t[3]-e[3],n}function wg(n,t,e){return n[0]=t[0]*e[0],n[1]=t[1]*e[1],n[2]=t[2]*e[2],n[3]=t[3]*e[3],n}function Eg(n,t,e){return n[0]=t[0]/e[0],n[1]=t[1]/e[1],n[2]=t[2]/e[2],n[3]=t[3]/e[3],n}function wS(n,t){return n[0]=Math.ceil(t[0]),n[1]=Math.ceil(t[1]),n[2]=Math.ceil(t[2]),n[3]=Math.ceil(t[3]),n}function ES(n,t){return n[0]=Math.floor(t[0]),n[1]=Math.floor(t[1]),n[2]=Math.floor(t[2]),n[3]=Math.floor(t[3]),n}function TS(n,t,e){return n[0]=Math.min(t[0],e[0]),n[1]=Math.min(t[1],e[1]),n[2]=Math.min(t[2],e[2]),n[3]=Math.min(t[3],e[3]),n}function AS(n,t,e){return n[0]=Math.max(t[0],e[0]),n[1]=Math.max(t[1],e[1]),n[2]=Math.max(t[2],e[2]),n[3]=Math.max(t[3],e[3]),n}function CS(n,t){return n[0]=Math.round(t[0]),n[1]=Math.round(t[1]),n[2]=Math.round(t[2]),n[3]=Math.round(t[3]),n}function Wd(n,t,e){return n[0]=t[0]*e,n[1]=t[1]*e,n[2]=t[2]*e,n[3]=t[3]*e,n}function RS(n,t,e,i){return n[0]=t[0]+e[0]*i,n[1]=t[1]+e[1]*i,n[2]=t[2]+e[2]*i,n[3]=t[3]+e[3]*i,n}function Tg(n,t){var e=t[0]-n[0],i=t[1]-n[1],s=t[2]-n[2],r=t[3]-n[3];return Math.hypot(e,i,s,r)}function Ag(n,t){var e=t[0]-n[0],i=t[1]-n[1],s=t[2]-n[2],r=t[3]-n[3];return e*e+i*i+s*s+r*r}function lh(n){var t=n[0],e=n[1],i=n[2],s=n[3];return Math.hypot(t,e,i,s)}function ch(n){var t=n[0],e=n[1],i=n[2],s=n[3];return t*t+e*e+i*i+s*s}function PS(n,t){return n[0]=-t[0],n[1]=-t[1],n[2]=-t[2],n[3]=-t[3],n}function IS(n,t){return n[0]=1/t[0],n[1]=1/t[1],n[2]=1/t[2],n[3]=1/t[3],n}function Xd(n,t){var e=t[0],i=t[1],s=t[2],r=t[3],o=e*e+i*i+s*s+r*r;return o>0&&(o=1/Math.sqrt(o)),n[0]=e*o,n[1]=i*o,n[2]=s*o,n[3]=r*o,n}function qd(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]+n[3]*t[3]}function LS(n,t,e,i){var s=e[0]*i[1]-e[1]*i[0],r=e[0]*i[2]-e[2]*i[0],o=e[0]*i[3]-e[3]*i[0],a=e[1]*i[2]-e[2]*i[1],l=e[1]*i[3]-e[3]*i[1],c=e[2]*i[3]-e[3]*i[2],h=t[0],d=t[1],u=t[2],f=t[3];return n[0]=d*c-u*l+f*a,n[1]=-(h*c)+u*o-f*r,n[2]=h*l-d*o+f*s,n[3]=-(h*a)+d*r-u*s,n}function Yd(n,t,e,i){var s=t[0],r=t[1],o=t[2],a=t[3];return n[0]=s+i*(e[0]-s),n[1]=r+i*(e[1]-r),n[2]=o+i*(e[2]-o),n[3]=a+i*(e[3]-a),n}function DS(n,t){t=t||1;var e,i,s,r,o,a;do e=ci()*2-1,i=ci()*2-1,o=e*e+i*i;while(o>=1);do s=ci()*2-1,r=ci()*2-1,a=s*s+r*r;while(a>=1);var l=Math.sqrt((1-o)/a);return n[0]=t*e,n[1]=t*i,n[2]=t*s*l,n[3]=t*r*l,n}function NS(n,t,e){var i=t[0],s=t[1],r=t[2],o=t[3];return n[0]=e[0]*i+e[4]*s+e[8]*r+e[12]*o,n[1]=e[1]*i+e[5]*s+e[9]*r+e[13]*o,n[2]=e[2]*i+e[6]*s+e[10]*r+e[14]*o,n[3]=e[3]*i+e[7]*s+e[11]*r+e[15]*o,n}function FS(n,t,e){var i=t[0],s=t[1],r=t[2],o=e[0],a=e[1],l=e[2],c=e[3],h=c*i+a*r-l*s,d=c*s+l*i-o*r,u=c*r+o*s-a*i,f=-o*i-a*s-l*r;return n[0]=h*c+f*-o+d*-l-u*-a,n[1]=d*c+f*-a+u*-o-h*-l,n[2]=u*c+f*-l+h*-a-d*-o,n[3]=t[3],n}function US(n){return n[0]=0,n[1]=0,n[2]=0,n[3]=0,n}function OS(n){return"vec4("+n[0]+", "+n[1]+", "+n[2]+", "+n[3]+")"}function Jd(n,t){return n[0]===t[0]&&n[1]===t[1]&&n[2]===t[2]&&n[3]===t[3]}function Zd(n,t){var e=n[0],i=n[1],s=n[2],r=n[3],o=t[0],a=t[1],l=t[2],c=t[3];return Math.abs(e-o)<=xe*Math.max(1,Math.abs(e),Math.abs(o))&&Math.abs(i-a)<=xe*Math.max(1,Math.abs(i),Math.abs(a))&&Math.abs(s-l)<=xe*Math.max(1,Math.abs(s),Math.abs(l))&&Math.abs(r-c)<=xe*Math.max(1,Math.abs(r),Math.abs(c))}var BS=Sg,kS=wg,zS=Eg,VS=Tg,HS=Ag,GS=lh,WS=ch,XS=function(){var n=bg();return function(t,e,i,s,r,o){var a,l;for(e||(e=4),i||(i=0),s?l=Math.min(s*e+i,t.length):l=t.length,a=i;a<l;a+=e)n[0]=t[a],n[1]=t[a+1],n[2]=t[a+2],n[3]=t[a+3],r(n,n,o),t[a]=n[0],t[a+1]=n[1],t[a+2]=n[2],t[a+3]=n[3];return t}}();function jd(){var n=new $e(4);return $e!=Float32Array&&(n[0]=0,n[1]=0,n[2]=0),n[3]=1,n}function qS(n){return n[0]=0,n[1]=0,n[2]=0,n[3]=1,n}function Cg(n,t,e){e=e*.5;var i=Math.sin(e);return n[0]=i*t[0],n[1]=i*t[1],n[2]=i*t[2],n[3]=Math.cos(e),n}function YS(n,t){var e=Math.acos(t[3])*2,i=Math.sin(e/2);return i>xe?(n[0]=t[0]/i,n[1]=t[1]/i,n[2]=t[2]/i):(n[0]=1,n[1]=0,n[2]=0),e}function JS(n,t){var e=Ng(n,t);return Math.acos(2*e*e-1)}function Rg(n,t,e){var i=t[0],s=t[1],r=t[2],o=t[3],a=e[0],l=e[1],c=e[2],h=e[3];return n[0]=i*h+o*a+s*c-r*l,n[1]=s*h+o*l+r*a-i*c,n[2]=r*h+o*c+i*l-s*a,n[3]=o*h-i*a-s*l-r*c,n}function ZS(n,t,e){e*=.5;var i=t[0],s=t[1],r=t[2],o=t[3],a=Math.sin(e),l=Math.cos(e);return n[0]=i*l+o*a,n[1]=s*l+r*a,n[2]=r*l-s*a,n[3]=o*l-i*a,n}function jS(n,t,e){e*=.5;var i=t[0],s=t[1],r=t[2],o=t[3],a=Math.sin(e),l=Math.cos(e);return n[0]=i*l-r*a,n[1]=s*l+o*a,n[2]=r*l+i*a,n[3]=o*l-s*a,n}function $S(n,t,e){e*=.5;var i=t[0],s=t[1],r=t[2],o=t[3],a=Math.sin(e),l=Math.cos(e);return n[0]=i*l+s*a,n[1]=s*l-i*a,n[2]=r*l+o*a,n[3]=o*l-r*a,n}function KS(n,t){var e=t[0],i=t[1],s=t[2];return n[0]=e,n[1]=i,n[2]=s,n[3]=Math.sqrt(Math.abs(1-e*e-i*i-s*s)),n}function Pg(n,t){var e=t[0],i=t[1],s=t[2],r=t[3],o=Math.sqrt(e*e+i*i+s*s),a=Math.exp(r),l=o>0?a*Math.sin(o)/o:0;return n[0]=e*l,n[1]=i*l,n[2]=s*l,n[3]=a*Math.cos(o),n}function Ig(n,t){var e=t[0],i=t[1],s=t[2],r=t[3],o=Math.sqrt(e*e+i*i+s*s),a=o>0?Math.atan2(o,r)/o:0;return n[0]=e*a,n[1]=i*a,n[2]=s*a,n[3]=.5*Math.log(e*e+i*i+s*s+r*r),n}function QS(n,t,e){return Ig(n,t),Dg(n,n,e),Pg(n,n),n}function hh(n,t,e,i){var s=t[0],r=t[1],o=t[2],a=t[3],l=e[0],c=e[1],h=e[2],d=e[3],u,f,g,x,m;return f=s*l+r*c+o*h+a*d,f<0&&(f=-f,l=-l,c=-c,h=-h,d=-d),1-f>xe?(u=Math.acos(f),g=Math.sin(u),x=Math.sin((1-i)*u)/g,m=Math.sin(i*u)/g):(x=1-i,m=i),n[0]=x*s+m*l,n[1]=x*r+m*c,n[2]=x*o+m*h,n[3]=x*a+m*d,n}function tw(n){var t=ci(),e=ci(),i=ci(),s=Math.sqrt(1-t),r=Math.sqrt(t);return n[0]=s*Math.sin(2*Math.PI*e),n[1]=s*Math.cos(2*Math.PI*e),n[2]=r*Math.sin(2*Math.PI*i),n[3]=r*Math.cos(2*Math.PI*i),n}function ew(n,t){var e=t[0],i=t[1],s=t[2],r=t[3],o=e*e+i*i+s*s+r*r,a=o?1/o:0;return n[0]=-e*a,n[1]=-i*a,n[2]=-s*a,n[3]=r*a,n}function nw(n,t){return n[0]=-t[0],n[1]=-t[1],n[2]=-t[2],n[3]=t[3],n}function Lg(n,t){var e=t[0]+t[4]+t[8],i;if(e>0)i=Math.sqrt(e+1),n[3]=.5*i,i=.5/i,n[0]=(t[5]-t[7])*i,n[1]=(t[6]-t[2])*i,n[2]=(t[1]-t[3])*i;else{var s=0;t[4]>t[0]&&(s=1),t[8]>t[s*3+s]&&(s=2);var r=(s+1)%3,o=(s+2)%3;i=Math.sqrt(t[s*3+s]-t[r*3+r]-t[o*3+o]+1),n[s]=.5*i,i=.5/i,n[3]=(t[r*3+o]-t[o*3+r])*i,n[r]=(t[r*3+s]+t[s*3+r])*i,n[o]=(t[o*3+s]+t[s*3+o])*i}return n}function iw(n,t,e,i){var s=.5*Math.PI/180;t*=s,e*=s,i*=s;var r=Math.sin(t),o=Math.cos(t),a=Math.sin(e),l=Math.cos(e),c=Math.sin(i),h=Math.cos(i);return n[0]=r*l*h-o*a*c,n[1]=o*a*h+r*l*c,n[2]=o*l*c-r*a*h,n[3]=o*l*h+r*a*c,n}function sw(n){return"quat("+n[0]+", "+n[1]+", "+n[2]+", "+n[3]+")"}var rw=kd,ow=zd,aw=Vd,lw=Hd,cw=Gd,hw=Rg,Dg=Wd,Ng=qd,uw=Yd,Fg=lh,dw=Fg,Ug=ch,fw=Ug,$d=Xd,pw=Jd,mw=Zd,gw=function(){var n=rh(),t=oh(1,0,0),e=oh(0,1,0);return function(i,s,r){var o=ah(s,r);return o<-.999999?(Sa(n,t,s),Bd(n)<1e-6&&Sa(n,e,s),Od(n,n),Cg(i,n,Math.PI),i):o>.999999?(i[0]=0,i[1]=0,i[2]=0,i[3]=1,i):(Sa(n,s,r),i[0]=n[0],i[1]=n[1],i[2]=n[2],i[3]=1+o,$d(i,i))}}(),xw=function(){var n=jd(),t=jd();return function(e,i,s,r,o,a){return hh(n,i,o,a),hh(t,s,r,a),hh(e,n,t,2*a*(1-a)),e}}(),_w=function(){var n=ag();return function(t,e,i,s){return n[0]=i[0],n[3]=i[1],n[6]=i[2],n[1]=s[0],n[4]=s[1],n[7]=s[2],n[2]=-e[0],n[5]=-e[1],n[8]=-e[2],$d(t,Lg(t,n))}}();var Kd=new Float64Array(16);function Qd(n,t,e){xn.scale(Kd,e,-1),xn.squaredDistance(t,Kd)<xn.squaredDistance(t,e)?xn.subtract(n,t,Kd):xn.subtract(n,t,e)}var Og=new Float64Array(16);function Bg(n,t){return Qd(Og,n,t),xn.squaredLength(Og)}var os=Math.PI,hr=2*os,Cs=os/2,wa=Math.PI/180,Un=1/wa;var no=new Float32Array(16),uh=new Float32Array(16),Si=new Float32Array(4),io=new Float32Array(3),kg=new Set,yw=[],Rs=!1,so=class{constructor(){this.name="",this.quaternion=new Float32Array([0,0,0,1]),this.position=new Float32Array(3),this.matrix=new Float32Array(16),Yt.identity(this.matrix),this.matrixWorld=new Float32Array(16),Yt.identity(this.matrixWorld),this.matrixNeedsUpdate=!1,this.matrixWorldNeedsUpdate=!1,this.parent=null,this.children=[]}setPosition(...t){let e=this.position;Le.sqrDist(e,t)>1e-10&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],this.setMatrixNeedsUpdate())}setEuler(t,e,i){bi.fromEuler(Si,t*Un,e*Un,i*Un),this.setQuaternion(...Si)}setQuaternion(...t){let e=this.quaternion;Bg(e,t)>1e-10&&(e[0]=t[0],e[1]=t[1],e[2]=t[2],e[3]=t[3],this.setMatrixNeedsUpdate())}setWorldPosition(t,e,i){let s=this.parent;io[0]=t,io[1]=e,io[2]=i,s&&(s.updateMatrixWorld(),Yt.invert(no,s.matrixWorld),Le.transformMat4(io,io,no)),this.setPosition(...io)}setWorldEuler(t,e,i){bi.fromEuler(Si,t*Un,e*Un,i*Un),this.setWorldQuaternion(...Si)}setWorldQuaternion(t,e,i,s){let r=this;Si[0]=t,Si[1]=e,Si[2]=i,Si[3]=s,r&&(r.updateMatrixWorld(),Yt.invert(no,r.matrixWorld),Yt.fromQuat(uh,Si),Yt.multiply(uh,no,uh),Yt.getRotation(Si,uh)),this.setQuaternion(...Si)}getWorldPosition(t){this.updateMatrixWorld(),Yt.getTranslation(t,this.matrixWorld)}getWorldQuaternion(t){this.updateMatrixWorld(),Yt.getRotation(t,this.matrixWorld)}traverseParents(t){let e,i=Rs;Rs?e=new Set:(e=kg,e.clear()),Rs=!0;let s=this.parent;for(;s&&!e.has(s);){if(t(s))return;e.add(s),s=s.parent}Rs=i,e.clear()}traverse(t){let e=Rs,i,s;Rs?(i=new Set,s=[this]):(i=kg,i.clear(),s=yw,s[0]=this),Rs=!0;let r=0,o=1;for(;r<o;){let a=s[r];if(!t(a)){let c=a.children;for(let h=0,d=c.length;h<d;h++){let u=c[h];i.has(u)||(i.add(u),s[o]=u,o++)}}r++}Rs=e,i.clear(),s.fill(null)}find(t){let e=null;return this.traverse(i=>{if(e)return!0;if(t(i))return e=i,!0}),e}addChild(t){if(t.parent)throw new Error("Frame: Added child must not already have a parent.");if(t===this)throw new Error("Frame: Frame cannot be added as a child to itself.");this.traverseParents(e=>{if(e===t)throw new Error("Frame: Added child is an ancestor of this Frame. Use Joint.makeClosure instead.")}),t.parent=this,this.children.push(t),t.setMatrixWorldNeedsUpdate()}removeChild(t){if(t.parent!==this)throw new Error("Frame: Child to be removed is not a child of this Frame.");let e=this.children.indexOf(t);this.children.splice(e,1),t.parent=null,t.setMatrixWorldNeedsUpdate()}attachChild(t){this.updateMatrixWorld(),t.updateMatrixWorld(),this.addChild(t),Yt.invert(no,this.matrixWorld),Yt.multiply(t.matrix,no,t.matrixWorld),Yt.getTranslation(t.position,t.matrix),Yt.getRotation(t.quaternion,t.matrix)}detachChild(t){this.updateMatrixWorld(),t.updateMatrixWorld(),this.removeChild(t),Yt.copy(t.matrix,t.matrixWorld),Yt.getTranslation(t.position,t.matrix),Yt.getRotation(t.quaternion,t.matrix)}computeMatrixWorld(){this.parent?Yt.multiply(this.matrixWorld,this.parent.matrixWorld,this.matrix):Yt.copy(this.matrixWorld,this.matrix)}setMatrixNeedsUpdate(){this.matrixNeedsUpdate===!1&&(this.matrixNeedsUpdate=!0,this.setMatrixWorldNeedsUpdate())}setMatrixWorldNeedsUpdate(){this.traverse(t=>t.matrixWorldNeedsUpdate?!0:(t.matrixWorldNeedsUpdate=!0,!1))}updateMatrix(){this.matrixNeedsUpdate&&(Yt.fromRotationTranslation(this.matrix,this.quaternion,this.position),this.matrixNeedsUpdate=!1)}updateMatrixWorld(t=!1){let{parent:e}=this;this.matrixWorldNeedsUpdate&&(e&&e.matrixWorldNeedsUpdate&&e.updateMatrixWorld(!1),this.updateMatrix(),this.computeMatrixWorld(),this.matrixWorldNeedsUpdate=!1),t&&this.traverse(i=>{this!==i&&i.updateMatrixWorld(!1)})}};var as=class extends so{constructor(){super(),this.isLink=!0,this.closureJoints=[]}addChild(t){if(t.isJoint)super.addChild(t);else throw new Error("Link: Added child must be a Joint.")}};function ef(n){let t=n%hr;return t>os?t-=hr:t<=-os&&(t+=hr),t}function Ps(n,t){let e=Math.round(n/hr)*hr,i=ef(t),s=e+i,r=s-n;return Math.abs(r)>os&&(s-=Math.sign(r)*hr),s}function tf(n,t,e){n[0]=Ps(t[0],e[0]),n[1]=Ps(t[1],e[1]),n[2]=Ps(t[2],e[2])}function dh(n,t){return Math.abs(n[0]-t[0])+Math.abs(n[1]-t[1])+Math.abs(n[2]-t[2])}function zg(n,t){n[0]=t[0]+os,n[1]=os-t[1],n[2]=t[2]+os}function Hg(n){let t=ef(n[1]);return!(Math.abs(Math.abs(t)-Cs)>1e-7)}function Vg(n,t,e){if(!Hg(e))return!1;let i=ef(e[1]),s=-1*Math.sign(i),r=e[0]+s*e[2];return n[0]=t[0],n[1]=Ps(t[1],e[1]),n[2]=Ps(t[2],s*(r-t[0])),tf(n,t,n),!0}var ro=new Float64Array(3),Ni=new Float64Array(3);function fh(n,t,e){let i=1/0;if(Hg(e)){Vg(ro,t,e),zg(Ni,e),Vg(Ni,t,Ni);let o=dh(t,ro),a=dh(t,Ni);o<a?(Le.copy(n,ro),i=o):(Le.copy(n,Ni),i=a)}tf(ro,t,e),zg(Ni,e),tf(Ni,t,Ni);let s=dh(t,ro),r=dh(t,Ni);(s<i||r<i)&&(s<r?Le.copy(n,ro):Le.copy(n,Ni))}var Gg=new Float64Array(3),Wg=new Float64Array(4),Xg=new Float64Array(3),qg=new Float64Array(4);function Yg(n,t){let[e,i,s,r]=t,o=2*(r*e+i*s),a=1-2*(e*e+i*i),l=Math.atan2(o,a),c=2*(r*i-s*e);c=c>1?1:c,c=c<-1?-1:c;let h=Math.asin(c),d=2*(r*s+e*i),u=1-2*(i*i+s*s),f=Math.atan2(d,u);return n[0]=l*Un,n[1]=h*Un,n[2]=f*Un,n}function Ea(n,t,e,i){Yt.getTranslation(Gg,n),Yt.getRotation(Wg,n),Yt.getTranslation(Xg,t),Yt.getRotation(qg,t),Le.subtract(e,Gg,Xg),Qd(i,Wg,qg)}var ht={X:0,Y:1,Z:2,EX:3,EY:4,EZ:5},$g=Object.entries(ht).sort((n,t)=>n[1]-t[1]).map(n=>n[0]),ph=new Float32Array(16),Jg=new Float32Array(16),Zg=new Float32Array(4),sn=new Float32Array(3),Ta=new Float32Array(3),ur=new Float32Array(3),mh=new Float32Array(6);function jg(n,t){bi.fromEuler(Zg,t[ht.EX]*Un,t[ht.EY]*Un,t[ht.EZ]*Un),Yt.fromRotationTranslation(n,Zg,t)}var wi=class extends so{constructor(){super(),this.isJoint=!0,this.child=null,this.isClosure=!1,this.trackJointWrap=!1,this.rotationDoFCount=0,this.translationDoFCount=0,this.dof=[],this.dofFlags=new Uint8Array(6),this.dofValues=new Float32Array(6),this.dofTarget=new Float32Array(6),this.dofRestPose=new Float32Array(6),this.minDoFLimit=new Float32Array(6).fill(-1/0),this.maxDoFLimit=new Float32Array(6).fill(1/0),this.targetSet=!1,this.restPoseSet=!1,this.matrixDoFNeedsUpdate=!1,this.matrixDoF=new Float32Array(16),Yt.identity(this.matrixDoF),this.cachedIdentityDoFMatrixWorld=new Float32Array(16),Yt.identity(this.cachedIdentityDoFMatrixWorld)}_getQuaternion(t,e){bi.fromEuler(e,t[ht.EX],t[ht.EY],t[ht.EZ])}_getEuler(t,e){e[0]=t[ht.EX],e[1]=t[ht.EY],e[2]=t[ht.EZ]}_getPosition(t,e){e[0]=t[ht.X],e[1]=t[ht.Y],e[2]=t[ht.Z]}_setValue(t,e,i){if(t===this.minDoFLimit||t==this.maxDoFLimit)throw new Error("Joint: Cannot set minDoFLimit or maxDoFLimit with _setValue.");if(e<0||e>6||typeof e!="number")throw new Error("Joint: Invalid DoF.");if(!this.dofFlags[e])return!1;let s=this.minDoFLimit[e],r=this.maxDoFLimit[e];return i<s&&(i=s),i>r&&(i=r),t[e]=i,i===r||i===s}_setValues(t,e){let i=this.dof;for(let s=0,r=e.length;s<r;s++)this._setValue(t,i[s],e[s])}_setViaFullPosition(t,e){let i=this.dofFlags;for(let s=0;s<3;s++)t[s]=i[s]*e[s]}_setViaFullEuler(t,e){let i=this.dofFlags;for(let s=3;s<6;s++)t[s]=i[s]*e[s-3];this.tryMinimizeEulerAngles()}_setViaQuaternion(t,e){if(Yg(ur,e),ur[0]*=wa,ur[1]*=wa,ur[2]*=wa,this.trackJointWrap){let i=this.dofValues;sn[0]=i[ht.EX],sn[1]=i[ht.EY],sn[2]=i[ht.EZ],fh(ur,sn,ur)}this._setViaFullEuler(t,ur)}clearDoF(){this.setDoF()}setDoF(...t){t.forEach((e,i)=>{if(e<0||e>=6)throw new Error("Joint: Invalid degree of freedom enum "+e+".");if(t.includes(e,i+1))throw new Error("Joint: Duplicate degree of freedom "+$g[e]+"specified.");if(i!==0&&t[i-1]>e)throw new Error("Joint: Joints degrees of freedom must be specified in position then rotation, XYZ order")}),this.dof=t,this.dofValues.fill(0),this.dofTarget.fill(0),this.dofRestPose.fill(0),this.minDoFLimit.fill(-1/0),this.maxDoFLimit.fill(1/0),this.setMatrixDoFNeedsUpdate();for(let e=0;e<6;e++)this.dofFlags[e]=Number(t.includes(e));this.rotationDoFCount=this.dofFlags[ht.EX]+this.dofFlags[ht.EY]+this.dofFlags[ht.EZ],this.translationDoFCount=this.dofFlags[ht.X]+this.dofFlags[ht.Y]+this.dofFlags[ht.Z]}setDoFValues(...t){this.setMatrixDoFNeedsUpdate(),this._setValues(this.dofValues,t)}setDoFValue(t,e){return this.setMatrixDoFNeedsUpdate(),this._setValue(this.dofValues,t,e)}getDoFValue(t){return this.dofValues[t]}getDoFQuaternion(t){this._getQuaternion(this.dofValues,t)}getDoFEuler(t){this._getEuler(this.dofValues,t)}getDoFPosition(t){this._getPosition(this.dofValues,t)}setRestPoseValues(...t){this._setValues(this.dofRestPose,t)}setRestPoseValue(t,e){return this._setValue(this.dofRestPose,t,e)}getRestPoseValue(t){return this.dofRestPose[t]}getRestPoseQuaternion(t){this._getQuaternion(this.dofRestPose,t)}getRestPoseEuler(t){this._getEuler(this.dofRestPose,t)}getRestPosePosition(t){this._getPosition(this.dofRestPose,t)}setTargetValues(...t){this._setValues(this.dofTarget,t)}setTargetValue(t,e){this._setValue(this.dofTarget,t,e)}getTargetValue(t){return this.dofTarget[t]}getTargetQuaternion(t){this._getQuaternion(this.dofTarget,t)}getTargetEuler(t){this._getEuler(this.dofTarget,t)}getTargetPosition(t){this._getPosition(this.dofTarget,t)}setMinLimits(...t){let{dof:e}=this;for(let i in t){let s=e[i];this.setMinLimit(s,t[i])}}setMinLimit(t,e){this.minDoFLimit[t]=e,this.setDoFValue(t,this.dofValues[t])}getMinLimit(t){return this.minDoFLimit[t]}setMaxLimits(...t){let{dof:e}=this;for(let i in t){let s=e[i];this.setMaxLimit(s,t[i])}}setMaxLimit(t,e){this.maxDoFLimit[t]=e,this.setDoFValue(t,this.dofValues[t])}getMaxLimit(t){return this.maxDoFLimit[t]}getClosureError(t,e){if(!this.isClosure)throw new Error("Joint: Cannot get closure error on non closure Joint.");this.updateMatrixWorld(),this.child.updateMatrixWorld(),Ea(this.matrixWorld,this.child.matrixWorld,t,e)}tryMinimizeEulerAngles(){let{trackJointWrap:t,rotationDoFCount:e,dofRestPose:i,dofTarget:s,dofValues:r}=this;if(!t)if(e<3)for(let o=ht.EX;o<=ht.EZ;o++)s[o]=Ps(r[o],s[o]),i[o]=Ps(r[o],i[o]);else Ta[0]=r[ht.EX],Ta[1]=r[ht.EY],Ta[2]=r[ht.EZ],sn[0]=s[ht.EX],sn[1]=s[ht.EY],sn[2]=s[ht.EZ],fh(sn,Ta,sn),s[ht.EX]=sn[0],s[ht.EY]=sn[1],s[ht.EZ]=sn[2],sn[0]=i[ht.EX],sn[1]=i[ht.EY],sn[2]=i[ht.EZ],fh(sn,Ta,sn),i[ht.EX]=sn[0],i[ht.EY]=sn[1],i[ht.EZ]=sn[2]}getDeltaWorldMatrix(t,e,i){let{dofValues:s,minDoFLimit:r,maxDoFLimit:o,cachedIdentityDoFMatrixWorld:a}=this;this.updateMatrixWorld(),mh.set(s);let l=r[t],c=o[t],h=mh[t],d=h-l,u=c-h,f=h+e,g=e>0&&f>c,x=e<0&&f<l,m=g&&d>u||x&&u>d;return m&&(f=h-e),mh[t]=f,jg(Jg,mh),Yt.multiply(i,a,Jg),m}setMatrixDoFNeedsUpdate(){this.matrixDoFNeedsUpdate===!1&&(this.matrixDoFNeedsUpdate=!0,this.setMatrixWorldNeedsUpdate())}updateDoFMatrix(){this.matrixDoFNeedsUpdate&&(jg(this.matrixDoF,this.dofValues),this.matrixDoFNeedsUpdate=!1)}computeMatrixWorld(){let{parent:t,matrixWorld:e,matrix:i,matrixDoF:s,cachedIdentityDoFMatrixWorld:r}=this;this.updateDoFMatrix(),Yt.multiply(e,i,s),t?(Yt.multiply(e,t.matrixWorld,e),Yt.multiply(r,t.matrixWorld,i)):Yt.copy(r,i)}makeClosure(t){if(!t.isLink||this.child||t.parent===this)throw new Error("Joint: Given child cannot be used to make closure.");this.child=t,this.isClosure=!0,t.closureJoints.push(this)}addChild(t){if(!t.isLink||this.child||t.parent===this)throw new Error("Joint: Given child cannot be added to Joint.");super.addChild(t),this.child=t,this.isClosure=!1}removeChild(t){if(this.isClosure){if(this.child!==t)throw new Error("Frame: Child to be removed is not a child of this Joint.");{this.child=null,this.isClosure=!1;let e=t.closureJoints.indexOf(this);t.closureJoints.splice(e,1)}}else super.removeChild(t)}attachChild(t){super.attachChild(t),Yt.invert(ph,this.matrixDoF),Yt.multiply(t.matrix,ph,t.matrix),Yt.getTranslation(t.position,t.matrix),Yt.getRotation(t.quaternion,t.matrix)}detachChild(t){super.detachChild(t),Yt.invert(ph,this.matrixDoF),Yt.multiply(t.matrix,ph,t.matrix),Yt.getTranslation(t.position,t.matrix),Yt.getRotation(t.quaternion,t.matrix)}};var oo=class extends wi{constructor(...t){super(...t),this.isGoal=!0,this.setFreeDoF()}setDoF(...t){let e=Number(t.includes(ht.EX))+Number(t.includes(ht.EY))+Number(t.includes(ht.EZ));if(e!==0&&e!==3)throw new Error("Goal: Only full 3 DoF or 0 DoF rotation goals are supported.");super.setDoF(...t)}setGoalDoF(...t){this.setDoF(...t)}setFreeDoF(...t){let e=[ht.X,ht.Y,ht.Z,ht.EX,ht.EY,ht.EZ].filter(i=>!t.includes(i));this.setDoF(...e)}addChild(){throw new Error("Goal: Cannot add children to Goal.")}};var rn=new Float64Array(3),_n=new Float64Array(4),dr=new Float64Array(3);function nf(n,t,e,i=null,s={isConverged:!1,rowCount:7,totalError:0}){let{translationConvergeThreshold:r,rotationConvergeThreshold:o,translationErrorClamp:a,rotationErrorClamp:l,translationFactor:c,rotationFactor:h}=n,{translationDoFCount:d,rotationDoFCount:u,dofFlags:f,dof:g}=t;t.getClosureError(rn,_n);let x=7;t.isGoal&&(rn[0]*=f[0],rn[1]*=f[1],rn[2]*=f[2],x=d,u===0?(_n[0]=0,_n[1]=0,_n[2]=0,_n[3]=0):x+=4);let m=!1,p=0,E=Le.length(rn),b=xn.length(_n);if(E<r&&b<o&&(m=!0),p+=E+b,i)if(E>a&&Le.scale(rn,rn,a/E),xn.scale(rn,rn,c),b>l&&xn.scale(_n,_n,l/b),xn.scale(_n,_n,h),t.isGoal){for(let _=0;_<d;_++){let T=g[_];i[e+_][0]=rn[T]}t.rotationDoFCount===3&&(i[e+d+0][0]=_n[0],i[e+d+1][0]=_n[1],i[e+d+2][0]=_n[2],i[e+d+3][0]=_n[3])}else i[e+0][0]=rn[0],i[e+1][0]=rn[1],i[e+2][0]=rn[2],i[e+3][0]=_n[0],i[e+4][0]=_n[1],i[e+5][0]=_n[2],i[e+6][0]=_n[3];return s.totalError=p,s.isConverged=m,s.rowCount=x,s}function sf(n,t,e,i=null,s={isConverged:!1,rowCount:7,totalError:0}){let{translationConvergeThreshold:r,rotationConvergeThreshold:o,lockedJointDoFCount:a,translationErrorClamp:l,rotationErrorClamp:c,lockedJointDoF:h}=n,{dofTarget:d,dofValues:u,translationDoFCount:f,rotationDoFCount:g,translationFactor:x,rotationFactor:m,dofList:p}=t,E=Le.distance(u,d),b=d[ht.EX]-u[ht.EX]+d[ht.EY]-u[ht.EY]+d[ht.EZ]-u[ht.EZ],_=a.get(t)||0;if(s.rowCount=f+g-_,s.isConverged=E<r&&b<o,s.totalError=E+b,i){let T=h.get(t),A=_!==0,D=0;rn[0]=d[0]-u[0],rn[1]=d[1]-u[1],rn[2]=d[2]-u[2];let v=Le.length(rn);Le.scale(rn,rn,x*l/v);for(let y=0,N=f;y<N;y++){let O=p[y];A&&T[O]||(i[e+D][0]=rn[O],D++)}dr[0]=t.dofTarget[3]-t.dofValues[3],dr[1]=t.dofTarget[4]-t.dofValues[4],dr[2]=t.dofTarget[5]-t.dofValues[5];let w=Le.length(dr);Le.scale(dr,dr,m*c/w);for(let y=f,N=f+g;y<N;y++){let O=p[y];A&&T[O]||(i[e+D][0]=dr[O],D++)}}}var vw=function(){let n={};function t(i,s){this.data=new Array(i.length);for(var r=0,o=i[0].length;r<i.length;r++){this.data[r]=new Array(o);for(var a=0;a<o;a++)this.data[r][a]=i[r][a]}if(s){if(typeof s[0]!="object")for(var r=0;r<s.length;r++)s[r]=[s[r]];this.mirror=new t(s)}}t.prototype.swap=function(i,s){this.mirror&&this.mirror.swap(i,s);var r=this.data[i];this.data[i]=this.data[s],this.data[s]=r},t.prototype.multline=function(i,s){this.mirror&&this.mirror.multline(i,s);for(var r=this.data[i],o=r.length-1;o>=0;o--)r[o]*=s},t.prototype.addmul=function(i,s,r){this.mirror&&this.mirror.addmul(i,s,r);for(var o=this.data[i],a=this.data[s],l=o.length-1;l>=0;l--)o[l]=o[l]+r*a[l]},t.prototype.hasNullLine=function(i){for(var s=0;s<this.data[i].length;s++)if(this.data[i][s]!==0)return!1;return!0},t.prototype.gauss=function(){for(var i=0,s=this.data.length,r=this.data[0].length,o=[],a=0;a<r;a++){for(var l=0,c=0,h=i;h<s;h++){var d=this.data[h][a];Math.abs(d)>Math.abs(l)&&(c=h,l=d)}if(l===0)o.push(i);else{this.multline(c,1/l),this.swap(c,i);for(var u=0;u<s;u++)u!==i&&this.addmul(u,i,-this.data[u][a])}i++}for(var u=0;u<o.length;u++)if(!this.mirror.hasNullLine(o[u]))throw new Error("singular matrix");return this.mirror.data},n.solve=function(s,r){var o=new t(s,r).gauss();if(o.length>0&&o[0].length===1)for(var a=0;a<o.length;a++)o[a]=o[a][0];return o};function e(i){for(var s=new Array(i),r=0;r<i;r++){s[r]=new Array(i);for(var o=0;o<i;o++)s[r][o]=r===o?1:0}return s}return n.invert=function(s){return new t(s,e(s.length)).gauss()},n}(),rf=vw;var t0=ex(Qg(),1);function Mw(n,t){let e=t.length,i=t[0].length;for(let s=0;s<e;s++)for(let r=0;r<i;r++)n[r][s]=t[s][r]}function bw(n){for(let t=0,e=n.length;t<e;t++)for(let i=0,s=n.length;i<s;i++)n[t][i]=t===i?1:0}function Sw(n,t,e){for(let i=0,s=n.length;i<s;i++)for(let r=0,o=n.length;r<o;r++)n[i][r]=t[i][r]*e}function ww(n,t,e){if(t===n||e===n)throw new Error("Matrix: Cannot multiply to a matrix in place.");let i=t.length,s=e.length,r=e[0].length;for(let o=0,a=i;o<a;o++)for(let l=0,c=r;l<c;l++){let h=0;for(let d=0,u=s;d<u;d++)h+=t[o][d]*e[d][l];n[o][l]=h}}function e0(n,t){let e=new Array(n);for(let i=0;i<n;i++)e[i]=new Float64Array(t);return e}function n0(n,t){let e=t.length,i=t[0].length;for(let s=0;s<e;s++)for(let r=0;r<i;r++)n[s][r]=t[s][r]}function Ew(n){let t=n.length,e=n[0].length,i=e0(t,e);return n0(i,n),i}function Tw(n,t,e){let i=rf.solve(t,e);for(let s=0,r=i.length;s<r;s++)n[s].set(i[s])}function Aw(n,t,e,i){let{u:s,v:r,q:o}=(0,t0.SVD)(i),a=s.length;for(let h=0;h<a;h++)n[h].set(s[h]);let l=r.length;for(let h=0;h<l;h++)e[h].set(r[h]);let c=o.length;for(let h=0;h<c;h++){let d=t[h],u=o[h];d.fill(0),d[h]=u}}function Cw(n,t){let e=rf.invert(t),i=t[0].length,s=t.length;for(let r=0;r<i;r++)for(let o=0;o<s;o++)n[r][o]=e[r][o]}function Rw(n,t,e){let i=t.length,s=t[0].length;for(let r=0;r<i;r++)for(let o=0;o<s;o++)n[r][o]=t[r][o]+e[r][o]}function Pw(n,t,e){let i=t.length,s=t[0].length;for(let r=0;r<i;r++)for(let o=0;o<s;o++)n[r][o]=t[r][o]-e[r][o]}function i0(n){let t=0,e=n.length,i=n[0].length;for(let s=0;s<e;s++)for(let r=0;r<i;r++)t+=n[s][r]**2;return t}function Iw(n){return Math.sqrt(i0(n))}function s0(n,t=3){let e=n.length,i=n[0].length,s="";for(let r=0;r<e;r++){for(let o=0;o<i;o++)s+=n[r][o].toFixed(t)+", ";s+=`
`}return s}function Lw(n,t){console.log(s0(n,t))}var fn={transpose:Mw,identity:bw,scale:Sw,multiply:ww,create:e0,copy:n0,clone:Ew,solve:Tw,svd:Aw,invert:Cw,add:Rw,subtract:Pw,magnitudeSquared:i0,magnitude:Iw,toString:s0,log:Lw};var xh=new Float64Array(16),_h=new Float64Array(16),of=new Float64Array(16),af=new Float64Array(16),ii=new Float64Array(4),ls=new Float64Array(3),lf=new Float64Array(4),cf=new Float64Array(3),Aa=[],fr=[],Jn={rowCount:0,isConverged:!1,totalError:0},r0={errorRows:0,freeDoF:0,totalError:0},Ei={CONVERGED:0,STALLED:1,DIVERGED:2,TIMEOUT:3},Dw=Object.entries(Ei).sort((n,t)=>n[1]-t[1]).map(n=>n[0]),yh=class{constructor(t){this.chain=Array.from(t),this.targets=null,this.affectedClosures=null,this.affectedConnectedClosures=null,this.lockedJointDoFCount=null,this.lockedJointDoF=null,this.prevDoFValues=null,this.maxIterations=-1,this.matrixPool=null,this.useSVD=!1,this.translationConvergeThreshold=-1,this.rotationConvergeThreshold=-1,this.translationFactor=-1,this.rotationFactor=-1,this.translationStep=-1,this.rotationStep=-1,this.translationErrorClamp=-1,this.rotationErrorClamp=-1,this.stallThreshold=-1,this.dampingFactor=-1,this.divergeThreshold=-1,this.restPoseFactor=-1,this.init()}init(){let t=this.chain,e=t.filter(l=>l.targetSet||l.isClosure),i=new Map,s=new Map,r=new Map,o=new Map,a=new Map;t.forEach(l=>{o.set(l,new Set),a.set(l,new Set),i.set(l,new Uint8Array(6)),r.set(l,new Float64Array(6))}),e.forEach(l=>{if(l.isClosure){let c=l;for(;c;)c.isJoint&&o.get(c).add(l),c=c.parent;for(c=l.child;c;)c.isJoint&&a.get(c).add(l),c=c.parent}}),this.targets=e,this.affectedClosures=o,this.affectedConnectedClosures=a,this.lockedJointDoF=i,this.lockedJointDoFCount=s,this.prevDoFValues=r}solve(){let{divergeThreshold:t,stallThreshold:e,chain:i,restPoseFactor:s,lockedJointDoFCount:r,prevDoFValues:o,useSVD:a,matrixPool:l}=this,c=0,h=1/0,d=-1;r.clear();for(let u=0,f=i.length;u<f;u++){let g=i[u];(g.targetSet||g.restPoseSet)&&g.tryMinimizeEulerAngles()}do{l.releaseAll();for(let _=0,T=i.length;_<T;_++)i[_].updateMatrixWorld();Aa.length=0,fr.length=0,this.countUnconvergedVariables(fr,Aa,r0);let{freeDoF:u,errorRows:f,totalError:g}=r0;if(f===0){d=Ei.CONVERGED;break}if(g>h+t){o.forEach((_,T)=>{T.dofValues.set(_),T.setMatrixDoFNeedsUpdate()}),d=Ei.DIVERGED;break}if(h=g,c++,c>this.maxIterations){d=Ei.TIMEOUT;break}let x=l.get(f,1);this.fillErrorVector(Aa,x);let m=l.get(f,u);this.fillJacobian(Aa,fr,m);let p=l.get(u,f),E=!1;if(a)try{let _=f,T=u,A=Math.min(_,T),D=l.get(_,A),v=l.get(A,A),w=l.get(T,A);fn.svd(D,v,w,m);let y=l.get(A,_),N=l.get(A,A);fn.transpose(y,D);for(let B=0,V=v.length;B<V;B++){let Y=v[B][B],k;Math.abs(Y)<.001?k=0:k=1/Y,N[B][B]=k}let O=l.get(T,A);fn.multiply(O,w,N),fn.multiply(p,O,y)}catch{E=!0}if(!a||E){let _=l.get(f,f);fn.identity(_),fn.scale(_,_,this.dampingFactor**2);let T=l.get(u,f);fn.transpose(T,m);let A=l.get(f,f);fn.multiply(A,m,T);let D=l.get(f,f);fn.add(D,A,_);let v=l.get(f,f);fn.invert(v,D),fn.multiply(p,T,v)}let b=l.get(u,1);if(fn.multiply(b,p,x),s!==0){let _=l.get(u,1),T=l.get(u,1),A=0;for(let y=0,N=fr.length;y<N;y++){let O=fr[y],B=this.lockedJointDoFCount.get(O)||0,V=B!==0,Y=this.lockedJointDoF.get(O),k=O.rotationDoFCount+O.translationDoFCount-B;if(O.restPoseSet){let K=O.dof,X=O.dofValues,st=O.dofRestPose;for(let ut=0;ut<k;ut++){let ft=K[ut];V&&Y[ft]||(_[A][0]=st[ft]-X[ft],A++)}}else for(let K=0;K<k;K++)_[A][0]=0,A++}let D=l.get(u,u);fn.multiply(D,p,m);let v=l.get(u,u);fn.identity(v);let w=l.get(u,u);fn.subtract(w,v,D),fn.multiply(T,w,_);for(let y=0;y<u;y++){let N=T[y][0];b[y][0]+=N*s}}if(e>0){let _=!0;for(let T=0,A=b.length;T<A;T++){let D=b[T][0];if(Math.abs(D)>e){_=!1;break}}if(_){d=Ei.STALLED;break}}o.forEach((_,T)=>{_.set(T.dofValues)}),this.applyJointAngles(fr,b)}while(!0);return Aa.length=0,fr.length=0,d}applyJointAngles(t,e){let{lockedJointDoF:i,lockedJointDoFCount:s}=this,r=!1,o=0;for(let a=0,l=t.length;a<l;a++){let c=t[a],h=c.dof,d=i.get(c),u=s.has(c);for(let f=0,g=h.length;f<g;f++){let x=h[f];if(u&&d[x])continue;let m=c.getDoFValue(x);if(c.setDoFValue(x,m+e[o][0])){s.has(c)||(s.set(c,0),d.fill(0));let E=s.get(c);s.set(c,E+1),d[x]=1,r=!0}o++}}if(o!==e.length)throw new Error;return r}fillJacobian(t,e,i){let{translationStep:s,rotationStep:r,lockedJointDoF:o,lockedJointDoFCount:a,translationFactor:l,rotationFactor:c}=this,h=this.affectedClosures,d=this.affectedConnectedClosures,u=0;for(let f=0,g=e.length;f<g;f++){let x=e[f],m=h.get(x),p=d.get(x),E=x.dof,b=x.translationDoFCount+x.rotationDoFCount,_=a.has(x),T=o.get(x);Yt.invert(af,x.matrixWorld);for(let A=0;A<b;A++){let D=E[A];if(_&&T[D])continue;let v=0,w=D<3?s:r;x.getDeltaWorldMatrix(D,w,of)&&(w*=-1);for(let y=0,N=t.length;y<N;y++){let O=t[y];if(O.isClosure)if(m.has(O)||p.has(O))if(O.getClosureError(ls,ii),p.has(O)?(Yt.multiply(xh,af,O.child.matrixWorld),Yt.multiply(_h,of,xh),Ea(O.matrixWorld,_h,cf,lf)):(Yt.multiply(xh,af,O.matrixWorld),Yt.multiply(_h,of,xh),Ea(_h,O.child.matrixWorld,cf,lf)),Le.subtract(ls,ls,cf),Le.scale(ls,ls,l/w),xn.subtract(ii,ii,lf),xn.scale(ii,ii,c/w),O.isGoal){let{translationDoFCount:B,rotationDoFCount:V,dof:Y}=O;for(let k=0;k<B;k++){let K=Y[k];i[v+k][u]=ls[K]}V===3&&(i[v+B+0][u]=ii[0],i[v+B+1][u]=ii[1],i[v+B+2][u]=ii[2],i[v+B+3][u]=ii[3],v+=4),v+=B}else i[v+0][u]=ls[0],i[v+1][u]=ls[1],i[v+2][u]=ls[2],i[v+3][u]=ii[0],i[v+4][u]=ii[1],i[v+5][u]=ii[2],i[v+6][u]=ii[3],v+=7;else{let B=7;O.isGoal&&(B=O.translationDoFCount,O.rotationDoFCount===3&&(B+=4));for(let V=0;V<B;V++)i[v+V][u]=0;v+=B}if(O.targetSet){let B=O.translationDoFCount+O.rotationDoFCount;if(x===O)for(let V=0;V<B;V++)i[v+u][u]=-1;else for(let V=0;V<B;V++)i[v+V][u]=0;v+=B}}u++}}if(u!==i[0].length)throw new Error}fillErrorVector(t,e){let i=0;for(let s=0,r=t.length;s<r;s++){let o=t[s];o.isClosure&&(nf(this,o,i,e,Jn),i+=Jn.rowCount),o.targetSet&&(sf(this,o,i,e,Jn),i+=Jn.rowCount)}}countUnconvergedVariables(t,e,i){let{lockedJointDoFCount:s}=this,r=this.chain,o=0,a=0,l=0,c=0;for(let h=0,d=r.length;h<d;h++){let u=!1,f=r[h],g=s.get(f)||0;f.isClosure&&(nf(this,f,a,null,Jn),Jn.isConverged||(l+=Jn.rowCount,o+=Jn.totalError),u=!0,a+=Jn.rowCount);let x=f.dof;f.targetSet&&(sf(this,f,a,null,Jn),Jn.isConverged||(l+=Jn.rowCount,o+=Jn.totalError),u=!0,a+=Jn.rowCount),!f.isGoal&&x.length>0&&(c+=x.length-g,t.push(f)),u&&e.push(f)}l===0&&(a=0),i.errorRows=a,i.freeDoF=c,i.totalError=o}};function ao(n){let t=n.map(s=>{let r=s;return s.traverseParents(o=>{r=o}),r}),e=[],i=new Set;for(let s=0;s<t.length;s++){let r=t[s];i.has(r)||(e.push(r),r.traverse(o=>{if(i.has(o))return!0;i.add(o);let a;o.isLink?a=o.closureJoints:o.isJoint&&o.isClosure&&(a=[o.child]),a&&a.forEach(l=>{let c=l;l.traverseParents(h=>{c=h}),i.has(c)||t.push(c)})}))}return e}var hf=class{constructor(t,e){let i=[],s=0;this.get=function(){let r=i[s];return r||(i[s]=r=fn.create(t,e)),s++,r},this.releaseAll=function(){s=0}}},vh=class{constructor(){let t={},e=[];this.get=function(i,s){let r=t[i];r||(r=t[i]={});let o=r[s];return o||(o=r[s]=new hf(i,s),e.push(o)),o.get()},this.releaseAll=function(){for(let i=0,s=e.length;i<s;i++)e[i].releaseAll()}}};var Ca=class{constructor(t=[]){this.matrixPool=new vh,this.useSVD=!1,this.maxIterations=5,this.stallThreshold=1e-4,this.dampingFactor=.001,this.divergeThreshold=.01,this.restPoseFactor=.01,this.translationConvergeThreshold=.001,this.rotationConvergeThreshold=1e-5,this.translationFactor=1,this.rotationFactor=1,this.translationStep=.001,this.rotationStep=.001,this.translationErrorClamp=.1,this.rotationErrorClamp=.1,this.roots=Array.isArray(t)?[...t]:[t],this.solvers=null,this.updateStructure()}updateStructure(){let t=ao(this.roots),e=[],i=new Set,s=new Set,r=l=>{if(l.isJoint){let h=l;if(i.add(h),h.isClosure){let d=new Set,u=h.child;for(;u;){if(u.isJoint){if(i.has(u))break;d.add(u),s.add(u)}u=u.parent}i.forEach(f=>{d.add(f),s.add(f)}),e.push(d)}}let c=l.children;for(let h=0,d=c.length;h<d;h++)r(c[h]);i.delete(l)};t.forEach(r);let o=[];for(;e.length;){let l=e.pop();o.push(l);for(let c=0;c<e.length;c++){let h=e[c],d=!1;h.forEach(u=>{d=d||l.has(u)}),d&&(h.forEach(u=>l.add(u)),e.splice(c,1),c--)}}let a=new Set;t.forEach(l=>l.traverse(c=>{c.isJoint&&c.dof.length>0&&!s.has(c)&&a.add(c)})),this.solvers=o.map(l=>new yh(l)),this.nonChainJoints=a}solve(){let{solvers:t,nonChainJoints:e}=this;e.forEach(s=>{s.targetSet&&(s.dofValues.set(s.dofTarget),s.setMatrixDoFNeedsUpdate())});let i=[];for(let s=0,r=t.length;s<r;s++){let o=t[s];o.matrixPool=this.matrixPool,o.useSVD=this.useSVD,o.maxIterations=this.maxIterations,o.stallThreshold=this.stallThreshold,o.dampingFactor=this.dampingFactor,o.divergeThreshold=this.divergeThreshold,o.restPoseFactor=this.restPoseFactor,o.translationConvergeThreshold=this.translationConvergeThreshold,o.rotationConvergeThreshold=this.rotationConvergeThreshold,o.translationFactor=this.translationFactor,o.rotationFactor=this.rotationFactor,o.translationStep=this.translationStep,o.rotationStep=this.rotationStep,o.translationErrorClamp=this.translationErrorClamp,o.rotationErrorClamp=this.rotationErrorClamp;let a=o.solve();i.push(a)}return i}};var o0=new An,Mh=new F,lo=class extends jo{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new ee(t,3)),this.setAttribute("uv",new ee(e,2))}applyMatrix4(t){let e=this.attributes.instanceStart,i=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),i.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));let i=new Ms(e,6,1);return this.setAttribute("instanceStart",new _i(i,3,0)),this.setAttribute("instanceEnd",new _i(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));let i=new Ms(e,6,1);return this.setAttribute("instanceColorStart",new _i(i,3,0)),this.setAttribute("instanceColorEnd",new _i(i,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new Vo(t.geometry)),this}fromLineSegments(t){let e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new An);let t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),o0.setFromBufferAttribute(e),this.boundingBox.union(o0))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Kn),this.boundingBox===null&&this.computeBoundingBox();let t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Mh.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Mh)),Mh.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Mh));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}};xt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Ot(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Fn.line={uniforms:la.merge([xt.common,xt.fog,xt.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var co=class extends Qn{constructor(t){super({type:"LineMaterial",uniforms:la.clone(Fn.line.uniforms),vertexShader:Fn.line.vertexShader,fragmentShader:Fn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var uf=new ce,a0=new F,l0=new F,Mn=new ce,bn=new ce,Fi=new ce,df=new F,ff=new Ht,Sn=new $o,c0=new F,bh=new An,Sh=new Kn,Ui=new ce,Oi,pr;function h0(n,t,e){return Ui.set(0,0,-t,1).applyMatrix4(n.projectionMatrix),Ui.multiplyScalar(1/Ui.w),Ui.x=pr/e.width,Ui.y=pr/e.height,Ui.applyMatrix4(n.projectionMatrixInverse),Ui.multiplyScalar(1/Ui.w),Math.abs(Math.max(Ui.x,Ui.y))}function Nw(n,t){let e=n.matrixWorld,i=n.geometry,s=i.attributes.instanceStart,r=i.attributes.instanceEnd,o=Math.min(i.instanceCount,s.count);for(let a=0,l=o;a<l;a++){Sn.start.fromBufferAttribute(s,a),Sn.end.fromBufferAttribute(r,a),Sn.applyMatrix4(e);let c=new F,h=new F;Oi.distanceSqToSegment(Sn.start,Sn.end,h,c),h.distanceTo(c)<pr*.5&&t.push({point:h,pointOnLine:c,distance:Oi.origin.distanceTo(h),object:n,face:null,faceIndex:a,uv:null,uv1:null})}}function Fw(n,t,e){let i=t.projectionMatrix,r=n.material.resolution,o=n.matrixWorld,a=n.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,h=Math.min(a.instanceCount,l.count),d=-t.near;Oi.at(1,Fi),Fi.w=1,Fi.applyMatrix4(t.matrixWorldInverse),Fi.applyMatrix4(i),Fi.multiplyScalar(1/Fi.w),Fi.x*=r.x/2,Fi.y*=r.y/2,Fi.z=0,df.copy(Fi),ff.multiplyMatrices(t.matrixWorldInverse,o);for(let u=0,f=h;u<f;u++){if(Mn.fromBufferAttribute(l,u),bn.fromBufferAttribute(c,u),Mn.w=1,bn.w=1,Mn.applyMatrix4(ff),bn.applyMatrix4(ff),Mn.z>d&&bn.z>d)continue;if(Mn.z>d){let b=Mn.z-bn.z,_=(Mn.z-d)/b;Mn.lerp(bn,_)}else if(bn.z>d){let b=bn.z-Mn.z,_=(bn.z-d)/b;bn.lerp(Mn,_)}Mn.applyMatrix4(i),bn.applyMatrix4(i),Mn.multiplyScalar(1/Mn.w),bn.multiplyScalar(1/bn.w),Mn.x*=r.x/2,Mn.y*=r.y/2,bn.x*=r.x/2,bn.y*=r.y/2,Sn.start.copy(Mn),Sn.start.z=0,Sn.end.copy(bn),Sn.end.z=0;let x=Sn.closestPointToPointParameter(df,!0);Sn.at(x,c0);let m=nn.lerp(Mn.z,bn.z,x),p=m>=-1&&m<=1,E=df.distanceTo(c0)<pr*.5;if(p&&E){Sn.start.fromBufferAttribute(l,u),Sn.end.fromBufferAttribute(c,u),Sn.start.applyMatrix4(o),Sn.end.applyMatrix4(o);let b=new F,_=new F;Oi.distanceSqToSegment(Sn.start,Sn.end,_,b),e.push({point:_,pointOnLine:b,distance:Oi.origin.distanceTo(_),object:n,face:null,faceIndex:u,uv:null,uv1:null})}}}var wh=class extends dt{constructor(t=new lo,e=new co({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let t=this.geometry,e=t.attributes.instanceStart,i=t.attributes.instanceEnd,s=new Float32Array(2*e.count);for(let o=0,a=0,l=e.count;o<l;o++,a+=2)a0.fromBufferAttribute(e,o),l0.fromBufferAttribute(i,o),s[a]=a===0?0:s[a-1],s[a+1]=s[a]+a0.distanceTo(l0);let r=new Ms(s,2,1);return t.setAttribute("instanceDistanceStart",new _i(r,1,0)),t.setAttribute("instanceDistanceEnd",new _i(r,1,1)),this}raycast(t,e){let i=this.material.worldUnits,s=t.camera;s===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let r=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Oi=t.ray;let o=this.matrixWorld,a=this.geometry,l=this.material;pr=l.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),Sh.copy(a.boundingSphere).applyMatrix4(o);let c;if(i)c=pr*.5;else{let d=Math.max(s.near,Sh.distanceToPoint(Oi.origin));c=h0(s,d,l.resolution)}if(Sh.radius+=c,Oi.intersectsSphere(Sh)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),bh.copy(a.boundingBox).applyMatrix4(o);let h;if(i)h=pr*.5;else{let d=Math.max(s.near,bh.distanceToPoint(Oi.origin));h=h0(s,d,l.resolution)}bh.expandByScalar(h),Oi.intersectsBox(bh)!==!1&&(i?Nw(this,e):Fw(this,s,e))}onBeforeRender(t){let e=this.material.uniforms;e&&e.resolution&&(t.getViewport(uf),this.material.uniforms.resolution.value.set(uf.z,uf.w))}};var Eh=class extends lo{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(t){let e=t.length-3,i=new Float32Array(2*e);for(let s=0;s<e;s+=3)i[2*s]=t[s],i[2*s+1]=t[s+1],i[2*s+2]=t[s+2],i[2*s+3]=t[s+3],i[2*s+4]=t[s+4],i[2*s+5]=t[s+5];return super.setPositions(i),this}setColors(t){let e=t.length-3,i=new Float32Array(2*e);for(let s=0;s<e;s+=3)i[2*s]=t[s],i[2*s+1]=t[s+1],i[2*s+2]=t[s+2],i[2*s+3]=t[s+3],i[2*s+4]=t[s+4],i[2*s+5]=t[s+5];return super.setColors(i),this}setFromPoints(t){let e=t.length-1,i=new Float32Array(6*e);for(let s=0;s<e;s++)i[6*s]=t[s].x,i[6*s+1]=t[s].y,i[6*s+2]=t[s].z||0,i[6*s+3]=t[s+1].x,i[6*s+4]=t[s+1].y,i[6*s+5]=t[s+1].z||0;return super.setPositions(i),this}fromLine(t){let e=t.geometry;return this.setPositions(e.attributes.position.array),this}};var ho=class extends wh{constructor(t=new Eh,e=new co({color:Math.random()*16777215})){super(t,e),this.isLine2=!0,this.type="Line2"}};var mr=new Float64Array(3),u0=new Float64Array(16),pf=new Ht,d0=new Ht,uo=class extends Hn{constructor(t){super(),this.frame=t;let e=new ho;e.geometry.setPositions([0,0,0,0,0,0]),e.material.color.set(16777215),e.material.linewidth=2,this.add(e),this.line=e}update(){let{frame:t,line:e}=this;t.parent?(mr[0]=0,mr[1]=0,mr[2]=0,Yt.invert(u0,t.matrix),Le.transformMat4(mr,mr,u0),e.geometry.setPositions([...mr,0,0,0]),e.visible=!0,Le.length(mr)<1e-7&&(e.visible=!1)):e.visible=!1}updateMatrixWorld(...t){let e=this.frame;e.updateMatrixWorld(),e.isJoint?e.parent?(pf.set(...e.matrix).transpose(),d0.set(...e.parent.matrixWorld).transpose(),this.matrix.multiplyMatrices(d0,pf)):(pf.set(...e.matrix).transpose(),this.matrix.set(...e.matrix).transpose()):this.matrix.set(...e.matrixWorld).transpose(),this.matrix.decompose(this.position,this.quaternion,this.scale),super.updateMatrixWorld(...t)}dispose(){this.traverse(t=>{t.material&&t.material.dispose(),t.geometry&&t.geometry.dispose()})}};var cs=new F,gr=new F,Ra=class extends dt{constructor(t,e){super(void 0,t),this._dof=e,this._min=null,this._delta=null,this.setLimits(0,2*Math.PI)}setLimits(t,e){let i=Math.min(e-t,2*Math.PI);if(t===-1/0&&(t=0),this._min===t&&this._delta===i)return;this._min=t,this._delta=i,this.geometry&&this.geometry.dispose();let s=this._dof,r=new Oe(.075,.075,1e-7,100,1,!1,t,i);s===ht.EX&&r.rotateZ(Cs),s===ht.EZ&&r.rotateX(Cs),this.geometry=r}},Pa=class extends uo{constructor(t){super(t);let e=new dt(new Oe(.05,.05,.25,30,1).rotateZ(Cs),new li),i=new Ra(new li,ht.EX),s=new dt(new Oe(.05,.05,.25,30,1),new li),r=new Ra(new li,ht.EY),o=new dt(new Oe(.05,.05,.25,30,1).rotateX(Cs),new li),a=new Ra(new li,ht.EZ);a.rotation.set(Cs,0,0);let l=new dt(new Ki(.05,30,30),new li),c=new dt(new Ue(.05,.05,.05),new li),h=new ho;h.geometry.setPositions([0,0,0,1,0,0,1,1,0,1,1,1]),h.material.color.set(16777215),h.material.side=2,h.material.linewidth=2,this.add(e,s,o,i,r,a,l,h,c),this.xRotationMesh=e,this.yRotationMesh=s,this.zRotationMesh=o,this.xRotationLimits=i,this.yRotationLimits=r,this.zRotationLimits=a,this.translationMesh=h,this.freeRotationMesh=l,this.fixedMesh=c}setJointScale(t){this.xRotationMesh.scale.setScalar(t),this.yRotationMesh.scale.setScalar(t),this.zRotationMesh.scale.setScalar(t),this.xRotationLimits.scale.setScalar(t),this.yRotationLimits.scale.setScalar(t),this.zRotationLimits.scale.setScalar(t),this.freeRotationMesh.scale.setScalar(t),this.fixedMesh.scale.setScalar(t)}update(){super.update();let{xRotationMesh:t,yRotationMesh:e,zRotationMesh:i,xRotationLimits:s,yRotationLimits:r,zRotationLimits:o,freeRotationMesh:a,translationMesh:l,fixedMesh:c}=this,h=this.frame;t.visible=!1,e.visible=!1,i.visible=!1,s.visible=!1,r.visible=!1,o.visible=!1,a.visible=!1,l.visible=!1,c.visible=!1,h.translationDoFCount!==0&&(l.visible=!0),h.rotationDoFCount===3?(a.visible=!0,s.visible=!0,r.visible=!0,o.visible=!0):(t.visible=!!h.dofFlags[ht.EX],e.visible=!!h.dofFlags[ht.EY],i.visible=!!h.dofFlags[ht.EZ],s.visible=!!h.dofFlags[ht.EX],r.visible=!!h.dofFlags[ht.EY],o.visible=!!h.dofFlags[ht.EZ]),h.translationDoFCount===0&&h.rotationDoFCount===0&&(this.visible=this.line.visible)}updateMatrixWorld(...t){let{xRotationMesh:e,yRotationMesh:i,zRotationMesh:s,xRotationLimits:r,yRotationLimits:o,zRotationLimits:a,freeRotationMesh:l,translationMesh:c}=this,h=this.frame;cs.set(h.getDoFValue(ht.X),h.getDoFValue(ht.Y),h.getDoFValue(ht.Z)),gr.set(h.getDoFValue(ht.EX),h.getDoFValue(ht.EY),h.getDoFValue(ht.EZ)),c.scale.copy(cs),e.position.copy(cs),r.position.copy(cs),r.setLimits(h.getMinLimit(ht.EX),h.getMaxLimit(ht.EX)),i.position.copy(cs),i.rotation.set(gr.x,0,0),o.position.copy(cs),o.rotation.set(gr.x,0,0),o.setLimits(h.getMinLimit(ht.EY),h.getMaxLimit(ht.EY)),s.position.copy(cs),s.rotation.set(gr.x,gr.y,0),a.position.copy(cs),a.rotation.set(gr.x,gr.y,0),a.setLimits(h.getMinLimit(ht.EZ),h.getMaxLimit(ht.EZ)),l.position.copy(cs),super.updateMatrixWorld(...t)}};var Th=new Set,Ah=new Set,Ia=class extends Hn{constructor(t=[]){super(),this.roots=Array.isArray(t)?[...t]:[t],this.joints=new Map,this.links=new Map,this.resolution=new Ot(1e3,1e3),this.drawThrough=!1,this.color=new Jt(16777215),this.jointScale=1,this.updateStructure()}_updateHelpers(){let{drawThrough:t,resolution:e,color:i,jointScale:s}=this;this.traverse(r=>{let o=r.material;o&&(o.color.copy(i),o.isLineMaterial&&o.uniforms.resolution.value.copy(e),t?(o.opacity=.1,o.transparent=!0,o.depthWrite=!1,o.depthTest=!1):(o.opacity=1,o.transparent=!1,o.depthWrite=!0,o.depthTest=!0)),r instanceof Pa&&r.setJointScale(s)})}setColor(t){return t.isColor?this.color.copy(t):this.color.set(t),this._updateHelpers(),this}setJointScale(t){return this.jointScale=t,this._updateHelpers(),this}setDrawThrough(t){return this.drawThrough=t,this._updateHelpers(),this}updateStructure(){let{joints:t,links:e}=this,i=ao(this.roots);Ah.clear(),t.forEach((s,r)=>Ah.add(r)),Th.clear(),e.forEach((s,r)=>Th.add(r));for(let s=0,r=i.length;s<r;s++){let o=i[s];o.updateMatrixWorld(!0),o.traverse(a=>{if(a.isJoint){let l;t.has(a)?l=t.get(a):(l=new Pa(a),this.add(l),t.set(a,l)),l.update(),Ah.delete(a)}else{let l;e.has(a)?l=e.get(a):(l=new uo(a),this.add(l),e.set(a,l)),l.update(),Th.delete(a)}})}Ah.forEach(s=>{let r=t.get(s);this.remove(r),r.dispose()}),Th.forEach(s=>{let r=e.get(s);this.remove(r),r.dispose()}),this._updateHelpers()}dispose(){let{links:t,joints:e}=this;e.forEach(([i,s])=>{this.remove(s),s.dispose()}),e.clear(),t.forEach(([i,s])=>{this.remove(s),s.dispose()}),t.clear()}};var Ch=new Float64Array(3),Rh=new Float64Array(3),La=new Qe;function Ph(n,t=!1,e=!0){let i=null,s,r=!0;if(n.isURDFRobot)i=new wi,i.name="__world_joint__",i.setDoF(ht.X,ht.Y,ht.Z,ht.EX,ht.EY,ht.EZ),s=new as,s.name=n.name,i.addChild(s);else if(n.isURDFLink)s=new as,s.name=n.name,r=!t;else if(n.isURDFJoint){i=new wi;let a=n.jointType;switch(a){case"continuous":case"revolute":case"prismatic":{let l=new as;i.addChild(l);let c=new wi;c.name=n.name,l.addChild(c);let h=new as;c.addChild(h);let d=new wi;h.addChild(d),Ch[0]=0,Ch[1]=0,Ch[2]=1,Rh[0]=n.axis.x,Rh[1]=n.axis.y,Rh[2]=n.axis.z,bi.rotationTo(c.quaternion,Ch,Rh),bi.invert(d.quaternion,c.quaternion),c.setMatrixNeedsUpdate(),d.setMatrixNeedsUpdate(),a==="revolute"||a==="continuous"?c.setDoF(ht.EZ):c.setDoF(ht.Z),a!=="continuous"&&(c.setMinLimits(n.limit.lower),c.setMaxLimits(n.limit.upper)),s=d;break}case"fixed":{s=i,r=!t;break}case"planar":case"floating":default:console.error(`urdfRobotToIKRoot: Joint type ${a} not supported.`),r=!t}}else return null;e||((i||s).setPosition(n.position.x,n.position.y,n.position.z),(i||s).setQuaternion(n.quaternion.x,n.quaternion.y,n.quaternion.z,n.quaternion.w));let o=n.children;for(let a=0,l=o.length;a<l;a++){let c=Ph(o[a],t,!1);c&&(s.addChild(c),r=!0)}return!t||r?i||s:null}function mf(n,t){n.setDoFValue(ht.X,t.position.x),n.setDoFValue(ht.Y,t.position.y),n.setDoFValue(ht.Z,t.position.z),La.copy(t.rotation),La.reorder("ZYX"),n.setDoFValue(ht.EX,La.x),n.setDoFValue(ht.EY,La.y),n.setDoFValue(ht.EZ,La.z),n.traverse(e=>{if(e.isJoint){let i=e.name;i in t.joints&&e.setDoFValues(t.joints[i].angle)}})}function Ih(n,t){t.updateMatrixWorld(),n.matrix.set(...t.matrixWorld).transpose(),n.matrix.decompose(n.position,n.quaternion,n.scale),t.traverse(e=>{if(e.isJoint){let i=e,s=n.joints[e.name];s&&(s.jointType==="prismatic"?s.setJointValue(i.getDoFValue(ht.Z)):s.setJointValue(i.getDoFValue(ht.EZ)))}})}function f0(n,t){return JSON.parse(localStorage.getItem(`${n}-${t}`)||"null")}function p0(n,t,e,i){localStorage.setItem(`${n}-${t.id}`,JSON.stringify(t));let s=JSON.parse(localStorage.getItem(n)||"[]"),r=e(t),o=s.findIndex(a=>a.id===t.id);o!==-1?s[o]=r:s.push(r),s.sort(i),localStorage.setItem(n,JSON.stringify(s))}function m0(n,t){localStorage.removeItem(`${n}-${t.id}`);let e=JSON.parse(localStorage.getItem(n)||"[]");e=e.filter(({id:i})=>i!==t.id),localStorage.setItem(n,JSON.stringify(e))}function Lh(n){return JSON.parse(localStorage.getItem(n)||"[]")}function gf(n,t,e){let i=t(),s=new URLSearchParams(window.location.search).get(n);i!==s&&e(s),window.addEventListener("popstate",r=>{let o=t(),a=new URLSearchParams(window.location.search).get(n);o!==a&&e(a)}),Vi(()=>{let r=new URLSearchParams(window.location.search),o=t(),a=r.get(n);if(o===a)return;let l=new URL(window.location.toString());l.searchParams.set(n,o),history.pushState(null,"",l)})}var[Dh,xf]=Ge({mode:"drag-joint",space:"world"});var g0={selectedIndex:0,updateSelected:!1,playback:"stopped",editing:"none",commandToAdd:"joints",loop:!1,busy:!1},[Be,on]=Ge(g0);var Nh={commands:[]},[Ye,Uw]=Ge(Nh);var Ow=Lh("sequence"),[x0,_0]=Ge(Ow);function Bw(n){return!!n.name||n.commands.length>0}function xr(){return new Date().toISOString()}function kw({id:n,name:t}){return{id:n,name:t}}function zw({name:n},{name:t}){return n<t?-1:1}function hi(n){let t=Be();t.busy&&on({...t,playback:"stopped"}),Bw(n)&&(n.id||(n={...n,name:n.name||xr(),id:Math.random().toString(36).slice(2)}),p0("sequence",n,kw,zw),_0(Lh("sequence"))),Uw(n)}function y0(){let n=Be(),t=Ye(),e=n.selectedIndex,i=Fh()[e];i||(e=-1);let s=i?.state||si().state();if(!s){console.error("Add command without position");return}let r;switch(n.commandToAdd){case"joints":r={name:xr(),type:"joints",data:s.position.joints};break;case"effector":r={name:xr(),type:"effector",data:s.position.effector};break;case"tool":r={name:xr(),type:"tool",data:s.tool_offset};break;case"speed":r={name:xr(),type:"speed",data:{speed:s.speed}};break;default:throw new Error(`Unknown command type: ${n.commandToAdd}`)}let o=t.commands,a=[...o.slice(0,e+1),r,...o.slice(e+1)],l=e+1;hi({...t,commands:a}),on({...n,selectedIndex:l})}function hs(n){let t=Be(),e=Ye(),i=t.selectedIndex,s=e.commands[i];if(!s){console.error("No selected command while patching");return}if(!n.type||n.type!==s.type){console.error("Attempt to update command with missing or mismatched type");return}let r=b0(s,n),o=e.commands,a=[...o.slice(0,i),r,...o.slice(i+1)];hi({...e,commands:a})}function v0(){hi(Nh)}function _f(n){let t=f0("sequence",n);t&&(hi(t),on(g0))}function M0(){let n=Ye();n.id&&(m0("sequence",n),_0(Lh("sequence"))),hi(Nh)}gf("program",()=>Ye().id||"",n=>n===""?hi(Nh):_f(n));gf("index",()=>Be().selectedIndex.toString(),n=>on({...Be(),selectedIndex:parseInt(n)||0}));function b0(...n){let t=e=>e&&typeof e=="object";return n.reduce((e,i)=>(Object.keys(i).forEach(s=>{let r=e[s],o=i[s];Array.isArray(r)&&Array.isArray(o)?e[s]=r.concat(...o):t(r)&&t(o)?e[s]=b0(r,o):e[s]=o}),e),{})}var _r=1/1e3,S0=[-1,0,-90,90,0,0,0],Uh=new F(0,0,0),Fa,yf,Ua,vf,Oh=class{constructor(t){cn(this,Fa);cn(this,Ua);this.urdfRoot=t,this.baseOffset=t.joints["base_link-base"].position}applyJointsFromEffectorPosition(t,e,i,s){let r=Na(e,_r,this.baseOffset,yr()),o=Na(i,_r,Uh,yr()),a=I0(r,o,yr()),l=Te(this,Ua,vf).call(this,t,a);Ih(s.robot,l)}applyJointsFromTool(t,e,i){let s=Da(i.tool),r=Na(e,_r,Uh,yr()),o=I0(s,r,yr()),a=Te(this,Ua,vf).call(this,t,o);Ih(i.robot,a)}applyJointPosition(t,e){let i=e.robot.joints;for(let s=1;s<=6;s++){let r=i[`joint_${s}`],o=t[`j${s}`];r.setJointValue(nn.degToRad(o-S0[s]))}e.robot.updateMatrixWorld(!0)}applyEffectorPosition(t,e){let i=Da(e.tool);Na(t,_r,this.baseOffset,i),e.tool.updateMatrixWorld(!0)}applyEffectorFromJointPosition(t,e){let i=qw(t.attachmentPoint()),s=Na(e,_r,Uh,yr()),r=Da(t.tool);Yw(i,s,r),t.tool.updateMatrixWorld(!0)}determineEffectorPosition(t){let e=A0(),i=Da(t.tool);return C0(i,_r,this.baseOffset,e)}determineToolOffset(t){let e=Da(t.tool);e.position=e.position.clone(),e.rotation=e.rotation.clone();let i=t.attachmentPoint(),s=new de;i.getWorldQuaternion(s);let r=s.invert();return i.worldToLocal(e.position),e.rotation=e.rotation.premultiply(r),C0(e,_r,Uh,A0())}determineJointPosition(t){let e={};for(let i=1;i<=6;i++){let s=`joint_${i}`,r=`j${i}`,o=t.robot.joints[s].angle;e[r]=nn.radToDeg(o)+S0[i]}return e}updateCommand(t){let e=Be(),s=Ye().commands[e.selectedIndex]?.type;if(s){if(s==="joints"){let r=this.determineJointPosition(t);hs({type:"joints",data:r})}else if(s==="effector"){let r=this.determineEffectorPosition(t);hs({type:"effector",data:r})}else if(s==="tool"){let r=this.determineToolOffset(t);hs({type:"tool",data:r})}}}drawHelper(t){this.helper&&(t.remove(this.helper),delete this.helper),this.helper=new Ia([Te(this,Fa,yf).call(this)]),t.add(this.helper)}};Fa=new WeakSet,yf=function(){return this._ikRoot||(this._ikRoot=Ph(this.urdfRoot),this._ikRoot.setDoF()),this._ikRoot},Ua=new WeakSet,vf=function(t,e){let i=Te(this,Fa,yf).call(this);if(mf(i,t.robot),!this._goal){this._goal=new oo;let h=i.find(d=>d.name==="tool0");this._goal.makeClosure(h)}let s=this._goal,{position:r,rotation:o}=e;s.setPosition(r.x,r.y,r.z),s.setQuaternion(o.x,o.y,o.z,o.w),this._solver||(this._solver=new Ca([i]));let a=this._solver,l=10,c=!1;for(let h=0;h<l;h++){i.updateMatrixWorld(!0);let d=a.solve();c=d.filter(g=>g===Ei.CONVERGED).length===d.length;let u=d.filter(g=>g===Ei.DIVERGED).length===d.length,f=d.filter(g=>g===Ei.STALLED).length===d.length;if(c||u||f)break}return i};var Vw=new F(0,0,1),Hw=new F(0,1,0),Gw=new F(0,0,1),w0=new de,E0=new de,T0=new de;function Ww(n,t,e,i){return w0.setFromAxisAngle(Vw,nn.degToRad(n)),E0.setFromAxisAngle(Hw,nn.degToRad(t)),T0.setFromAxisAngle(Gw,nn.degToRad(e)),i.multiplyQuaternions(w0,E0),i.multiply(T0),i}function Xw(n,t){let e=n.w,i=n.z,s=n.y,r=n.x,o=Math.atan2(i,e)-Math.atan2(-r,s),a=Math.acos(2*(e*e+i*i)-1),l=Math.atan2(i,e)+Math.atan2(-r,s);return t.yaw=nn.radToDeg(l),t.pitch=nn.radToDeg(a),t.roll=nn.radToDeg(o),t}function A0(){return{x:0,y:0,z:0,yaw:0,pitch:0,roll:0}}function yr(){return{position:new F,rotation:new de}}function Da(n){return{position:n.position,rotation:n.quaternion}}function qw(n){let t=yr();return n.getWorldPosition(t.position),n.getWorldQuaternion(t.rotation),t}function C0(n,t,e,i){let{position:s,rotation:r}=n;return i.x=(s.x-e.x)/t,i.y=(s.y-e.y)/t,i.z=(s.z-e.z)/t,Xw(r,i),i}function Na(n,t,e,i){let{position:s,rotation:r}=i;return s.x=n.x*t+e.x,s.y=n.y*t+e.y,s.z=n.z*t+e.z,Ww(n.yaw,n.pitch,n.roll,r),i}function Yw(n,t,e){return e.position.copy(t.position).applyQuaternion(n.rotation).add(n.position),e.rotation.copy(n.rotation).multiply(t.rotation),e}var R0=new de,Jw=new de,P0=new F;function I0(n,t,e){return R0.copy(t.rotation).invert(),e.rotation.copy(n.rotation).multiply(R0),Jw.copy(e.rotation).invert(),P0.copy(t.position).applyQuaternion(e.rotation),e.position.copy(n.position).sub(P0),e}var L0=1/1e3,D0={name:"Naked Flange",meshUrl:"urdf/effectors/flange.stl",scale:L0},Zw={name:"Naked Flange (copy)",meshUrl:"urdf/effectors/flange.stl",scale:L0},wf=[D0,Zw],[N0,F0]=Ge(D0);var jw={stl:Kr};function U0(){return new Promise((n,t)=>{let e,i=new Wr,s=new pa(i);s.packages={staubli_rx90:"/urdf/staubli_rx90"},s.load("/urdf/staubli_rx90/StaubliRX90.urdf",r=>{e=r}),i.onLoad=()=>{if(!e)throw new Error("Manager load without robot");n(e)}})}function O0(n){let t=jw[n.meshUrl.split(".").slice(-1)[0]];if(!t)throw new Error(`Unknown loader for url ${n.meshUrl}`);return new Promise((e,i)=>{new t().load(n.meshUrl,r=>{let o=new dt(r,Cd);o.scale.x=n.scale,o.scale.y=n.scale,o.scale.z=n.scale,e(o)},r=>{},r=>{console.log(r)})})}var kh,B0,Oa,Mf,zh,k0,Ba,bf,Vh,z0,ka,Sf,Bh=class{constructor(t,e,i){cn(this,kh);cn(this,Oa);cn(this,zh);cn(this,Ba);cn(this,Vh);cn(this,ka);this.urdfRoot=t,this.robot=t.clone(!0),this.tool=e.clone(!0),this.world=i}addToScene(){this.world.scene.add(this.tool),this.world.scene.add(this.robot)}update(t,e,i,s,r,o){this.kinematics=t;let a=r==="effector"||r==="joints",l=a&&o?.mode==="drag-joint",c=r==="tool",h;e==="ghost"?o?h=jm:h=Zm:e==="current"?h=void 0:e==="current-ghost"?h=Jm:h=$m;let d=h&&e!=="current-ghost"&&h.opacity===1?0:1;if(this.tool.traverse(f=>{f.layers.set(d),f.type==="Mesh"&&(f.material=h||Cd)}),this.robot.traverse(f=>{f.layers.set(d),f.type==="Mesh"&&(f.__unsetMaterial||(f.__unsetMaterial=f.material),f.material=h||f.__unsetMaterial)}),l?Te(this,kh,B0).call(this,i):Te(this,Oa,Mf).call(this),a&&(o?.mode==="rotate-effector"||o?.mode==="translate-effector")){let f=Te(this,zh,k0).call(this,s,i);f.setSpace(o.space),o.mode==="rotate-effector"&&f.setMode("rotate"),o.mode==="translate-effector"&&f.setMode("translate")}else Te(this,Ba,bf).call(this);if(c){let f=Te(this,Vh,z0).call(this);f.setSpace(o.space),o.mode==="rotate-effector"&&f.setMode("rotate"),o.mode==="translate-effector"&&f.setMode("translate")}else Te(this,ka,Sf).call(this)}attachmentPoint(){let t;return this.robot.traverse(e=>{e.name==="tool0"&&(t=e)}),t}dispose(){Te(this,Ba,bf).call(this),Te(this,Oa,Mf).call(this),Te(this,ka,Sf).call(this),this.world.scene.remove(this.robot),this.world.scene.remove(this.tool)}};kh=new WeakSet,B0=function(t){if(this.dragControls)return;let e=r=>r.isURDFJoint&&r.jointType!=="fixed",i=(r,o)=>{let a=l=>{if(l.type==="Mesh"&&(o?(l.material=l.__origMaterial,delete l.__origMaterial):(l.__origMaterial=l.material,l.material=Km)),l===r||!e(l))for(let c=0;c<l.children.length;c++)l.children[c].isURDFCollider||a(l.children[c])};a(r)},s=new th(this.world.scene,this.world.camera,this.world.renderer.domElement);s.raycaster.camera=this.world.camera,s.onDragStart=r=>{this.world.orbit.enabled=!1},s.onDragEnd=r=>{this.world.orbit.enabled=!0,this.world.render(),setTimeout(()=>{this.kinematics.updateCommand(this)})},s.updateJoint=(r,o)=>{this.robot.joints?.[r.name].setJointValue(o),this.kinematics.applyEffectorFromJointPosition(this,t),this.world.render()},s.onHover=r=>{i(r,!1),this.world.render()},s.onUnhover=r=>{i(r,!0),this.world.render()},this.dragControls=s},Oa=new WeakSet,Mf=function(){this.dragControls&&(this.dragControls?.dispose(),delete this.dragControls)},zh=new WeakSet,k0=function(t,e){if(this.transformControls)return this.transformControls;this.transformControls=new Ma(this.world.camera,this.world.renderer.domElement),this.transformControls.addEventListener("change",()=>{this.kinematics.applyJointsFromTool(t,e,this),this.world.render()}),this.transformControls.addEventListener("dragging-changed",s=>{let r=s.value;this.world.orbit.enabled=!r,this.dragging=r,r||this.kinematics.updateCommand(this)}),this.transformControls.attach(this.tool);let i=this.transformControls.getHelper();return this.world.scene.add(i),this.transformControls},Ba=new WeakSet,bf=function(){if(!this.transformControls)return;let t=this.transformControls.getHelper();this.world.scene.remove(t),this.transformControls.dispose(),delete this.transformControls},Vh=new WeakSet,z0=function(){return this.offsetControls?this.offsetControls:(this.offsetControls=new Ma(this.world.camera,this.world.renderer.domElement),this.offsetControls.attach(this.tool),this.world.scene.add(this.offsetControls.getHelper()),this.offsetControls.addEventListener("change",()=>{this.world.render()}),this.offsetControls.addEventListener("mouseDown",()=>{this.world.orbit.enabled=!1}),this.offsetControls.addEventListener("mouseUp",()=>{this.kinematics.updateCommand(this),this.world.orbit.enabled=!0}),this.offsetControls)},ka=new WeakSet,Sf=function(){this.offsetControls&&(this.world.scene.remove(this.offsetControls.getHelper()),this.offsetControls.dispose(),delete this.offsetControls)};var[Fh,$w]=Ge([]);var Kw=Ne` <div id="robot-3d"></div> `,Hh={previewRobot:null},Gh,V0,Ef=class extends HTMLElement{constructor(){super();cn(this,Gh);this.arrows=[],this.world=new Qc,this.robots=[],U0().then(s=>{this.urdfRoot=s,this.world.fitCameraToSelection([this.urdfRoot]),this.updateRobots()}),this.toolRoot=void 0;let e=this.attachShadow({mode:"open"});document.querySelectorAll("link").forEach(s=>{e.appendChild(s.cloneNode())});let i=Kw.content.cloneNode(!0);this.container=i.querySelector("#robot-3d"),this.container.appendChild(this.world.renderer.domElement),e.appendChild(i),this.onResize(),this.bindState(),window.addEventListener("resize",this.onResize.bind(this))}bindState(){Vi(()=>{this.updateRobots()}),Vi(()=>{let e=N0();for(;this.robots.length>0;)this.robots.pop().dispose();O0(e).then(i=>{this.toolRoot=i,this.updateRobots()})})}updateRobots(){let e=si()?.state(),i=Ye(),s=Be(),r=Dh();if(!e?.position||!this.urdfRoot||!this.toolRoot)return;let o=this.robots;this.robots=[];let a=()=>{let g=o.shift()||Te(this,Gh,V0).call(this);return this.robots.push(g),g},l=new Oh(this.urdfRoot),c=e.position;if(!c.effector||!c.joints){console.error("Missing current position");return}let h=a();Hh.previewRobot!==h&&(Hh.previewRobot=h),h.update(l,i.commands.length===0?"current":"current-ghost",void 0,void 0),l.applyJointPosition(c.joints,h),l.applyEffectorPosition(c.effector,h);let d=h,u=e,f=[];for(i.commands.forEach((g,x)=>{let m=u,p=a();if(g.type==="joints")l.applyJointPosition(g.data,p),l.applyEffectorFromJointPosition(p,m.tool_offset),m={...m,position:{joints:g.data,effector:l.determineEffectorPosition(p)}};else if(g.type==="effector")l.applyEffectorPosition(g.data,p),l.applyJointsFromEffectorPosition(d,g.data,m.tool_offset,p),m={...m,position:{effector:g.data,joints:l.determineJointPosition(p)}};else if(g.type==="tool"){let b=g.data;l.applyJointPosition(m.position.joints,p),l.applyEffectorFromJointPosition(p,b);let _=l.determineEffectorPosition(p);m={...m,tool_offset:b,position:{effector:_,joints:m.position.joints}}}else g.type==="speed"&&(l.applyJointPosition(m.position.joints,p),l.applyEffectorPosition(m.position.effector,p),m={...m,speed:g.data.speed});let E=x===s.selectedIndex;p.update(l,"ghost",m.tool_offset,d,E?g.type:void 0,E?r:void 0),f.push({command:g,robot:p,state:m}),d=p,u=m});o.length>0;)o.pop().dispose();$w(f),this.world.render()}purgeArrows(){this.arrows.forEach(e=>{this.world.scene.remove(e),e.dispose()}),this.arrows=[]}createArrow(e,i){let s=new F(i.x,i.y,i.z);s.sub(e);let r=s.length();s.normalize();let o=new Ko(s,e,r,16777215);this.arrows.push(o),this.world.scene.add(o)}onResize(){this.world.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.world.renderer.setPixelRatio(window.devicePixelRatio),this.world.camera.aspect=this.container.clientWidth/this.container.clientHeight,this.world.camera.updateProjectionMatrix(),this.world.render()}connectedCallback(){this.world.render()}disconnectedCallback(){this.attached=!1}adoptedCallback(){console.log("Custom element moved to new page.")}};Gh=new WeakSet,V0=function(){let e=new Bh(this.urdfRoot,this.toolRoot,this.world);return e.addToScene(),e};customElements.define("robot-3d",Ef);We({tag:"jog-mode-editor",template:Ne`
    <article class="vertical-stack">
      <h4>Viewport Jog Mode</h4>
      <div role="group">
        <button data-mode="translate-effector">Translate</button>
        <button data-mode="rotate-effector">Rotate</button>
        <button data-mode="drag-joint">Joint</button>
      </div>
      <h4>Coordinate Space</h4>
      <div role="group">
        <button data-space="local">Tool</button>
        <button data-space="world">World</button>
      </div>
    </article>
  `,attrsFn:(n,t)=>{let e=Dh(),i=Be(),r=Ye().commands[i.selectedIndex];function o(u){xf({...e,mode:u})}function a(u){return e.mode===u?"true":void 0}function l(u){return{[`[data-mode='${u}']`]:{eventListeners:{click:()=>o(u)},attributes:{"aria-current":a(u),disabled:u==="drag-joint"&&r?.type==="tool"?"true":void 0}}}}function c(u){xf({...e,space:u})}function h(u){return e.space===u?"true":void 0}function d(u){return{[`[data-space='${u}']`]:{eventListeners:{click:()=>c(u)},attributes:{"aria-current":h(u)}}}}return{...l("translate-effector"),...l("rotate-effector"),...l("drag-joint"),...d("local"),...d("world")}}});We({tag:"effector-position-editor",observedAttributes:["x","y","z","yaw","pitch","roll"],template:Ne`
    <div class="vertical-stack">
      <div class="horizontal-stack">
        <label class="horizontal-label">
          X
          <input class="effector-position-editor-x" />
        </label>
        <label class="horizontal-label">
          Y
          <input class="effector-position-editor-y" />
        </label>
        <label class="horizontal-label">
          Z
          <input class="effector-position-editor-z" />
        </label>
      </div>
      <div class="horizontal-stack">
        <label class="horizontal-label">
          Y
          <input class="effector-position-editor-yaw" />
        </label>
        <label class="horizontal-label">
          P
          <input class="effector-position-editor-pitch" />
        </label>
        <label class="horizontal-label">
          R
          <input class="effector-position-editor-roll" />
        </label>
      </div>
    </div>
  `,attrsFn:(n,t,e)=>{e.value={x:parseFloat(t.x),y:parseFloat(t.y),z:parseFloat(t.z),yaw:parseFloat(t.yaw),pitch:parseFloat(t.pitch),roll:parseFloat(t.roll)};function i(s){return{[`.effector-position-editor-${s}`]:{properties:{value:e.value[s]},eventListeners:{change:r=>{e.value[s]=parseFloat(r.target.value),r.stopPropagation(),e.dispatchEvent(new Event("change"))}}}}}return{...i("x"),...i("y"),...i("z"),...i("yaw"),...i("pitch"),...i("roll")}}});We({tag:"joint-position-editor",observedAttributes:["j1","j2","j3","j4","j5","j6"],template:Ne`
    <div class="vertical-stack">
      <div class="horizontal-stack">
        <label class="horizontal-label">
          J1
          <input class="joint-position-editor-j1" />
        </label>
        <label class="horizontal-label">
          J2
          <input class="joint-position-editor-j2" />
        </label>
        <label class="horizontal-label">
          J3
          <input class="joint-position-editor-j3" />
        </label>
      </div>
      <div class="horizontal-stack">
        <label class="horizontal-label">
          J4
          <input class="joint-position-editor-j4" />
        </label>
        <label class="horizontal-label">
          J5
          <input class="joint-position-editor-j5" />
        </label>
        <label class="horizontal-label">
          J6
          <input class="joint-position-editor-j6" />
        </label>
      </div>
    </div>
  `,attrsFn:(n,t,e)=>{e.value={j1:parseFloat(t.j1),j2:parseFloat(t.j2),j3:parseFloat(t.j3),j4:parseFloat(t.j4),j5:parseFloat(t.j5),j6:parseFloat(t.j6)};function i(s){return{[`.joint-position-editor-${s}`]:{properties:{value:e.value[s]},eventListeners:{change:r=>{e.value[s]=parseFloat(r.target.value),r.stopPropagation(),e.dispatchEvent(new Event("change"))}}}}}return{...i("j1"),...i("j2"),...i("j3"),...i("j4"),...i("j5"),...i("j6")}}});We({tag:"robot-position-editor",template:Ne`
    <article class="vertical-stack">
      <h2>Robot Position Editor</h2>
      <jog-mode-editor></jog-mode-editor>
      <effector-position-editor></effector-position-editor>
      <joint-position-editor></joint-position-editor>
    </article>
  `,attrsFn:(n,t)=>{let e=Be(),i=Fh()[e.selectedIndex];if(!i)return{};let s=i.state.position.effector,r=i.state.position.joints,o=i.robot;function a(c){let h=c.target.value;o.kinematics.applyEffectorPosition(h,o),o.kinematics.applyJointsFromEffectorPosition(o,h,i.state.tool_offset,o),o.kinematics.updateCommand(o)}function l(c){let h=c.target.value;o.kinematics.applyJointPosition(h,o),o.kinematics.applyEffectorFromJointPosition(o,i.state.tool_offset),o.kinematics.updateCommand(o)}return{"effector-position-editor":{attributes:{x:s.x.toFixed(3),y:s.y.toFixed(3),z:s.z.toFixed(3),yaw:s.yaw.toFixed(3),pitch:s.pitch.toFixed(3),roll:s.roll.toFixed(3)},eventListeners:{change:a}},"joint-position-editor":{attributes:{j1:r.j1.toFixed(3),j2:r.j2.toFixed(3),j3:r.j3.toFixed(3),j4:r.j4.toFixed(3),j5:r.j5.toFixed(3),j6:r.j6.toFixed(3)},eventListeners:{change:l}}}}});We({tag:"tool-offset-editor",template:Ne`
    <article class="vertical-stack">
      <h2>Tool Offset Editor</h2>
      <jog-mode-editor></jog-mode-editor>
      <select class="tool-display" aria-label="Tool Display" required></select>
      <effector-position-editor></effector-position-editor>
    </article>
  `,stateFn:()=>{let[n,t]=Ge(0);return{selectedDisplayIndex:n,setSelectedDisplayIndex:t}},attrsFn:(n,t)=>{let e=Be(),s=Ye().commands[e.selectedIndex];if(s?.type!=="tool")return{};let r=s.data;function o(h){let d=h.target.value;hs({type:"tool",data:d})}function a(h){F0(wf[h.target.value])}let l=n.selectedDisplayIndex();return{".tool-display":{properties:{innerHTML:wf.map((h,d)=>`
      <option ${d===l?"selected":""} value="${d}">${h.name}</option>
    `).join(`
`)},eventListeners:{change:a}},"effector-position-editor":{attributes:{x:r.x.toFixed(3),y:r.y.toFixed(3),z:r.z.toFixed(3),yaw:r.yaw.toFixed(3),pitch:r.pitch.toFixed(3),roll:r.roll.toFixed(3)},eventListeners:{change:o}}}}});We({tag:"speed-editor",template:Ne`
    <article>
      <h2>Speed Editor</h2>
      <label class="horizontal-label">
        Speed
        <input class="speed-editor-input" />
      </label>
    </article>
  `,attrsFn:(n,t,e)=>{let i=Be(),r=Ye().commands[i.selectedIndex];return!r||r.type!=="speed"?{}:{".speed-editor-input":{properties:{value:r.data.speed.toString()},eventListeners:{change:o=>{let a=o.target.value,l=parseFloat(a);isNaN(a)||hs({type:"speed",data:{speed:l}})}}}}}});We({tag:"command-editor",template:Ne` <div class="command-editor"></div> `,attrsFn:(n,t)=>{let e,i=Be();switch(Ye().commands[i.selectedIndex]?.type){case"effector":case"joints":e="<robot-position-editor></robot-position-editor>";break;case"tool":e="<tool-offset-editor></tool-offset-editor>";break;case"speed":e="<speed-editor></speed-editor>";break;default:e="<article class='vertical-stack'><h2>Select Command</h2></article>";break}return{".command-editor":{properties:{innerHTML:e}}}}});We({tag:"command-list",template:Ne`
    <table class="effector">
      <thead>
        <tr>
          <th scope="col">select</th>
          <th scope="col">name</th>
          <th scope="col">type</th>
          <th scope="col">delete</th>
        </tr>
      </thead>
      <tbody class="positions"></tbody>
    </table>
    <div class="horizontal-stack">
      <button class="command-edit">Edit</button>
      <div role="group">
        <select class="command-to-add" aria-label="Command To Add" required>
          <option selected value="joints">Joint Position</option>
          <option value="effector">Linear Move</option>
          <option value="tool">Tool Offset</option>
          <option value="speed">Speed</option>
        </select>
        <button class="add-command">Add</button>
      </div>
    </div>
  `,attrsFn:(n,t)=>{let e=Be(),i=Ye(),s=e.busy;function r(f){if(f.preventDefault(),s)return;let g=Tf(this);on({...e,selectedIndex:g})}function o(){if(s)return;let f=Tf(this);if(f===void 0||isNaN(f))return;let g=i.commands.filter((m,p)=>p!==f),x=e.selectedIndex;f<x&&(x-=1),x>=g.length&&(x=g.length-1),x!==e.selectedIndex&&on({...e,selectedIndex:x}),hi({...i,commands:g})}function a(){s||on({...e,editing:"item"})}function l(f){if(s)return;let g=f.target.value;g&&on({...e,commandToAdd:g})}function c(){s||y0()}let h=i.commands.map((f,g)=>`
      <tr data-index="${g}">
        <td>
          <input type="radio" class="command-select" ${e.selectedIndex===g?"checked":""} />
        </td>
        <th scope="row">${f.name}</th>
        <td>${f.type}</td>
        <td><button class="command-delete">X</button></td>
      </tr>
    `).join(`
`),d=s?"true":void 0,u=i.commands[e.selectedIndex]?void 0:"true";return{".positions":{properties:{innerHTML:h}},".command-select":{attributes:{disabled:d},eventListeners:{click:r}},".command-edit":{attributes:{disabled:d||u},eventListeners:{click:a}},".command-delete":{attributes:{disabled:d},eventListeners:{click:o}},".command-to-add":{eventListeners:{change:l}},".add-command":{attributes:{disabled:d},eventListeners:{click:c}}}}});function Tf(n){return n.hasAttribute("data-index")?parseInt(n.getAttribute("data-index")||"-1"):n.parentElement?Tf(n.parentElement):-1}var Wh=class n{constructor(t,e,i,s){this.start=t,this.acceleration=e,this.accelerateTime=i,this.coastTime=s}static planConstraints(t,e,i){let s=e<i?t.maxAcceleration:-t.maxAcceleration,r=Math.min(e,i),a=Math.max(e,i)-r,l=t.maxVelocity/t.maxAcceleration,c=l*t.maxVelocity,h,d;return c>=a?(h=0,d=Math.sqrt(a/t.maxAcceleration)):(a-=c,d=l,h=a/t.maxVelocity),new n(e,s,d,h)}static planSibling(t,e,i){let r=(i-e)/((t.accelerateTime+t.coastTime)*t.accelerateTime);return new n(e,r,t.accelerateTime,t.coastTime)}static planSync(t,e,i){let s=e.map((l,c)=>n.planConstraints(t,l,i[c])),r=-1,o;return s.forEach(l=>{let c=l.totalTime();c<r||(r=c,o=l)}),s.map((l,c)=>o===l?o:n.planSibling(o,e[c],i[c]))}position(t){if(t<this.accelerateTime){let r=t*this.acceleration;return this.start+t*r/2}let e=this.acceleration*this.accelerateTime;t-=this.accelerateTime;let i=this.start+this.accelerateTime*e/2;if(t<this.coastTime)return i+t*e;t-=this.coastTime,i+=this.coastTime*e,t=Math.min(t,this.accelerateTime);let s=e-this.acceleration*t;return i+s*t+(e-s)*t/2}totalTime(){return this.accelerateTime*2+this.coastTime}};var qh,W0,Yh,X0,za,Af,Xh=class{constructor(t,e){cn(this,qh);cn(this,Yh);cn(this,za);this.control=t;let[i,s]=Ge(e);this.state=i,this.setState=s,this.name="preview"}async execute(t){switch(t.type){case"joints":await Te(this,qh,W0).call(this,t.data);break;case"effector":await Te(this,Yh,X0).call(this,t.data);break;case"speed":this.setState({...this.state(),speed:t.data.speed});break;case"tool":let e=this.state();this.control.kinematics.applyEffectorFromJointPosition(this.control,t.data),this.setState({...e,tool_offset:t.data,position:{joints:e.position.joints,effector:this.control.kinematics.determineEffectorPosition(this.control)}});break}}};qh=new WeakSet,W0=async function(t){let e=this.state(),i=e.position.joints,s={maxAcceleration:10,maxVelocity:e.speed*5},r=H0(i),o=H0(t);await Te(this,za,Af).call(this,s,r,o,a=>{let l=Qw(a);this.control.kinematics.applyJointPosition(l,this.control),this.control.kinematics.applyEffectorFromJointPosition(this.control,e.tool_offset),this.control.world.render()}),this.setState({...e,position:{effector:this.control.kinematics.determineEffectorPosition(this.control),joints:t}})},Yh=new WeakSet,X0=async function(t){let e=this.state(),i=e.position.effector,s={maxAcceleration:50,maxVelocity:e.speed*25},r=G0(i),o=G0(t);await Te(this,za,Af).call(this,s,r,o,a=>{let l=tE(a);this.control.kinematics.applyEffectorPosition(l,this.control),this.control.kinematics.applyJointsFromEffectorPosition(this.control,l,e.tool_offset,this.control),this.control.world.render()}),this.setState({...e,position:{joints:this.control.kinematics.determineJointPosition(this.control),effector:t}})},za=new WeakSet,Af=function(t,e,i,s){let r=Wh.planSync(t,e,i),o=r[0].totalTime();return new Promise((a,l)=>{let c=performance.now(),h=c+o*1e3;function d(u){let f=(u-c)/1e3,g=r.map(x=>x.position(f));s(g),u<h?requestAnimationFrame(d):(s(i),a())}d(c)})};function H0(n){return[n.j1,n.j2,n.j3,n.j4,n.j5,n.j6]}function Qw(n){return{j1:n[0],j2:n[1],j3:n[2],j4:n[3],j5:n[4],j6:n[5]}}function G0(n){return[n.x,n.y,n.z,n.yaw,n.pitch,n.roll]}function tE(n){return{x:n[0],y:n[1],z:n[2],yaw:n[3],pitch:n[4],roll:n[5]}}Vi(()=>{let n=Ye(),t=Be(),e=si();if(t.playback!=="play"&&t.playback!=="jog"||t.busy||!e||n.commands.length===0)return;let i=t.selectedIndex,s=n.commands[i];if(!s){on({...t,playback:"stopped",busy:!1});return}let r={...t,busy:!0};on(r),e.execute(s).then(()=>{let o=Ye(),a=Be(),l=o!==n||a!==r,c=a.playback==="jog",h=i>=o.commands.length-1;if(l||c||h)on({...a,playback:"stopped",busy:!1});else{let d=(i+1)%o.commands.length;on({...a,selectedIndex:d,busy:!1})}})});We({tag:"playback-control",template:Ne`
    <div class="horizontal-stack">
      <label>
        <input type="checkbox" name="preview" class="sequence-preview" />
        Preview
      </label>
      <div role="group">
        <button class="sequence-jog">jog</button>
        <button class="sequence-play">play</button>
        <button class="sequence-stop">stop</button>
      </div>
    </div>
  `,attrsFn:()=>{let n=Be(),t=Ye(),e=si(),i=Hh.previewRobot,s=e.name==="preview";function r(){s?nu(_o):i!==null&&nu(new Xh(i,e.state()))}function o(m){return()=>{d&&m!=="stopped"||on({...n,playback:m})}}let a=o("play"),l=o("stopped"),c=o("jog"),h=t.commands.length===0,d=n.busy,u=d?"true":void 0,f=h?"true":void 0,g=t.commands[n.selectedIndex]?void 0:"true",x=n.playback==="stopped"?"true":void 0;return{".sequence-play":{attributes:{disabled:f||u},eventListeners:{click:a}},".sequence-jog":{attributes:{disabled:f||u||g},eventListeners:{click:c}},".sequence-stop":{attributes:{disabled:f||x},eventListeners:{click:l}},".sequence-preview":{attributes:{disabled:u,checked:s?"checked":void 0},eventListeners:{change:r}}}}});We({tag:"program-list",template:Ne`
    <select class="select-jog-sequence" aria-label="Load Jog Sequence" required>
      <option selected value="">New</option>
    </select>
    <div role="group">
      <button class="sequence-edit">Edit</button>
      <button class="sequence-delete">Delete</button>
    </div>
  `,attrsFn:(n,t)=>{let e=Be(),i=Ye(),s=e.busy;function r(h){if(s)return;let d=h.target.value;if(!d){v0();return}_f(d)}function o(){s||M0()}function a(){s||(i.name||hi({...i,name:xr()}),on({...e,editing:"sequence"}))}let l=`
          <option ${i.id?"":"selected"} value="">
             New
          </option>
      `+x0().map(({name:h,id:d})=>`
        <option ${i.id===d?"selected":""} value="${d}">
            ${h}
        </option>
      `),c=s?"true":void 0;return{".sequence-delete":{attributes:{disabled:c},eventListeners:{click:o}},".sequence-edit":{attributes:{disabled:c},eventListeners:{click:a}},".select-jog-sequence":{attributes:{disabled:c},properties:{innerHTML:l},eventListeners:{change:r}}}}});We({tag:"program-edit",template:Ne`
    <dialog class="program-edit-modal">
      <article>
        <header>
          <button
            aria-label="Close"
            rel="prev"
            class="program-edit-close"
          ></button>
          <p>Editing <strong class="program-edit-name"></strong></p>
        </header>
        <label for="program-name"> Program Name </label>
        <input
          class="program-edit-name-input"
          type="text"
          id="program-name"
          placeholder="Program Name"
          aria-label="Program Name"
        />
      </article>
    </dialog>
  `,attrsFn:(n,t)=>{let e=Be(),i=Ye();function s(){on({...e,editing:void 0})}function r(o){hi({...i,name:o.target.value})}return{".program-edit-modal":{attributes:{open:e.editing==="sequence"?"open":void 0},eventListeners:{click:s}},".program-edit-close":{eventListeners:{click:s}},".program-edit-modal article":{eventListeners:{click:o=>o.stopPropagation()}},".program-edit-name":{properties:{innerHTML:i.name}},".program-edit-name-input":{properties:{value:i.name},eventListeners:{change:r}}}}});We({tag:"command-edit",template:Ne`
    <dialog class="command-edit-modal">
      <article>
        <header>
          <button
            aria-label="Close"
            rel="prev"
            class="command-edit-close"
          ></button>
          <p>Editing <strong class="command-edit-name"></strong></p>
        </header>
        <label for="command-name"> Command Name </label>
        <input
          class="command-edit-name-input"
          type="text"
          id="command-name"
          placeholder="Command Name"
          aria-label="Command Name"
        />

        <details name="raw-command">
          <summary>Raw Command</summary>
          <pre class="raw-command-code"></pre>
        </details>
      </article>
    </dialog>
  `,attrsFn:(n,t)=>{let e=Be(),s=Ye().commands[e.selectedIndex];function r(){on({...e,editing:void 0})}function o(a){hs({name:a.target.value,type:s.type})}return{".command-edit-modal":{attributes:{open:e.editing==="item"?"open":void 0},eventListeners:{click:r}},".command-edit-close":{eventListeners:{click:r}},".command-edit-modal article":{eventListeners:{click:a=>a.stopPropagation()}},".command-edit-name":{properties:{innerHTML:s?.name}},".command-edit-name-input":{properties:{value:s?.name},eventListeners:{change:o}},".raw-command-code":{properties:{innerHTML:JSON.stringify(s,void 0,2)}}}}});We({tag:"robot-serial",template:Ne`
    <article class="overflow-auto vh30">
      <pre></pre>
      <fieldset role="group">
        <input
          class="monitor-input"
          type="text"
          placeholder="Monitor"
          aria-label="Monitor"
        />
        <button class="monitor-send">Send</button>
      </fieldset>
    </article>
  `,stateFn:()=>{let n=new WebSocket(`ws://${location.hostname}:8765`),[t,e]=Ge([]);n.onmessage=a=>{let l=JSON.parse(a.data);e([...t(),l])};let[i,s]=Ge(""),[r,o]=Ge(!1);return{messages:t,pendingCommand:i,setPendingCommand:s,busy:r,setBusy:o}},attrsFn:({messages:n,pendingCommand:t,setPendingCommand:e,busy:i,setBusy:s},r,o)=>{let a="";n().forEach(({mode:u,msg:f})=>{switch(u){case"read":a+=f;break;case"readline":a+="< "+f+`
`;break;case"write":a+=f;break}}),setTimeout(()=>{let u=o.querySelector("article");u.scrollTop=u.scrollHeight},1);function l(u){e(u.target.value)}function c(u){u.key==="Enter"&&(l(u),h())}function h(){i()||(s(!0),si().execute({type:"serial",name:"adhoc",data:{command:t()}}).then(()=>{e(""),s(!1)}))}let d=i()?"true":void 0;return{pre:{properties:{innerHTML:eE(a)}},".monitor-input":{attributes:{disabled:d},properties:{value:t()},eventListeners:{change:l,keypress:c}},".monitor-send":{attributes:{disabled:d},eventListeners:{click:h}}}}});function eE(n){return String(n).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}_o.load();
/*! Bundled license information:

three/build/three.core.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
