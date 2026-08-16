const test = require('brittle')
const format = require('./index')

test('it should format strings with different attributes of an object', function (t) {
  const string = 'Hello {name}, happy {age} bday!'
  const object = { name: 'Bob', age: 32 }

  const result = format(string, object)

  t.is(result, 'Hello Bob, happy 32 bday!')
})

test('it should format strings with nested attributes', function (t) {
  const string = 'Hello {bob.name}, happy {bob.age} bday! I call you at {bob.contact.phone}'
  const object = {
    bob: {
      name: 'Bob',
      age: 32,
      contact: {
        phone: '978090909'
      }
    }
  }

  const result = format(string, object)

  t.is(result, 'Hello Bob, happy 32 bday! I call you at 978090909')
})

test('it should format strings passing arrays', function (t) {
  const string = 'Hello {0}, happy {1} bday!'
  const array = ['Bob', 32]

  const result = format(string, array)

  t.is(result, 'Hello Bob, happy 32 bday!')
})

test('it should format strings passing arrays of objects', function (t) {
  const string = '{0.name} is {0.age}, {1.name} is {1.age}, {2.name} is {2.age}'
  const array = [
    { name: 'Bob', age: 32 },
    { name: 'Mary', age: 30 },
    { name: 'Baby', age: 0 }
  ]

  const result = format(string, array)

  t.is(result, 'Bob is 32, Mary is 30, Baby is 0')
})

test('it should format strings spreading arrays of objects, using $n', function (t) {
  const string = 'Hello {$n.name}!'
  const array = [{ name: 'bob' }, { name: 'mary' }, { name: 'julia' }]

  const result = format(string, array)

  t.is(result, 'Hello bob,mary,julia!')
})

test('it should format strings spreading object:array:object, using $n', function (t) {
  const string = 'Hello {people.$n.name}!'
  const array = { people: [{ name: 'bob' }, { name: 'mary' }, { name: 'julia' }] }

  const result = format(string, array)

  t.is(result, 'Hello bob,mary,julia!')
})

test('it should format strings spreading object:array:object, using $n and numbers as value', function (t) {
  const string = 'Ages: {people.$n.age}'
  const array = {
    people: [
      { name: 'bob', age: 22 },
      { name: 'mary', age: 30 },
      { name: 'baby', age: 0 }
    ]
  }

  const result = format(string, array)

  t.is(result, 'Ages: 22,30,0')
})

test('it should format strings spreading object:array:object:array, using $n', function (t) {
  const string = 'Hello {people.$n.names.$n}!'
  const array = { people: [{ names: ['bob', 'abc', 'def'] }, { names: ['mary', 'ghi', 'jkl'] }] }

  const result = format(string, array)

  t.is(result, 'Hello bob,abc,def,mary,ghi,jkl!')
})

test('it should format strings spreading object:array:object:array:object, using $n', function (t) {
  const string = 'Hello {people.$n.names.$n.name}!'
  const array = {
    people: [
      { names: [{ name: 'bob' }, { name: 'abc' }, { name: 'def' }] },
      { names: [{ name: 'mary' }, { name: 'ghi' }, { name: 'jkl' }] }
    ]
  }

  const result = format(string, array)

  t.is(result, 'Hello bob,abc,def,mary,ghi,jkl!')
})

test('it should format strings using a custom spreadToken', function (t) {
  const string = 'Hello {people.$$.name}!'
  const array = { people: [{ name: 'bob' }, { name: 'mary' }, { name: 'julia' }] }

  const result = format(string, array, { spreadToken: '$$' })

  t.is(result, 'Hello bob,mary,julia!')
})

test('it should format strings using a custom spreadSeparator', function (t) {
  const string = 'Hello {people.$n.name}!'
  const array = { people: [{ name: 'bob' }, { name: 'mary' }, { name: 'julia' }] }

  const result = format(string, array, { spreadSeparator: ' ' })

  t.is(result, 'Hello bob mary julia!')
})

test('it should *not* skip undefined attributes when *not* using the option skipUndefined', function (t) {
  const string = 'Hello {name}, happy {age} bday! I call you at {bob.contact.phone}'
  const object = { name: 'Bob' }

  const result = format(string, object)

  t.is(result, 'Hello Bob, happy  bday! I call you at ')
})

test('it should skip undefined attributes when using the option skipUndefined', function (t) {
  const string = 'Hello {name}, happy {age} bday! I call you at {bob.contact.phone}'
  const object = { name: 'Bob' }

  const result = format(string, object, { skipUndefined: true })

  t.is(result, 'Hello Bob, happy {age} bday! I call you at {bob.contact.phone}')
})

test('it should format strings with a different format syntax', function (t) {
  const string = 'Hello {{name}}, happy {{age}} bday!'
  const object = { name: 'Bob', age: 32 }

  const result = format(string, object, { regex: /{{(.*?)}}/g })

  t.is(result, 'Hello Bob, happy 32 bday!')
})
