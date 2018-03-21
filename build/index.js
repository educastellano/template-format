'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
    if (!value && options.skipUndefined) {
        return match;
    } else {
        return value || '';
    }
}

function format(string, object) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (typeof string !== 'string') {
        return string;
    }
    options = Object.assign({}, defaults, options);
    return string.replace(options.regex, function () {
        for (var _len = arguments.length, match = Array(_len), _key = 0; _key < _len; _key++) {
            match[_key] = arguments[_key];
        }

        var attrs = match[1].split('.');
        return formatMatch(match[0], attrs, object, options);
    });
}

module.exports = format;