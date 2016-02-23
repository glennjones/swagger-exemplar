'use strict';
const Hoek = require('hoek');
const Joi = require('joi');
const Schema = require('../lib/schema.js');

const internals = {};
const index = module.exports = {};


// schema for properties
index.schema = Joi.object({
    'useExamples': Joi.boolean(),
    'useDefaults': Joi.boolean(),
    'useEnum': Joi.boolean(),
    'defaults': Joi.object({
        'string': Joi.string(),
        'integer': Joi.string(),
        'number': Joi.string(),
        'boolean': Joi.string(),
        'file': Joi.string(),
        'int32': Joi.string(),
        'int64': Joi.string(),
        'float': Joi.string(),
        'double': Joi.string(),
        'byte': Joi.string().empty(''),
        'binary': Joi.string().empty(''),
        'date': Joi.string(),
        'date-time': Joi.string(),
        'password': Joi.string()
    }).unknown()
}).unknown();


// defaults settings
index.defaults = {
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


/**
 * convert a schema object into an example
 *
 * @param  {Object} schema
 * @param  {Object} options
 * @param  {Function} callback
 * @return {Object}
 */
index.convert = function (schema, options, callback) {

    let settings = Hoek.applyToDefaults(index.defaults, options);
    Joi.assert(settings, index.schema);
    if (callback) {
        callback(null, Schema.toJSON(schema, settings));
    }
    return Schema.toJSON(schema, settings);
};


/**
 * gets full settings for app options plus any defaults
 *
 * @param  {Object} options
 * @return {Object}
 */
index.getOptions = function (options) {

    let settings = Hoek.applyToDefaults(index.defaults, options);
    Joi.assert(settings, index.schema);
    return settings;
};
