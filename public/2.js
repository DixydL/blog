(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/PostFormComponents.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/PostFormComponents.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ "./resources/js/config.js");
/* harmony import */ var _HeaderBackComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./HeaderBackComponent */ "./resources/js/components/HeaderBackComponent.vue");
/* harmony import */ var tiptap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tiptap */ "./node_modules/tiptap/dist/tiptap.esm.js");
/* harmony import */ var tiptap_extensions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tiptap-extensions */ "./node_modules/tiptap-extensions/dist/extensions.esm.js");
/* harmony import */ var _PostDesc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./PostDesc */ "./resources/js/components/PostDesc.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
//






/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    headerBack: _HeaderBackComponent__WEBPACK_IMPORTED_MODULE_3__["default"],
    EditorContent: tiptap__WEBPACK_IMPORTED_MODULE_4__["EditorContent"]
  },
  data: function data() {
    var _ref;

    return _ref = {
      label: "",
      actionFileUpload: _config__WEBPACK_IMPORTED_MODULE_2__["API_BASE_URL"] + "/v1/file",
      isUpdate: false,
      errors: {
        name: "",
        file_id: ""
      },
      form: {
        description: "",
        text: "",
        name: "",
        type_post: "1",
        dynamicTags: []
      },
      catalogs: {}
    }, _defineProperty(_ref, "errors", {}), _defineProperty(_ref, "fileList", []), _defineProperty(_ref, "inputVisible", false), _defineProperty(_ref, "inputValue", ""), _defineProperty(_ref, "editorPost", new tiptap__WEBPACK_IMPORTED_MODULE_4__["Editor"]({
      extensions: [new tiptap_extensions__WEBPACK_IMPORTED_MODULE_5__["Placeholder"]({
        emptyEditorClass: "is-editor-empty",
        emptyNodeClass: "is-empty",
        emptyNodeText: "Короткий опис",
        showOnlyWhenEditable: true,
        showOnlyCurrent: true
      })]
    })), _defineProperty(_ref, "editorChapter", new tiptap__WEBPACK_IMPORTED_MODULE_4__["Editor"]({
      extensions: [new tiptap_extensions__WEBPACK_IMPORTED_MODULE_5__["Placeholder"]({
        emptyEditorClass: "is-editor-empty",
        emptyNodeClass: "is-empty",
        emptyNodeText: "Напишіть першу главу",
        showOnlyWhenEditable: true,
        showOnlyCurrent: true
      })]
    })), _ref;
  },
  computed: {
    isLoading: function isLoading() {
      return this.$store.state.isLoading;
    },
    post_type: function post_type() {
      return this.form;
    }
  },
  created: function () {
    var _created = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var response, _response;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (this.$route.query.tag) {
                this.form.dynamicTags.push(this.$route.query.tag);
              }

              this.label = "Написати новелу";

              if (!this.$route.params.id) {
                _context.next = 19;
                break;
              }

              this.label = "Редагувати новелу";
              this.$store.commit("isLoading", true);
              this.isUpdate = true;
              _context.prev = 6;
              _context.next = 9;
              return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(_config__WEBPACK_IMPORTED_MODULE_2__["API_BASE_URL"] + "/v1/post/" + this.$route.params.id);

            case 9:
              response = _context.sent;
              this.form = response.data.data;
              this.editorPost.setContent(response.data.data.description);
              this.$store.commit("isLoading", false);
              this.setTags(response.data.data.tags);
              this.setFileList(response.data.data.file);
              _context.next = 19;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context["catch"](6);

            case 19:
              _context.prev = 19;
              _context.next = 22;
              return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(_config__WEBPACK_IMPORTED_MODULE_2__["API_BASE_URL"] + "/v1/catalog");

            case 22:
              _response = _context.sent;
              this.catalogs = _response.data.data;
              _context.next = 28;
              break;

            case 26:
              _context.prev = 26;
              _context.t1 = _context["catch"](19);

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[6, 17], [19, 26]]);
    }));

    function created() {
      return _created.apply(this, arguments);
    }

    return created;
  }(),
  watch: {
    $route: function $route(to, from) {
      if (!this.$route.params.id) {
        this.isUpdate = false;
        this.form.text = "";
        this.form.name = "";
      }
    }
  },
  methods: {
    onSubmit: function onSubmit() {
      this.$store.commit("isLoading", true);

      if (this.isUpdate) {
        this.updatePost();
      } else {
        this.createPost();
      }
    },
    beforeUpload: function beforeUpload(file) {
      if (file.size <= 2048 * 1000) {
        return true;
      }

      this.$message.warning("\u0424\u0430\u0439\u043B \u0431\u043E\u043B\u044C\u0448\u0435 2\u043C\u0431");
      return false;
    },
    createPost: function () {
      var _createPost = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.form.text = this.editorChapter.getHTML();
                this.form.description = this.editorPost.getHTML();
                this.$store.dispatch("post/add", this.form);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createPost() {
        return _createPost.apply(this, arguments);
      }

      return createPost;
    }(),
    updatePost: function () {
      var _updatePost = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.form.post_id = this.$route.params.id;
                this.form.description = this.editorPost.getHTML();
                this.$store.dispatch("post/update", this.form);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function updatePost() {
        return _updatePost.apply(this, arguments);
      }

      return updatePost;
    }(),
    handleClose: function handleClose(tag) {
      this.form.dynamicTags.splice(this.form.dynamicTags.indexOf(tag), 1);
    },
    showInput: function showInput() {
      var _this = this;

      this.inputVisible = true;
      this.$nextTick(function (_) {
        _this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm: function handleInputConfirm() {
      var inputValue = this.inputValue;

      if (inputValue) {
        this.form.dynamicTags.push(inputValue);
      }

      this.inputVisible = false;
      this.inputValue = "";
    },
    deleteFile: function () {
      var _deleteFile = _asyncToGenerator(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee4(file_id) {
        var _this2 = this;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                axios__WEBPACK_IMPORTED_MODULE_1___default.a["delete"](_config__WEBPACK_IMPORTED_MODULE_2__["API_BASE_URL"] + "/v1/file/" + file_id).then(function (response) {
                  _this2.$emit("completed", response.data.data);
                })["catch"](function (error) {});

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function deleteFile(_x) {
        return _deleteFile.apply(this, arguments);
      }

      return deleteFile;
    }(),
    handleFormError: function handleFormError(error) {
      if (error.response.data.errors.name) {
        this.errors.name = error.response.data.errors.name[0];
      }

      if (error.response.data.errors.catalog_id) {
        this.errors.catalog_id = error.response.data.errors.catalog_id[0];
      }

      if (error.response.data.errors.file_id) {
        this.errors.file_id = error.response.data.errors.file_id[0];
      }
    },
    setTags: function setTags(tags) {
      var _this3 = this;

      this.form.dynamicTags = [];
      tags.forEach(function (tag) {
        _this3.form.dynamicTags.push(tag.name);
      });
    },
    setFileList: function setFileList(file) {
      if (file) {
        this.fileList = [{
          id: file.id,
          name: file.path,
          url: _config__WEBPACK_IMPORTED_MODULE_2__["BASE_URL"] + file.path
        }];
        this.form.file_id = file.id;
      }
    },
    handleExceed: function handleExceed(files, fileList) {
      this.$message.warning("\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0435 \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u0456\u0439 \u0444\u0430\u0439\u043B");
    },
    handleRemove: function handleRemove(file) {
      console.log(file);
      this.deleteFile(file.id);
      this.$message.success("\u0412\u0438 \u0432\u0438\u0434\u0430\u043B\u0438\u043B\u0438 \u0444\u0430\u0439\u043B");
    },
    handleError: function handleError(responce) {
      console.log(responce);
      this.fileList = [];
      this.$message.warning("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u0430\u0439\u043B"); //this.handleFormError();
    },
    handleSuccess: function handleSuccess(response) {
      this.setFileList(response.data);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/PostFormComponents.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/PostFormComponents.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\np.is-editor-empty:first-child::before {\n  content: attr(data-empty-text);\n  float: left;\n  color: #aaa;\n  pointer-events: none;\n  height: 0;\n}\np.is-editor-empty:nth-child(2)::before {\n  content: attr(data-empty-text);\n  float: left;\n  color: #aaa;\n  pointer-events: none;\n  height: 0;\n}\n.el-tag + .el-tag {\n  margin-left: 10px;\n}\n.button-new-tag {\n  margin-left: 10px;\n  height: 32px;\n  line-height: 30px;\n  padding-top: 0;\n  padding-bottom: 0;\n}\n.input-new-tag {\n  width: 90px;\n  margin-left: 10px;\n  vertical-align: bottom;\n}\n.category-select {\n  text-align: initial;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/PostFormComponents.vue?vue&type=style&index=0&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/PostFormComponents.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./PostFormComponents.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/PostFormComponents.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/PostFormComponents.vue?vue&type=template&id=b678df36&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/PostFormComponents.vue?vue&type=template&id=b678df36& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
    "el-main",
    [
      _c("headerBack", { attrs: { label: _vm.label } }),
      _vm._v(" "),
      _c("div", { staticClass: "content-block", attrs: { id: "app" } }, [
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
            _c(
              "el-form",
              {
                ref: "form",
                attrs: { model: _vm.form, "label-width": "120px" }
              },
              [
                _c(
                  "div",
                  [
                    _c(
                      "el-form-item",
                      {
                        attrs: { error: _vm.errors.name, label: "Назва новели" }
                      },
                      [
                        _c("el-input", {
                          attrs: { placeholder: "Введіть назву новели" },
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
                    _c("el-form-item", { attrs: { label: "Короткий опис" } }, [
                      _c(
                        "div",
                        { staticClass: "edit" },
                        [
                          _c("editor-content", {
                            attrs: { editor: _vm.editorPost }
                          })
                        ],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "el-form-item",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.isUpdate === false,
                            expression: "isUpdate === false"
                          }
                        ],
                        attrs: { label: "Вміст" }
                      },
                      [
                        _c(
                          "div",
                          { staticClass: "edit-content" },
                          [
                            _c("editor-content", {
                              attrs: { editor: _vm.editorChapter }
                            })
                          ],
                          1
                        )
                      ]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "el-form-item",
                  [
                    _vm._l(_vm.form.dynamicTags, function(tag) {
                      return _c(
                        "el-tag",
                        {
                          key: tag,
                          attrs: { closable: "", "disable-transitions": false },
                          on: {
                            close: function($event) {
                              return _vm.handleClose(tag)
                            }
                          }
                        },
                        [_vm._v(_vm._s(tag))]
                      )
                    }),
                    _vm._v(" "),
                    _vm.inputVisible
                      ? _c("el-input", {
                          ref: "saveTagInput",
                          staticClass: "input-new-tag",
                          attrs: { size: "mini" },
                          on: { blur: _vm.handleInputConfirm },
                          nativeOn: {
                            keyup: function($event) {
                              if (
                                !$event.type.indexOf("key") &&
                                _vm._k(
                                  $event.keyCode,
                                  "enter",
                                  13,
                                  $event.key,
                                  "Enter"
                                )
                              ) {
                                return null
                              }
                              return _vm.handleInputConfirm($event)
                            }
                          },
                          model: {
                            value: _vm.inputValue,
                            callback: function($$v) {
                              _vm.inputValue = $$v
                            },
                            expression: "inputValue"
                          }
                        })
                      : _c(
                          "el-button",
                          {
                            staticClass: "button-new-tag",
                            attrs: { size: "small" },
                            on: { click: _vm.showInput }
                          },
                          [_vm._v("+ Додати тег")]
                        )
                  ],
                  2
                ),
                _vm._v(" "),
                _c(
                  "el-form-item",
                  [
                    _vm.isUpdate
                      ? _c(
                          "el-button",
                          {
                            attrs: { type: "primary" },
                            on: { click: _vm.onSubmit }
                          },
                          [_vm._v("Обновити")]
                        )
                      : _c(
                          "el-button",
                          {
                            attrs: { type: "primary" },
                            on: { click: _vm.onSubmit }
                          },
                          [_vm._v("Створити")]
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

/***/ "./resources/js/components/PostDesc.js":
/*!*********************************************!*\
  !*** ./resources/js/components/PostDesc.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PostDesc; });
/* harmony import */ var tiptap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tiptap */ "./node_modules/tiptap/dist/tiptap.esm.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var PostDesc =
/*#__PURE__*/
function (_Doc) {
  _inherits(PostDesc, _Doc);

  function PostDesc() {
    _classCallCheck(this, PostDesc);

    return _possibleConstructorReturn(this, _getPrototypeOf(PostDesc).apply(this, arguments));
  }

  _createClass(PostDesc, [{
    key: "schema",
    get: function get() {
      return {//content: 'title block+',
      };
    }
  }]);

  return PostDesc;
}(tiptap__WEBPACK_IMPORTED_MODULE_0__["Doc"]);



/***/ }),

/***/ "./resources/js/components/PostFormComponents.vue":
/*!********************************************************!*\
  !*** ./resources/js/components/PostFormComponents.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PostFormComponents_vue_vue_type_template_id_b678df36___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PostFormComponents.vue?vue&type=template&id=b678df36& */ "./resources/js/components/PostFormComponents.vue?vue&type=template&id=b678df36&");
/* harmony import */ var _PostFormComponents_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PostFormComponents.vue?vue&type=script&lang=js& */ "./resources/js/components/PostFormComponents.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _PostFormComponents_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PostFormComponents.vue?vue&type=style&index=0&lang=css& */ "./resources/js/components/PostFormComponents.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PostFormComponents_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PostFormComponents_vue_vue_type_template_id_b678df36___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PostFormComponents_vue_vue_type_template_id_b678df36___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/PostFormComponents.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/PostFormComponents.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/components/PostFormComponents.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PostFormComponents_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./PostFormComponents.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/PostFormComponents.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PostFormComponents_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/PostFormComponents.vue?vue&type=style&index=0&lang=css&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/components/PostFormComponents.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PostFormComponents_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--6-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--6-2!../../../node_modules/vue-loader/lib??vue-loader-options!./PostFormComponents.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/PostFormComponents.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PostFormComponents_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PostFormComponents_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PostFormComponents_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PostFormComponents_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PostFormComponents_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/components/PostFormComponents.vue?vue&type=template&id=b678df36&":
/*!***************************************************************************************!*\
  !*** ./resources/js/components/PostFormComponents.vue?vue&type=template&id=b678df36& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PostFormComponents_vue_vue_type_template_id_b678df36___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./PostFormComponents.vue?vue&type=template&id=b678df36& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/PostFormComponents.vue?vue&type=template&id=b678df36&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PostFormComponents_vue_vue_type_template_id_b678df36___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PostFormComponents_vue_vue_type_template_id_b678df36___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);