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
`data`                        | `object`   |               | The data :)
`options`                     | `object`   | `{}`          | **Optional** Extra options, read below.
`options.skipUndefined`       | `object`   | `false`       | **Optional** Skips formatting parameters which are missing in the object, keeping the original text. Otherwise they'll be replaced by an empty string.
`options.regex`               | `regex`   | `/{(.*?)}/g`   | **Optional** Alternative regex for different format syntaxes *(i.e.: `Hello {{name}}!`)*. Must include the global match modifier (`g`).

## Usage

```js
import format from 'template-format'
```

**Passing objects**

```js
format('Hello {name}, happy {age} bday!', {name: 'Bob', age: 32})
// 'Hello Bob, happy 32 bday!'
```

**Passing arrays**

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

**Other Options**

* Skip undefined attributes:

```js
format('Hello {name}, happy {age} bday!', {name: 'Bob'})
// 'Hello Bob, happy bday!'
```

```js
format('Hello {name}, happy {age} bday!', {name: 'Bob'}, { skipUndefined: true })
// 'Hello Bob, happy {age} bday!'
```

* Using a different format syntax:

```js
format('Hello {{name}}, happy {{age}} bday!', {name: 'Bob', age: 32}, { regex: /{{(.*?)}}/g })
// 'Hello Bob, happy 32 bday!'
```

## Changelog

* 1.1.0
    * Support to skip undefined attributes
    * Support for alternative format syntaxes

* 1.0.0 
    * Initial release :tada:

## License

[ISC License](http://opensource.org/licenses/ISC)
