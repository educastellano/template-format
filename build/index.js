'use strict';

function format(string, object) {
    if (typeof string !== 'string') {
        return string;
    }
    var matches = void 0;
    do {
        matches = string.match(/{(.*?)}/);
        if (matches) {
            var attrs = matches[1].split('.');
            var value = object;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = attrs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var attr = _step.value;

                    value = value ? value[attr] : '';
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

            string = string.replace(matches[0], value || '');
        }
    } while (matches);
    return string;
}

module.exports = format;