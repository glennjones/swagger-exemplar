'use strict';
const Code = require('code');
const Lab = require('lab');

const Exemplar = require('../lib/index.js');
const Schema = require('../lib/schema.js');

const expect = Code.expect;
const lab = exports.lab = Lab.script();


lab.experiment('schema - ', () => {

    let options = Exemplar.getOptions({});
    let typeArray = ['string', 'integer', 'number', 'boolean', 'file'];

    typeArray.forEach((type) => {
        lab.test('toJSON ' + type, (done) => {

            let schemaObj = {
                'type': type
            };
            //console.log(Schema.toJSON(schemaObj, options).toString(), options.defaults[type]);
            expect(Schema.toJSON(schemaObj, options).toString()).to.equal(options.defaults[type]);
            done();
        });
    });

});


lab.experiment('schema - ', () => {

    let options = Exemplar.getOptions({});
    let schemaExample = require('../test/schemas/07.json');

    lab.test('toJSON object, array', (done) => {

        //console.log(JSON.stringify(  Schema.toJSON(schemaExample, options) ))
        expect(Schema.toJSON(schemaExample, options)).to.deep.equal({
            'id': 0,
            'category': {
                'id': 0,
                'name': 'string'
            },
            'name': 'doggie',
            'photoUrls': [
                'string'
            ],
            'tags': [
                {
                    'id': 0,
                    'name': 'string'
                }
            ],
            'status': 'available'
        });
        done();
    });
});
