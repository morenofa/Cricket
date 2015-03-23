!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.Handlebars=e.Handlebars||t()}(this,function(){var e=function(){function e(e){this.string=e}var t;return e.prototype.toString=function(){return""+this.string},t=e}(),t=function(e){function t(e){return l[e]}function r(e){for(var t=1;t<arguments.length;t++)for(var r in arguments[t])Object.prototype.hasOwnProperty.call(arguments[t],r)&&(e[r]=arguments[t][r]);return e}function n(e){return e instanceof s?e.toString():null==e?"":e?(e=""+e,p.test(e)?e.replace(u,t):e):e+""}function a(e){return e||0===e?h(e)&&0===e.length?!0:!1:!0}function i(e,t){return(e?e+".":"")+t}var o={},s=e,l={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},u=/[&<>"'`]/g,p=/[&<>"'`]/;o.extend=r;var c=Object.prototype.toString;o.toString=c;var f=function(e){return"function"==typeof e};f(/x/)&&(f=function(e){return"function"==typeof e&&"[object Function]"===c.call(e)});var f;o.isFunction=f;var h=Array.isArray||function(e){return e&&"object"==typeof e?"[object Array]"===c.call(e):!1};return o.isArray=h,o.escapeExpression=n,o.isEmpty=a,o.appendContextPath=i,o}(e),r=function(){function e(e,t){var n;t&&t.firstLine&&(n=t.firstLine,e+=" - "+n+":"+t.firstColumn);for(var a=Error.prototype.constructor.call(this,e),i=0;i<r.length;i++)this[r[i]]=a[r[i]];n&&(this.lineNumber=n,this.column=t.firstColumn)}var t,r=["description","fileName","lineNumber","message","name","number","stack"];return e.prototype=new Error,t=e}(),n=function(e,t){function r(e,t){this.helpers=e||{},this.partials=t||{},n(this)}function n(e){e.registerHelper("helperMissing",function(){if(1===arguments.length)return void 0;throw new o("Missing helper: '"+arguments[arguments.length-1].name+"'")}),e.registerHelper("blockHelperMissing",function(t,r){var n=r.inverse,a=r.fn;if(t===!0)return a(this);if(t===!1||null==t)return n(this);if(p(t))return t.length>0?(r.ids&&(r.ids=[r.name]),e.helpers.each(t,r)):n(this);if(r.data&&r.ids){var o=m(r.data);o.contextPath=i.appendContextPath(r.data.contextPath,r.name),r={data:o}}return a(t,r)}),e.registerHelper("each",function(e,t){if(!t)throw new o("Must pass iterator to #each");var r,n,a=t.fn,s=t.inverse,l=0,u="";if(t.data&&t.ids&&(n=i.appendContextPath(t.data.contextPath,t.ids[0])+"."),c(e)&&(e=e.call(this)),t.data&&(r=m(t.data)),e&&"object"==typeof e)if(p(e))for(var f=e.length;f>l;l++)r&&(r.index=l,r.first=0===l,r.last=l===e.length-1,n&&(r.contextPath=n+l)),u+=a(e[l],{data:r});else for(var h in e)e.hasOwnProperty(h)&&(r&&(r.key=h,r.index=l,r.first=0===l,n&&(r.contextPath=n+h)),u+=a(e[h],{data:r}),l++);return 0===l&&(u=s(this)),u}),e.registerHelper("if",function(e,t){return c(e)&&(e=e.call(this)),!t.hash.includeZero&&!e||i.isEmpty(e)?t.inverse(this):t.fn(this)}),e.registerHelper("unless",function(t,r){return e.helpers["if"].call(this,t,{fn:r.inverse,inverse:r.fn,hash:r.hash})}),e.registerHelper("with",function(e,t){c(e)&&(e=e.call(this));var r=t.fn;if(i.isEmpty(e))return t.inverse(this);if(t.data&&t.ids){var n=m(t.data);n.contextPath=i.appendContextPath(t.data.contextPath,t.ids[0]),t={data:n}}return r(e,t)}),e.registerHelper("log",function(t,r){var n=r.data&&null!=r.data.level?parseInt(r.data.level,10):1;e.log(n,t)}),e.registerHelper("lookup",function(e,t){return e&&e[t]})}var a={},i=e,o=t,s="2.0.0";a.VERSION=s;var l=6;a.COMPILER_REVISION=l;var u={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1"};a.REVISION_CHANGES=u;var p=i.isArray,c=i.isFunction,f=i.toString,h="[object Object]";a.HandlebarsEnvironment=r,r.prototype={constructor:r,logger:d,log:v,registerHelper:function(e,t){if(f.call(e)===h){if(t)throw new o("Arg not supported with multiple helpers");i.extend(this.helpers,e)}else this.helpers[e]=t},unregisterHelper:function(e){delete this.helpers[e]},registerPartial:function(e,t){f.call(e)===h?i.extend(this.partials,e):this.partials[e]=t},unregisterPartial:function(e){delete this.partials[e]}};var d={methodMap:{0:"debug",1:"info",2:"warn",3:"error"},DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,log:function(e,t){if(d.level<=e){var r=d.methodMap[e];"undefined"!=typeof console&&console[r]&&console[r].call(console,t)}}};a.logger=d;var v=d.log;a.log=v;var m=function(e){var t=i.extend({},e);return t._parent=e,t};return a.createFrame=m,a}(t,r),a=function(e,t,r){function n(e){var t=e&&e[0]||1,r=f;if(t!==r){if(r>t){var n=h[r],a=h[t];throw new c("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+n+") or downgrade your runtime to an older version ("+a+").")}throw new c("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+e[1]+").")}}function a(e,t){if(!t)throw new c("No environment passed to template");if(!e||!e.main)throw new c("Unknown template object: "+typeof e);t.VM.checkRevision(e.compiler);var r=function(r,n,a,i,o,s,l,u,f){o&&(i=p.extend({},i,o));var h=t.VM.invokePartial.call(this,r,a,i,s,l,u,f);if(null==h&&t.compile){var d={helpers:s,partials:l,data:u,depths:f};l[a]=t.compile(r,{data:void 0!==u,compat:e.compat},t),h=l[a](i,d)}if(null!=h){if(n){for(var v=h.split("\n"),m=0,g=v.length;g>m&&(v[m]||m+1!==g);m++)v[m]=n+v[m];h=v.join("\n")}return h}throw new c("The partial "+a+" could not be compiled when running in runtime-only mode")},n={lookup:function(e,t){for(var r=e.length,n=0;r>n;n++)if(e[n]&&null!=e[n][t])return e[n][t]},lambda:function(e,t){return"function"==typeof e?e.call(t):e},escapeExpression:p.escapeExpression,invokePartial:r,fn:function(t){return e[t]},programs:[],program:function(e,t,r){var n=this.programs[e],a=this.fn(e);return t||r?n=i(this,e,a,t,r):n||(n=this.programs[e]=i(this,e,a)),n},data:function(e,t){for(;e&&t--;)e=e._parent;return e},merge:function(e,t){var r=e||t;return e&&t&&e!==t&&(r=p.extend({},t,e)),r},noop:t.VM.noop,compilerInfo:e.compiler},a=function(t,r){r=r||{};var i=r.data;a._setup(r),!r.partial&&e.useData&&(i=l(t,i));var o;return e.useDepths&&(o=r.depths?[t].concat(r.depths):[t]),e.main.call(n,t,n.helpers,n.partials,i,o)};return a.isTop=!0,a._setup=function(r){r.partial?(n.helpers=r.helpers,n.partials=r.partials):(n.helpers=n.merge(r.helpers,t.helpers),e.usePartial&&(n.partials=n.merge(r.partials,t.partials)))},a._child=function(t,r,a){if(e.useDepths&&!a)throw new c("must pass parent depths");return i(n,t,e[t],r,a)},a}function i(e,t,r,n,a){var i=function(t,i){return i=i||{},r.call(e,t,e.helpers,e.partials,i.data||n,a&&[t].concat(a))};return i.program=t,i.depth=a?a.length:0,i}function o(e,t,r,n,a,i,o){var s={partial:!0,helpers:n,partials:a,data:i,depths:o};if(void 0===e)throw new c("The partial "+t+" could not be found");return e instanceof Function?e(r,s):void 0}function s(){return""}function l(e,t){return t&&"root"in t||(t=t?d(t):{},t.root=e),t}var u={},p=e,c=t,f=r.COMPILER_REVISION,h=r.REVISION_CHANGES,d=r.createFrame;return u.checkRevision=n,u.template=a,u.program=i,u.invokePartial=o,u.noop=s,u}(t,r,n),i=function(e,t,r,n,a){var i,o=e,s=t,l=r,u=n,p=a,c=function(){var e=new o.HandlebarsEnvironment;return u.extend(e,o),e.SafeString=s,e.Exception=l,e.Utils=u,e.escapeExpression=u.escapeExpression,e.VM=p,e.template=function(t){return p.template(t,e)},e},f=c();return f.create=c,f["default"]=f,i=f}(n,e,r,t,a);return i});