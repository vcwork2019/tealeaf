/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/" + ({}[chunkId]||chunkId) + ".js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/ec/vehicle/!master/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_LoadingOverlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/LoadingOverlay */ \"./src/components/LoadingOverlay.vue\");\n/* harmony import */ var _components_NavigationDrawer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/NavigationDrawer */ \"./src/components/NavigationDrawer.vue\");\n/* harmony import */ var _components_Dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/Dialog */ \"./src/components/Dialog.vue\");\n/* harmony import */ var _components_AlertDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/AlertDialog */ \"./src/components/AlertDialog.vue\");\n/* harmony import */ var _components_icons_ArrowDown__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/icons/ArrowDown */ \"./src/components/icons/ArrowDown.vue\");\n/* harmony import */ var _components_icons_ArrowUp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/icons/ArrowUp */ \"./src/components/icons/ArrowUp.vue\");\n/* harmony import */ var _components_Idle__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/Idle */ \"./src/components/Idle.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  components: {\n    Idle: _components_Idle__WEBPACK_IMPORTED_MODULE_6__[\"default\"],\n    IconArrowUp: _components_icons_ArrowUp__WEBPACK_IMPORTED_MODULE_5__[\"default\"],\n    IconArrowDown: _components_icons_ArrowDown__WEBPACK_IMPORTED_MODULE_4__[\"default\"],\n    AlertDialog: _components_AlertDialog__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n    Dialog: _components_Dialog__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n    NavigationDrawer: _components_NavigationDrawer__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    LoadingOverlay: _components_LoadingOverlay__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n  // metaInfo: {\n  //     title: '��僐�𡄯蕭',\n  //     // titleTemplate: '%s | 嚙賡做�麯���身祇�蟡�蝯脤�萘�櫉予𠬍蕭暻�',\n  //     titleTemplate: '�亚撣页蕭藀�頣蕭�𢬢嚙質�脫���𦷜��暻� - 嚙賡做�麯���身祇�蟡�蝯脤�萘�櫉予𠬍蕭暻穿蕭��滩艔',\n  //     meta: [\n  //         {\n  //             name: 'description',\n  //             content: '�亚撣页蕭藀�頣蕭�𢬢嚙質�脫���𦷜糂湔𤨎嚙踝蕭嚙賡漪嚙踝蕭 ��𦷜��暻穿蕭嚙賜�躰釭嚙踢覔綽蕭�緾暻穿蕭嚙質�𡁶�䕘蕭��𤑳�𢠃�鮋�暻祈�穃緵嚙踢糂湛蕭�遆嚙賡嚿�緾嚙賡迚嚙賢�𤏪蕭�踝蕭嚙質蓡嚙踝蕭��𩤃蕭嚙踢予𠬍蕭暻穿蕭��滩艔��梹蕭�蓡��䁅�賭�𦠜�峕�嚙踝蕭嚙賜�辷蕭嚙質�堆蕭撅賂蕭鞊ｇ蕭嚙踝蕭�𤣰嚙賢緾暻祇鰵銵�蕭藂�頣蕭嚙賡�𦷜��暻祇鰵銵�蕭璇對蕭撜閖�偦�𧼮鱓嚙踝蕭蟡伐蕭嚙踝蕭�賭皎�𤜯皛剁蕭嚙踝蕭��辷蕭嚙踝蕭'\n  //         },\n  //         {\n  //             property: 'og:image',\n  //             content: 'https://www.tmnewa.com.tw/img/logo.b33522cc.png'\n  //         },\n  //         {\n  //             property: 'og:title',\n  //             content: '�亚撣页蕭藀�頣蕭�𢬢嚙質�脫���𦷜��暻� - 嚙賡做�麯���身祇�蟡�蝯脤�萘�櫉予𠬍蕭暻穿蕭��滩艔',\n  //             // template: chunk => `${chunk} | 嚙賡做�麯���身祇�蟡�蝯脤�萘�櫉予𠬍蕭暻柄\n  //         },\n  //         {\n  //             property: 'og:description',\n  //             content: '�亚撣页蕭藀�頣蕭�𢬢嚙質�脫���𦷜糂湔𤨎嚙踝蕭嚙賡漪嚙踝蕭 ��𦷜��暻穿蕭嚙賜�躰釭嚙踢覔綽蕭�緾暻穿蕭嚙質�𡁶�䕘蕭��𤑳�𢠃�鮋�暻祈�穃緵嚙踢糂湛蕭�遆嚙賡嚿�緾嚙賡迚嚙賢�𤏪蕭�踝蕭嚙質蓡嚙踝蕭��𩤃蕭嚙踢予𠬍蕭暻穿蕭��滩艔��梹蕭�蓡��䁅�賭�𦠜�峕�嚙踝蕭嚙賜�辷蕭嚙質�堆蕭撅賂蕭鞊ｇ蕭嚙踝蕭�𤣰嚙賢緾暻祇鰵銵�蕭藂�頣蕭嚙賡�𦷜��暻祇鰵銵�蕭璇對蕭撜閖�偦�𧼮鱓嚙踝蕭蟡伐蕭嚙踝蕭�賭皎�𤜯皛剁蕭嚙踝蕭��辷蕭嚙踝蕭'\n  //         },\n  //     ]\n  // },\n  data: function data() {\n    return {\n      debugPanel: \"false\" === 'true'\n    };\n  },\n  mounted: function mounted() {\n    this.$store.commit('policy/setActivityCodeLock', this.$route.query.ActivityCode || null);\n    this.$store.commit('policy/setCorp', this.$route.query.iChannels || null);\n\n    if (this.$store.getters['auth/loggedIn']) {\n      this.$auth.tokenCountdown();\n      this.$idle.start();\n    }\n\n    if (false) {} // �輯�𣂼�折�嗱坎脖皎 debug panel\n\n    if (true) console.log('VERSION: 2023-07-15 09:50'); // �輯�𣂼�改蕭嚙踝蕭藃㜃嚙踝蕭嚙賭盒 console\n  },\n  methods: {}\n});\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/AlertDialog.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AlertDialog.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/Dialog */ \"./src/components/Dialog.vue\");\n/* harmony import */ var _components_icons_AlertCircle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/icons/AlertCircle */ \"./src/components/icons/AlertCircle.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n/**\r\n *  �訜嚙賣革�愇艞�㚁蕭嚙�-��嘅蕭嚙踝蕭蒟�嚙踢�頣蕭嚙踝蕭��㗛�舘𣲷��𩼣\n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'AlertDialog',\n  components: {\n    IconAlertCircle: _components_icons_AlertCircle__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    Dialog: _components_Dialog__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n  computed: {\n    /**\r\n     * �𤜯頛駁� DOMPurify ��𩤃蕭嚙賢鯏嚙賭漲嚙� html 嚙質�堆蕭嚙踝蕭藀��鷄嚙踝蕭��頣蕭嚙踝蕭��堒掘靽���蕭 XSS 嚙踢井�蕭嚙質嗾r\n     *\r\n     * @returns {String} 嚙踝蕭藃戮嚙賢𦆮嚙賡鑘嚙踝蕭臐�𠺪蕭 HTML �䴴藀��鷄\r\n     * @public\r\n     */\n    cleanHtml: function cleanHtml() {\n      return DOMPurify.sanitize(this.$store.state.dialog.text);\n    }\n  },\n  methods: {\n    /**\r\n     *  嚙踝蕭艞�嚙賢爀嚙踝蕭甇脤愇艞�㚁蕭�𨘻r\n     * \r\n     *  @public\r\n     */\n    onClick: function onClick() {\n      this.$store.state.dialog.closeFunc();\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/AlertDialog.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Dialog.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Dialog.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_icons_Close__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/icons/Close */ \"./src/components/icons/Close.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/**\r\n *  嚙賡�嚙賭盒�訜嚙賣革�愇艞�㚁蕭��吔蕭嚙賣�嚙踢�㜃�𡟵��㚁蕭憿蛛蕭撜閗�𧢲�䁅版�蓡嚙踝蕭嚙踝蕭 FIGMA 嚙踝蕭 3.2.1��梹蕭���揢撜𤏪蕭瘥綽蕭嚙踝蕭撜𤏪蕭藃３嚙賣笑嚙踝蕭嚙踢��嚙質都蝟橒蕭嚙賢緵嚙賡𤭮嚙賜�瞍莎蕭嚙賡愇艞�㚁蕭璇對蕭隢對蕭撜閗黇嚙賭�𦠜侢��嚙踢��嚙踢予綽蕭�𩣪�酑嚙踝蕭嚙賣���堒�堒�閗縐 component ��肽﹝��嚙賭盒嚙賢𤥃嚙賜�页蕭嚙賣革�愇艞�㚁蕭嚙� component 嚙踝蕭嚙賣��𣲷蝚𡅈\n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Dialog',\n  components: {\n    IconClose: _components_icons_Close__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n  props: {\n    /**\r\n     * �訜嚙賣革�愇艞�㚁蕭���蕭�甅嚙踢��蓤\n     */\n    title: {\n      type: String,\n      default: ''\n    },\n\n    /**\r\n     * 嚙賦瑪嚙踢�橘蕭蝟橒蕭�𧶏蕭嚙賣訜嚙賣革�愇艞�㚁蕭�橘蕭艞�嚙賬��蕭�緵嚙踢�鱏r\n     */\n    showCloseButton: {\n      type: Boolean,\n      default: false\n    },\n\n    /**\r\n     * 嚙賦瑪嚙踢�橘蕭蝟橒蕭�𧶏蕭嚙賣訜嚙賣革�愇艞�㚁蕭���蕭�甅嚙賭𤣰嚙踢坎脖皎嚙踝蕭嚙踝蕭���𨥈蕭鋮皴\n     */\n    showHeaderDivider: {\n      type: Boolean,\n      default: false\n    }\n  },\n  mounted: function mounted() {\n    // �𤜯嚙� body 嚙踝蕭��嘥�𩤃蕭嚙賣鸌���𧨾嚙賜��撓�嘅蕭嚙踢�蘨嚙踝蕭嚙踝蕭甇脤愇艞�㚁蕭�橘�𡃏𣲷蝞賂蕭��堒掘靽���撰��辷蕭��嚙踝蕭嚙踢�鳴蕭�𩣪�嘅蕭嚙賡�梹蕭撜閗黇嚙踝蕭嚙踢�兛嚙賭倌嚙賡�罸𤀻嚙踝蕭嚙踝蕭朣輸做嚙賬酑嚙踝蕭\n    document.body.classList.add('overflow-hidden');\n  },\n  beforeDestroy: function beforeDestroy() {\n    // �𤜯嚙� body 嚙踝蕭��嘥�𩤃蕭嚙賣鸌��嚙踝蕭�鱓��偦�嘅蕭嚙踢�鱏n    document.body.classList.remove('overflow-hidden');\n  },\n  methods: {\n    /**\r\n     *  嚙踝蕭艞�嚙賢爀嚙踝蕭甇脤愇艞�㚁蕭�𨘻r\n     * \r\n     *  @public\r\n     */\n    onClickCloseButton: function onClickCloseButton() {\n      /**\r\n       *  嚙踝蕭艞�嚙賢爀嚙踝蕭甇脤愇艞�㚁蕭�𨘻r\n       */\n      this.$emit('close');\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/Dialog.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Idle.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Idle.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/Dialog */ \"./src/components/Dialog.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/**\r\n *  �訜嚙賣革�愇艞�㚁蕭嚙�-��痹蕭嚙踝蕭嚙質��蕭��\r\n */\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'Idle',\n  components: {\n    Dialog: _components_Dialog__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n  computed: {\n    /**\r\n     * 嚙賡�嚙賭盒嚙踝蕭藃戮嚙踝蕭 .env �鱓��吔蕭臐�塚蕭嚙質��蕭鈭歹蕭嚙踝蕭�泗\n     * \r\n     * @returns .env �鱓��吔蕭臐�塚蕭嚙質��蕭鈭歹蕭嚙踝蕭�泗\n     */\n    promptTimeout: function promptTimeout() {\n      return \"480\";\n    },\n\n    /**\r\n     * 嚙賡�嚙賭盒嚙踝蕭�𤭮嚙賢�滩��蕭鈭辷蕭嚙踝蕭����嚙踢��琜蕭撜𤏪蕭嚙賭�𠺪蕭嚙賡鑘���蕭��\r\n     * \r\n     * @returns Vuex store ��嘥�吔蕭��蕭�辺嚙� idle 嚙踝蕭嚙踝蕭�泗\n     */\n    // @returns Vuex store ��嘥�吔蕭��蕭�辺嚙� idle 嚙踝蕭嚙踝蕭�泄    timeout: function timeout() {\n      return this.$store.state.idle.timeout;\n    }\n  },\n  methods: {\n    /**\r\n     * ��𨀣�𨥈蕭�𤣰嚙質�莎蕭嚙質��蕭嚙踝蕭嚙踝蕭�毒\n     * \r\n     * @public\r\n     */\n    onClose: function onClose() {\n      this.$idle.start();\n    },\n\n    /**\r\n     * 嚙質��蕭��\r\n     * \r\n     * @public\r\n     */\n    onClickLogout: function onClickLogout() {\n      this.$auth.logout();\n      this.$idle.stop();\n    }\n  }\n});\n\n//# sourceURL=webpack:///./src/components/Idle.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LoadingOverlay.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LoadingOverlay.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/**\r\n * Loading...���蕭嚙賢�䈑蕭�𦆮��㯄�嘥𢹸嚙質姘嚙質���㚁蕭嚙賡蝙�酑嚙踝蕭��𡄯蕭艞�嚙賢焵�𤀻嚙踝蕭\r\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'LoadingOverlay'\n});\n\n//# sourceURL=webpack:///./src/components/LoadingOverlay.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/NavigationDrawer.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/NavigationDrawer.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var _components_icons_Close__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/components/icons/Close */ \"./src/components/icons/Close.vue\");\n/* harmony import */ var _components_icons_ChevronUp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/components/icons/ChevronUp */ \"./src/components/icons/ChevronUp.vue\");\n/* harmony import */ var _components_icons_ChevronDown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/icons/ChevronDown */ \"./src/components/icons/ChevronDown.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'NavigationDrawer',\n  components: {\n    IconChevronUp: _components_icons_ChevronUp__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n    IconClose: _components_icons_Close__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    IconChevronDown: _components_icons_ChevronDown__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n  },\n  props: {\n    isOpen: {\n      type: Boolean,\n      default: false\n    }\n  },\n  data: function data() {\n    return {\n      accordion: null\n    };\n  },\n  computed: {\n    appUrl: function appUrl() {\n      return \"https://b2cweb-test.tmnewa.com.tw\";\n    }\n  },\n  watch: {\n    isOpen: {\n      immediate: true,\n      handler: function handler(isOpen) {\n        if (process.client) {\n          if (isOpen) document.body.style.setProperty('overflow', 'hidden');else document.body.style.removeProperty('overflow');\n        }\n      }\n    }\n  },\n  methods: {\n    accordionToggle: function accordionToggle(name) {\n      this.accordion === name ? this.accordion = null : this.accordion = name;\n    },\n    logout: function logout() {\n      var _this = this;\n\n      this.$store.commit('showLoading');\n      this.$store.commit('navigationDrawerClose');\n      this.$auth.logout();\n      this.$idle.stop();\n      setTimeout(function () {\n        _this.$store.commit('closeLoading');\n\n        _this.$store.commit('setDialog', {\n          type: 'info',\n          text: '��諹�抵��蕭��',\n          active: true\n        });\n      }, 500);\n    },\n    submenuClass: function submenuClass(name) {\n      return this.accordion === name ? 'h-auto pt-4' : '';\n    }\n  }\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/node-libs-browser/mock/process.js */ \"./node_modules/node-libs-browser/mock/process.js\")))\n\n//# sourceURL=webpack:///./src/components/NavigationDrawer.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/icons/AlertCircle.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/AlertCircle.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/**\r\n * icon-嚙踝蕭��讛�行𪂹��吔蕭臐�頣蕭嚙踝蕭擃穋\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'IconAlertCircle'\n});\n\n//# sourceURL=webpack:///./src/components/icons/AlertCircle.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/icons/ArrowDown.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/ArrowDown.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/**\r\n * icon-��腈�𡢅蕭�㩋�西�𧼮�嘅蕭嚙踝蕭�𨮙嚙質�毒\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'IconArrowDown'\n});\n\n//# sourceURL=webpack:///./src/components/icons/ArrowDown.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/icons/ArrowUp.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/ArrowUp.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/**\r\n * icon-��腈�𡢅蕭�㩋�西�𧼮�嘅蕭嚙踝蕭�𨮙嚙質嗾r\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'IconArrowUp'\n});\n\n//# sourceURL=webpack:///./src/components/icons/ArrowUp.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/icons/ChevronDown.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/ChevronDown.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/**\r\n * icon-�亚臐�𧶏蕭��䀹�䕘蕭嚙踝蕭嚙賜𨮙嚙質�毒\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'IconChevronDown'\n});\n\n//# sourceURL=webpack:///./src/components/icons/ChevronDown.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/icons/ChevronUp.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/ChevronUp.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/**\r\n * icon-�亚臐�𧶏蕭��䀹�䕘蕭嚙踝蕭嚙賜𨮙嚙質�毒\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'IconChevronUp'\n});\n\n//# sourceURL=webpack:///./src/components/icons/ChevronUp.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/icons/Close.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/Close.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n/**\r\n * icon-嚙踝蕭�爀嚙賢鸌嚙踝蕭嚙踝蕭艞�嚙賢ㄟr\n */\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'IconClose'\n});\n\n//# sourceURL=webpack:///./src/components/icons/Close.vue?./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"6e819af0-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/App.vue?vue&type=template&id=7ba5bd90&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6e819af0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/App.vue?vue&type=template&id=7ba5bd90& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { attrs: { id: \"app\" } },\n    [\n      _vm.$store.state.header\n        ? _c(\"router-view\", { attrs: { name: \"header\" } })\n        : _vm._e(),\n      _c(\"NavigationDrawer\", {\n        attrs: { \"is-open\": _vm.$store.state.navigationDrawer.isActive }\n      }),\n      _c(\"RouterView\"),\n      _vm.$store.state.loading ? _c(\"LoadingOverlay\") : _vm._e(),\n      _vm.$store.state.idle.isPrompted ? _c(\"Idle\") : _vm._e(),\n      _vm.$store.state.showTimeoutAlert\n        ? _c(\n            \"Dialog\",\n            {\n              attrs: {\n                title: \"��痹蕭嚙踝蕭嚙質��蕭��嚙踝蕭�𤭮嚙踢旭�",\n                \"show-close-button\": true,\n                \"show-header-divider\": true\n              },\n              on: {\n                close: function($event) {\n                  return _vm.$store.commit(\"clearTimeout\")\n                }\n              }\n            },\n            [\n              _c(\"div\", { staticClass: \"text-center py-4\" }, [\n                _vm._v(\" �噐��嚙賡蝙敿蛛蕭���蕭嚙� \")\n              ])\n            ]\n          )\n        : _vm._e(),\n      _c(\"AlertDialog\"),\n      _vm.debugPanel\n        ? _c(\"div\", { staticClass: \"fixed bottom-0 w-full z-50\" }, [\n            _c(\"div\", { staticClass: \"flex justify-end\" }, [\n              _vm.$store.state.debug.panel\n                ? _c(\n                    \"div\",\n                    {\n                      staticClass: \"w-8 text-white bg-gray-800 p-2\",\n                      on: {\n                        click: function($event) {\n                          return _vm.$store.commit(\"debug/closePanel\")\n                        }\n                      }\n                    },\n                    [_c(\"IconArrowDown\")],\n                    1\n                  )\n                : _c(\n                    \"div\",\n                    {\n                      staticClass: \"w-8 text-white bg-gray-800 p-2\",\n                      on: {\n                        click: function($event) {\n                          return _vm.$store.commit(\"debug/showPanel\")\n                        }\n                      }\n                    },\n                    [_c(\"IconArrowUp\")],\n                    1\n                  )\n            ]),\n            _c(\"div\", { class: { hidden: !_vm.$store.state.debug.panel } }, [\n              _c(\"div\", { staticClass: \"flex text-sm\" }, [\n                _c(\"div\", { staticClass: \"p-2 bg-yellow\" }, [\n                  _vm._v(\" SessionID: \"),\n                  _c(\"strong\", [\n                    _vm._v(_vm._s(_vm.$store.state.debug.sessionId))\n                  ])\n                ]),\n                _c(\"div\", { staticClass: \"bg-green-600 flex-1\" }, [\n                  _vm.$store.getters[\"auth/loggedIn\"]\n                    ? _c(\"div\", { staticClass: \"flex\" }, [\n                        _c(\"div\", { staticClass: \"flex p-2\" }, [\n                          _c(\"div\", [\n                            _vm._v(\" JWT \"),\n                            _c(\"strong\", [\n                              _vm._v(_vm._s(_vm.$store.state.auth.jwtExpireSec))\n                            ]),\n                            _vm._v(\" sec\")\n                          ]),\n                          _c(\"div\", { staticClass: \"ml-4\" }, [\n                            _vm._v(\" REFRESH \"),\n                            _c(\"strong\", [\n                              _vm._v(\n                                _vm._s(\n                                  _vm.$store.state.auth.refreshTokenExpireSec\n                                )\n                              )\n                            ]),\n                            _vm._v(\" sec \")\n                          ])\n                        ]),\n                        _c(\n                          \"div\",\n                          { staticClass: \"flex-1 flex ml-4 bg-pink-800 p-2\" },\n                          [\n                            _c(\"div\", [\n                              _vm._v(\" IDLE \"),\n                              _c(\"strong\", [\n                                _vm._v(\n                                  _vm._s(_vm.$store.state.idle.idleTimeout)\n                                )\n                              ])\n                            ]),\n                            _c(\"div\", { staticClass: \"ml-4\" }, [\n                              _vm._v(\" TIMEOUT \"),\n                              _c(\"strong\", [\n                                _vm._v(_vm._s(_vm.$store.state.idle.timeout))\n                              ])\n                            ])\n                          ]\n                        )\n                      ])\n                    : _c(\"div\", { staticClass: \"p-2\" }, [_vm._v(\" 嚙踢��页蕭���蕭嚙� \")])\n                ])\n              ])\n            ])\n          ])\n        : _vm._e()\n    ],\n    1\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/App.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%226e819af0-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"6e819af0-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/AlertDialog.vue?vue&type=template&id=6aa5b9c4&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6e819af0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/AlertDialog.vue?vue&type=template&id=6aa5b9c4& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _vm.$store.state.dialog.active\n    ? _c(\n        \"Dialog\",\n        {\n          attrs: {\n            \"show-header-divider\": true,\n            \"show-close-button\": _vm.$store.state.dialog.showCloseButton,\n            title: _vm.$store.state.dialog.title\n          },\n          on: { close: _vm.onClick }\n        },\n        [\n          _c(\n            \"div\",\n            {\n              staticClass:\n                \"flex flex-col justify-center items-center mt-12 mb-12 px-10\"\n            },\n            [\n              _vm.$store.state.dialog.type === \"warning\"\n                ? _c(\n                    \"div\",\n                    { staticClass: \"w-32\" },\n                    [\n                      _c(\"IconAlertCircle\", {\n                        staticClass: \"text-red-700 mt-4\"\n                      })\n                    ],\n                    1\n                  )\n                : _vm._e(),\n              _c(\"div\", {\n                staticClass: \"mt-8 text-center w-full break-words\",\n                domProps: { innerHTML: _vm._s(_vm.cleanHtml) }\n              }),\n              _c(\"div\", { staticClass: \"mt-16 xl:space-x-4 xl:flex\" }, [\n                _c(\n                  \"button\",\n                  {\n                    staticClass:\n                      \"rounded-md w-48 p-2 text-white border bg-yellow xl:py-3\",\n                    attrs: { type: \"button\" },\n                    on: { click: _vm.onClick }\n                  },\n                  [\n                    _vm._v(\n                      \" \" +\n                        _vm._s(_vm.$store.state.dialog.confirmButtonText) +\n                        \" \"\n                    )\n                  ]\n                )\n              ])\n            ]\n          )\n        ]\n      )\n    : _vm._e()\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/AlertDialog.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%226e819af0-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"6e819af0-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Dialog.vue?vue&type=template&id=cd1e8110&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6e819af0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Dialog.vue?vue&type=template&id=cd1e8110& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    {\n      staticClass: \"fixed z-50 inset-0 overflow-y-auto\",\n      attrs: {\n        \"aria-labelledby\": \"modal-title\",\n        role: \"dialog\",\n        \"aria-modal\": \"true\"\n      }\n    },\n    [\n      _c(\n        \"div\",\n        {\n          staticClass:\n            \"flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0\"\n        },\n        [\n          _c(\"div\", {\n            staticClass:\n              \"fixed inset-0 bg-black bg-opacity-80 transition-opacity\",\n            attrs: { \"aria-hidden\": \"true\" }\n          }),\n          _c(\n            \"span\",\n            {\n              staticClass: \"hidden sm:inline-block sm:align-middle sm:h-screen\",\n              attrs: { \"aria-hidden\": \"true\" }\n            },\n            [_vm._v(\"嚙質��")]\n          ),\n          _c(\n            \"div\",\n            {\n              staticClass:\n                \"inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full\"\n            },\n            [\n              _c(\"div\", { staticClass: \"bg-white pb-4 sm:py-6 sm:pb-4\" }, [\n                _c(\"div\", [\n                  _c(\n                    \"div\",\n                    { staticClass: \"mt-3 text-center sm:mt-0 sm:text-left\" },\n                    [\n                      _c(\n                        \"div\",\n                        {\n                          staticClass: \"flex pb-3\",\n                          class: {\n                            \"border-gray-300 border-b\": _vm.showHeaderDivider\n                          }\n                        },\n                        [\n                          _c(\"div\", { staticClass: \"flex-1 ml-4 sm:pb-2\" }, [\n                            _c(\n                              \"h3\",\n                              {\n                                staticClass:\n                                  \"text-xl leading-6 font-medium text-gray-900 text-center\"\n                              },\n                              [_vm._v(\" \" + _vm._s(_vm.title) + \" \")]\n                            )\n                          ]),\n                          _vm.showCloseButton\n                            ? _c(\"div\", { staticClass: \"mr-4\" }, [\n                                _c(\n                                  \"button\",\n                                  {\n                                    staticClass:\n                                      \"transition duration-500 transform hover:rotate-180 w-4 h-4\",\n                                    on: { click: _vm.onClickCloseButton }\n                                  },\n                                  [\n                                    _c(\"IconClose\", {\n                                      staticClass: \"text-gray-900\"\n                                    })\n                                  ],\n                                  1\n                                )\n                              ])\n                            : _vm._e()\n                        ]\n                      ),\n                      _c(\n                        \"div\",\n                        { staticClass: \"mt-2 px-4\" },\n                        [_vm._t(\"default\")],\n                        2\n                      )\n                    ]\n                  )\n                ])\n              ])\n            ]\n          )\n        ]\n      )\n    ]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/Dialog.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%226e819af0-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"6e819af0-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/Idle.vue?vue&type=template&id=4d383bf8&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6e819af0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Idle.vue?vue&type=template&id=4d383bf8& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"Dialog\",\n    {\n      attrs: {\n        title: \"��痹蕭嚙踝蕭嚙質��蕭��嚙踝蕭�𤭮嚙踢旭�",\n        \"show-close-button\": false,\n        \"show-header-divider\": true\n      },\n      on: { close: _vm.onClose }\n    },\n    [\n      _c(\"div\", { staticClass: \"text-center py-4\" }, [\n        _c(\"div\", [\n          _vm._v(\"嚙賢�豢���痹蕭嚙踝蕭 \" + _vm._s(_vm.promptTimeout / 60) + \"嚙踝蕭嚙踝蕭�對蕭��嘅蕭���蕭皛ｇ蕭���")\n        ]),\n        _c(\"div\", [_vm._v(_vm._s(_vm.timeout) + \" ��㗛㩋嚙質姘��𠺪蕭嚙賡鑘���蕭��\")])\n      ]),\n      _c(\"div\", { staticClass: \"py-4 flex flex-col items-center\" }, [\n        _c(\n          \"button\",\n          {\n            staticClass:\n              \"rounded-md w-48 p-2 text-white border bg-yellow xl:py-3\",\n            attrs: { type: \"button\" },\n            on: { click: _vm.onClose }\n          },\n          [_vm._v(\" �嚿�莎蕭嚙質��蕭嚙� \")]\n        ),\n        _c(\n          \"div\",\n          {\n            staticClass: \"text-yellow mt-4 cursor-pointer\",\n            on: { click: _vm.onClickLogout }\n          },\n          [_vm._v(\" �辺閫���吔蕭���蕭�� \")]\n        )\n      ])\n    ]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/Idle.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%226e819af0-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"6e819af0-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/LoadingOverlay.vue?vue&type=template&id=681413a4&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6e819af0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LoadingOverlay.vue?vue&type=template&id=681413a4& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _vm._m(0)\n}\nvar staticRenderFns = [\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\n      \"div\",\n      {\n        staticClass:\n          \"fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center\"\n      },\n      [\n        _c(\"div\", {\n          staticClass:\n            \"loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4\"\n        }),\n        _c(\n          \"h2\",\n          { staticClass: \"text-center text-white text-sm font-semibold\" },\n          [_vm._v(\" Loading... \")]\n        ),\n        _c(\"p\", { staticClass: \"w-1/3 text-center text-white\" }, [\n          _vm._v(\" ���蕭嚙賢�䈑蕭�𦆮��㯄�嘥𢹸嚙質姘嚙質���㚁蕭嚙賡蝙�酑嚙踝蕭��𡄯蕭艞�嚙賢焵�𤀻嚙踝蕭 \")\n        ])\n      ]\n    )\n  }\n]\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/LoadingOverlay.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%226e819af0-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"6e819af0-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/NavigationDrawer.vue?vue&type=template&id=39a10456&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6e819af0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/NavigationDrawer.vue?vue&type=template&id=39a10456& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"aside\",\n    {\n      staticClass:\n        \"transform top-0 left-0 w-full bg-white fixed h-full overflow-auto ease-in-out transition-all duration-500 z-40 px-4 pt-10 pb-4 xl:hidden\",\n      class: _vm.isOpen ? \"translate-x-0\" : \"-translate-x-full\"\n    },\n    [\n      _c(\"div\", { staticClass: \"flex justify-end\" }, [\n        _c(\n          \"button\",\n          {\n            staticClass:\n              \"transition duration-500 transform hover:rotate-90 w-8 h-8\",\n            on: {\n              click: function($event) {\n                return _vm.$store.commit(\"navigationDrawerClose\")\n              }\n            }\n          },\n          [_c(\"IconClose\", { staticClass: \"text-gray-900\" })],\n          1\n        )\n      ]),\n      _c(\"div\", { staticClass: \"mt-6 text-lg text-gray\" }, [\n        _c(\"div\", { staticClass: \"px-8\" }, [\n          _vm._m(0),\n          _c(\n            \"div\",\n            { staticClass: \"py-4\" },\n            [\n              _c(\"router-link\", { attrs: { to: \"/car/faq\" } }, [\n                _vm._v(\" �侢鞎㚁蕭閫�嚙質狗嚙踝蕭 Q&A \")\n              ])\n            ],\n            1\n          ),\n          _c(\"div\", { staticClass: \"py-4\" }, [\n            _c(\n              \"div\",\n              {\n                staticClass: \"flex justify-between\",\n                on: {\n                  click: function($event) {\n                    return _vm.accordionToggle(\"upload\")\n                  }\n                }\n              },\n              [\n                _c(\"div\", [_vm._v(\"嚙踝蕭嚙質麾��肽�嘅蕭憯�")]),\n                _c(\n                  \"button\",\n                  [\n                    _c(\n                      _vm.accordion === \"upload\"\n                        ? \"IconChevronUp\"\n                        : \"IconChevronDown\",\n                      { tag: \"component\", staticClass: \"w-4 h-4\" }\n                    )\n                  ],\n                  1\n                )\n              ]\n            ),\n            _c(\n              \"div\",\n              {\n                staticClass:\n                  \"transition-all pl-6 box-border h-0 overflow-hidden\",\n                class: _vm.submenuClass(\"upload\")\n              },\n              [_vm._m(1), _vm._m(2)]\n            )\n          ]),\n          _c(\"div\", { staticClass: \"py-4\" }, [\n            _c(\n              \"div\",\n              {\n                staticClass: \"flex justify-between\",\n                on: {\n                  click: function($event) {\n                    return _vm.accordionToggle(\"service\")\n                  }\n                }\n              },\n              [\n                _c(\"div\", [_vm._v(\"�嚿�坾敼橒蕭嚙賣�𡄯蕭蝟�")]),\n                _c(\n                  \"button\",\n                  [\n                    _c(\n                      _vm.accordion === \"service\"\n                        ? \"IconChevronUp\"\n                        : \"IconChevronDown\",\n                      { tag: \"component\", staticClass: \"w-4 h-4\" }\n                    )\n                  ],\n                  1\n                )\n              ]\n            ),\n            _c(\n              \"div\",\n              {\n                staticClass:\n                  \"transition-all pl-6 box-border h-0 overflow-hidden\",\n                class: _vm.submenuClass(\"service\")\n              },\n              [\n                _vm._m(3),\n                _c(\n                  \"div\",\n                  { staticClass: \"py-4\" },\n                  [\n                    _c(\"router-link\", { attrs: { to: \"/car/lookup\" } }, [\n                      _vm._v(\" �嚿�坾敼橒蕭銊駁鰵嚙�/嚙賬滬嚙踝蕭嚙� \")\n                    ])\n                  ],\n                  1\n                ),\n                _c(\n                  \"div\",\n                  { staticClass: \"py-4\" },\n                  [\n                    _c(\"router-link\", { attrs: { to: \"/car/renewal\" } }, [\n                      _vm._v(\" �䔉�𤣰嚙質�䁅��蕭嚙� \")\n                    ])\n                  ],\n                  1\n                )\n              ]\n            )\n          ])\n        ]),\n        _c(\"hr\", { staticClass: \"my-4 mx-6 border-gray-300\" }),\n        _c(\"div\", { staticClass: \"px-8\" }, [\n          _c(\n            \"div\",\n            { staticClass: \"py-4 text-green-800 cursor-pointer\" },\n            [\n              _vm.$store.getters[\"auth/loggedIn\"]\n                ? _c(\"div\", { on: { click: _vm.logout } }, [_vm._v(\" 嚙質��蕭�� \")])\n                : _c(\n                    \"router-link\",\n                    {\n                      attrs: {\n                        to: {\n                          name: \"Login\",\n                          params: { to: _vm.$route, from: _vm.$route }\n                        }\n                      }\n                    },\n                    [_vm._v(\" 嚙質��蕭鈭仿�㚁蕭嚙� \")]\n                  )\n            ],\n            1\n          ),\n          _vm._m(4)\n        ])\n      ])\n    ]\n  )\n}\nvar staticRenderFns = [\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"div\", { staticClass: \"py-4\" }, [\n      _c(\n        \"a\",\n        {\n          attrs: {\n            href: \"https://www.tmnewa.com.tw/product/intro/1\",\n            target: \"_blank\"\n          }\n        },\n        [_vm._v(\"嚙踝蕭嚙踝蕭�鶽�𧦠嚙賜��")]\n      )\n    ])\n  },\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"div\", { staticClass: \"py-4\" }, [\n      _c(\n        \"a\",\n        {\n          attrs: {\n            href:\n              \"https://www.tmnewa.com.tw/b2c_v2/frontstage/certificatequery.aspx\",\n            target: \"_blank\"\n          }\n        },\n        [_vm._v(\"嚙踢��𡝗䴴艞�潘蕭隤拇𤨎嚙踝蕭��憯�")]\n      )\n    ])\n  },\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"div\", { staticClass: \"py-4\" }, [\n      _c(\n        \"a\",\n        {\n          attrs: {\n            href: \"https://www.tmnewa.com.tw/b2c_v2/frontstage/download.aspx\",\n            target: \"_blank\"\n          }\n        },\n        [_vm._v(\"嚙賡�䕘蕭蒪選蕭薴�烾噐藃３蒡閱")]\n      )\n    ])\n  },\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"div\", { staticClass: \"py-4\" }, [\n      _c(\n        \"a\",\n        {\n          attrs: {\n            href:\n              \"https://www.tmnewa.com.tw/B2C_V2/commonweb/epolicy.aspx?fk=76fde82a9d164e758c27c6bae2dc9584\",\n            target: \"_blank\"\n          }\n        },\n        [_vm._v(\"嚙踢��𡝗䴴艞�瘀蕭�坾敼脪")]\n      )\n    ])\n  },\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"div\", { staticClass: \"py-4 text-green-800\" }, [\n      _c(\n        \"a\",\n        { attrs: { href: \"https://www.tmnewa.com.tw/\", target: \"_blank\" } },\n        [_vm._v(\" �麯�辺�𤀻��僐�𡄯蕭 \")]\n      )\n    ])\n  }\n]\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/NavigationDrawer.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%226e819af0-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"6e819af0-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/icons/AlertCircle.vue?vue&type=template&id=5e5b4a57&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6e819af0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/AlertCircle.vue?vue&type=template&id=5e5b4a57& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"svg\",\n    {\n      staticClass: \"h-full w-full fill-current\",\n      attrs: { viewBox: \"0 0 143 143\" }\n    },\n    [\n      _c(\"path\", {\n        attrs: {\n          d:\n            \"M71.5 0.1875C110.881 0.1875 142.812 32.1189 142.812 71.5C142.812 110.881 110.881 142.812 71.5 142.812C32.1189 142.812 0.1875 110.881 0.1875 71.5C0.1875 32.1189 32.1189 0.1875 71.5 0.1875ZM76.5938 37.1172C76.5938 36.4168 76.0207 35.8438 75.3203 35.8438H67.6797C66.9793 35.8438 66.4062 36.4168 66.4062 37.1172V80.4141C66.4062 81.1145 66.9793 81.6875 67.6797 81.6875H75.3203C76.0207 81.6875 76.5938 81.1145 76.5938 80.4141V37.1172ZM71.5 107.156C73.4994 107.115 75.4032 106.293 76.8028 104.864C78.2023 103.436 78.9862 101.515 78.9862 99.5156C78.9862 97.5158 78.2023 95.5956 76.8028 94.1672C75.4032 92.7387 73.4994 91.9158 71.5 91.875C69.5006 91.9158 67.5968 92.7387 66.1972 94.1672C64.7977 95.5956 64.0138 97.5158 64.0138 99.5156C64.0138 101.515 64.7977 103.436 66.1972 104.864C67.5968 106.293 69.5006 107.115 71.5 107.156Z\"\n        }\n      })\n    ]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/icons/AlertCircle.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%226e819af0-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"6e819af0-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/icons/ArrowDown.vue?vue&type=template&id=41bb5696&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6e819af0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/ArrowDown.vue?vue&type=template&id=41bb5696& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"svg\",\n    {\n      staticClass: \"h-full w-full fill-current\",\n      attrs: { viewBox: \"0 0 16 13\" }\n    },\n    [_c(\"path\", { attrs: { d: \"M8 13L0.638784 0.249999L15.3612 0.25L8 13Z\" } })]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/icons/ArrowDown.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%226e819af0-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"6e819af0-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/icons/ArrowUp.vue?vue&type=template&id=6ec9030f&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6e819af0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/ArrowUp.vue?vue&type=template&id=6ec9030f& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"svg\",\n    {\n      staticClass: \"h-full w-full fill-current\",\n      attrs: { viewBox: \"0 0 20 17\" }\n    },\n    [_c(\"path\", { attrs: { d: \"M10 0L19.5263 16.5L0.473721 16.5L10 0Z\" } })]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/icons/ArrowUp.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%226e819af0-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"6e819af0-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/icons/ChevronDown.vue?vue&type=template&id=45269e08&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6e819af0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/ChevronDown.vue?vue&type=template&id=45269e08&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { staticClass: \"icon\" }, [\n    _c(\n      \"svg\",\n      {\n        staticClass: \"h-full w-full\",\n        attrs: { fill: \"none\", viewBox: \"0 0 24 15\", stroke: \"currentColor\" }\n      },\n      [_c(\"path\", { attrs: { d: \"M22 2L12 12L2 2\", \"stroke-width\": \"3\" } })]\n    )\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/icons/ChevronDown.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%226e819af0-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"6e819af0-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/icons/ChevronUp.vue?vue&type=template&id=0ee37f01&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6e819af0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/ChevronUp.vue?vue&type=template&id=0ee37f01&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { staticClass: \"icon\" }, [\n    _c(\n      \"svg\",\n      {\n        staticClass: \"h-full w-full\",\n        attrs: { fill: \"none\", viewBox: \"0 0 24 15\", stroke: \"currentColor\" }\n      },\n      [_c(\"path\", { attrs: { d: \"M2 13L12 3L22 13\", \"stroke-width\": \"3\" } })]\n    )\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/icons/ChevronUp.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%226e819af0-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/cache-loader/dist/cjs.js?{\"cacheDirectory\":\"node_modules/.cache/vue-loader\",\"cacheIdentifier\":\"6e819af0-vue-loader-template\"}!./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./src/components/icons/Close.vue?vue&type=template&id=317d4743&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"6e819af0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/icons/Close.vue?vue&type=template&id=317d4743& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"svg\",\n    {\n      staticClass: \"h-full w-full fill-current\",\n      attrs: { viewBox: \"0 0 32 32\", stroke: \"currentColor\" }\n    },\n    [\n      _c(\"path\", {\n        attrs: {\n          d: \"M1.30875 1.6084L31.0006 31.0002\",\n          \"stroke-width\": \"2\",\n          \"stroke-linecap\": \"round\",\n          \"stroke-linejoin\": \"round\"\n        }\n      }),\n      _c(\"path\", {\n        attrs: {\n          d: \"M30.8625 1L0.999999 30.5607\",\n          \"stroke-width\": \"2\",\n          \"stroke-linecap\": \"round\",\n          \"stroke-linejoin\": \"round\"\n        }\n      })\n    ]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./src/components/icons/Close.vue?./node_modules/cache-loader/dist/cjs.js?%7B%22cacheDirectory%22:%22node_modules/.cache/vue-loader%22,%22cacheIdentifier%22:%226e819af0-vue-loader-template%22%7D!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/assets/tailwind.css":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??ref--6-oneOf-3-2!./src/assets/tailwind.css ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {
