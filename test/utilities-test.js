'use strict';
const Code = require('code');
const Lab = require('lab');

const Exemplar = require('../lib/index.js');
const Utilities = require('../lib/utilities.js');


const expect = Code.expect;
const lab = exports.lab = Lab.script();


lab.experiment('utilities', () => {


    let options = Exemplar.getOptions({});


    lab.test('getValue default settings', (done) => {

        let property = {
            'type': 'string'
        };
        expect(Utilities.getValue(property, options)).to.equal(options.defaults.string);


        property.format = 'password';
        expect(Utilities.getValue(property, options)).to.equal(options.defaults.password);

        property = {
            'type': 'string',
            'enum': ['enum text']
        };
        expect(Utilities.getValue(property, options)).to.equal('enum text');

        property.default = 'default text';
        expect(Utilities.getValue(property, options)).to.equal('default text');

        property.example = 'example text';
        expect(Utilities.getValue(property, options)).to.equal('example text');

        done();
    });


    let types = ['string', 'integer', 'number', 'boolean', 'file', 'int32', 'int64', 'float', 'double', 'byte', 'binary', 'date', 'date-time', 'password'];
    types.forEach((type) => {
        lab.test('getValue ' + type, (done) => {

            let property = {
                'type': type
            };
            expect(Utilities.getValue(property, options)).to.equal(options.defaults[type]);
            done();
        });
    });


    lab.test('getValue settings to false', (done) => {

        options.useExamples = false;
        options.useDefaults = false;
        options.useEnum = false;


        let property = {
            'type': 'string'
        };
        expect(Utilities.getValue(property, options)).to.equal(options.defaults.string);

        property.format = 'password';
        expect(Utilities.getValue(property, options)).to.equal(options.defaults.password);

        property = {
            'type': 'string',
            'enum': ['enum text']
        };
        expect(Utilities.getValue(property, options)).to.equal(options.defaults.string);

        property.default = 'default text';
        expect(Utilities.getValue(property, options)).to.equal(options.defaults.string);

        property.example = 'example text';
        expect(Utilities.getValue(property, options)).to.equal(options.defaults.string);

        done();
    });

});
