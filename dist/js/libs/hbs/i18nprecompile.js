define(["hbs/handlebars","hbs/underscore"],function(e,r){function a(n,t,i){return i=i||{},t=t||{},n&&"program"===n.type&&n.statements&&(r(n.statements).forEach(function(r,s){var o="<!-- i18n error -->";if("mustache"===r.type&&r.id&&"$"===r.id.original){if(r.params.length&&r.params[0].string){var p=r.params[0].string;o=t[p]||(i.originalKeyFallback?p:o)}n.statements[s]=new e.AST.ContentNode(o)}else r.program&&(r.program=a(r.program,t,i))}),n.inverse&&a(n.inverse,t,i)),n}return function(r,n,t){var i,s;return t=t||{},"data"in t||(t.data=!0),t.compat&&(t.useDepths=!0),i=e.parse(r),n!==!1&&(i=a(i,n,t)),s=(new e.Compiler).compile(i,t),(new e.JavaScriptCompiler).compile(s,t)}});