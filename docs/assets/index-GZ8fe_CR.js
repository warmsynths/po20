(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const B=globalThis,dt=B.ShadowRoot&&(B.ShadyCSS===void 0||B.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ct=Symbol(),gt=new WeakMap;let Et=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==ct)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(dt&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=gt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&gt.set(e,t))}return t}toString(){return this.cssText}};const Dt=n=>new Et(typeof n=="string"?n:n+"",void 0,ct),w=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((i,r,s)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+n[s+1],n[0]);return new Et(e,n,ct)},Ot=(n,t)=>{if(dt)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),r=B.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,n.appendChild(i)}},ut=dt?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Dt(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ht,defineProperty:Bt,getOwnPropertyDescriptor:Ut,getOwnPropertyNames:Rt,getOwnPropertySymbols:Vt,getPrototypeOf:It}=Object,y=globalThis,vt=y.trustedTypes,jt=vt?vt.emptyScript:"",F=y.reactiveElementPolyfillSupport,M=(n,t)=>n,X={toAttribute(n,t){switch(t){case Boolean:n=n?jt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},Pt=(n,t)=>!Ht(n,t),xt={attribute:!0,type:String,converter:X,reflect:!1,useDefault:!1,hasChanged:Pt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),y.litPropertyMetadata??(y.litPropertyMetadata=new WeakMap);let k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=xt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&Bt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=Ut(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get:r,set(a){const d=r==null?void 0:r.call(this);s==null||s.call(this,a),this.requestUpdate(t,d,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??xt}static _$Ei(){if(this.hasOwnProperty(M("elementProperties")))return;const t=It(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(M("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(M("properties"))){const e=this.properties,i=[...Rt(e),...Vt(e)];for(const r of i)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)e.unshift(ut(r))}else t!==void 0&&e.push(ut(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ot(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var s;const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const a=(((s=i.converter)==null?void 0:s.toAttribute)!==void 0?i.converter:X).toAttribute(e,i.type);this._$Em=t,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$Em=null}}_$AK(t,e){var s,a;const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const d=i.getPropertyOptions(r),o=typeof d.converter=="function"?{fromAttribute:d.converter}:((s=d.converter)==null?void 0:s.fromAttribute)!==void 0?d.converter:X;this._$Em=r;const l=o.fromAttribute(e,d.type);this[r]=l??((a=this._$Ej)==null?void 0:a.get(r))??l,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){var a;if(t!==void 0){const d=this.constructor;if(r===!1&&(s=this[t]),i??(i=d.getPropertyOptions(t)),!((i.hasChanged??Pt)(s,e)||i.useDefault&&i.reflect&&s===((a=this._$Ej)==null?void 0:a.get(t))&&!this.hasAttribute(d._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,a??e??this[t]),s!==!0||a!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),r===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,a]of this._$Ep)this[s]=a;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[s,a]of r){const{wrapped:d}=a,o=this[s];d!==!0||this._$AL.has(s)||o===void 0||this.C(s,void 0,a,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(r=>{var s;return(s=r.hostUpdate)==null?void 0:s.call(r)}),this.update(e)):this._$EM()}catch(r){throw t=!1,this._$EM(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[M("elementProperties")]=new Map,k[M("finalized")]=new Map,F==null||F({ReactiveElement:k}),(y.reactiveElementVersions??(y.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=globalThis,bt=n=>n,U=z.trustedTypes,mt=U?U.createPolicy("lit-html",{createHTML:n=>n}):void 0,Mt="$lit$",f=`lit$${Math.random().toFixed(9).slice(2)}$`,zt="?"+f,Yt=`<${zt}>`,C=document,T=()=>C.createComment(""),N=n=>n===null||typeof n!="object"&&typeof n!="function",lt=Array.isArray,qt=n=>lt(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",K=`[ 	
\f\r]`,P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ft=/-->/g,yt=/>/g,$=RegExp(`>|${K}(?:([^\\s"'>=/]+)(${K}*=${K}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),wt=/'/g,$t=/"/g,Tt=/^(?:script|style|textarea|title)$/i,Gt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),h=Gt(1),A=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),_t=new WeakMap,_=C.createTreeWalker(C,129);function Nt(n,t){if(!lt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return mt!==void 0?mt.createHTML(t):t}const Wt=(n,t)=>{const e=n.length-1,i=[];let r,s=t===2?"<svg>":t===3?"<math>":"",a=P;for(let d=0;d<e;d++){const o=n[d];let l,v,c=-1,b=0;for(;b<o.length&&(a.lastIndex=b,v=a.exec(o),v!==null);)b=a.lastIndex,a===P?v[1]==="!--"?a=ft:v[1]!==void 0?a=yt:v[2]!==void 0?(Tt.test(v[2])&&(r=RegExp("</"+v[2],"g")),a=$):v[3]!==void 0&&(a=$):a===$?v[0]===">"?(a=r??P,c=-1):v[1]===void 0?c=-2:(c=a.lastIndex-v[2].length,l=v[1],a=v[3]===void 0?$:v[3]==='"'?$t:wt):a===$t||a===wt?a=$:a===ft||a===yt?a=P:(a=$,r=void 0);const m=a===$&&n[d+1].startsWith("/>")?" ":"";s+=a===P?o+Yt:c>=0?(i.push(l),o.slice(0,c)+Mt+o.slice(c)+f+m):o+f+(c===-2?d:m)}return[Nt(n,s+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class L{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,a=0;const d=t.length-1,o=this.parts,[l,v]=Wt(t,e);if(this.el=L.createElement(l,i),_.currentNode=this.el.content,e===2||e===3){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(r=_.nextNode())!==null&&o.length<d;){if(r.nodeType===1){if(r.hasAttributes())for(const c of r.getAttributeNames())if(c.endsWith(Mt)){const b=v[a++],m=r.getAttribute(c).split(f),O=/([.?@])?(.*)/.exec(b);o.push({type:1,index:s,name:O[2],strings:m,ctor:O[1]==="."?Kt:O[1]==="?"?Jt:O[1]==="@"?Zt:W}),r.removeAttribute(c)}else c.startsWith(f)&&(o.push({type:6,index:s}),r.removeAttribute(c));if(Tt.test(r.tagName)){const c=r.textContent.split(f),b=c.length-1;if(b>0){r.textContent=U?U.emptyScript:"";for(let m=0;m<b;m++)r.append(c[m],T()),_.nextNode(),o.push({type:2,index:++s});r.append(c[b],T())}}}else if(r.nodeType===8)if(r.data===zt)o.push({type:2,index:s});else{let c=-1;for(;(c=r.data.indexOf(f,c+1))!==-1;)o.push({type:7,index:s}),c+=f.length-1}s++}}static createElement(t,e){const i=C.createElement("template");return i.innerHTML=t,i}}function E(n,t,e=n,i){var a,d;if(t===A)return t;let r=i!==void 0?(a=e._$Co)==null?void 0:a[i]:e._$Cl;const s=N(t)?void 0:t._$litDirective$;return(r==null?void 0:r.constructor)!==s&&((d=r==null?void 0:r._$AO)==null||d.call(r,!1),s===void 0?r=void 0:(r=new s(n),r._$AT(n,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=r:e._$Cl=r),r!==void 0&&(t=E(n,r._$AS(n,t.values),r,i)),t}class Ft{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=((t==null?void 0:t.creationScope)??C).importNode(e,!0);_.currentNode=r;let s=_.nextNode(),a=0,d=0,o=i[0];for(;o!==void 0;){if(a===o.index){let l;o.type===2?l=new D(s,s.nextSibling,this,t):o.type===1?l=new o.ctor(s,o.name,o.strings,this,t):o.type===6&&(l=new Xt(s,this,t)),this._$AV.push(l),o=i[++d]}a!==(o==null?void 0:o.index)&&(s=_.nextNode(),a++)}return _.currentNode=C,r}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class D{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),N(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):qt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==p&&N(this._$AH)?this._$AA.nextSibling.data=t:this.T(C.createTextNode(t)),this._$AH=t}$(t){var s;const{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=L.createElement(Nt(i.h,i.h[0]),this.options)),i);if(((s=this._$AH)==null?void 0:s._$AD)===r)this._$AH.p(e);else{const a=new Ft(r,this),d=a.u(this.options);a.p(e),this.T(d),this._$AH=a}}_$AC(t){let e=_t.get(t.strings);return e===void 0&&_t.set(t.strings,e=new L(t)),e}k(t){lt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new D(this.O(T()),this.O(T()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t!==this._$AB;){const r=bt(t).nextSibling;bt(t).remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class W{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(t,e=this,i,r){const s=this.strings;let a=!1;if(s===void 0)t=E(this,t,e,0),a=!N(t)||t!==this._$AH&&t!==A,a&&(this._$AH=t);else{const d=t;let o,l;for(t=s[0],o=0;o<s.length-1;o++)l=E(this,d[i+o],e,o),l===A&&(l=this._$AH[o]),a||(a=!N(l)||l!==this._$AH[o]),l===p?t=p:t!==p&&(t+=(l??"")+s[o+1]),this._$AH[o]=l}a&&!r&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Kt extends W{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}}class Jt extends W{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==p)}}class Zt extends W{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=E(this,t,e,0)??p)===A)return;const i=this._$AH,r=t===p&&i!==p||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==p&&(i===p||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Xt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}}const J=z.litHtmlPolyfillSupport;J==null||J(L,D),(z.litHtmlVersions??(z.litHtmlVersions=[])).push("3.3.3");const Qt=(n,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let r=i._$litPart$;if(r===void 0){const s=(e==null?void 0:e.renderBefore)??null;i._$litPart$=r=new D(t.insertBefore(T(),s),s,void 0,e??{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const S=globalThis;let x=class extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Qt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return A}};var kt;x._$litElement$=!0,x.finalized=!0,(kt=S.litElementHydrateSupport)==null||kt.call(S,{LitElement:x});const Z=S.litElementPolyfillSupport;Z==null||Z({LitElement:x});(S.litElementVersions??(S.litElementVersions=[])).push("4.2.2");let H;const te=new Uint8Array(16);function ee(){if(!H&&(H=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!H))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return H(te)}const u=[];for(let n=0;n<256;++n)u.push((n+256).toString(16).slice(1));function ie(n,t=0){return u[n[t+0]]+u[n[t+1]]+u[n[t+2]]+u[n[t+3]]+"-"+u[n[t+4]]+u[n[t+5]]+"-"+u[n[t+6]]+u[n[t+7]]+"-"+u[n[t+8]]+u[n[t+9]]+"-"+u[n[t+10]]+u[n[t+11]]+u[n[t+12]]+u[n[t+13]]+u[n[t+14]]+u[n[t+15]]}const re=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),St={randomUUID:re};function Ct(n,t,e){if(St.randomUUID&&!n)return St.randomUUID();n=n||{};const i=n.random||(n.rng||ee)();return i[6]=i[6]&15|64,i[8]=i[8]&63|128,ie(i)}const Lt=[{value:"bass",id:1,type:"int"},{value:"bass drum",id:2,type:"int"},{value:"snare drum",id:3,type:"int"},{value:"hi-hat",id:4,type:"int"},{value:"tom",id:5,type:"int"},{value:"blip",id:6,type:"note"},{value:"hardsync",id:7,type:"int"},{value:"noise fx",id:8,type:"int"},{value:"arpeggio",id:9,type:"int"},{value:"melodic arp",id:10,type:"note"},{value:"falling arp",id:11,type:"note"},{value:"octave arp",id:12,type:"note"},{value:"lead",id:13,type:"note"},{value:"vibrato",id:14,type:"note"},{value:"portamento",id:15,type:"note"},{value:"echo",id:16,type:"note"}];function ne(){const n={};for(let e=1;e<=16;e++)n[e]={value:e,active:!1,params:{a:null,b:null,multiply:null}};const t={};return Lt.forEach(e=>{t[e.id]={id:e.id,value:e.value,type:e.type,steps:JSON.parse(JSON.stringify(n))}}),t}class se extends EventTarget{constructor(){super(),this.state={app:{activePattern:null,activeChord:null,theme:"dark"},patterns:[],chords:[]},this.load(),this._applyTheme()}load(){try{const t=localStorage.getItem("state");if(t){const e=JSON.parse(t);this.state={app:{activePattern:null,activeChord:null,theme:"dark",...e.app||{}},patterns:e.patterns||[],chords:e.chords||[]}}}catch(t){console.error("Failed to load state from localStorage:",t)}}_applyTheme(){this.state.app.theme==="light"?document.body.setAttribute("data-theme","light"):document.body.removeAttribute("data-theme")}setTheme(t){this.state.app.theme=t,this._applyTheme(),this.save()}save(){try{localStorage.setItem("state",JSON.stringify(this.state))}catch(t){console.error("Failed to save state to localStorage:",t)}this.dispatchEvent(new CustomEvent("change",{detail:this.state}))}addPattern(t){const e=Ct(),i={id:e,name:t||`Pattern ${this.state.patterns.length+1}`,pattern:ne()};return this.state.patterns.push(i),this.state.app.activePattern=e,this.save(),e}editPattern(t,e,i){this.state.patterns=this.state.patterns.map(r=>r.id===t?{...r,name:e||r.name,pattern:i}:r),this.save()}deletePattern(t){this.state.patterns=this.state.patterns.filter(e=>e.id!==t),this.state.app.activePattern===t&&(this.state.app.activePattern=null),this.save()}addChords(t){const e=Ct(),i={id:e,name:t||`Chord progression ${this.state.chords.length+1}`,chordsOrder:[]};return this.state.chords.push(i),this.state.app.activeChord=e,this.save(),e}editChords(t,e,i){this.state.chords=this.state.chords.map(r=>r.id===t?{...r,name:e||r.name,chordsOrder:i}:r),this.save()}deleteChord(t){this.state.chords=this.state.chords.filter(e=>e.id!==t),this.state.app.activeChord===t&&(this.state.app.activeChord=null),this.save()}setActivePattern(t){this.state.app.activePattern=t,this.save()}setActiveChord(t){this.state.app.activeChord=t,this.save()}getActivePattern(){return this.state.patterns.find(t=>t.id===this.state.app.activePattern)||null}getActiveChord(){return this.state.chords.find(t=>t.id===this.state.app.activeChord)||null}}const g=new se,R=class R extends x{constructor(){super(),this.isDrawerOpen=!1,this.showPatternModal=!1,this.showChordModal=!1,this.newPatternName="",this.newChordName="",this.currentTheme=g.state.app.theme}connectedCallback(){super.connectedCallback(),this._onStoreChange=this._onStoreChange.bind(this),g.addEventListener("change",this._onStoreChange)}disconnectedCallback(){super.disconnectedCallback(),g.removeEventListener("change",this._onStoreChange)}_onStoreChange(){this.currentTheme=g.state.app.theme}render(){const t=this.currentTheme==="light";return h`
      <header>
        <div class="brand-section">
          <button class="menu-btn" @click="${this._openDrawer}" aria-label="Open menu">
            <svg viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
          <a href="#/" class="logo">PO-20 ARCADE</a>
        </div>
      </header>

      <!-- Navigation Drawer -->
      <div class="drawer-overlay ${this.isDrawerOpen?"open":""}" @click="${this._closeDrawer}">
        <div class="drawer" @click="${e=>e.stopPropagation()}">
          <div class="drawer-header">
            <h2 class="drawer-title">MENU</h2>
            <button class="close-btn" @click="${this._closeDrawer}">&times;</button>
          </div>
          
          <ul class="nav-list">
            <li class="nav-item">
              <a href="#/" class="nav-link" @click="${this._closeDrawer}">
                <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                Dashboard
              </a>
            </li>
            
            <div class="divider"></div>

            <li class="nav-item">
              <div class="nav-link" @click="${this._openPatternModal}">
                <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                New Pattern
              </div>
            </li>
            <li class="nav-item">
              <a href="#/patterns" class="nav-link" @click="${this._closeDrawer}">
                <svg viewBox="0 0 24 24"><path d="M4 10.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-12c-.83 0-1.5-.67-1.5-1.5S3.17 1.5 4 1.5 5.5 2.17 5.5 3 4.83 4 4 4zm4-.5h14v3H8v-3zm0 6h14v3H8v-3zm0 6h14v3H8v-3z"/></svg>
                Pattern Bank
              </a>
            </li>

            <div class="divider"></div>

            <li class="nav-item">
              <div class="nav-link" @click="${this._openChordModal}">
                <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                New Chord progression
              </div>
            </li>
            <li class="nav-item">
              <a href="#/chords" class="nav-link" @click="${this._closeDrawer}">
                <svg viewBox="0 0 24 24"><path d="M4 10.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0 6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm0-12c-.83 0-1.5-.67-1.5-1.5S3.17 1.5 4 1.5 5.5 2.17 5.5 3 4.83 4 4 4zm4-.5h14v3H8v-3zm0 6h14v3H8v-3zm0 6h14v3H8v-3z"/></svg>
                Chord sets list
              </a>
            </li>
          </ul>

          <!-- Theme Toggle -->
          <div class="theme-section">
            <div class="theme-label">Appearance</div>
            <div class="theme-toggle">
              <!-- Moon icon (dark) -->
              <span class="theme-icon ${t?"":"active"}">
                <svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/></svg>
              </span>
              <button
                class="toggle-pill ${t?"light-active":""}"
                @click="${this._toggleTheme}"
                aria-label="Toggle light/dark mode"
                aria-pressed="${t}"
              >
                <div class="toggle-knob"></div>
              </button>
              <!-- Sun icon (light) -->
              <span class="theme-icon ${t?"active":""}">
                <svg viewBox="0 0 24 24"><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 11H1v2h3v-2zm9-9h-2v2.99h2V2zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zM20 11v2h3v-2h-3zm-8-2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-1 13h2v-3h-2v3zm-7.45-3.91l1.79-1.79-1.41-1.41-1.79 1.79 1.41 1.41z"/></svg>
              </span>
            </div>
          </div>

          <!-- GitHub Link (styled) -->
          <div class="donate-container">
            <a href="https://github.com/warmsynths/po20" target="_blank" class="btn btn-secondary" style="font-size: 13px; width: 100%; display: block; text-decoration: none; box-sizing: border-box; text-align: center;">
              Developed by warmsynths
            </a>
          </div>
        </div>
      </div>

      <!-- New Pattern Dialog Modal -->
      <div class="modal-overlay ${this.showPatternModal?"open":""}" @click="${this._closePatternModal}">
        <div class="modal" @click="${e=>e.stopPropagation()}">
          <h3>Create New Pattern</h3>
          <form @submit="${this._createPattern}">
            <div class="input-group">
              <label for="pattern-name">Pattern Name</label>
              <input 
                type="text" 
                id="pattern-name" 
                placeholder="e.g. Synth Wave Intro"
                .value="${this.newPatternName}"
                @input="${e=>this.newPatternName=e.target.value}"
                required
              />
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" @click="${this._closePatternModal}">Cancel</button>
              <button type="submit" class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>

      <!-- New Chord Set Dialog Modal -->
      <div class="modal-overlay ${this.showChordModal?"open":""}" @click="${this._closeChordModal}">
        <div class="modal" @click="${e=>e.stopPropagation()}">
          <h3>Create Chord Progression</h3>
          <form @submit="${this._createChord}">
            <div class="input-group">
              <label for="chord-name">Progression Name</label>
              <input 
                type="text" 
                id="chord-name" 
                placeholder="e.g. Pop Verse Chords"
                .value="${this.newChordName}"
                @input="${e=>this.newChordName=e.target.value}"
                required
              />
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-secondary" @click="${this._closeChordModal}">Cancel</button>
              <button type="submit" class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    `}_openDrawer(){this.isDrawerOpen=!0}_closeDrawer(){this.isDrawerOpen=!1}_openPatternModal(){this.isDrawerOpen=!1,this.newPatternName="",this.showPatternModal=!0,setTimeout(()=>{var t,e;(e=(t=this.shadowRoot)==null?void 0:t.getElementById("pattern-name"))==null||e.focus()},100)}_closePatternModal(){this.showPatternModal=!1}_openChordModal(){this.isDrawerOpen=!1,this.newChordName="",this.showChordModal=!0,setTimeout(()=>{var t,e;(e=(t=this.shadowRoot)==null?void 0:t.getElementById("chord-name"))==null||e.focus()},100)}_closeChordModal(){this.showChordModal=!1}_toggleTheme(){const t=this.currentTheme==="dark"?"light":"dark";g.setTheme(t)}_createPattern(t){t.preventDefault(),this.newPatternName.trim()&&(g.addPattern(this.newPatternName.trim()),this._closePatternModal(),window.location.hash="/pattern")}_createChord(t){t.preventDefault(),this.newChordName.trim()&&(g.addChords(this.newChordName.trim()),this._closeChordModal(),window.location.hash="/chord")}};R.properties={isDrawerOpen:{type:Boolean},showPatternModal:{type:Boolean},showChordModal:{type:Boolean},newPatternName:{type:String},newChordName:{type:String},currentTheme:{type:String}},R.styles=w`
    :host {
      display: block;
      width: 100%;
      background: var(--bg-surface);
      border-bottom: 2px solid var(--border-subtle);
      position: sticky;
      top: 0;
      z-index: 100;
      transition: background 0.3s ease, border-color 0.3s ease;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      padding: 0 16px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .brand-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .menu-btn {
      background: transparent;
      border: none;
      color: var(--text-primary);
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.2s;
    }

    .menu-btn:hover {
      background: var(--border-subtle);
    }

    .menu-btn svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    .logo {
      font-family: 'VT323', monospace;
      font-size: 26px;
      color: var(--accent);
      text-decoration: none;
      font-weight: bold;
      letter-spacing: 1px;
    }

    /* Sliding Drawer Menu */
    .drawer-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      z-index: 200;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .drawer-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }

    .drawer {
      position: fixed;
      top: 0;
      left: 0;
      width: 280px;
      height: 100%;
      background: var(--bg-surface-alt);
      box-shadow: 5px 0 25px rgba(0,0,0,0.4);
      z-index: 201;
      transform: translateX(-100%);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .drawer-overlay.open .drawer {
      transform: translateX(0);
    }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .drawer-title {
      font-family: 'VT323', monospace;
      font-size: 24px;
      color: var(--accent);
      margin: 0;
    }

    .close-btn {
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 24px;
      padding: 4px;
      border-radius: 4px;
      transition: color 0.2s, background 0.2s;
    }

    .close-btn:hover {
      color: var(--text-primary);
      background: var(--border-subtle);
    }

    .nav-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .nav-item {
      border-bottom: 1px solid var(--border-faint);
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 16px;
      transition: all 0.2s;
      cursor: pointer;
    }

    .nav-link:hover {
      color: var(--accent);
      background: var(--bg-row-hover);
      padding-left: 24px;
    }

    .nav-link svg {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }

    .divider {
      height: 1px;
      background: var(--border-subtle);
      margin: 16px 0;
    }

    /* ---- Theme Toggle ---- */
    .theme-section {
      padding: 16px 20px;
      border-top: 1px solid var(--border-subtle);
    }

    .theme-label {
      font-size: 12px;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    .theme-toggle {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .theme-icon {
      display: flex;
      align-items: center;
      color: var(--text-muted);
      transition: color 0.2s;
    }

    .theme-icon svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }

    .theme-icon.active {
      color: var(--accent);
    }

    .toggle-pill {
      position: relative;
      width: 48px;
      height: 26px;
      background: var(--border-subtle);
      border-radius: 13px;
      cursor: pointer;
      border: none;
      padding: 0;
      transition: background 0.3s ease;
      flex-shrink: 0;
    }

    .toggle-pill.light-active {
      background: var(--accent);
    }

    .toggle-knob {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 20px;
      height: 20px;
      background: var(--text-primary);
      border-radius: 50%;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    }

    .toggle-pill.light-active .toggle-knob {
      transform: translateX(22px);
    }

    /* ---- Donate Container ---- */
    .donate-container {
      padding: 20px;
      margin-top: auto;
      text-align: center;
      background: var(--bg-inset);
      border-top: 1px solid var(--border-mid);
    }

    /* Modals for creating new elements */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(5px);
      z-index: 300;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    }

    .modal-overlay.open {
      opacity: 1;
      pointer-events: auto;
    }

    .modal {
      background: var(--bg-surface);
      border: 3px solid var(--accent);
      border-radius: 12px;
      width: 90%;
      max-width: 400px;
      padding: 24px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
      transform: scale(0.9);
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal-overlay.open .modal {
      transform: scale(1);
    }

    .modal h3 {
      font-family: 'VT323', monospace;
      font-size: 26px;
      color: var(--text-primary);
      margin-top: 0;
      margin-bottom: 16px;
      letter-spacing: 0.5px;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
    }

    .input-group label {
      font-size: 14px;
      color: var(--text-muted);
    }

    .input-group input {
      background: var(--bg-inset);
      border: 2px solid var(--border-subtle);
      border-radius: 6px;
      padding: 10px 12px;
      color: var(--text-primary);
      font-size: 16px;
      transition: border-color 0.2s;
    }

    .input-group input:focus {
      outline: none;
      border-color: var(--accent);
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
    }

    .btn {
      padding: 10px 18px;
      border-radius: 100px;
      border: none;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-secondary {
      background: var(--border-subtle);
      color: var(--text-secondary);
    }

    .btn-secondary:hover {
      background: var(--border-faint);
      color: var(--text-primary);
    }

    .btn-primary {
      background: var(--accent);
      color: #fff;
    }

    .btn-primary:hover {
      background: var(--accent-hover);
    }
  `;let Q=R;customElements.define("po20-header",Q);const ae=""+new URL("PO20-arcade-side-eyvYnRXh.png",import.meta.url).href,pt=class pt extends x{render(){return h`
      <div class="footer-content">
        <img src="${ae}" alt="PO-20 Arcade Hardware Layout" />
        <div class="copyright">PO-20 Arcade Companion • TE Inspired</div>
      </div>
    `}};pt.styles=w`
    :host {
      display: block;
      width: 100%;
      padding: 40px 16px;
      background: var(--bg-base);
      border-top: 2px solid var(--bg-surface);
      box-sizing: border-box;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    img {
      max-width: 380px;
      width: 100%;
      height: auto;
      opacity: 0.85;
      filter: drop-shadow(0 8px 16px rgba(0,0,0,0.6));
      transition: opacity 0.2s;
    }

    img:hover {
      opacity: 1;
    }

    .copyright {
      font-size: 13px;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
  `;let tt=pt;customElements.define("po20-footer",tt);const V=class V extends x{constructor(){super(),this.patterns=[],this.chords=[],this._onStateChange=this._onStateChange.bind(this)}connectedCallback(){super.connectedCallback(),g.addEventListener("change",this._onStateChange),this._loadData()}disconnectedCallback(){super.disconnectedCallback(),g.removeEventListener("change",this._onStateChange)}_loadData(){this.patterns=[...g.state.patterns],this.chords=[...g.state.chords]}_onStateChange(){this._loadData()}render(){return h`
      <div class="container">
        
        <div class="hero-section">
          <h1 class="hero-title">PO-20 ARCADE COMPANION</h1>
          <p class="hero-tagline">
            Save and organize step patterns, note parameters, and song chord progressions for your Teenage Engineering PO-20 pocket operator arcade.
          </p>
        </div>

        <!-- Create Cards -->
        <div class="action-grid">
          <div class="action-card" @click="${this._triggerNewPattern}">
            <svg viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <h3>NEW PATTERN</h3>
            <p>Design a 16-step pattern, toggling triggers and automation parameters across 16 retro arcade sounds.</p>
          </div>
          <div class="action-card" @click="${this._triggerNewChords}">
            <svg viewBox="0 0 24 24">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            <h3>NEW CHORD SET</h3>
            <p>Construct a song progression using the 16 chord options available on the PO-20 Arcade hardware.</p>
          </div>
        </div>

        <!-- Lists Container -->
        <div class="list-section-grid">
          
          <!-- Patterns Column -->
          <div class="list-card">
            <h2>Patterns <span>(${this.patterns.length})</span></h2>
            
            ${this.patterns.length>0?h`
              <div class="items-list">
                ${this.patterns.map(t=>h`
                  <div class="item-row">
                    <div class="item-info" @click="${()=>this._editPattern(t.id)}">
                      <div class="item-name">${t.name}</div>
                      <div class="item-meta">16 Sounds • Step Automation</div>
                    </div>
                    <div class="row-actions">
                      <button class="action-btn action-btn-edit" @click="${()=>this._editPattern(t.id)}" title="Edit Pattern">
                        <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                      </button>
                      <button class="action-btn action-btn-delete" @click="${()=>this._deletePattern(t.id)}" title="Delete Pattern">
                        <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                    </div>
                  </div>
                `)}
              </div>
            `:h`
              <div class="empty-state">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                <div>No patterns saved yet. Click "New Pattern" above to create one.</div>
              </div>
            `}
          </div>

          <!-- Chords Column -->
          <div class="list-card">
            <h2>Chords <span>(${this.chords.length})</span></h2>
            
            ${this.chords.length>0?h`
              <div class="items-list">
                ${this.chords.map(t=>h`
                  <div class="item-row">
                    <div class="item-info" @click="${()=>this._editChords(t.id)}">
                      <div class="item-name">${t.name}</div>
                      <div class="item-meta">${t.chordsOrder.length||0} Chords in chain</div>
                    </div>
                    <div class="row-actions">
                      <button class="action-btn action-btn-edit" @click="${()=>this._editChords(t.id)}" title="Edit Progression">
                        <svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                      </button>
                      <button class="action-btn action-btn-delete" @click="${()=>this._deleteChords(t.id)}" title="Delete Progression">
                        <svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                    </div>
                  </div>
                `)}
              </div>
            `:h`
              <div class="empty-state">
                <svg viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                <div>No chord sets saved yet. Click "New Chord Set" above to create one.</div>
              </div>
            `}
          </div>

        </div>
      </div>
    `}_triggerNewPattern(){var e,i;const t=(i=(e=document.querySelector("po20-app"))==null?void 0:e.shadowRoot)==null?void 0:i.querySelector("po20-header");t&&t._openPatternModal()}_triggerNewChords(){var e,i;const t=(i=(e=document.querySelector("po20-app"))==null?void 0:e.shadowRoot)==null?void 0:i.querySelector("po20-header");t&&t._openChordModal()}_editPattern(t){g.setActivePattern(t),window.location.hash="/pattern"}_deletePattern(t){confirm("Are you sure you want to delete this pattern?")&&g.deletePattern(t)}_editChords(t){g.setActiveChord(t),window.location.hash="/chord"}_deleteChords(t){confirm("Are you sure you want to delete this chord progression?")&&g.deleteChord(t)}};V.properties={patterns:{type:Array},chords:{type:Array}},V.styles=w`
    :host {
      display: block;
      width: 100%;
      min-height: calc(100vh - 120px);
      box-sizing: border-box;
      color: var(--text-primary);
      padding: 30px 16px;
      background: var(--bg-base);
    }

    .container {
      max-width: 960px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 30px;
    }

    .hero-section {
      text-align: center;
      margin-bottom: 10px;
    }

    .hero-title {
      font-family: 'VT323', monospace;
      font-size: 48px;
      color: #ff5722;
      margin: 0 0 10px 0;
      text-shadow: 0 0 10px rgba(255, 87, 34, 0.3);
    }

    .hero-tagline {
      font-size: 16px;
      color: var(--text-muted);
      max-width: 500px;
      margin: 0 auto;
      line-height: 1.5;
    }

    .action-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .action-card {
      background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-surface-alt) 100%);
      border: 2px solid var(--border-subtle);
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    }

    .action-card:hover {
      transform: translateY(-4px);
      border-color: var(--accent);
      box-shadow: 0 10px 20px rgba(0,0,0,0.3), 0 0 8px rgba(255, 87, 34, 0.2);
    }

    .action-card svg {
      width: 48px;
      height: 48px;
      fill: var(--accent);
      transition: transform 0.3s ease;
    }

    .action-card:hover svg {
      transform: scale(1.1) rotate(90deg);
    }

    .action-card h3 {
      font-family: 'VT323', monospace;
      font-size: 28px;
      margin: 0;
      letter-spacing: 0.5px;
    }

    .action-card p {
      font-size: 14px;
      color: var(--text-muted);
      margin: 0;
      line-height: 1.4;
    }

    .list-section-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
      gap: 30px;
    }

    .list-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    .list-card h2 {
      font-family: 'VT323', monospace;
      font-size: 32px;
      margin: 0 0 16px 0;
      border-bottom: 2px solid var(--border-subtle);
      padding-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .list-card h2 span {
      font-size: 16px;
      color: var(--text-dim);
    }

    .items-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-height: 380px;
      overflow-y: auto;
      padding-right: 4px;
    }

    /* Custom scrollbar */
    .items-list::-webkit-scrollbar {
      width: 6px;
    }
    .items-list::-webkit-scrollbar-track {
      background: var(--bg-inset);
    }
    .items-list::-webkit-scrollbar-thumb {
      background: var(--border-subtle);
      border-radius: 3px;
    }

    .item-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      background: var(--bg-row);
      border: 1px solid var(--border-faint);
      border-radius: 8px;
      transition: all 0.2s;
    }

    .item-row:hover {
      background: var(--bg-row-hover);
      border-color: var(--border-subtle);
    }

    .item-info {
      flex: 1;
      cursor: pointer;
    }

    .item-name {
      font-size: 16px;
      font-weight: bold;
      color: var(--text-primary);
    }

    .item-meta {
      font-size: 12px;
      color: var(--text-muted);
      margin-top: 2px;
    }

    .row-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .action-btn {
      background: transparent;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-muted);
      transition: all 0.2s;
    }

    .action-btn-edit:hover {
      background: var(--border-subtle);
      color: var(--accent);
    }

    .action-btn-delete:hover {
      background: rgba(244, 67, 54, 0.15);
      color: #f44336;
    }

    .action-btn svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }

    .empty-state {
      text-align: center;
      padding: 40px 20px;
      color: var(--text-dim);
      font-size: 15px;
    }

    .empty-state svg {
      width: 40px;
      height: 40px;
      fill: currentColor;
      margin-bottom: 12px;
      opacity: 0.5;
    }
  `;let et=V;customElements.define("po20-landing",et);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oe={CHILD:2},he=n=>(...t)=>({_$litDirective$:n,values:t});class de{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class it extends de{constructor(t){if(super(t),this.it=p,t.type!==oe.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===p||t==null)return this._t=void 0,this.it=t;if(t===A)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const e=[t];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}it.directiveName="unsafeHTML",it.resultType=1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class rt extends it{}rt.directiveName="unsafeSVG",rt.resultType=2;const ce=he(rt),le=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">\r
  <title>bass</title>\r
  <g id="a7769dcf-ca8a-4258-b72e-662085b1e398" data-name="Layer 2">\r
    <g id="fb395ff0-3eb6-494a-be67-bbfd3d2ad5a2" data-name="Layer 1">\r
      <polygon points="99.2 0 140.68 0 140.68 41.24 99.44 41.24 99.2 0"/>\r
      <polygon points="99.2 49.72 140.68 49.72 140.68 90.96 99.44 90.96 99.2 49.72"/>\r
      <rect x="49.72" y="99.32" width="41.24" height="41.24"/>\r
      <polygon points="99.2 99.32 140.68 99.32 140.68 140.56 99.44 140.56 99.2 99.32"/>\r
      <rect x="149.04" y="99.32" width="41.24" height="41.24"/>\r
      <rect y="149.04" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="149.04" width="41.24" height="41.24"/>\r
      <polygon points="99.2 149.04 140.68 149.04 140.68 190.28 99.44 190.28 99.2 149.04"/>\r
      <rect x="149.04" y="149.04" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="149.04" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="198.76" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="198.76" width="41.24" height="41.24"/>\r
    </g>\r
  </g>\r
</svg>\r
`,pe=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">\r
  <title>bassDrum</title>\r
  <g id="e0b4e68f-1c80-4cd7-8e4a-3073680f45ce" data-name="Layer 2">\r
    <g id="a2e113d1-7988-482c-9fb7-7a4bffd4f756" data-name="Layer 1">\r
      <rect width="41.24" height="41.24"/>\r
      <rect x="99.44" width="41.24" height="41.24"/>\r
      <rect x="198.76" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="49.72" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="49.72" width="41.24" height="41.24"/>\r
      <rect y="99.32" width="41.24" height="41.24"/>\r
      <rect x="99.44" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="149.04" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="149.04" width="41.24" height="41.24"/>\r
      <rect y="198.76" width="41.24" height="41.24"/>\r
      <rect x="99.44" y="198.76" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="198.76" width="41.24" height="41.24"/>\r
    </g>\r
  </g>\r
</svg>\r
`,ge=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">\r
  <title>snareDrum</title>\r
  <g id="fd33c6b4-c4a7-488d-9abf-daeb44011372" data-name="Layer 2">\r
    <g id="b3d2f010-9c3c-4f12-bdfe-fb023e533f28" data-name="Layer 1">\r
      <rect x="198.76" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="49.72" width="41.24" height="41.24"/>\r
      <rect x="99.32" y="99.32" width="41.24" height="41.24"/>\r
      <polygon points="49.48 149.04 90.96 149.04 90.96 190.28 49.72 190.28 49.48 149.04"/>\r
      <rect y="198.77" width="41.24" height="41.24"/>\r
    </g>\r
  </g>\r
</svg>\r
`,ue=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">\r
  <title>hiHat</title>\r
  <g id="b2bd1590-ce18-4937-8bf0-7a3ea8487db4" data-name="Layer 2">\r
    <g id="e92d0ad2-b73d-4190-ba20-c952b93930bf" data-name="Layer 1">\r
      <rect x="49.72" width="41.24" height="41.24"/>\r
      <rect x="99.56" width="41.24" height="41.24"/>\r
      <rect x="149.04" width="41.24" height="41.24"/>\r
      <rect y="49.72" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="49.72" width="41.24" height="41.24"/>\r
      <rect x="99.56" y="49.72" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="49.72" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="49.72" width="41.24" height="41.24"/>\r
      <rect y="99.32" width="41.24" height="41.24"/>\r
      <rect x="99.56" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="99.32" width="41.24" height="41.24"/>\r
      <rect y="149.04" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="149.04" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="198.77" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="198.77" width="41.24" height="41.24"/>\r
    </g>\r
  </g>\r
</svg>\r
`,ve=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">\r
  <title>tom</title>\r
  <g id="ac9efaa3-f055-4e18-b605-93ea6abfc0b0" data-name="Layer 2">\r
    <g id="ad8acb0f-546b-4543-8f56-f34d8b5aee46" data-name="Layer 1">\r
      <rect x="49.72" width="41.24" height="41.24"/>\r
      <polygon points="99.2 0 140.68 0 140.68 41.24 99.44 41.24 99.2 0"/>\r
      <rect x="149.04" width="41.24" height="41.24"/>\r
      <rect y="49.84" width="41.24" height="41.24"/>\r
      <polygon points="99.2 49.84 140.68 49.84 140.68 91.07 99.44 91.07 99.2 49.84"/>\r
      <rect x="198.76" y="49.84" width="41.24" height="41.24"/>\r
      <rect y="99.32" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="99.32" width="41.24" height="41.24"/>\r
      <polygon points="99.2 99.32 140.68 99.32 140.68 140.56 99.44 140.56 99.2 99.32"/>\r
      <rect x="149.04" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="149.04" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="149.04" width="41.24" height="41.24"/>\r
      <rect y="198.76" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="198.76" width="41.24" height="41.24"/>\r
    </g>\r
  </g>\r
</svg>\r
`,xe=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="169.63" viewBox="0 0 240 169.63">\r
  <title>blip</title>\r
  <g id="ec457cc5-27d6-4186-a6e0-b8bd2e9dec28" data-name="Layer 2">\r
    <g id="abf14211-5e90-4639-99f0-ede6ba1be698" data-name="Layer 1">\r
      <rect x="35.14" width="29.15" height="29.15"/>\r
      <rect x="175.63" width="29.15" height="29.15"/>\r
      <rect x="70.29" y="35.22" width="29.15" height="29.15"/>\r
      <rect x="140.49" y="35.22" width="29.15" height="29.15"/>\r
      <rect y="70.2" width="29.15" height="29.15"/>\r
      <rect x="35.14" y="70.2" width="29.15" height="29.15"/>\r
      <rect x="70.29" y="70.2" width="29.15" height="29.15"/>\r
      <rect x="105.43" y="70.2" width="29.15" height="29.15"/>\r
      <rect x="140.49" y="70.2" width="29.15" height="29.15"/>\r
      <rect x="175.63" y="70.2" width="29.15" height="29.15"/>\r
      <rect x="210.85" y="70.2" width="29.15" height="29.15"/>\r
      <rect x="70.29" y="105.34" width="29.15" height="29.15"/>\r
      <rect x="105.43" y="105.34" width="29.15" height="29.15"/>\r
      <rect x="140.49" y="105.34" width="29.15" height="29.15"/>\r
      <rect x="35.14" y="140.49" width="29.15" height="29.15"/>\r
      <rect x="175.63" y="140.49" width="29.15" height="29.15"/>\r
    </g>\r
  </g>\r
</svg>\r
`,be=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">\r
  <title>hardsync</title>\r
  <g id="a76cd04e-ef5f-4980-a3c6-3909203ae0a2" data-name="Layer 2">\r
    <g id="a9f1b14c-95e7-4c08-b6bb-3423e3f49e63" data-name="Layer 1">\r
      <polygon points="49.48 0 90.96 0 90.96 41.24 49.72 41.24 49.48 0"/>\r
      <rect x="99.32" width="41.24" height="41.24"/>\r
      <rect x="149.04" width="41.24" height="41.24"/>\r
      <rect y="49.84" width="41.24" height="41.24"/>\r
      <rect x="99.32" y="49.84" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="49.84" width="41.24" height="41.24"/>\r
      <rect y="99.32" width="41.24" height="41.24"/>\r
      <polygon points="49.48 99.32 90.96 99.32 90.96 140.56 49.72 140.56 49.48 99.32"/>\r
      <rect x="99.32" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="99.32" width="41.24" height="41.24"/>\r
      <rect y="149.04" width="41.24" height="41.24"/>\r
      <polygon points="49.48 149.04 90.96 149.04 90.96 190.28 49.72 190.28 49.48 149.04"/>\r
      <rect x="99.32" y="149.04" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="149.04" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="149.04" width="41.24" height="41.24"/>\r
      <rect y="198.76" width="41.24" height="41.24"/>\r
      <rect x="99.32" y="198.76" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="198.76" width="41.24" height="41.24"/>\r
    </g>\r
  </g>\r
</svg>\r
`,me=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">\r
  <title>noiseFx</title>\r
  <g id="a7642163-f729-429d-901d-539994715f3e" data-name="Layer 2">\r
    <g id="bdd6d9df-3b0b-43fb-b597-1495cc65213f" data-name="Layer 1">\r
      <rect width="41.24" height="41.24"/>\r
      <rect x="49.72" width="41.24" height="41.24"/>\r
      <rect x="99.56" width="41.24" height="41.24"/>\r
      <rect x="149.04" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="49.84" width="41.24" height="41.24"/>\r
      <rect x="99.56" y="49.84" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="49.84" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="49.84" width="41.24" height="41.24"/>\r
      <rect y="99.32" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="99.56" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="149.04" width="41.24" height="41.24"/>\r
      <rect x="99.56" y="149.04" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="149.04" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="149.04" width="41.24" height="41.24"/>\r
      <rect y="198.76" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="198.76" width="41.24" height="41.24"/>\r
      <rect x="99.56" y="198.76" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="198.76" width="41.24" height="41.24"/>\r
    </g>\r
  </g>\r
</svg>\r
`,fe=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">\r
  <title>arpeggio</title>\r
  <g id="eee02376-8346-4a5f-bd1c-d44a821e120e" data-name="Layer 2">\r
    <g id="a593946e-2581-4cd3-bfd1-f8eaecf9a66d" data-name="Layer 1">\r
      <polygon points="99.2 0 140.68 0 140.68 41.24 99.44 41.24 99.2 0"/>\r
      <polygon points="99.2 49.6 140.68 49.6 140.68 90.84 99.44 90.84 99.2 49.6"/>\r
      <rect y="99.32" width="41.24" height="41.24"/>\r
      <polygon points="99.2 99.32 140.68 99.32 140.68 140.56 99.44 140.56 99.2 99.32"/>\r
      <polygon points="99.2 149.04 140.68 149.04 140.68 190.28 99.44 190.28 99.2 149.04"/>\r
      <rect x="198.76" y="99.32" width="41.24" height="41.24"/>\r
      <rect y="198.76" width="41.24" height="41.24"/>\r
      <polygon points="99.2 198.76 140.68 198.76 140.68 240 99.44 240 99.2 198.76"/>\r
      <rect x="198.76" y="198.76" width="41.24" height="41.24"/>\r
    </g>\r
  </g>\r
</svg>\r
`,ye=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">\r
  <title>melodicArp</title>\r
  <g id="bd8d31b1-ee39-42a4-b669-e48c67702432" data-name="Layer 2">\r
    <g id="a3ddc103-d615-4aa1-bec9-db37cfd15e2c" data-name="Layer 1">\r
      <rect width="41.24" height="41.24"/>\r
      <rect x="198.76" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="49.6" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="49.6" width="41.24" height="41.24"/>\r
      <rect x="99.44" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="149.04" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="149.04" width="41.24" height="41.24"/>\r
      <rect y="198.76" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="198.76" width="41.24" height="41.24"/>\r
    </g>\r
  </g>\r
</svg>\r
`,we=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">\r
  <title>fallingArp</title>\r
  <g id="fbf52368-37fe-4b6a-b06d-343af7be45de" data-name="Layer 2">\r
    <g id="b0973af9-4bc8-48c0-b5af-2e64d348bd5e" data-name="Layer 1">\r
      <rect x="99.32" width="41.24" height="41.24"/>\r
      <polygon points="49.48 49.6 90.96 49.6 90.96 90.84 49.72 90.84 49.48 49.6"/>\r
      <rect y="99.32" width="41.24" height="41.24"/>\r
      <polygon points="49.48 99.32 90.96 99.32 90.96 140.56 49.72 140.56 49.48 99.32"/>\r
      <rect x="99.32" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="149.04" width="41.24" height="41.24"/>\r
      <rect x="99.32" y="198.76" width="41.24" height="41.24"/>\r
    </g>\r
  </g>\r
</svg>\r
`,$e=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">\r
  <title>octaveArp</title>\r
  <g id="f9c320dd-e919-4837-a194-4fd127d3c7b1" data-name="Layer 2">\r
    <g id="b3f34dd4-f880-40b1-8cbf-323dd1589d89" data-name="Layer 1">\r
      <rect width="41.24" height="41.24"/>\r
      <rect x="49.72" width="41.24" height="41.24"/>\r
      <rect x="99.56" width="41.24" height="41.24"/>\r
      <rect y="49.6" width="41.24" height="41.24"/>\r
      <rect x="99.56" y="49.6" width="41.24" height="41.24"/>\r
      <rect y="99.32" width="41.24" height="41.24"/>\r
      <rect x="99.56" y="99.32" width="41.24" height="41.24"/>\r
      <rect y="149.04" width="41.24" height="41.24"/>\r
      <rect x="99.56" y="149.04" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="149.04" width="41.24" height="41.24"/>\r
      <rect x="99.56" y="198.76" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="198.76" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="198.76" width="41.24" height="41.24"/>\r
    </g>\r
  </g>\r
</svg>\r
`,_e=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="134.67" viewBox="0 0 240 134.67">\r
  <title>lead</title>\r
  <g id="a88f854b-d825-4164-a54e-f4335ce1de68" data-name="Layer 2">\r
    <g id="b1acad6d-32b1-4cd8-859c-347207d6dd9e" data-name="Layer 1">\r
      <rect x="70.33" width="29.17" height="29.17"/>\r
      <polygon points="105.33 0 134.67 0 134.67 29.17 105.5 29.17 105.33 0"/>\r
      <rect x="140.58" width="29.17" height="29.17"/>\r
      <rect x="35.17" y="35.08" width="29.17" height="29.17"/>\r
      <rect x="70.33" y="35.08" width="29.17" height="29.17"/>\r
      <polygon points="105.33 35.08 134.67 35.08 134.67 64.25 105.5 64.25 105.33 35.08"/>\r
      <rect x="140.58" y="35.08" width="29.17" height="29.17"/>\r
      <rect x="175.75" y="35.08" width="29.17" height="29.17"/>\r
      <rect y="70.33" width="29.17" height="29.17"/>\r
      <rect x="35.17" y="70.33" width="29.17" height="29.17"/>\r
      <rect x="70.33" y="70.33" width="29.17" height="29.17"/>\r
      <polygon points="105.33 70.33 134.67 70.33 134.67 99.5 105.5 99.5 105.33 70.33"/>\r
      <rect x="140.58" y="70.33" width="29.17" height="29.17"/>\r
      <rect x="175.75" y="70.33" width="29.17" height="29.17"/>\r
      <rect x="210.83" y="70.33" width="29.17" height="29.17"/>\r
      <rect x="35.17" y="105.33" width="29.17" height="29.33"/>\r
      <polygon points="105.33 105.33 134.67 105.33 134.67 134.67 105.5 134.67 105.33 105.33"/>\r
      <rect x="175.75" y="105.33" width="29.17" height="29.33"/>\r
    </g>\r
  </g>\r
</svg>\r
`,Se=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="169.71" viewBox="0 0 240 169.71">\r
  <title>vibrato</title>\r
  <g id="f1b03846-02ef-4023-9e49-8cf362f7f9d4" data-name="Layer 2">\r
    <g id="f925f41e-8cba-47db-9d04-6c28f5594c9f" data-name="Layer 1">\r
      <rect x="35.14" width="29.15" height="29.15"/>\r
      <rect x="175.63" width="29.15" height="29.15"/>\r
      <rect y="35.14" width="29.15" height="29.15"/>\r
      <rect x="105.43" y="35.14" width="29.15" height="29.15"/>\r
      <rect x="210.85" y="35.14" width="29.15" height="29.15"/>\r
      <rect x="35.14" y="70.2" width="29.15" height="29.15"/>\r
      <rect x="70.29" y="70.2" width="29.15" height="29.15"/>\r
      <rect x="105.43" y="70.2" width="29.15" height="29.15"/>\r
      <rect x="140.49" y="70.2" width="29.15" height="29.15"/>\r
      <rect x="175.63" y="70.2" width="29.15" height="29.15"/>\r
      <rect x="70.29" y="105.43" width="29.15" height="29.15"/>\r
      <rect x="105.43" y="105.43" width="29.15" height="29.15"/>\r
      <rect x="140.49" y="105.43" width="29.15" height="29.15"/>\r
      <rect x="35.14" y="140.4" width="29.15" height="29.31"/>\r
      <rect x="105.43" y="140.4" width="29.15" height="29.31"/>\r
      <rect x="175.63" y="140.4" width="29.15" height="29.31"/>\r
    </g>\r
  </g>\r
</svg>\r
`,Ce=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240.12" viewBox="0 0 240 240.12">\r
  <title>portamento</title>\r
  <g id="b96fe1ea-d54f-4d67-bae7-67491b9e99dd" data-name="Layer 2">\r
    <g id="fd63c2e9-af59-4bb3-b95c-679bae4c022e" data-name="Layer 1">\r
      <rect width="41.24" height="41.24"/>\r
      <rect x="198.76" width="41.24" height="41.24"/>\r
      <polygon points="49.48 49.72 90.96 49.72 90.96 90.96 49.72 90.96 49.48 49.72"/>\r
      <rect x="99.32" y="49.72" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="49.72" width="41.24" height="41.24"/>\r
      <rect y="99.32" width="41.24" height="41.24"/>\r
      <polygon points="49.48 99.32 90.96 99.32 90.96 140.56 49.72 140.56 49.48 99.32"/>\r
      <rect x="99.32" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="99.32" width="41.24" height="41.24"/>\r
      <rect y="149.16" width="41.24" height="41.24"/>\r
      <rect x="99.32" y="149.16" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="149.16" width="41.24" height="41.24"/>\r
      <rect y="198.65" width="41.24" height="41.47"/>\r
      <polygon points="49.48 198.65 90.96 198.65 90.96 240.12 49.72 240.12 49.48 198.65"/>\r
      <rect x="149.04" y="198.65" width="41.24" height="41.47"/>\r
      <rect x="198.76" y="198.65" width="41.24" height="41.47"/>\r
    </g>\r
  </g>\r
</svg>\r
`,Ae=`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240.12" viewBox="0 0 240 240.12">\r
  <title>echo</title>\r
  <g id="a0cc1cf6-93d4-4b3b-b7e8-ab073d953865" data-name="Layer 2">\r
    <g id="b1a223bd-b475-4e64-b76d-3ddec59408ee" data-name="Layer 1">\r
      <rect width="41.24" height="41.24"/>\r
      <rect x="49.72" width="41.24" height="41.24"/>\r
      <rect x="149.04" width="41.24" height="41.24"/>\r
      <rect x="198.76" width="41.24" height="41.24"/>\r
      <rect y="49.72" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="49.72" width="41.24" height="41.24"/>\r
      <rect x="99.56" y="49.72" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="49.72" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="49.72" width="41.24" height="41.24"/>\r
      <rect y="99.32" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="99.56" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="198.76" y="99.32" width="41.24" height="41.24"/>\r
      <rect x="49.72" y="149.16" width="41.24" height="41.24"/>\r
      <rect x="99.56" y="149.16" width="41.24" height="41.24"/>\r
      <rect x="149.04" y="149.16" width="41.24" height="41.24"/>\r
      <rect x="99.56" y="198.65" width="41.24" height="41.47"/>\r
    </g>\r
  </g>\r
</svg>\r
`,ke=`<svg xmlns="http://www.w3.org/2000/svg" width="241" height="240.97" viewBox="0 0 241 240.97">\r
  <title>button</title>\r
  <g id="a3196aed-25aa-4563-b627-55e019370067" data-name="Layer 2">\r
    <g id="f7abc570-bfd8-4141-9678-9dee65177334" data-name="Layer 1">\r
      <path d="M240.5,120.49a120,120,0,1,1-120-120c65.6.88,120,54.38,120,120" fill="none" stroke="#000" stroke-miterlimit="10"/>\r
      <path d="M50.88,40.59a13.36,13.36,0,0,0-13.05,13V85.83h1.82a.86.86,0,0,1,.88.88l.95.94c0,.88.88,2.12.88,3v57.41a4.08,4.08,0,0,1-.88,3c-.89,0-.89.89-2.12.89a.88.88,0,0,0-.88.94h-.94v32.18a13.35,13.35,0,0,0,13.05,13H88.86A5,5,0,0,1,94,203.35v.88h53.5v.94a4.91,4.91,0,0,1,5.14-5.17h38.27A13.38,13.38,0,0,0,204,186.91V154.49h-1.82s-.94,0-.94-.88l-.88-.94c0-.88-.94-2.11-.94-3V92.24a4.11,4.11,0,0,1,.88-3l.94-.94a.86.86,0,0,0,.88-.88.92.92,0,0,0,.94-.94h.88V54.26a13.32,13.32,0,0,0-13-13h-16.1a7.49,7.49,0,0,1-7-5.17h-93a7.46,7.46,0,0,1-7,5.2H50.79v-.88Z" fill="none" stroke="#000" stroke-miterlimit="10"/>\r
      <path d="M77,120.49A43.43,43.43,0,1,0,120.46,77,43.61,43.61,0,0,0,77,120.49" fill="none" stroke="#000" stroke-miterlimit="10"/>\r
    </g>\r
  </g>\r
</svg>\r
`,Ee={1:le,2:pe,3:ge,4:ue,5:ve,6:xe,7:be,8:me,9:fe,10:ye,11:we,12:$e,13:_e,14:Se,15:Ce,16:Ae,button:ke};function Pe(n){return Ee[n]||""}function Me(n){const t=Pe(n);return t?ce(t):null}const I=class I extends x{constructor(){super(),this._startY=0,this._startValue=0,this._isDragging=!1,this.value=0,this.min=0,this.max=100,this.label="",this.param="",this._startY=0,this._startValue=0,this._isDragging=!1,this._onMouseDown=this._onMouseDown.bind(this),this._onMouseMove=this._onMouseMove.bind(this),this._onMouseUp=this._onMouseUp.bind(this),this._onWheel=this._onWheel.bind(this),this._onTouchStart=this._onTouchStart.bind(this),this._onTouchMove=this._onTouchMove.bind(this),this._onTouchEnd=this._onTouchEnd.bind(this)}render(){const e=-135+(this.value-this.min)/(this.max-this.min)*270;return h`
      <div 
        class="knob-container" 
        @mousedown="${this._onMouseDown}"
        @touchstart="${this._onTouchStart}"
        @wheel="${this._onWheel}"
      >
        <svg class="knob-dial" viewBox="0 0 100 100" style="transform: rotate(${e}deg)">
          <!-- Outer Rim shadow -->
          <circle cx="50" cy="50" r="44" fill="none" stroke="#2a2b2f" stroke-width="4" />
          <!-- Knob Cap -->
          <circle cx="50" cy="50" r="38" fill="#2c2d31" />
          <!-- TE stylized notch details -->
          <circle cx="50" cy="50" r="30" fill="none" stroke="#232427" stroke-width="2" />
          <!-- Dial Line/Indicator Dot -->
          <circle class="indicator-dot" cx="50" cy="18" r="4.5" />
        </svg>
      </div>
      <div class="label">${this.label||this.param}</div>
      <div class="value">${this.value}</div>
    `}_onMouseDown(t){t.preventDefault(),this._startY=t.clientY,this._startValue=this.value,this._isDragging=!0,window.addEventListener("mousemove",this._onMouseMove),window.addEventListener("mouseup",this._onMouseUp)}_onMouseMove(t){if(!this._isDragging)return;const i=(this._startY-t.clientY)*.5;let r=Math.round(this._startValue+i);r=Math.max(this.min,Math.min(this.max,r)),r!==this.value&&(this.value=r,this._dispatchChange())}_onMouseUp(){this._isDragging=!1,window.removeEventListener("mousemove",this._onMouseMove),window.removeEventListener("mouseup",this._onMouseUp)}_onWheel(t){t.preventDefault();const e=t.deltaY<0?1:-1;let i=this.value+e;i=Math.max(this.min,Math.min(this.max,i)),i!==this.value&&(this.value=i,this._dispatchChange())}_onTouchStart(t){t.touches.length===1&&(t.preventDefault(),this._startY=t.touches[0].clientY,this._startValue=this.value,this._isDragging=!0,window.addEventListener("touchmove",this._onTouchMove,{passive:!1}),window.addEventListener("touchend",this._onTouchEnd),window.addEventListener("touchcancel",this._onTouchEnd))}_onTouchMove(t){if(!this._isDragging||t.touches.length!==1)return;const i=(this._startY-t.touches[0].clientY)*.5;let r=Math.round(this._startValue+i);r=Math.max(this.min,Math.min(this.max,r)),r!==this.value&&(this.value=r,this._dispatchChange())}_onTouchEnd(){this._isDragging=!1,window.removeEventListener("touchmove",this._onTouchMove),window.removeEventListener("touchend",this._onTouchEnd),window.removeEventListener("touchcancel",this._onTouchEnd)}_dispatchChange(){this.dispatchEvent(new CustomEvent("change",{detail:{value:this.value,param:this.param},bubbles:!0,composed:!0}))}};I.properties={value:{type:Number},min:{type:Number},max:{type:Number},label:{type:String},param:{type:String}},I.styles=w`
    :host {
      display: inline-flex;
      flex-direction: column;
      align-items: center;
      user-select: none;
      font-family: 'VT323', monospace;
    }

    .knob-container {
      position: relative;
      width: 70px;
      height: 70px;
      cursor: ns-resize;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle, #3a3b40 0%, #202124 100%);
      border: 3px solid #121316;
      border-radius: 50%;
      box-shadow: 
        inset 0 2px 3px rgba(255, 255, 255, 0.1),
        0 4px 6px rgba(0, 0, 0, 0.4);
      transition: border-color 0.2s ease;
    }

    .knob-container:hover {
      border-color: #ff5722;
    }

    .knob-dial {
      width: 100%;
      height: 100%;
      transform-origin: center;
      transition: transform 0.05s linear;
    }

    .indicator-dot {
      fill: #ff5722;
      filter: drop-shadow(0 0 2px rgba(255, 87, 34, 0.8));
    }

    .label {
      font-size: 14px;
      color: #8a8d95;
      text-transform: uppercase;
      margin-top: 6px;
      letter-spacing: 1px;
    }

    .value {
      font-size: 18px;
      color: #ffaa00;
      margin-top: 2px;
      background: #000;
      padding: 1px 6px;
      border-radius: 3px;
      border: 1px solid #333;
      min-width: 32px;
      text-align: center;
      box-shadow: inset 0 1px 3px rgba(0,0,0,0.8);
    }
  `;let nt=I;customElements.define("po20-knob",nt);const j=class j extends x{constructor(){super(),this.titleText="PO-20 ARCADE",this.subtitleText="Companion",this.paramA="--",this.paramB=0,this.activeSteps=void 0,this.selectedStep=null,this.isPlaying=!1}render(){return h`
      <div class="lcd-bezel">
        <div class="lcd-glass">
          
          <div class="lcd-left">
            <div>
              <h2 class="lcd-title">${this.titleText}</h2>
              <div class="lcd-subtitle">${this.subtitleText}</div>
            </div>
            
            <div class="params-display">
              <div class="param-group">
                <span class="param-lbl">PITCH/VAL-A</span>
                <span class="param-val">${this.paramA!==null&&this.paramA!==void 0&&this.paramA!==""?this.paramA:"--"}</span>
              </div>
              <div class="param-group">
                <span class="param-lbl">FILTER/VAL-B</span>
                <span class="param-val">${this.paramB!==null&&this.paramB!==void 0?this.paramB:"--"}</span>
              </div>
            </div>
          </div>
          
          <div class="lcd-right">
            <!-- Mini Step Matrix -->
            <div>
              <div style="font-size: 11px; opacity: 0.6; text-transform: uppercase; margin-bottom: 2px;">Steps</div>
              <div class="mini-matrix">
                ${Array.from({length:16}).map((t,e)=>{const i=e+1,r=this.activeSteps&&this.activeSteps[i]&&this.activeSteps[i].active,s=this.selectedStep===i;return h`
                    <div class="mini-dot ${r?"active":""} ${s?"selected":""}"></div>
                  `})}
              </div>
            </div>

            <!-- Arcade Cabinet Animation -->
            <div class="arcade-anim-container">
              <svg class="arcade-anim ${this.isPlaying?"bounce":""}" viewBox="0 0 100 100">
                <!-- Arcade cabinet silhouette -->
                <path d="M 25 90 
                         L 75 90 
                         L 75 40 
                         L 65 30 
                         L 65 10 
                         L 35 10 
                         L 35 30 
                         L 25 40 Z" stroke="#1e261c" stroke-width="6" fill="none" />
                <!-- Screen inside cabinet -->
                <rect x="42" y="20" width="16" height="12" stroke="#1e261c" stroke-width="2" fill="#1e261c" />
                <!-- Joystick and buttons -->
                <circle cx="45" cy="45" r="3" />
                <circle cx="55" cy="45" r="2" />
                <circle cx="59" cy="45" r="2" />
                <!-- Coin slot detail -->
                <line x1="50" y1="65" x2="50" y2="78" stroke="#1e261c" stroke-width="4" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    `}};j.properties={titleText:{type:String},subtitleText:{type:String},paramA:{type:String},paramB:{type:Number},activeSteps:{type:Object},selectedStep:{type:Number},isPlaying:{type:Boolean}},j.styles=w`
    :host {
      display: block;
      width: 100%;
      box-sizing: border-box;
      font-family: 'VT323', monospace;
      user-select: none;
    }

    .lcd-bezel {
      background: #121316;
      border: 6px solid #232427;
      border-radius: 12px;
      padding: 6px;
      box-shadow: 
        inset 0 4px 6px rgba(0,0,0,0.8),
        0 10px 20px rgba(0,0,0,0.5);
    }

    .lcd-glass {
      background: #b8c9b0;
      border-radius: 6px;
      padding: 12px 16px;
      box-shadow: inset 0 3px 10px rgba(0,0,0,0.5);
      position: relative;
      overflow: hidden;
      display: grid;
      grid-template-columns: 1fr 120px;
      grid-gap: 12px;
      min-height: 110px;
    }

    /* Faint glass reflection */
    .lcd-glass::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 50%;
      background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%);
      pointer-events: none;
    }

    .lcd-left {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #1e261c;
      text-shadow: 1px 1px 0px rgba(255,255,255,0.3);
    }

    .lcd-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      color: #1e261c;
      border-left: 2px dashed rgba(30, 38, 28, 0.2);
      padding-left: 12px;
    }

    .lcd-title {
      font-size: 24px;
      text-transform: uppercase;
      font-weight: bold;
      letter-spacing: 1px;
      line-height: 1;
      margin: 0;
    }

    .lcd-subtitle {
      font-size: 18px;
      opacity: 0.8;
      line-height: 1;
      margin-top: 4px;
      text-transform: uppercase;
    }

    .params-display {
      display: flex;
      gap: 16px;
      margin-top: 10px;
    }

    .param-group {
      display: flex;
      flex-direction: column;
    }

    .param-lbl {
      font-size: 11px;
      text-transform: uppercase;
      opacity: 0.6;
    }

    .param-val {
      font-size: 20px;
      font-weight: bold;
      line-height: 1;
    }

    /* Tiny 16-step matrix visualizer */
    .mini-matrix {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 3px;
      width: 44px;
      margin-bottom: 4px;
    }

    .mini-dot {
      width: 6px;
      height: 6px;
      border: 1px solid rgba(30, 38, 28, 0.4);
      background: transparent;
      border-radius: 50%;
    }

    .mini-dot.active {
      background: #1e261c;
      box-shadow: 0 0 1px rgba(30, 38, 28, 0.8);
    }

    .mini-dot.selected {
      border-color: #1e261c;
      background: repeating-linear-gradient(45deg, #1e261c, #1e261c 2px, transparent 2px, transparent 4px);
    }

    /* Quirky Arcade animations */
    .arcade-anim-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 50px;
    }

    .arcade-anim {
      width: 40px;
      height: 40px;
      fill: #1e261c;
    }

    .bounce {
      animation: bounce 0.6s infinite alternate ease-in-out;
    }

    @keyframes bounce {
      from { transform: translateY(0); }
      to { transform: translateY(-6px); }
    }
  `;let st=j;customElements.define("po20-lcd-screen",st);const At=["None","A1","B1","C1","CS1","D1","E1","F1","FS1","G1","GS1","A2","B2","C2","CS2","D2","E2","F2","FS2","G2","GS2","A3"],Y=class Y extends x{constructor(){super(),this.activePattern=null,this.selectedSoundId=null,this.selectedStep=null,this.isPlaying=!1}connectedCallback(){super.connectedCallback(),this._loadPattern()}_loadPattern(){const t=g.getActivePattern();t?this.activePattern=JSON.parse(JSON.stringify(t)):window.location.hash="/"}render(){if(!this.activePattern)return h`<p>Loading...</p>`;const t=this.selectedSoundId?this.activePattern.pattern[this.selectedSoundId]:null,e=this.selectedSoundId!==null;let i=this.activePattern.name,r="PATTERN MODE",s="--",a=0,d;if(e&&t&&(i=t.value,r=`STEP SEQUENCER (${t.type})`,d=t.steps,this.selectedStep&&t.steps[this.selectedStep])){const o=t.steps[this.selectedStep];a=o.params.b!==null?o.params.b:0,t.type==="note"?s=String(o.params.a||"None"):s=o.params.a!==null?String(o.params.a):"0"}return h`
      <div class="container">
        
        <div class="header-row">
          <h1 class="editor-title">${this.activePattern.name}</h1>
          <button class="btn btn-secondary" @click="${this._goHome}">
            &larr; Back
          </button>
        </div>

        <!-- Custom retro LCD panel -->
        <po20-lcd-screen
          .titleText="${i}"
          .subtitleText="${r}"
          .paramA="${s}"
          .paramB="${a}"
          .activeSteps="${d}"
          .selectedStep="${this.selectedStep}"
          .isPlaying="${this.isPlaying}"
        ></po20-lcd-screen>

        <div class="po-panel">
          
          <div class="panel-header">
            <h3 class="panel-title">
              ${e&&t?h`
                <button class="btn btn-secondary" style="padding: 6px 12px; font-size: 13px;" @click="${this._deselectSound}">
                  &larr; Sounds
                </button>
                <span>Sequencer: ${t.value}</span>
              `:h`
                <span>Sound Pad Matrix</span>
              `}
            </h3>

            ${e?h`
              <button class="btn btn-danger" style="padding: 6px 12px; font-size: 13px;" @click="${this._clearTriggers}">
                Clear Steps
              </button>
            `:null}
          </div>

          <!-- MORPHING GRID -->
          <div class="grid-4x4">
            ${e&&t?this._renderStepsGrid(t):this._renderSoundsGrid()}
          </div>

          <!-- AUTOMATION CONTROLS (KNOBS) -->
          <div class="controls-panel">
            ${e&&t&&this.selectedStep?this._renderKnobs(t):h`
              <div class="controls-placeholder">
                ${e?"Select or tap an active step (glowing amber LED) to adjust Parameter A & B Automation.":"Select a Sound voice to program step sequencer triggers and automation."}
              </div>
            `}
          </div>

          <div class="btn-row">
            ${e?h`
              <button class="btn btn-secondary" @click="${this._deselectSound}">
                Done Sequencing
              </button>
            `:null}
            <button class="btn btn-primary" @click="${this._savePattern}">
              <svg viewBox="0 0 24 24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
              Save Pattern
            </button>
          </div>

        </div>

      </div>
    `}_renderSoundsGrid(){return Lt.map(t=>{if(!this.activePattern)return h``;const e=this.activePattern.pattern[t.id],i=Object.values(e.steps).filter(r=>r.active).length;return h`
        <button class="po-button" @click="${()=>this._selectSound(t.id)}">
          ${Me(t.id)}
          <span class="btn-label">${t.value}</span>
          ${i>0?h`<span class="badge-count">${i}</span>`:null}
        </button>
      `})}_renderStepsGrid(t){return Object.values(t.steps).map(e=>{const i=e.active,r=this.selectedStep===e.value;return h`
        <button class="po-button" @click="${s=>this._toggleStep(s,e.value)}">
          <div class="led-indicator ${i?"active":""} ${r?"selected":""}"></div>
          <span class="step-num">${e.value}</span>
        </button>
      `})}_renderKnobs(t){if(this.selectedStep===null)return h``;const e=t.steps[this.selectedStep],i=e.params.a,r=e.params.b!==null?e.params.b:0;if(t.type==="note"){const s=At.indexOf(String(i||"None"));return h`
        <po20-knob
          .value="${s!==-1?s:0}"
          min="0"
          max="21"
          label="PITCH NOTE"
          param="a"
          @change="${d=>this._handleNoteKnobChange(d)}"
        ></po20-knob>
        
        <po20-knob
          .value="${r}"
          min="0"
          max="100"
          label="MULTIPLY/FILTER"
          param="b"
          @change="${d=>this._handleKnobChange(d)}"
        ></po20-knob>
      `}else return h`
        <po20-knob
          .value="${typeof i=="number"?i:0}"
          min="0"
          max="100"
          label="PARAM A"
          param="a"
          @change="${a=>this._handleKnobChange(a)}"
        ></po20-knob>
        
        <po20-knob
          .value="${r}"
          min="0"
          max="100"
          label="PARAM B"
          param="b"
          @change="${a=>this._handleKnobChange(a)}"
        ></po20-knob>
      `}_selectSound(t){this.selectedSoundId=t,this.selectedStep=null}_deselectSound(){this.selectedSoundId=null,this.selectedStep=null}_toggleStep(t,e){if(t.preventDefault(),!this.activePattern||this.selectedSoundId===null)return;const r=this.activePattern.pattern[this.selectedSoundId].steps[e];r.active?this.selectedStep===e?(r.active=!1,this.selectedStep=null):this.selectedStep=e:(r.active=!0,this.selectedStep=e),this.requestUpdate()}_handleKnobChange(t){if(this.selectedStep===null||this.selectedStep===void 0)return;const{value:e,param:i}=t.detail;if(!this.activePattern||this.selectedSoundId===null)return;const s=this.activePattern.pattern[this.selectedSoundId].steps[this.selectedStep];s&&(s.params[i]=e,this.requestUpdate())}_handleNoteKnobChange(t){if(this.selectedStep===null||this.selectedStep===void 0)return;const{value:e}=t.detail;if(!this.activePattern||this.selectedSoundId===null)return;const r=this.activePattern.pattern[this.selectedSoundId].steps[this.selectedStep];if(!r)return;const s=At[e]||"None";r.params.a=s==="None"?null:s,this.requestUpdate()}_clearTriggers(){if(!(this.selectedSoundId===null||!this.activePattern)&&confirm("Are you sure you want to clear all step triggers for this sound?")){const t=this.activePattern.pattern[this.selectedSoundId];Object.keys(t.steps).forEach(e=>{const i=Number(e);t.steps[i].active=!1,t.steps[i].params={a:null,b:null,multiply:null}}),this.selectedStep=null,this.requestUpdate()}}_savePattern(){this.activePattern&&(g.editPattern(this.activePattern.id,this.activePattern.name,this.activePattern.pattern),alert("Pattern saved successfully!"))}_goHome(){window.location.hash="/"}};Y.properties={activePattern:{type:Object},selectedSoundId:{type:Number},selectedStep:{type:Number},isPlaying:{type:Boolean}},Y.styles=w`
    :host {
      display: block;
      width: 100%;
      min-height: calc(100vh - 120px);
      box-sizing: border-box;
      color: var(--text-primary);
      padding: 30px 16px;
      background: var(--bg-base);
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .editor-title {
      font-family: 'VT323', monospace;
      font-size: 36px;
      color: var(--accent);
      margin: 0;
    }

    /* Hardware Panel container */
    .po-panel {
      background: var(--bg-surface);
      border: 3px solid var(--border-subtle);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
      position: relative;
    }

    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--border-subtle);
      padding-bottom: 10px;
    }

    .panel-title {
      font-family: 'VT323', monospace;
      font-size: 24px;
      color: var(--accent);
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .panel-title svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }

    /* Grids */
    .grid-4x4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 16px;
      justify-items: center;
      margin-bottom: 20px;
    }

    /* Circular buttons (Step Triggers / Sounds) */
    .po-button {
      position: relative;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 4px solid #121316;
      background: radial-gradient(circle, #3a3b40 0%, #202124 100%);
      color: #b3b5bd;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 
        inset 0 2px 3px rgba(255, 255, 255, 0.1),
        0 4px 6px rgba(0, 0, 0, 0.4);
      user-select: none;
    }

    .po-button:hover {
      border-color: #ff5722;
      color: #fff;
      transform: translateY(-2px);
      box-shadow: 
        inset 0 2px 3px rgba(255, 255, 255, 0.15),
        0 8px 12px rgba(0, 0, 0, 0.5),
        0 0 10px rgba(255, 87, 34, 0.3);
    }

    .po-button:active {
      transform: translateY(1px);
      border-color: #ff7043;
      box-shadow: 
        inset 0 2px 5px rgba(0,0,0,0.6),
        0 1px 2px rgba(0,0,0,0.4);
    }

    .po-button svg {
      width: 26px;
      height: 26px;
      fill: currentColor;
    }

    .po-button .btn-label {
      font-size: 11px;
      text-transform: uppercase;
      margin-top: 2px;
      letter-spacing: 0.5px;
      max-width: 62px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .po-button .step-num {
      font-family: 'VT323', monospace;
      font-size: 26px;
      font-weight: bold;
    }

    /* Small LED glow indicator */
    .led-indicator {
      position: absolute;
      top: 6px;
      right: 14px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #3a3b40;
      box-shadow: inset 0 1px 1px rgba(0,0,0,0.6);
      transition: background-color 0.2s;
    }

    .led-indicator.active {
      background: #00ff66;
      box-shadow: 
        0 0 8px #00ff66,
        inset 0 1px 1px rgba(255,255,255,0.8);
    }

    .led-indicator.selected {
      background: #ff5722;
      box-shadow: 
        0 0 8px #ff5722,
        inset 0 1px 1px rgba(255,255,255,0.8);
    }

    .badge-count {
      position: absolute;
      bottom: 4px;
      right: 8px;
      background: #ff5722;
      color: #fff;
      font-size: 9px;
      font-weight: bold;
      padding: 1px 4px;
      border-radius: 4px;
    }

    /* Automation controls (Knobs) */
    .controls-panel {
      background: var(--bg-inset);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 10px;
      min-height: 120px;
    }

    .controls-placeholder {
      color: var(--text-dim);
      font-size: 15px;
      font-style: italic;
      text-align: center;
      width: 100%;
    }

    .btn-row {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 20px;
    }

    .btn {
      padding: 10px 20px;
      border-radius: 100px;
      border: none;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }

    .btn-secondary {
      background: var(--border-subtle);
      color: var(--text-secondary);
    }

    .btn-secondary:hover {
      background: var(--border-faint);
      color: var(--text-primary);
    }

    .btn-primary {
      background: var(--accent);
      color: #fff;
      box-shadow: 0 4px 10px rgba(255, 87, 34, 0.3);
    }

    .btn-primary:hover {
      background: var(--accent-hover);
      box-shadow: 0 6px 15px rgba(255, 87, 34, 0.4);
    }

    .btn-danger {
      background: rgba(244, 67, 54, 0.15);
      color: #f44336;
      border: 1px solid rgba(244, 67, 54, 0.3);
    }

    .btn-danger:hover {
      background: #f44336;
      color: #fff;
    }

    .btn svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }
  `;let at=Y;customElements.define("po20-pattern-editor",at);const ze=["dm","em","Esus","E","F","G","C/G","E/G#","am","C/A","dm/A","D/A","A","B/A","C","D"],q=class q extends x{constructor(){super(),this.activeChordSet=null,this.chordsOrder=[]}connectedCallback(){super.connectedCallback(),this._loadChordSet()}_loadChordSet(){const t=g.getActiveChord();t?(this.activeChordSet=t,this.chordsOrder=[...t.chordsOrder]):window.location.hash="/"}render(){if(!this.activeChordSet)return h`<p>Loading...</p>`;const t=this.chordsOrder.length>0?this.chordsOrder[this.chordsOrder.length-1]:"--";return h`
      <div class="container">
        
        <div class="header-row">
          <h1 class="editor-title">${this.activeChordSet.name}</h1>
          <button class="btn btn-secondary" @click="${this._goHome}">
            &larr; Back
          </button>
        </div>

        <!-- Custom retro LCD panel -->
        <po20-lcd-screen
          .titleText="${this.activeChordSet.name}"
          subtitleText="CHORD PROGRESSION"
          .paramA="${String(this.chordsOrder.length)}"
          .paramB="${Number.isNaN(Number(t))?0:Number(t)}"
        ></po20-lcd-screen>

        <!-- Chords Timeline -->
        <div class="timeline-card">
          <div class="timeline-title">Progression Chain (Click chord to remove)</div>
          <div class="timeline-scroll" id="timeline-scroll">
            ${this.chordsOrder.length>0?this.chordsOrder.map((e,i)=>h`
              <div class="chord-pill" @click="${()=>this._removeChord(i)}">
                ${e} <span class="remove-icon">&times;</span>
              </div>
            `):h`
              <span class="empty-timeline">Timeline empty. Click buttons below to construct a progression.</span>
            `}
          </div>
        </div>

        <!-- PO Hardware-like 4x4 Grid of Chords -->
        <div class="po-panel">
          <div style="font-size: 13px; color: #8a8d95; text-transform: uppercase; margin-bottom: 16px; letter-spacing: 1px;">
            Chord Pad Selection (PO-20 Arcade Layout)
          </div>
          <div class="grid-4x4">
            ${ze.map(e=>h`
              <button class="po-button" @click="${()=>this._addChord(e)}">
                ${e}
              </button>
            `)}
          </div>

          <div class="btn-row">
            <button class="btn btn-secondary" @click="${this._clearAll}">
              Clear All
            </button>
            <button class="btn btn-primary" @click="${this._save}">
              <svg viewBox="0 0 24 24"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>
              Save Progression
            </button>
          </div>
        </div>

      </div>
    `}_addChord(t){this.chordsOrder=[...this.chordsOrder,t],setTimeout(()=>{var i;const e=(i=this.shadowRoot)==null?void 0:i.getElementById("timeline-scroll");e&&(e.scrollLeft=e.scrollWidth)},50)}_removeChord(t){const e=[...this.chordsOrder];e.splice(t,1),this.chordsOrder=e}_clearAll(){confirm("Are you sure you want to clear the entire progression?")&&(this.chordsOrder=[])}_save(){this.activeChordSet&&(g.editChords(this.activeChordSet.id,this.activeChordSet.name,this.chordsOrder),alert("Progression saved successfully!"))}_goHome(){window.location.hash="/"}};q.properties={activeChordSet:{type:Object},chordsOrder:{type:Array}},q.styles=w`
    :host {
      display: block;
      width: 100%;
      min-height: calc(100vh - 120px);
      box-sizing: border-box;
      color: var(--text-primary);
      padding: 30px 16px;
      background: var(--bg-base);
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .editor-title {
      font-family: 'VT323', monospace;
      font-size: 36px;
      color: var(--accent);
      margin: 0;
    }

    /* Chord timeline/chain styling */
    .timeline-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 16px;
      box-shadow: inset 0 2px 8px rgba(0,0,0,0.2);
    }

    .timeline-title {
      font-size: 13px;
      color: var(--text-muted);
      text-transform: uppercase;
      margin-bottom: 12px;
      letter-spacing: 1px;
    }

    .timeline-scroll {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding-bottom: 8px;
      min-height: 50px;
      align-items: center;
    }

    /* Scrollbar styling */
    .timeline-scroll::-webkit-scrollbar {
      height: 6px;
    }
    .timeline-scroll::-webkit-scrollbar-track {
      background: var(--bg-inset);
    }
    .timeline-scroll::-webkit-scrollbar-thumb {
      background: var(--accent);
      border-radius: 3px;
    }

    .chord-pill {
      background: linear-gradient(135deg, #ff5722 0%, #e64a19 100%);
      color: #fff;
      font-family: 'VT323', monospace;
      font-size: 20px;
      padding: 4px 14px;
      border-radius: 100px;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      box-shadow: 0 3px 6px rgba(0,0,0,0.3);
      border: 1px solid transparent;
      transition: all 0.2s;
    }

    .chord-pill:hover {
      background: #f44336;
      border-color: #ffcdd2;
      transform: translateY(-1px);
    }

    .chord-pill .remove-icon {
      font-size: 14px;
      opacity: 0.7;
    }

    .empty-timeline {
      color: var(--text-dim);
      font-size: 15px;
      font-style: italic;
    }

    /* PO Hardware 4x4 Grid */
    .po-panel {
      background: var(--bg-surface);
      border: 3px solid var(--border-subtle);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.3);
    }

    .grid-4x4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 16px;
      justify-items: center;
    }

    .po-button {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 4px solid #121316;
      background: radial-gradient(circle, #3a3b40 0%, #202124 100%);
      color: #b3b5bd;
      font-family: 'VT323', monospace;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 
        inset 0 2px 3px rgba(255, 255, 255, 0.1),
        0 4px 6px rgba(0, 0, 0, 0.4);
      user-select: none;
    }

    .po-button:hover {
      border-color: #ff5722;
      color: #fff;
      transform: translateY(-2px);
      box-shadow: 
        inset 0 2px 3px rgba(255, 255, 255, 0.15),
        0 8px 12px rgba(0, 0, 0, 0.5),
        0 0 10px rgba(255, 87, 34, 0.3);
    }

    .po-button:active {
      transform: translateY(1px);
      border-color: #ff7043;
      box-shadow: 
        inset 0 2px 5px rgba(0,0,0,0.6),
        0 1px 2px rgba(0,0,0,0.4);
    }

    .btn-row {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 20px;
    }

    .btn {
      padding: 12px 24px;
      border-radius: 100px;
      border: none;
      font-size: 15px;
      font-weight: bold;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }

    .btn-secondary {
      background: var(--border-subtle);
      color: var(--text-secondary);
    }

    .btn-secondary:hover {
      background: var(--border-faint);
      color: var(--text-primary);
    }

    .btn-primary {
      background: var(--accent);
      color: #fff;
      box-shadow: 0 4px 10px rgba(255, 87, 34, 0.3);
    }

    .btn-primary:hover {
      background: var(--accent-hover);
      box-shadow: 0 6px 15px rgba(255, 87, 34, 0.4);
    }

    .btn svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }
  `;let ot=q;customElements.define("po20-chord-editor",ot);const G=class G extends x{constructor(){super(),this.currentHash=window.location.hash||"#/",this._onHashChange=this._onHashChange.bind(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("hashchange",this._onHashChange);const t=window.location.pathname;t.includes("/pattern")&&!window.location.hash?window.location.hash="#/pattern":t.includes("/patterns")&&!window.location.hash?window.location.hash="#/patterns":t.includes("/chord")&&!window.location.hash?window.location.hash="#/chord":t.includes("/chords")&&!window.location.hash&&(window.location.hash="#/chords")}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("hashchange",this._onHashChange)}_onHashChange(){this.currentHash=window.location.hash||"#/"}render(){let t=h`<po20-landing></po20-landing>`;return this.currentHash.startsWith("#/pattern")?t=h`<po20-pattern-editor></po20-pattern-editor>`:this.currentHash.startsWith("#/chord")?t=h`<po20-chord-editor></po20-chord-editor>`:this.currentHash==="#/patterns"?t=h`<po20-landing .filter="${"patterns"}"></po20-landing>`:this.currentHash==="#/chords"&&(t=h`<po20-landing .filter="${"chords"}"></po20-landing>`),h`
      <po20-header></po20-header>
      <main>
        ${t}
      </main>
      <po20-footer></po20-footer>
    `}};G.properties={currentHash:{type:String}},G.styles=w`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: var(--bg-base);
      color: var(--text-primary);
    }

    main {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  `;let ht=G;customElements.define("po20-app",ht);
