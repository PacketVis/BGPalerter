"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _env = _interopRequireWildcard(require("./env"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ConnectorFactory = /*#__PURE__*/_createClass(function ConnectorFactory() {
  var _this = this;

  _classCallCheck(this, ConnectorFactory);

  _defineProperty(this, "getConnector", function (name) {
    return _this.connectors[name];
  });

  _defineProperty(this, "getConnectors", function () {
    return Object.keys(_this.connectors).map(function (name) {
      return _this.connectors[name];
    });
  });

  _defineProperty(this, "loadConnectors", function () {
    var connectors = Object.keys(_this.connectors);

    if (connectors.length === 0) {
      var _iterator = _createForOfIteratorHelper(_env["default"].config.connectors),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var connector = _step.value;
          _this.connectors[connector.name] = new connector["class"](connector.name, connector.params || {}, _env["default"]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  });

  _defineProperty(this, "_connectConnector", function (connector) {
    connector.onError(function (error) {
      _env.logger.log({
        level: 'error',
        message: error
      });
    });
    connector.onConnect(function (message) {
      _env.logger.log({
        level: 'info',
        message: message
      });
    });
    connector.onDisconnect(function (error) {
      if (error) {
        _env.logger.log({
          level: 'error',
          message: error
        });
      } else {
        _env.logger.log({
          level: 'info',
          message: connector.name + ' disconnected'
        });
      }
    });
    return connector.connect()["catch"](function (error) {
      // If not connected log the error and move on
      if (error) {
        _env.logger.log({
          level: 'error',
          message: error
        });
      }
    });
  });

  _defineProperty(this, "connectConnectors", function (params) {
    return new Promise(function (resolve, reject) {
      var connectors = _this.getConnectors();

      if (connectors.length === 0) {
        reject(new Error("No connections available"));
      } else {
        var calls = connectors.map(function (connector) {
          return _this._connectConnector(connector).then(function () {
            connector.subscribe(params);
          })["catch"](function (error) {
            if (error) {
              _env.logger.log({
                level: 'error',
                message: error
              });
            }
          });
        });
        resolve(Promise.all(calls));
      }
    });
  });

  this.connectors = {};
});

exports["default"] = ConnectorFactory;