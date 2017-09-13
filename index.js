
function format(string, object, options={}) {
    if (typeof string !== 'string') {
        return string
    }
    return string.replace(/{(.*?)}/g, (...match) => {   
        let attrs = match[1].split('.')
        let value = object
        for (let attr of attrs) {
            value = value ? value[attr] : undefined
        }
        if (!value && options.skipUndefined) {
            return match[0]
        }
        else {
            return value || ''
        }
    })
}

module.exports = format