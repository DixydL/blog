(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{122:function(t,e,n){"use strict";var i=n(56);n.n(i).a},123:function(t,e,n){(t.exports=n(51)(!1)).push([t.i,"\np.is-editor-empty:first-child::before {\n  content: attr(data-empty-text);\n  float: left;\n  color: #aaa;\n  pointer-events: none;\n  height: 0;\n}\np.is-editor-empty:nth-child(2)::before {\n  content: attr(data-empty-text);\n  float: left;\n  color: #aaa;\n  pointer-events: none;\n  height: 0;\n}\n.el-tag + .el-tag {\n  margin-left: 10px;\n}\n.button-new-tag {\n  margin-left: 10px;\n  height: 32px;\n  line-height: 30px;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n.input-new-tag {\n  width: 90px;\n  margin-left: 10px;\n  vertical-align: bottom;\n}\n.category-select {\n  text-align: initial;\n}\n",""])},161:function(t,e,n){"use strict";n.r(e);var i=n(5),a=n.n(i),r=n(13),o=n.n(r),s=n(8),c=n(30),l=n(3),u=n(72);function d(t){return(d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function p(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function f(t,e){return!e||"object"!==d(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function m(t,e){return(m=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}l.a;function v(t,e,n,i,a,r,o){try{var s=t[r](o),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(i,a)}function g(t){return function(){var e=this,n=arguments;return new Promise((function(i,a){var r=t.apply(e,n);function o(t){v(r,i,a,o,s,"next",t)}function s(t){v(r,i,a,o,s,"throw",t)}o(void 0)}))}}function y(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var b,w,x,_,k={components:{headerBack:c.a,EditorContent:l.c},data:function(){var t;return y(t={label:"",actionFileUpload:s.a+"/v1/file",isUpdate:!1,errors:{name:"",file_id:""},form:{description:"",text:"",name:"",type_post:"1",dynamicTags:[]},catalogs:{}},"errors",{}),y(t,"fileList",[]),y(t,"inputVisible",!1),y(t,"inputValue",""),y(t,"editorPost",new l.b({extensions:[new u.a({emptyEditorClass:"is-editor-empty",emptyNodeClass:"is-empty",emptyNodeText:"Короткий опис",showOnlyWhenEditable:!0,showOnlyCurrent:!0})]})),y(t,"editorChapter",new l.b({extensions:[new u.a({emptyEditorClass:"is-editor-empty",emptyNodeClass:"is-empty",emptyNodeText:"Напишіть першу главу",showOnlyWhenEditable:!0,showOnlyCurrent:!0})]})),t},computed:{isLoading:function(){return this.$store.state.isLoading},post_type:function(){return this.form}},created:(_=g(a.a.mark((function t(){var e,n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.$route.query.tag&&this.form.dynamicTags.push(this.$route.query.tag),this.label="Написати новелу",!this.$route.params.id){t.next=19;break}return this.label="Редагувати новелу",this.$store.commit("isLoading",!0),this.isUpdate=!0,t.prev=6,t.next=9,o.a.get(s.a+"/v1/post/"+this.$route.params.id);case 9:e=t.sent,this.form=e.data.data,this.editorPost.setContent(e.data.data.description),this.$store.commit("isLoading",!1),this.setTags(e.data.data.tags),this.setFileList(e.data.data.file),t.next=19;break;case 17:t.prev=17,t.t0=t.catch(6);case 19:return t.prev=19,t.next=22,o.a.get(s.a+"/v1/catalog");case 22:n=t.sent,this.catalogs=n.data.data,t.next=28;break;case 26:t.prev=26,t.t1=t.catch(19);case 28:case"end":return t.stop()}}),t,this,[[6,17],[19,26]])}))),function(){return _.apply(this,arguments)}),watch:{$route:function(t,e){this.$route.params.id||(this.isUpdate=!1,this.form.text="",this.form.name="")}},methods:{onSubmit:function(){this.$store.commit("isLoading",!0),this.isUpdate?this.updatePost():this.createPost()},beforeUpload:function(t){return t.size<=2048e3||(this.$message.warning("Файл больше 2мб"),!1)},createPost:(x=g(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.form.text=this.editorChapter.getHTML(),this.form.description=this.editorPost.getHTML(),this.$store.dispatch("post/add",this.form);case 3:case"end":return t.stop()}}),t,this)}))),function(){return x.apply(this,arguments)}),updatePost:(w=g(a.a.mark((function t(){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.form.post_id=this.$route.params.id,this.form.description=this.editorPost.getHTML(),this.$store.dispatch("post/update",this.form);case 3:case"end":return t.stop()}}),t,this)}))),function(){return w.apply(this,arguments)}),handleClose:function(t){this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(t),1)},showInput:function(){var t=this;this.inputVisible=!0,this.$nextTick((function(e){t.$refs.saveTagInput.$refs.input.focus()}))},handleInputConfirm:function(){var t=this.inputValue;t&&this.form.dynamicTags.push(t),this.inputVisible=!1,this.inputValue=""},deleteFile:(b=g(a.a.mark((function t(e){var n=this;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:o.a.delete(s.a+"/v1/file/"+e).then((function(t){n.$emit("completed",t.data.data)})).catch((function(t){}));case 1:case"end":return t.stop()}}),t)}))),function(t){return b.apply(this,arguments)}),handleFormError:function(t){t.response.data.errors.name&&(this.errors.name=t.response.data.errors.name[0]),t.response.data.errors.catalog_id&&(this.errors.catalog_id=t.response.data.errors.catalog_id[0]),t.response.data.errors.file_id&&(this.errors.file_id=t.response.data.errors.file_id[0])},setTags:function(t){var e=this;this.form.dynamicTags=[],t.forEach((function(t){e.form.dynamicTags.push(t.name)}))},setFileList:function(t){t&&(this.fileList=[{id:t.id,name:t.path,url:s.b+t.path}],this.form.file_id=t.id)},handleExceed:function(t,e){this.$message.warning("Видалите попередній файл")},handleRemove:function(t){console.log(t),this.deleteFile(t.id),this.$message.success("Ви видалили файл")},handleError:function(t){console.log(t),this.fileList=[],this.$message.warning("Не удалось загрузить файл")},handleSuccess:function(t){this.setFileList(t.data)}}},$=(n(122),n(11)),C=Object($.a)(k,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-main",[n("headerBack",{attrs:{label:t.label}}),t._v(" "),n("div",{staticClass:"content-block",attrs:{id:"app"}},[n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}]}),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:!t.isLoading,expression:"!isLoading"}]},[n("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px"}},[n("div",[n("el-form-item",{attrs:{error:t.errors.name,label:"Назва новели"}},[n("el-input",{attrs:{placeholder:"Введіть назву новели"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"Короткий опис"}},[n("div",{staticClass:"edit"},[n("editor-content",{attrs:{editor:t.editorPost}})],1)]),t._v(" "),n("el-form-item",{directives:[{name:"show",rawName:"v-show",value:!1===t.isUpdate,expression:"isUpdate === false"}],attrs:{label:"Вміст"}},[n("div",{staticClass:"edit-content"},[n("editor-content",{attrs:{editor:t.editorChapter}})],1)])],1),t._v(" "),n("el-form-item",[t._l(t.form.dynamicTags,(function(e){return n("el-tag",{key:e,attrs:{closable:"","disable-transitions":!1},on:{close:function(n){return t.handleClose(e)}}},[t._v(t._s(e))])})),t._v(" "),t.inputVisible?n("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{size:"mini"},on:{blur:t.handleInputConfirm},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleInputConfirm(e)}},model:{value:t.inputValue,callback:function(e){t.inputValue=e},expression:"inputValue"}}):n("el-button",{staticClass:"button-new-tag",attrs:{size:"small"},on:{click:t.showInput}},[t._v("+ Додати тег")])],2),t._v(" "),n("el-form-item",[t.isUpdate?n("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("Обновити")]):n("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("Створити")])],1)],1)],1)])],1)}),[],!1,null,null,null);e.default=C.exports},56:function(t,e,n){var i=n(123);"string"==typeof i&&(i=[[t.i,i,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(52)(i,a);i.locals&&(t.exports=i.locals)}}]);