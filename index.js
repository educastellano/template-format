
const defaults = {
    regex: /{(.*?)}/g,
    skipUndefined: false,
    spreadToken: '$n',
    spreadSeparator: ','
}

function formatMatch(match, attrs, value, options) {
    for (let i=0; i<attrs.length; i++) {
        let attr = attrs[i]
        if (attr === options.spreadToken && Array.isArray(value)) {
            return value.map(v => formatMatch(match, attrs.slice(i+1), v, options)).join(options.spreadSeparator)
        }
        value = value ? value[attr] : undefined
    }
    if (!value && options.skipUndefined) {
        return match
    }
    else {
        return value || ''
    }
}

function format(string, object, options={}) {
    if (typeof string !== 'string') {
        return string
    }
    options = Object.assign({}, defaults, options)
    return string.replace(options.regex, (...match) => {
        let attrs = match[1].split('.')
        return formatMatch(match[0], attrs, object, options)
    })
}

module.exports = format
