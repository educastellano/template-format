# template-format

Simple string formatting with support for nested data.

## Install

    npm install template-format --save

## Syntax

```js
const formattedText = format(text, data, options={})
```

Parameter                     | Type       | Default       | Description
---                           | ---        | ---           | ---
`text`                        | `string`   |               | Text to format
`object`                      | `object`   |               | The object or array containing the data to be used for formatting.
`options`                     | `object`   | `{}`          | **Optional** Extra options, read below.
`options.regex`               | `regex`   | `/{(.*?)}/g`   | **Optional** Alternative regex for different format syntaxes *(i.e.: `Hello {{name}}!`)*. Must include the global match modifier (`g`).
`options.skipUndefined`       | `object`   | `false`       | **Optional** Skips formatting parameters which are missing in the object, keeping the original text. Otherwise they'll be replaced by an empty string.
`options.spreadToken`         | `string`   | `$n`          | **Optional** Token used on arrays to indicate that the following attributes have to be applied in each element (See example below).
`options.spreadSeparator`     | `string`   | `,`           | **Optional** String used on arrays to separate of the formatting in each element.

## Usage

```js
import format from 'template-format'
```

**With objects**

```js
format('Hello {name}, happy {age} bday!', { name: 'Bob', age: 32 })
// 'Hello Bob, happy 32 bday!'
```

**With arrays**

```js
format('Hello {0}, happy {1} bday!', ['Bob', 32])
// 'Hello Bob, happy 32 bday!'
```

**With nested data**

```js
format('Hello {bob.name}, happy {bob.age} bday! I call you at {bob.contact.phone}', {
        bob: {
            name: 'Bob', 
            age: 32, 
            contact: {
                phone: '978090909'
            }
        }
    })
// 'Hello Bob, happy 32 bday! I call you at 978090909'
```

**Spread arrays**

```js
format('Hello {people.$n.name}!', { people: [{ name: 'Bob' }, { name: 'Mary' }] })
// 'Hello Bob,Mary!'
```

**Other Options**

* Skip undefined attributes:

```js
format('Hello {name}, happy {age} bday!', { name: 'Bob' })
// 'Hello Bob, happy bday!'
```

```js
format('Hello {name}, happy {age} bday!', { name: 'Bob' }, { skipUndefined: true })
// 'Hello Bob, happy {age} bday!'
```

* Using a different format syntax:

```js
format('Hello {{name}}, happy {{age}} bday!', { name: 'Bob', age: 32}, { regex: /{{(.*?)}}/g })
// 'Hello Bob, happy 32 bday!'
```

**Custom spreading**

```js
format('Hello {people.$$.name}!', { people: [{ name: 'Bob' }, { name: 'Mary' }] }, { spreadToken: '$$', spreadSeparator: ', ' })
// 'Hello Bob, Mary!'
```

## Changelog

* 1.2.0
    * Support to spread formatting on arrays
    * Customizable spreading with `spreadToken` and `spreadSeparator`

* 1.1.0
    * Support to skip `undefined` attributes
    * Support for alternative format syntaxes

* 1.0.0 
    * Initial release :tada:

## License

[ISC License](http://opensource.org/licenses/ISC)
