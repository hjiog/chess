if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise((async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},s=(s,r)=>{Promise.all(s.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(s)};self.define=(s,i,c)=>{r[s]||(r[s]=Promise.resolve().then((()=>{let r={};const d={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return r;case"module":return d;default:return e(s)}}))).then((e=>{const s=c(...e);return r.default||(r.default=s),r}))})))}}define("./sw.js",["./workbox-9cbde557"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/[...all].85cbb6fa.js",revision:"71ec0b9a19aaa2f5e7be52d6231c5f5d"},{url:"assets/404.532c686e.js",revision:"feec46ee7512c39d1f2a5b51f2446d2c"},{url:"assets/about.fa9be5fe.js",revision:"0e2f629a0405c9bc80de74464509b9d9"},{url:"assets/home.592165eb.js",revision:"52b0126b2c48f55309869dffcaf28b90"},{url:"assets/index.1f7abf3b.css",revision:"ae56df1ed9e898defda02474e773592c"},{url:"assets/index.af0ede56.js",revision:"e34dcd98672a60053c6eb85e34edc03c"},{url:"assets/index.da0d7556.js",revision:"0cbc1c3649290263551f489785ec9e85"},{url:"assets/README.bc86b883.js",revision:"af566812f9ab647f6c97f9c005448cc8"},{url:"assets/utils.9dc632db.js",revision:"d1e24b06cf5ed09696dcba503392b1f2"},{url:"assets/vendor.12e77f2d.css",revision:"5285453abbb265f05b97f36f893b3177"},{url:"assets/vendor.8141013a.js",revision:"8295f0a0091fd7daad365be89f481ec7"},{url:"assets/virtual_pwa-register.4d644523.js",revision:"84f8f568561a062cc33f433253f78164"},{url:"index.html",revision:"c20041dc180ba98def7b36982cdd7ff1"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
