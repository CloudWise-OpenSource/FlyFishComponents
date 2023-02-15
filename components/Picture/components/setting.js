/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/screen/components/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/setting.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/setting.js":
/*!************************!*\
  !*** ./src/setting.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var datavi_editor_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! datavi-editor/adapter */ "datavi-editor/adapter");
/* harmony import */ var datavi_editor_adapter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(datavi_editor_adapter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_settings_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/settings/options */ "./src/settings/options.js");

/**
 * @description 注册CommonImage组件的设置面板
 */




Object(datavi_editor_adapter__WEBPACK_IMPORTED_MODULE_0__["registerComponentOptionsSetting"])('61aa27abd39bdf74f6d60142', 'v-current', _src_settings_options__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./src/settings/options.js":
/*!*********************************!*\
  !*** ./src/settings/options.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! datavi-editor/templates */ "datavi-editor/templates");
/* harmony import */ var datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @description
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */





var OptionsSetting = function (_ComponentOptionsSett) {
	_inherits(OptionsSetting, _ComponentOptionsSett);

	function OptionsSetting() {
		_classCallCheck(this, OptionsSetting);

		return _possibleConstructorReturn(this, (OptionsSetting.__proto__ || Object.getPrototypeOf(OptionsSetting)).apply(this, arguments));
	}

	_createClass(OptionsSetting, [{
		key: 'getTabs',
		value: function getTabs() {
			var _this2 = this;

			return {
				chart: {
					label: '图片',
					content: function content() {
						return _this2.renderText();
					}
				}
			};
		}
	}, {
		key: 'renderText',
		value: function renderText() {
			var _this3 = this,
			    _React$createElement2;

			var options = this.props.options;


			return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
				datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["Form"],
				null,
				react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
					datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["FormItemGroup"],
					{ title: '\u56FE\u7247' },
					react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
						datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["FormItem"],
						{ full: true },
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["UploadImage"], {
							src: options.image,
							onChange: function onChange(image) {
								return _this3.updateOptions({ image: image });
							}
						})
					),
					react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
						datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["FormItem"],
						{ label: '\u65B9\u5F0F', full: true },
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
							datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["RadioGroup"],
							{
								value: options.type,
								onChange: function onChange(event) {
									return _this3.updateOptions({ type: event.target.value });
								}
							},
							react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
								datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["Radio"],
								{ value: 'full' },
								'\u94FA\u6EE1'
							),
							react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
								datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["Radio"],
								{ value: 'contain' },
								'\u9002\u5E94'
							),
							react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
								datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["Radio"],
								{ value: 'repeat' },
								'\u586B\u5145'
							)
						)
					),
					react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
						datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["FormItem"],
						{ full: true, label: '\u5F00\u542F\u52A8\u753B' },
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["RadioBooleanGroup"], {
							value: options.animationSwitch,
							onChange: function onChange(event) {
								return _this3.updateOptions({ animationSwitch: event.target.value });
							}
						})
					),
					react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
						datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["FormItem"],
						{ label: '\u52A8\u753B\u540D\u79F0', full: true },
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
							datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["RadioGroup"],
							{
								value: options.animationName,
								onChange: function onChange(event) {
									return _this3.updateOptions({ animationName: event.target.value });
								}
							},
							react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
								datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["Radio"],
								{ value: 'scale' },
								'\u653E\u5927'
							),
							react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
								datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["Radio"],
								{ value: 'rotate' },
								'\u65CB\u8F6C'
							),
							react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
								datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["Radio"],
								{ value: 'breath' },
								'\u547C\u5438'
							)
						)
					),
					options.animationName && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
						datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["FormItem"],
						_defineProperty({ full: true, label: '\u52A8\u753B\u65F6\u957F' }, 'full', true),
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["InputNumber"], {
							style: { width: '100%' },
							value: options.animationDuration,
							placeholder: '\u8BF7\u8F93\u5165\u52A8\u753B\u65F6\u957F',
							min: 0,
							onChange: function onChange(animationDuration) {
								return _this3.updateOptions({ animationDuration: animationDuration });
							}
						})
					),
					options.animationName && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
						datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["FormItem"],
						(_React$createElement2 = {
							full: true,
							label: '\u52A8\u753B\u6B21\u6570'
						}, _defineProperty(_React$createElement2, 'full', true), _defineProperty(_React$createElement2, 'extra', '\u8F93\u5165-1\u8868\u793A\u91CD\u590D\u5FAA\u73AF\u65E0\u9650\u6B21'), _React$createElement2),
						react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["InputNumber"], {
							style: { width: '100%' },
							value: options.animationIterationCount,
							placeholder: '\u8BF7\u8F93\u5165\u52A8\u753B\u6B21\u6570',
							min: -1,
							onChange: function onChange(animationIterationCount) {
								return _this3.updateOptions({ animationIterationCount: animationIterationCount });
							}
						})
					)
				)
			);
		}
	}]);

	return OptionsSetting;
}(datavi_editor_templates__WEBPACK_IMPORTED_MODULE_2__["ComponentOptionsSetting"]);

OptionsSetting.propTypes = {
	options: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
	updateOptions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (OptionsSetting);

/***/ }),

/***/ "datavi-editor/adapter":
/*!**********************************!*\
  !*** external "dvEditorAdapter" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = dvEditorAdapter;

/***/ }),

/***/ "datavi-editor/templates":
/*!********************************************!*\
  !*** external "dvEditorAdapter.templates" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = dvEditorAdapter.templates;

/***/ }),

/***/ "prop-types":
/*!****************************!*\
  !*** external "PropTypes" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = PropTypes;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ })

/******/ });
//# sourceMappingURL=setting.js.map