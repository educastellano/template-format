
function format(string, object) {
    if (typeof string !== 'string') {
        return string
    }
    let matches
    do {
        matches = string.match(/{(.*?)}/)
        if (matches) {
            let attrs = matches[1].split('.')
            let value = object
            for (let attr of attrs) {
                value = value ? value[attr] : ''
            }
            string = string.replace(matches[0], value || '')
        }
    } while (matches)
    return string
}

module.exports = format