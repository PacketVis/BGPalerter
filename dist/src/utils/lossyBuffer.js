"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LossyBuffer = /*#__PURE__*/_createClass(function LossyBuffer(bufferSize, cleaningInterval, logger) {
  var _this = this;

  _classCallCheck(this, LossyBuffer);

  _defineProperty(this, "sendData", function () {
    if (_this.callback && _this.buffer.length) {
      _this.callback(_this.buffer);

      _this.buffer = [];
    }
  });

  _defineProperty(this, "add", function (item) {
    if (_this.buffer.length <= _this.bufferSize) {
      _this.buffer.push(item);
    } else if (!_this.alertOnce) {
      _this.alertOnce = true;

      _this.logger.log({
        level: 'error',
        message: "The data rate is too high, messages are getting dropped due to full buffer. Increase the buffer size if you think your machine could handle more."
      });
    }
  });

  _defineProperty(this, "onData", function (callback) {
    _this.callback = callback;
  });

  this.callback = null;
  this.buffer = [];
  this.bufferSize = bufferSize;
  setInterval(this.sendData, cleaningInterval);
  this.alertOnce = false;
  this.logger = logger;
});

exports["default"] = LossyBuffer;