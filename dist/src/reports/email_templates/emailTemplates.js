"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var templateHijack = '${summary}\n\
\n\
\n\
DETAILS:\n\
------------------------------------------------------\n\
Monitored prefix:     ${prefix}\n\
Prefix Description:   ${description}\n\
Usually announced by: ${asn}\n\
Event type:           ${type}\n\
Now announced by:     ${neworigin}\n\
Now announced with:   ${newprefix}\n\
When event started:   ${earliest} UTC\n\
Last event:           ${latest} UTC\n\
Detected by peers:    ${peers}\n\
See in BGPlay:        ${bgplay}\n\
\n\
Top ${pathNumber} most used AS paths:\n\
${paths}';
var templateNewPrefix = '${summary}\n\
\n\
\n\
DETAILS:\n\
------------------------------------------------------\n\
Monitored prefix:     ${prefix}\n\
Prefix Description:   ${description}\n\
Usually announced by: ${asn}\n\
Event type:           ${type}\n\
Detected new prefix:  ${newprefix}\n\
Announced by:         ${neworigin}\n\
When event started:   ${earliest} UTC\n\
Last event:           ${latest} UTC\n\
Detected by peers:    ${peers}\n\
See in BGPlay:        ${bgplay}';
var templatePath = '${summary}\n\
\n\
\n\
DETAILS:\n\
------------------------------------------------------\n\
Event type:           ${type}\n\
When event started:   ${earliest} UTC\n\
Last event:           ${latest} UTC\n\
\n\
\n\
Top ${pathNumber} triggering AS paths:\n\
${paths}';
var templateSoftwareUpdate = '${summary}';
var templateVisibility = '${summary}\n\
\n\
\n\
DETAILS:\n\
------------------------------------------------------\n\
Monitored prefix:     ${prefix}\n\
Prefix Description:   ${description}\n\
Prefix origin:        ${asn}\n\
Event type:           ${type}\n\
When event started:   ${earliest} UTC\n\
Last event:           ${latest} UTC\n\
Detected by peers:    ${peers}\n\
See in BGPlay:        ${bgplay}';
var templateMisconfiguration = '${summary}\n\
\n\
\n\
DETAILS:\n\
------------------------------------------------------\n\
Event type:           ${type}\n\
When event started:   ${earliest} UTC\n\
Last event:           ${latest} UTC\n\
\n\
\n\
Top ${pathNumber} most used AS paths:\n\
${paths}';
var templateRPKI = '${summary}\n\
\n\
\n\
DETAILS:\n\
------------------------------------------------------\n\
Event type:           ${type}\n\
When event started:   ${earliest} UTC\n\
Last event:           ${latest} UTC\n\
See:                  ${rpkiLink}';
var templateRoa = '${summary}\n\
\n\
\n\
DETAILS:\n\
------------------------------------------------------\n\
Event type:           ${type}\n\
When event started:   ${earliest} UTC\n\
Last event:           ${latest} UTC';
var defaultTemplate = '${summary}';

var emailTemplates = /*#__PURE__*/_createClass(function emailTemplates(logger) {
  var _this = this;

  _classCallCheck(this, emailTemplates);

  _defineProperty(this, "getTemplate", function (channel) {
    return _this.indexedFiles[channel] || defaultTemplate;
  });

  var directory = 'src/reports/email_templates/';
  var templateFiles = [{
    channel: 'hijack',
    content: templateHijack
  }, {
    channel: 'newprefix',
    content: templateNewPrefix
  }, {
    channel: 'path',
    content: templatePath
  }, {
    channel: 'software-update',
    content: templateSoftwareUpdate
  }, {
    channel: 'visibility',
    content: templateVisibility
  }, {
    channel: 'misconfiguration',
    content: templateMisconfiguration
  }, {
    channel: 'rpki',
    content: templateRPKI
  }, {
    channel: 'roa',
    content: templateRoa
  }];
  this.indexedFiles = {};

  if (!_fs["default"].existsSync(directory)) {
    _fs["default"].mkdirSync(directory, {
      recursive: true
    });
  }

  templateFiles.forEach(function (template) {
    try {
      var file = _path["default"].resolve(directory, template.channel + '.txt');

      if (_fs["default"].existsSync(file)) {
        _this.indexedFiles[template.channel] = _fs["default"].readFileSync(file, 'utf8');
      } else {
        _fs["default"].writeFileSync(file, template.content);

        _this.indexedFiles[template.channel] = template.content;
      }
    } catch (error) {
      logger.log({
        level: 'error',
        message: 'Email template: ' + error
      });
    }
  });
});

exports["default"] = emailTemplates;
;