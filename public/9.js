(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{159:function(t,e,r){"use strict";function n(t){return Object.prototype.toString.call(t).indexOf("Error")>-1}function o(t,e){return e instanceof t||e&&(e.name===t.name||e._name===t._name)}function i(t,e){for(var r in e)t[r]=e[r];return t}r.r(e);var a={name:"RouterView",functional:!0,props:{name:{type:String,default:"default"}},render:function(t,e){var r=e.props,n=e.children,o=e.parent,a=e.data;a.routerView=!0;for(var c=o.$createElement,u=r.name,s=o.$route,p=o._routerViewCache||(o._routerViewCache={}),f=0,h=!1;o&&o._routerRoot!==o;){var l=o.$vnode&&o.$vnode.data;l&&(l.routerView&&f++,l.keepAlive&&o._inactive&&(h=!0)),o=o.$parent}if(a.routerViewDepth=f,h)return c(p[u],a,n);var d=s.matched[f];if(!d)return p[u]=null,c();var v=p[u]=d.components[u];a.registerRouteInstance=function(t,e){var r=d.instances[u];(e&&r!==t||!e&&r===t)&&(d.instances[u]=e)},(a.hook||(a.hook={})).prepatch=function(t,e){d.instances[u]=e.componentInstance},a.hook.init=function(t){t.data.keepAlive&&t.componentInstance&&t.componentInstance!==d.instances[u]&&(d.instances[u]=t.componentInstance)};var y=a.props=function(t,e){switch(typeof e){case"undefined":return;case"object":return e;case"function":return e(t);case"boolean":return e?t.params:void 0;default:0}}(s,d.props&&d.props[u]);if(y){y=a.props=i({},y);var m=a.attrs=a.attrs||{};for(var g in y)v.props&&g in v.props||(m[g]=y[g],delete y[g])}return c(v,a,n)}};var c=/[!'()*]/g,u=function(t){return"%"+t.charCodeAt(0).toString(16)},s=/%2C/g,p=function(t){return encodeURIComponent(t).replace(c,u).replace(s,",")},f=decodeURIComponent;function h(t){var e={};return(t=t.trim().replace(/^(\?|#|&)/,""))?(t.split("&").forEach((function(t){var r=t.replace(/\+/g," ").split("="),n=f(r.shift()),o=r.length>0?f(r.join("=")):null;void 0===e[n]?e[n]=o:Array.isArray(e[n])?e[n].push(o):e[n]=[e[n],o]})),e):e}function l(t){var e=t?Object.keys(t).map((function(e){var r=t[e];if(void 0===r)return"";if(null===r)return p(e);if(Array.isArray(r)){var n=[];return r.forEach((function(t){void 0!==t&&(null===t?n.push(p(e)):n.push(p(e)+"="+p(t)))})),n.join("&")}return p(e)+"="+p(r)})).filter((function(t){return t.length>0})).join("&"):null;return e?"?"+e:""}var d=/\/?$/;function v(t,e,r,n){var o=n&&n.options.stringifyQuery,i=e.query||{};try{i=y(i)}catch(t){}var a={name:e.name||t&&t.name,meta:t&&t.meta||{},path:e.path||"/",hash:e.hash||"",query:i,params:e.params||{},fullPath:w(e,o),matched:t?g(t):[]};return r&&(a.redirectedFrom=w(r,o)),Object.freeze(a)}function y(t){if(Array.isArray(t))return t.map(y);if(t&&"object"==typeof t){var e={};for(var r in t)e[r]=y(t[r]);return e}return t}var m=v(null,{path:"/"});function g(t){for(var e=[];t;)e.unshift(t),t=t.parent;return e}function w(t,e){var r=t.path,n=t.query;void 0===n&&(n={});var o=t.hash;return void 0===o&&(o=""),(r||"/")+(e||l)(n)+o}function b(t,e){return e===m?t===e:!!e&&(t.path&&e.path?t.path.replace(d,"")===e.path.replace(d,"")&&t.hash===e.hash&&x(t.query,e.query):!(!t.name||!e.name)&&(t.name===e.name&&t.hash===e.hash&&x(t.query,e.query)&&x(t.params,e.params)))}function x(t,e){if(void 0===t&&(t={}),void 0===e&&(e={}),!t||!e)return t===e;var r=Object.keys(t),n=Object.keys(e);return r.length===n.length&&r.every((function(r){var n=t[r],o=e[r];return"object"==typeof n&&"object"==typeof o?x(n,o):String(n)===String(o)}))}function k(t,e,r){var n=t.charAt(0);if("/"===n)return t;if("?"===n||"#"===n)return e+t;var o=e.split("/");r&&o[o.length-1]||o.pop();for(var i=t.replace(/^\//,"").split("/"),a=0;a<i.length;a++){var c=i[a];".."===c?o.pop():"."!==c&&o.push(c)}return""!==o[0]&&o.unshift(""),o.join("/")}function R(t){return t.replace(/\/\//g,"/")}var E=Array.isArray||function(t){return"[object Array]"==Object.prototype.toString.call(t)},O=B,_=$,A=function(t,e){return P($(t,e))},C=P,j=M,S=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function $(t,e){for(var r,n=[],o=0,i=0,a="",c=e&&e.delimiter||"/";null!=(r=S.exec(t));){var u=r[0],s=r[1],p=r.index;if(a+=t.slice(i,p),i=p+u.length,s)a+=s[1];else{var f=t[i],h=r[2],l=r[3],d=r[4],v=r[5],y=r[6],m=r[7];a&&(n.push(a),a="");var g=null!=h&&null!=f&&f!==h,w="+"===y||"*"===y,b="?"===y||"*"===y,x=r[2]||c,k=d||v;n.push({name:l||o++,prefix:h||"",delimiter:x,optional:b,repeat:w,partial:g,asterisk:!!m,pattern:k?q(k):m?".*":"[^"+L(x)+"]+?"})}}return i<t.length&&(a+=t.substr(i)),a&&n.push(a),n}function T(t){return encodeURI(t).replace(/[\/?#]/g,(function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()}))}function P(t){for(var e=new Array(t.length),r=0;r<t.length;r++)"object"==typeof t[r]&&(e[r]=new RegExp("^(?:"+t[r].pattern+")$"));return function(r,n){for(var o="",i=r||{},a=(n||{}).pretty?T:encodeURIComponent,c=0;c<t.length;c++){var u=t[c];if("string"!=typeof u){var s,p=i[u.name];if(null==p){if(u.optional){u.partial&&(o+=u.prefix);continue}throw new TypeError('Expected "'+u.name+'" to be defined')}if(E(p)){if(!u.repeat)throw new TypeError('Expected "'+u.name+'" to not repeat, but received `'+JSON.stringify(p)+"`");if(0===p.length){if(u.optional)continue;throw new TypeError('Expected "'+u.name+'" to not be empty')}for(var f=0;f<p.length;f++){if(s=a(p[f]),!e[c].test(s))throw new TypeError('Expected all "'+u.name+'" to match "'+u.pattern+'", but received `'+JSON.stringify(s)+"`");o+=(0===f?u.prefix:u.delimiter)+s}}else{if(s=u.asterisk?encodeURI(p).replace(/[?#]/g,(function(t){return"%"+t.charCodeAt(0).toString(16).toUpperCase()})):a(p),!e[c].test(s))throw new TypeError('Expected "'+u.name+'" to match "'+u.pattern+'", but received "'+s+'"');o+=u.prefix+s}}else o+=u}return o}}function L(t){return t.replace(/([.+*?=^!:${}()[\]|\/\\])/g,"\\$1")}function q(t){return t.replace(/([=!:$\/()])/g,"\\$1")}function U(t,e){return t.keys=e,t}function I(t){return t.sensitive?"":"i"}function M(t,e,r){E(e)||(r=e||r,e=[]);for(var n=(r=r||{}).strict,o=!1!==r.end,i="",a=0;a<t.length;a++){var c=t[a];if("string"==typeof c)i+=L(c);else{var u=L(c.prefix),s="(?:"+c.pattern+")";e.push(c),c.repeat&&(s+="(?:"+u+s+")*"),i+=s=c.optional?c.partial?u+"("+s+")?":"(?:"+u+"("+s+"))?":u+"("+s+")"}}var p=L(r.delimiter||"/"),f=i.slice(-p.length)===p;return n||(i=(f?i.slice(0,-p.length):i)+"(?:"+p+"(?=$))?"),i+=o?"$":n&&f?"":"(?="+p+"|$)",U(new RegExp("^"+i,I(r)),e)}function B(t,e,r){return E(e)||(r=e||r,e=[]),r=r||{},t instanceof RegExp?function(t,e){var r=t.source.match(/\((?!\?)/g);if(r)for(var n=0;n<r.length;n++)e.push({name:n,prefix:null,delimiter:null,optional:!1,repeat:!1,partial:!1,asterisk:!1,pattern:null});return U(t,e)}(t,e):E(t)?function(t,e,r){for(var n=[],o=0;o<t.length;o++)n.push(B(t[o],e,r).source);return U(new RegExp("(?:"+n.join("|")+")",I(r)),e)}(t,e,r):function(t,e,r){return M($(t,r),e,r)}(t,e,r)}O.parse=_,O.compile=A,O.tokensToFunction=C,O.tokensToRegExp=j;var V=Object.create(null);function H(t,e,r){e=e||{};try{var n=V[t]||(V[t]=O.compile(t));return e.pathMatch&&(e[0]=e.pathMatch),n(e,{pretty:!0})}catch(t){return""}finally{delete e[0]}}function z(t,e,r,n){var o="string"==typeof t?{path:t}:t;if(o._normalized)return o;if(o.name)return i({},t);if(!o.path&&o.params&&e){(o=i({},o))._normalized=!0;var a=i(i({},e.params),o.params);if(e.name)o.name=e.name,o.params=a;else if(e.matched.length){var c=e.matched[e.matched.length-1].path;o.path=H(c,a,e.path)}else 0;return o}var u=function(t){var e="",r="",n=t.indexOf("#");n>=0&&(e=t.slice(n),t=t.slice(0,n));var o=t.indexOf("?");return o>=0&&(r=t.slice(o+1),t=t.slice(0,o)),{path:t,query:r,hash:e}}(o.path||""),s=e&&e.path||"/",p=u.path?k(u.path,s,r||o.append):s,f=function(t,e,r){void 0===e&&(e={});var n,o=r||h;try{n=o(t||"")}catch(t){n={}}for(var i in e)n[i]=e[i];return n}(u.query,o.query,n&&n.options.parseQuery),l=o.hash||u.hash;return l&&"#"!==l.charAt(0)&&(l="#"+l),{_normalized:!0,path:p,query:f,hash:l}}var D,F=[String,Object],N=[String,Array],J=function(){},K={name:"RouterLink",props:{to:{type:F,required:!0},tag:{type:String,default:"a"},exact:Boolean,append:Boolean,replace:Boolean,activeClass:String,exactActiveClass:String,event:{type:N,default:"click"}},render:function(t){var e=this,r=this.$router,n=this.$route,o=r.resolve(this.to,n,this.append),a=o.location,c=o.route,u=o.href,s={},p=r.options.linkActiveClass,f=r.options.linkExactActiveClass,h=null==p?"router-link-active":p,l=null==f?"router-link-exact-active":f,y=null==this.activeClass?h:this.activeClass,m=null==this.exactActiveClass?l:this.exactActiveClass,g=c.redirectedFrom?v(null,z(c.redirectedFrom),null,r):c;s[m]=b(n,g),s[y]=this.exact?s[m]:function(t,e){return 0===t.path.replace(d,"/").indexOf(e.path.replace(d,"/"))&&(!e.hash||t.hash===e.hash)&&function(t,e){for(var r in e)if(!(r in t))return!1;return!0}(t.query,e.query)}(n,g);var w=function(t){Q(t)&&(e.replace?r.replace(a,J):r.push(a,J))},x={click:Q};Array.isArray(this.event)?this.event.forEach((function(t){x[t]=w})):x[this.event]=w;var k={class:s},R=!this.$scopedSlots.$hasNormal&&this.$scopedSlots.default&&this.$scopedSlots.default({href:u,route:c,navigate:w,isActive:s[y],isExactActive:s[m]});if(R){if(1===R.length)return R[0];if(R.length>1||!R.length)return 0===R.length?t():t("span",{},R)}if("a"===this.tag)k.on=x,k.attrs={href:u};else{var E=function t(e){if(e)for(var r,n=0;n<e.length;n++){if("a"===(r=e[n]).tag)return r;if(r.children&&(r=t(r.children)))return r}}(this.$slots.default);if(E){E.isStatic=!1;var O=E.data=i({},E.data);for(var _ in O.on=O.on||{},O.on){var A=O.on[_];_ in x&&(O.on[_]=Array.isArray(A)?A:[A])}for(var C in x)C in O.on?O.on[C].push(x[C]):O.on[C]=w;(E.data.attrs=i({},E.data.attrs)).href=u}else k.on=x}return t(this.tag,k,this.$slots.default)}};function Q(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey||t.defaultPrevented||void 0!==t.button&&0!==t.button)){if(t.currentTarget&&t.currentTarget.getAttribute){var e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}var X="undefined"!=typeof window;function Y(t,e,r,n){var o=e||[],i=r||Object.create(null),a=n||Object.create(null);t.forEach((function(t){!function t(e,r,n,o,i,a){var c=o.path;var u=o.name;0;var s=o.pathToRegexpOptions||{};var p=function(t,e,r){r||(t=t.replace(/\/$/,""));if("/"===t[0])return t;if(null==e)return t;return R(e.path+"/"+t)}(c,i,s.strict);"boolean"==typeof o.caseSensitive&&(s.sensitive=o.caseSensitive);var f={path:p,regex:W(p,s),components:o.components||{default:o.component},instances:{},name:u,parent:i,matchAs:a,redirect:o.redirect,beforeEnter:o.beforeEnter,meta:o.meta||{},props:null==o.props?{}:o.components?o.props:{default:o.props}};o.children&&o.children.forEach((function(o){var i=a?R(a+"/"+o.path):void 0;t(e,r,n,o,f,i)}));r[f.path]||(e.push(f.path),r[f.path]=f);if(void 0!==o.alias)for(var h=Array.isArray(o.alias)?o.alias:[o.alias],l=0;l<h.length;++l){0;var d={path:h[l],children:o.children};t(e,r,n,d,i,f.path||"/")}u&&(n[u]||(n[u]=f))}(o,i,a,t)}));for(var c=0,u=o.length;c<u;c++)"*"===o[c]&&(o.push(o.splice(c,1)[0]),u--,c--);return{pathList:o,pathMap:i,nameMap:a}}function W(t,e){return O(t,[],e)}function G(t,e){var r=Y(t),n=r.pathList,o=r.pathMap,i=r.nameMap;function a(t,r,a){var c=z(t,r,!1,e),s=c.name;if(s){var p=i[s];if(!p)return u(null,c);var f=p.regex.keys.filter((function(t){return!t.optional})).map((function(t){return t.name}));if("object"!=typeof c.params&&(c.params={}),r&&"object"==typeof r.params)for(var h in r.params)!(h in c.params)&&f.indexOf(h)>-1&&(c.params[h]=r.params[h]);return c.path=H(p.path,c.params),u(p,c,a)}if(c.path){c.params={};for(var l=0;l<n.length;l++){var d=n[l],v=o[d];if(Z(v.regex,c.path,c.params))return u(v,c,a)}}return u(null,c)}function c(t,r){var n=t.redirect,o="function"==typeof n?n(v(t,r,null,e)):n;if("string"==typeof o&&(o={path:o}),!o||"object"!=typeof o)return u(null,r);var c=o,s=c.name,p=c.path,f=r.query,h=r.hash,l=r.params;if(f=c.hasOwnProperty("query")?c.query:f,h=c.hasOwnProperty("hash")?c.hash:h,l=c.hasOwnProperty("params")?c.params:l,s){i[s];return a({_normalized:!0,name:s,query:f,hash:h,params:l},void 0,r)}if(p){var d=function(t,e){return k(t,e.parent?e.parent.path:"/",!0)}(p,t);return a({_normalized:!0,path:H(d,l),query:f,hash:h},void 0,r)}return u(null,r)}function u(t,r,n){return t&&t.redirect?c(t,n||r):t&&t.matchAs?function(t,e,r){var n=a({_normalized:!0,path:H(r,e.params)});if(n){var o=n.matched,i=o[o.length-1];return e.params=n.params,u(i,e)}return u(null,e)}(0,r,t.matchAs):v(t,r,n,e)}return{match:a,addRoutes:function(t){Y(t,n,o,i)}}}function Z(t,e,r){var n=e.match(t);if(!n)return!1;if(!r)return!0;for(var o=1,i=n.length;o<i;++o){var a=t.keys[o-1],c="string"==typeof n[o]?decodeURIComponent(n[o]):n[o];a&&(r[a.name||"pathMatch"]=c)}return!0}var tt=X&&window.performance&&window.performance.now?window.performance:Date;function et(){return tt.now().toFixed(3)}var rt=et();function nt(){return rt}function ot(t){return rt=t}var it=Object.create(null);function at(){var t=window.location.protocol+"//"+window.location.host,e=window.location.href.replace(t,"");window.history.replaceState({key:nt()},"",e),window.addEventListener("popstate",(function(t){ut(),t.state&&t.state.key&&ot(t.state.key)}))}function ct(t,e,r,n){if(t.app){var o=t.options.scrollBehavior;o&&t.app.$nextTick((function(){var i=function(){var t=nt();if(t)return it[t]}(),a=o.call(t,e,r,n?i:null);a&&("function"==typeof a.then?a.then((function(t){lt(t,i)})).catch((function(t){0})):lt(a,i))}))}}function ut(){var t=nt();t&&(it[t]={x:window.pageXOffset,y:window.pageYOffset})}function st(t){return ft(t.x)||ft(t.y)}function pt(t){return{x:ft(t.x)?t.x:window.pageXOffset,y:ft(t.y)?t.y:window.pageYOffset}}function ft(t){return"number"==typeof t}var ht=/^#\d/;function lt(t,e){var r,n="object"==typeof t;if(n&&"string"==typeof t.selector){var o=ht.test(t.selector)?document.getElementById(t.selector.slice(1)):document.querySelector(t.selector);if(o){var i=t.offset&&"object"==typeof t.offset?t.offset:{};e=function(t,e){var r=document.documentElement.getBoundingClientRect(),n=t.getBoundingClientRect();return{x:n.left-r.left-e.x,y:n.top-r.top-e.y}}(o,i={x:ft((r=i).x)?r.x:0,y:ft(r.y)?r.y:0})}else st(t)&&(e=pt(t))}else n&&st(t)&&(e=pt(t));e&&window.scrollTo(e.x,e.y)}var dt,vt=X&&((-1===(dt=window.navigator.userAgent).indexOf("Android 2.")&&-1===dt.indexOf("Android 4.0")||-1===dt.indexOf("Mobile Safari")||-1!==dt.indexOf("Chrome")||-1!==dt.indexOf("Windows Phone"))&&window.history&&"pushState"in window.history);function yt(t,e){ut();var r=window.history;try{e?r.replaceState({key:nt()},"",t):r.pushState({key:ot(et())},"",t)}catch(r){window.location[e?"replace":"assign"](t)}}function mt(t){yt(t,!0)}function gt(t,e,r){var n=function(o){o>=t.length?r():t[o]?e(t[o],(function(){n(o+1)})):n(o+1)};n(0)}function wt(t){return function(e,r,o){var i=!1,a=0,c=null;bt(t,(function(t,e,r,u){if("function"==typeof t&&void 0===t.cid){i=!0,a++;var s,p=Rt((function(e){var n;((n=e).__esModule||kt&&"Module"===n[Symbol.toStringTag])&&(e=e.default),t.resolved="function"==typeof e?e:D.extend(e),r.components[u]=e,--a<=0&&o()})),f=Rt((function(t){var e="Failed to resolve async component "+u+": "+t;c||(c=n(t)?t:new Error(e),o(c))}));try{s=t(p,f)}catch(t){f(t)}if(s)if("function"==typeof s.then)s.then(p,f);else{var h=s.component;h&&"function"==typeof h.then&&h.then(p,f)}}})),i||o()}}function bt(t,e){return xt(t.map((function(t){return Object.keys(t.components).map((function(r){return e(t.components[r],t.instances[r],t,r)}))})))}function xt(t){return Array.prototype.concat.apply([],t)}var kt="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag;function Rt(t){var e=!1;return function(){for(var r=[],n=arguments.length;n--;)r[n]=arguments[n];if(!e)return e=!0,t.apply(this,r)}}var Et=function(t){function e(e){t.call(this),this.name=this._name="NavigationDuplicated",this.message='Navigating to current location ("'+e.fullPath+'") is not allowed',Object.defineProperty(this,"stack",{value:(new t).stack,writable:!0,configurable:!0})}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(Error);Et._name="NavigationDuplicated";var Ot=function(t,e){this.router=t,this.base=function(t){if(!t)if(X){var e=document.querySelector("base");t=(t=e&&e.getAttribute("href")||"/").replace(/^https?:\/\/[^\/]+/,"")}else t="/";"/"!==t.charAt(0)&&(t="/"+t);return t.replace(/\/$/,"")}(e),this.current=m,this.pending=null,this.ready=!1,this.readyCbs=[],this.readyErrorCbs=[],this.errorCbs=[]};function _t(t,e,r,n){var o=bt(t,(function(t,n,o,i){var a=function(t,e){"function"!=typeof t&&(t=D.extend(t));return t.options[e]}(t,e);if(a)return Array.isArray(a)?a.map((function(t){return r(t,n,o,i)})):r(a,n,o,i)}));return xt(n?o.reverse():o)}function At(t,e){if(e)return function(){return t.apply(e,arguments)}}Ot.prototype.listen=function(t){this.cb=t},Ot.prototype.onReady=function(t,e){this.ready?t():(this.readyCbs.push(t),e&&this.readyErrorCbs.push(e))},Ot.prototype.onError=function(t){this.errorCbs.push(t)},Ot.prototype.transitionTo=function(t,e,r){var n=this,o=this.router.match(t,this.current);this.confirmTransition(o,(function(){n.updateRoute(o),e&&e(o),n.ensureURL(),n.ready||(n.ready=!0,n.readyCbs.forEach((function(t){t(o)})))}),(function(t){r&&r(t),t&&!n.ready&&(n.ready=!0,n.readyErrorCbs.forEach((function(e){e(t)})))}))},Ot.prototype.confirmTransition=function(t,e,r){var i=this,a=this.current,c=function(t){!o(Et,t)&&n(t)&&(i.errorCbs.length?i.errorCbs.forEach((function(e){e(t)})):console.error(t)),r&&r(t)};if(b(t,a)&&t.matched.length===a.matched.length)return this.ensureURL(),c(new Et(t));var u=function(t,e){var r,n=Math.max(t.length,e.length);for(r=0;r<n&&t[r]===e[r];r++);return{updated:e.slice(0,r),activated:e.slice(r),deactivated:t.slice(r)}}(this.current.matched,t.matched),s=u.updated,p=u.deactivated,f=u.activated,h=[].concat(function(t){return _t(t,"beforeRouteLeave",At,!0)}(p),this.router.beforeHooks,function(t){return _t(t,"beforeRouteUpdate",At)}(s),f.map((function(t){return t.beforeEnter})),wt(f));this.pending=t;var l=function(e,r){if(i.pending!==t)return c();try{e(t,a,(function(t){!1===t||n(t)?(i.ensureURL(!0),c(t)):"string"==typeof t||"object"==typeof t&&("string"==typeof t.path||"string"==typeof t.name)?(c(),"object"==typeof t&&t.replace?i.replace(t):i.push(t)):r(t)}))}catch(t){c(t)}};gt(h,l,(function(){var r=[];gt(function(t,e,r){return _t(t,"beforeRouteEnter",(function(t,n,o,i){return function(t,e,r,n,o){return function(i,a,c){return t(i,a,(function(t){"function"==typeof t&&n.push((function(){!function t(e,r,n,o){r[n]&&!r[n]._isBeingDestroyed?e(r[n]):o()&&setTimeout((function(){t(e,r,n,o)}),16)}(t,e.instances,r,o)})),c(t)}))}}(t,o,i,e,r)}))}(f,r,(function(){return i.current===t})).concat(i.router.resolveHooks),l,(function(){if(i.pending!==t)return c();i.pending=null,e(t),i.router.app&&i.router.app.$nextTick((function(){r.forEach((function(t){t()}))}))}))}))},Ot.prototype.updateRoute=function(t){var e=this.current;this.current=t,this.cb&&this.cb(t),this.router.afterHooks.forEach((function(r){r&&r(t,e)}))};var Ct=function(t){function e(e,r){var n=this;t.call(this,e,r);var o=e.options.scrollBehavior,i=vt&&o;i&&at();var a=jt(this.base);window.addEventListener("popstate",(function(t){var r=n.current,o=jt(n.base);n.current===m&&o===a||n.transitionTo(o,(function(t){i&&ct(e,t,r,!0)}))}))}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.go=function(t){window.history.go(t)},e.prototype.push=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,(function(t){yt(R(n.base+t.fullPath)),ct(n.router,t,o,!1),e&&e(t)}),r)},e.prototype.replace=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,(function(t){mt(R(n.base+t.fullPath)),ct(n.router,t,o,!1),e&&e(t)}),r)},e.prototype.ensureURL=function(t){if(jt(this.base)!==this.current.fullPath){var e=R(this.base+this.current.fullPath);t?yt(e):mt(e)}},e.prototype.getCurrentLocation=function(){return jt(this.base)},e}(Ot);function jt(t){var e=decodeURI(window.location.pathname);return t&&0===e.indexOf(t)&&(e=e.slice(t.length)),(e||"/")+window.location.search+window.location.hash}var St=function(t){function e(e,r,n){t.call(this,e,r),n&&function(t){var e=jt(t);if(!/^\/#/.test(e))return window.location.replace(R(t+"/#"+e)),!0}(this.base)||$t()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.setupListeners=function(){var t=this,e=this.router.options.scrollBehavior,r=vt&&e;r&&at(),window.addEventListener(vt?"popstate":"hashchange",(function(){var e=t.current;$t()&&t.transitionTo(Tt(),(function(n){r&&ct(t.router,n,e,!0),vt||qt(n.fullPath)}))}))},e.prototype.push=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,(function(t){Lt(t.fullPath),ct(n.router,t,o,!1),e&&e(t)}),r)},e.prototype.replace=function(t,e,r){var n=this,o=this.current;this.transitionTo(t,(function(t){qt(t.fullPath),ct(n.router,t,o,!1),e&&e(t)}),r)},e.prototype.go=function(t){window.history.go(t)},e.prototype.ensureURL=function(t){var e=this.current.fullPath;Tt()!==e&&(t?Lt(e):qt(e))},e.prototype.getCurrentLocation=function(){return Tt()},e}(Ot);function $t(){var t=Tt();return"/"===t.charAt(0)||(qt("/"+t),!1)}function Tt(){var t=window.location.href,e=t.indexOf("#");if(e<0)return"";var r=(t=t.slice(e+1)).indexOf("?");if(r<0){var n=t.indexOf("#");t=n>-1?decodeURI(t.slice(0,n))+t.slice(n):decodeURI(t)}else r>-1&&(t=decodeURI(t.slice(0,r))+t.slice(r));return t}function Pt(t){var e=window.location.href,r=e.indexOf("#");return(r>=0?e.slice(0,r):e)+"#"+t}function Lt(t){vt?yt(Pt(t)):window.location.hash=t}function qt(t){vt?mt(Pt(t)):window.location.replace(Pt(t))}var Ut=function(t){function e(e,r){t.call(this,e,r),this.stack=[],this.index=-1}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.push=function(t,e,r){var n=this;this.transitionTo(t,(function(t){n.stack=n.stack.slice(0,n.index+1).concat(t),n.index++,e&&e(t)}),r)},e.prototype.replace=function(t,e,r){var n=this;this.transitionTo(t,(function(t){n.stack=n.stack.slice(0,n.index).concat(t),e&&e(t)}),r)},e.prototype.go=function(t){var e=this,r=this.index+t;if(!(r<0||r>=this.stack.length)){var n=this.stack[r];this.confirmTransition(n,(function(){e.index=r,e.updateRoute(n)}),(function(t){o(Et,t)&&(e.index=r)}))}},e.prototype.getCurrentLocation=function(){var t=this.stack[this.stack.length-1];return t?t.fullPath:"/"},e.prototype.ensureURL=function(){},e}(Ot),It=function(t){void 0===t&&(t={}),this.app=null,this.apps=[],this.options=t,this.beforeHooks=[],this.resolveHooks=[],this.afterHooks=[],this.matcher=G(t.routes||[],this);var e=t.mode||"hash";switch(this.fallback="history"===e&&!vt&&!1!==t.fallback,this.fallback&&(e="hash"),X||(e="abstract"),this.mode=e,e){case"history":this.history=new Ct(this,t.base);break;case"hash":this.history=new St(this,t.base,this.fallback);break;case"abstract":this.history=new Ut(this,t.base);break;default:0}},Mt={currentRoute:{configurable:!0}};function Bt(t,e){return t.push(e),function(){var r=t.indexOf(e);r>-1&&t.splice(r,1)}}It.prototype.match=function(t,e,r){return this.matcher.match(t,e,r)},Mt.currentRoute.get=function(){return this.history&&this.history.current},It.prototype.init=function(t){var e=this;if(this.apps.push(t),t.$once("hook:destroyed",(function(){var r=e.apps.indexOf(t);r>-1&&e.apps.splice(r,1),e.app===t&&(e.app=e.apps[0]||null)})),!this.app){this.app=t;var r=this.history;if(r instanceof Ct)r.transitionTo(r.getCurrentLocation());else if(r instanceof St){var n=function(){r.setupListeners()};r.transitionTo(r.getCurrentLocation(),n,n)}r.listen((function(t){e.apps.forEach((function(e){e._route=t}))}))}},It.prototype.beforeEach=function(t){return Bt(this.beforeHooks,t)},It.prototype.beforeResolve=function(t){return Bt(this.resolveHooks,t)},It.prototype.afterEach=function(t){return Bt(this.afterHooks,t)},It.prototype.onReady=function(t,e){this.history.onReady(t,e)},It.prototype.onError=function(t){this.history.onError(t)},It.prototype.push=function(t,e,r){var n=this;if(!e&&!r&&"undefined"!=typeof Promise)return new Promise((function(e,r){n.history.push(t,e,r)}));this.history.push(t,e,r)},It.prototype.replace=function(t,e,r){var n=this;if(!e&&!r&&"undefined"!=typeof Promise)return new Promise((function(e,r){n.history.replace(t,e,r)}));this.history.replace(t,e,r)},It.prototype.go=function(t){this.history.go(t)},It.prototype.back=function(){this.go(-1)},It.prototype.forward=function(){this.go(1)},It.prototype.getMatchedComponents=function(t){var e=t?t.matched?t:this.resolve(t).route:this.currentRoute;return e?[].concat.apply([],e.matched.map((function(t){return Object.keys(t.components).map((function(e){return t.components[e]}))}))):[]},It.prototype.resolve=function(t,e,r){var n=z(t,e=e||this.history.current,r,this),o=this.match(n,e),i=o.redirectedFrom||o.fullPath;return{location:n,route:o,href:function(t,e,r){var n="hash"===r?"#"+e:e;return t?R(t+"/"+n):n}(this.history.base,i,this.mode),normalizedTo:n,resolved:o}},It.prototype.addRoutes=function(t){this.matcher.addRoutes(t),this.history.current!==m&&this.history.transitionTo(this.history.getCurrentLocation())},Object.defineProperties(It.prototype,Mt),It.install=function t(e){if(!t.installed||D!==e){t.installed=!0,D=e;var r=function(t){return void 0!==t},n=function(t,e){var n=t.$options._parentVnode;r(n)&&r(n=n.data)&&r(n=n.registerRouteInstance)&&n(t,e)};e.mixin({beforeCreate:function(){r(this.$options.router)?(this._routerRoot=this,this._router=this.$options.router,this._router.init(this),e.util.defineReactive(this,"_route",this._router.history.current)):this._routerRoot=this.$parent&&this.$parent._routerRoot||this,n(this,this)},destroyed:function(){n(this)}}),Object.defineProperty(e.prototype,"$router",{get:function(){return this._routerRoot._router}}),Object.defineProperty(e.prototype,"$route",{get:function(){return this._routerRoot._route}}),e.component("RouterView",a),e.component("RouterLink",K);var o=e.config.optionMergeStrategies;o.beforeRouteEnter=o.beforeRouteLeave=o.beforeRouteUpdate=o.created}},It.version="3.1.3",X&&window.Vue&&window.Vue.use(It),e.default=It}}]);