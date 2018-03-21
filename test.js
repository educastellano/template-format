var test = require('tape');
var format = require('./index')

test('it should format strings with different attributes of an object', function (t) {
    let string = 'Hello {name}, happy {age} bday!'
    let object = { name: 'Bob', age: 32 }

    let result = format(string, object)

    t.equals(result, 'Hello Bob, happy 32 bday!');
    t.end();
});

test('it should format strings with nested attributes', function (t) {
    let string = 'Hello {bob.name}, happy {bob.age} bday! I call you at {bob.contact.phone}'
    let object = {
        bob: {
            name: 'Bob', 
            age: 32, 
            contact: {
                phone: '978090909'
            }
        }
    }

    let result = format(string, object)

    t.equals(result, 'Hello Bob, happy 32 bday! I call you at 978090909');
    t.end();
});

test('it should format strings passing arrays', function (t) {
    let string = 'Hello {0}, happy {1} bday!'
    let array = ['Bob', 32]

    let result = format(string, array)

    t.equals(result, 'Hello Bob, happy 32 bday!');
    t.end();
});

test('it should format strings passing arrays of objects', function (t) {
    let string = '{0.name} is {0.age}, {1.name} is {1.age}'
    let array = [{ name: 'Bob', age: 32 }, { name: 'Mary', age: 30 }]

    let result = format(string, array)

    t.equals(result, 'Bob is 32, Mary is 30');
    t.end();
});

test('it should format strings spreading arrays of objects, using $n', function (t) {
    let string = 'Hello {$n.name}!'
    let array = [{ name: 'bob' }, { name: 'mary' }, { name: 'julia' }]

    let result = format(string, array)

    t.equals(result, 'Hello bob,mary,julia!');
    t.end();
});

test('it should format strings spreading object:array:object, using $n', function (t) {
    let string = 'Hello {people.$n.name}!'
    let array = { people: [{ name: 'bob' }, { name: 'mary' }, { name: 'julia' }] }

    let result = format(string, array)

    t.equals(result, 'Hello bob,mary,julia!');
    t.end();
});

test('it should format strings spreading object:array:object:array, using $n', function (t) {
    let string = 'Hello {people.$n.names.$n}!'
    let array = { people: [{ names: ['bob', 'abc', 'def'] }, { names: ['mary', 'ghi', 'jkl'] }] }

    let result = format(string, array)

    t.equals(result, 'Hello bob,abc,def,mary,ghi,jkl!');
    t.end();
});

test('it should format strings spreading object:array:object:array:object, using $n', function (t) {
    let string = 'Hello {people.$n.names.$n.name}!'
    let array = { people: [
            { names: [{ name:'bob' }, { name:'abc' }, { name:'def' }] }, 
            { names: [{ name:'mary' }, { name:'ghi' }, { name:'jkl' }]}
        ] 
    }

    let result = format(string, array)

    t.equals(result, 'Hello bob,abc,def,mary,ghi,jkl!');
    t.end();
});

test('it should format strings using a custom spreadToken', function (t) {
    let string = 'Hello {people.$$.name}!'
    let array = { people: [{ name: 'bob' }, { name: 'mary'}, { name: 'julia'}] }

    let result = format(string, array, { spreadToken: '$$' })

    t.equals(result, 'Hello bob,mary,julia!');
    t.end();
});

test('it should format strings using a custom spreadSeparator', function (t) {
    let string = 'Hello {people.$n.name}!'
    let array = { people: [{ name: 'bob' }, { name: 'mary'}, { name: 'julia'}] }

    let result = format(string, array, { spreadSeparator: ' ' })

    t.equals(result, 'Hello bob mary julia!');
    t.end();
});

test('it should *not* skip undefined attributes when *not* using the option skipUndefined', function (t) {
    let string = 'Hello {name}, happy {age} bday! I call you at {bob.contact.phone}'
    let object = { name: 'Bob' }

    let result = format(string, object)

    t.equals(result, 'Hello Bob, happy  bday! I call you at ');
    t.end();
});


test('it should skip undefined attributes when using the option skipUndefined', function (t) {
    let string = 'Hello {name}, happy {age} bday! I call you at {bob.contact.phone}'
    let object = { name: 'Bob' }

    let result = format(string, object, { skipUndefined: true })

    t.equals(result, 'Hello Bob, happy {age} bday! I call you at {bob.contact.phone}');
    t.end();
});

test('it should format strings with a different format syntax', function (t) {
    let string = 'Hello {{name}}, happy {{age}} bday!'
    let object = { name: 'Bob', age: 32 }

    let result = format(string, object, { regex: /{{(.*?)}}/g })

    t.equals(result, 'Hello Bob, happy 32 bday!');
    t.end();
});
