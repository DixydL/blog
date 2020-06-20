(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ChapterFormComponent.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ChapterFormComponent.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HeaderBackComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HeaderBackComponent */ "./resources/js/components/HeaderBackComponent.vue");
/* harmony import */ var tiptap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tiptap */ "./node_modules/tiptap/dist/tiptap.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    headerBack: _HeaderBackComponent__WEBPACK_IMPORTED_MODULE_0__["default"],
    EditorContent: tiptap__WEBPACK_IMPORTED_MODULE_1__["EditorContent"]
  },
  data: function data() {
    return {
      form: {
        name: "",
        text: ""
      },
      label: "",
      isUpdate: false,
      editor: new tiptap__WEBPACK_IMPORTED_MODULE_1__["Editor"]()
    };
  },
  methods: {
    addNewChapter: function addNewChapter() {
      this.$store.dispatch("chapter/add", {
        post_id: this.$route.params.post_id,
        form: {
          name: this.form.name,
          text: this.editor.getHTML()
        }
      });
    },
    updateChapter: function updateChapter() {
      this.$store.dispatch("chapter/update", {
        post_id: this.$route.params.post_id,
        chapter_id: this.$route.params.chapter_id,
        form: {
          name: this.form.name,
          text: this.editor.getHTML()
        }
      });
    }
  },
  computed: _objectSpread({}, Object(vuex__WEBPACK_IMPORTED_MODULE_2__["mapGetters"])({
    chapter: "chapter/getChapter"
  }), {
    isLoading: function isLoading() {
      return this.$store.state.isLoading;
    }
  }),
  watch: {
    chapter: function chapter(_chapter) {
      this.form.name = _chapter.name;
      this.editor.setContent(_chapter.text);
      this.label = "Редагування глави " + _chapter.name;
    }
  },
  created: function created() {
    this.label = "Нова глава";

    if (this.$route.params.chapter_id) {
      this.$store.commit("isLoading", true);
      this.isUpdate = true;
      console.log(this.$store.getters);
      this.$store.dispatch("chapter/load", {
        post_id: this.$route.params.post_id,
        chapter_id: this.$route.params.chapter_id
      });
      var data = this.$store.state.chapter.data;
      console.log(this.$store.state.chapter.data);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ChapterFormComponent.vue?vue&type=template&id=5e9bdf92&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/ChapterFormComponent.vue?vue&type=template&id=5e9bdf92&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "app" } },
    [
      _c("el-main", [
        _c("div", {
          directives: [
            {
              name: "loading",
              rawName: "v-loading",
              value: _vm.isLoading,
              expression: "isLoading"
            }
          ]
        }),
        _vm._v(" "),
        _c(
          "div",
          {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: !_vm.isLoading,
                expression: "!isLoading"
              }
            ]
          },
          [
            _c("headerBack", { attrs: { label: _vm.label } }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "content-block" },
              [
                _c(
                  "el-form",
                  {
                    ref: "form",
                    attrs: { model: _vm.form, "label-width": "120px" }
                  },
                  [
                    _c(
                      "el-form-item",
                      { attrs: { label: "Назва глави" } },
                      [
                        _c("el-input", {
                          attrs: { placeholder: "Ведіть назву глави" },
                          model: {
                            value: _vm.form.name,
                            callback: function($$v) {
                              _vm.$set(_vm.form, "name", $$v)
                            },
                            expression: "form.name"
                          }
                        })
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c("el-form-item", { attrs: { label: "Вміст глави" } }, [
                      _c(
                        "div",
                        { staticClass: "edit" },
                        [
                          _c("editor-content", {
                            attrs: { editor: _vm.editor }
                          })
                        ],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "el-form-item",
                      [
                        _vm.isUpdate
                          ? _c(
                              "el-button",
                              {
                                attrs: { type: "primary" },
                                on: { click: _vm.updateChapter }
                              },
                              [_vm._v("Оновити")]
                            )
                          : _c(
                              "el-button",
                              {
                                attrs: { type: "primary" },
                                on: { click: _vm.addNewChapter }
                              },
                              [_vm._v("Додати главу")]
                            )
                      ],
                      1
                    )
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/ChapterFormComponent.vue":
/*!**********************************************************!*\
  !*** ./resources/js/components/ChapterFormComponent.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ChapterFormComponent_vue_vue_type_template_id_5e9bdf92_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ChapterFormComponent.vue?vue&type=template&id=5e9bdf92&scoped=true& */ "./resources/js/components/ChapterFormComponent.vue?vue&type=template&id=5e9bdf92&scoped=true&");
/* harmony import */ var _ChapterFormComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ChapterFormComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/ChapterFormComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ChapterFormComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ChapterFormComponent_vue_vue_type_template_id_5e9bdf92_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ChapterFormComponent_vue_vue_type_template_id_5e9bdf92_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5e9bdf92",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/ChapterFormComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/ChapterFormComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/components/ChapterFormComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChapterFormComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./ChapterFormComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ChapterFormComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ChapterFormComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/ChapterFormComponent.vue?vue&type=template&id=5e9bdf92&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/components/ChapterFormComponent.vue?vue&type=template&id=5e9bdf92&scoped=true& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ChapterFormComponent_vue_vue_type_template_id_5e9bdf92_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./ChapterFormComponent.vue?vue&type=template&id=5e9bdf92&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/ChapterFormComponent.vue?vue&type=template&id=5e9bdf92&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ChapterFormComponent_vue_vue_type_template_id_5e9bdf92_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ChapterFormComponent_vue_vue_type_template_id_5e9bdf92_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);