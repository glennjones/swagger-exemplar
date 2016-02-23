# swagger-exemplar

## IN DEVELOPMENT - API NOT STABLE

A module that builds a exemplar JSON objects from OpenAPI (aka swagger) schema objects.

````bash
$ npm install swagger-exemplar
```

```javascript
const Exemplar = require('swagger-exemplar');

// object that follows the JSONSchema spec
const schema = {
    'type': 'object',
    'properties': {
        'code': {
            'type': 'number'
        },
        'msg': {
            'type': 'string'
        }
    }
}

Exemplar.convert(schema, options, function(err,json){
    // do something with json
})

```


## Options
```json
const defaults = {
    'useExamples': true,
    'useDefaults': true,
    'useEnum': true,
    'defaults': {
        'string': 'string',
        'integer': '0',
        'number': '0',
        'boolean': 'true',
        'file': 'filename.txt',
        'int32': '0',
        'int64': '0',
        'float': '0.0',
        'double': '0',
        'byte': '',
        'binary': '',
        'date': '2016-01-01',
        'date-time': '2016-01-01T00:00:00Z',
        'password': '********'
    }
};
```


## Lab test
The project has integration and unit tests. To run the test within the project type one of the following commands.
```bash
$ lab
$ lab -r html -o coverage.html
$ lab -r html -o coverage.html --lint
$ lab -r console -o stdout -r html -o coverage.html --lint
```

## Issues
If you find any issue please file here on github and I will try and fix them.