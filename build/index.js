'use strict';

function format(string, object) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (typeof string !== 'string') {
        return string;
    }
    var regex = options.regex || /{(.*?)}/g;
    return string.replace(regex, function () {
        for (var _len = arguments.length, match = Array(_len), _key = 0; _key < _len; _key++) {
            match[_key] = arguments[_key];
        }

        var attrs = match[1].split('.');
        var value = object;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = attrs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var attr = _step.value;

                value = value ? value[attr] : undefined;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        if (!value && options.skipUndefined) {
            return match[0];
        } else {
            return value || '';
        }
    });
}

module.exports = format;