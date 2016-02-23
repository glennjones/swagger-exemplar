'use strict';
const Code = require('code');
const Lab = require('lab');

const Exemplar = require('../lib/index.js');
const SchemaExample = require('../test/schemas/01.json');


const expect = Code.expect;
const lab = exports.lab = Lab.script();


lab.experiment('convert - ', () => {

    let options = Exemplar.getOptions({});


    lab.test('convert callback', (done) => {

        Exemplar.convert(SchemaExample, options, (err, json) => {

            //console.log(JSON.stringify(json));
            expect(json).to.deep.equal({
                'items': [
                    {
                        'id': 'x78P9c',
                        'a': 5,
                        'b': 5,
                        'operator': '+',
                        'equals': 10,
                        'created': '2015-12-01',
                        'modified': '2015-12-01'
                    }
                ],
                'count': 1,
                'pageSize': 10,
                'page': 1,
                'pageCount': 1
            });
            done();
        });
    });


    lab.test('convert return', (done) => {

        let json = Exemplar.convert(SchemaExample, options);

        //console.log(JSON.stringify(json));
        expect(json).to.deep.equal({
            'items': [
                {
                    'id': 'x78P9c',
                    'a': 5,
                    'b': 5,
                    'operator': '+',
                    'equals': 10,
                    'created': '2015-12-01',
                    'modified': '2015-12-01'
                }
            ],
            'count': 1,
            'pageSize': 10,
            'page': 1,
            'pageCount': 1
        });
        done();

    });

});
