'use strict';
const Fs = require('fs');
const Path = require('path');
const Joi = require('joi');
const Exemplar = require('../lib/index.js');

module.exports = [{
    method: 'GET',
    path: '/convert/{id}',
    config: {
        handler: function (request, reply) {

            let id = request.params.id;
            let json = JSON.parse(Fs.readFileSync(Path.join(__dirname, '../test/schemas/' + id + '.json')));
            Exemplar.convert(json, {}, function (err, example) {

                reply(example).type('application/json');
            });
        },
        validate: {
            params: {
                id: Joi.string()
                    .required()
                    .description('the id of the schema example')
            }
        }
    }
}];
