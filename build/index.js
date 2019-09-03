"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var defaults = {
  regex: /{(.*?)}/g,
  skipUndefined: false,
  spreadToken: '$n',
  spreadSeparator: ','
};

function formatMatch(match, attrs, value, options) {
  var _loop = function _loop(i) {
    var attr = attrs[i];

    if (attr === options.spreadToken && Array.isArray(value)) {
      return {
        v: value.map(function (v) {
          return formatMatch(match, attrs.slice(i + 1), v, options);
        }).join(options.spreadSeparator)
      };
    }

    value = value ? value[attr] : undefined;
  };

  for (var i = 0; i < attrs.length; i++) {
    var _ret = _loop(i);

    if (_typeof(_ret) === "object") return _ret.v;
  }

  if (!value && options.skipUndefined) {
    return match;
  } else {
    return value === undefined ? '' : value;
  }
}

function format(string, object) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (typeof string !== 'string') {
    return string;
  }

  options = _objectSpread({}, defaults, {}, options);
  return string.replace(options.regex, function () {
    for (var _len = arguments.length, match = new Array(_len), _key = 0; _key < _len; _key++) {
      match[_key] = arguments[_key];
    }

    var attrs = match[1].split('.');
    return formatMatch(match[0], attrs, object, options);
  });
}

module.exports = format;