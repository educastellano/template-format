# template-format

Simple string formatting with support for nested data.

# Install

    npm install template-format --save

# Usage

* Format passing objects

```js
format('Hello {name}, happy {age} bday!', {name: 'Bob', age: 32})
// 'Hello Bob, happy 32 bday!'
```

* Format passing arrays

```js
format('Hello {0}, happy {1} bday!', ['Bob', 32])
// 'Hello Bob, happy 32 bday!'
```

* Format with nested data

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

## Changelog

* 1.0.0 
    * Initial release :tada:

## License

[ISC License](http://opensource.org/licenses/ISC)
