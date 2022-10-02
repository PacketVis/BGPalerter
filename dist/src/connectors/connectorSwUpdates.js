"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connector = _interopRequireDefault(require("./connector"));

var _semver = _interopRequireDefault(require("semver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ConnectorSwUpdates = /*#__PURE__*/function (_Connector) {
  _inherits(ConnectorSwUpdates, _Connector);

  var _super = _createSuper(ConnectorSwUpdates);

  function ConnectorSwUpdates(name, params, env) {
    var _this;

    _classCallCheck(this, ConnectorSwUpdates);

    _this = _super.call(this, name, params, env);

    _defineProperty(_assertThisInitialized(_this), "connect", function () {
      return new Promise(function (resolve, reject) {
        resolve(true);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_checkForUpdates", function () {
      return _this.axios({
        responseType: "json",
        url: "https://raw.githubusercontent.com/nttgin/BGPalerter/main/package.json"
      }).then(function (data) {
        if (data && data.data && data.data.version && _semver["default"].gt(data.data.version, _this.version)) {
          _this._message({
            type: "software-update",
            currentVersion: _this.version,
            newVersion: data.data.version,
            repo: "https://github.com/nttgin/BGPalerter/releases"
          });
        }
      })["catch"](function () {
        _this.logger.log({
          level: 'error',
          message: "It was not possible to check for software updates"
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "subscribe", function (input) {
      return new Promise(function (resolve, reject) {
        if (_this.config.checkForUpdatesAtBoot) {
          setTimeout(_this._checkForUpdates, 20000); // Check after 20 seconds from boot
        }

        setInterval(_this._checkForUpdates, 1000 * 3600 * 24 * 5); // Check every 5 days

        resolve(true);
      });
    });

    return _this;
  }

  return _createClass(ConnectorSwUpdates);
}(_connector["default"]);

exports["default"] = ConnectorSwUpdates;

_defineProperty(ConnectorSwUpdates, "transform", function (message) {
  return [message];
});

;