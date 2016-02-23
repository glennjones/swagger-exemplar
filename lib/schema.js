'use strict';
const Utilities = require('../lib/utilities.js');
const schema = module.exports = {};


/**
 * convert a top level object into an example
 *
 * @param  {Object} property
 * @param  {Object} settings
 * @return {Array}
 */
schema.toJSON = function (schemaObj, settings, out) {

    if (!out) {
        out = {};
    }

    // top level object
    for (let propertyName in schemaObj.properties) {
        let property = schemaObj.properties[propertyName];
        switch (property.type) {
            case 'object':
                out[propertyName] = schema.toJSON(property, settings, {});
                break;

            case 'array':
                out[propertyName] = [schema.toJSON(property.items, settings)];
                break;

            default:
                out[propertyName] = schema.property(property, settings);

        }
    }

    // top level array
    if(schemaObj.items){
        out = [schema.toJSON(schemaObj.items, settings)];
    }

    // TODO research this
    // deals single types
    if (!schemaObj.items &&
        !schemaObj.properties &&
        !schemaObj.additionalProperties &&
        !schemaObj.patternProperties &&
         schemaObj.type) {
        out = schema.property(schemaObj, settings);
    }

    return out;
};


/**
 * convert an arrays items object into an array example
 *
 * @param  {Object} property
 * @param  {Object} settings
 * @return {Array}
 */
schema.items = function (property, settings) {

    if (!property.properties) {
        return [schema.property(property, settings)];
    }
    return [schema.toJSON(property, settings, {})];
};


/**
 * convert individual typed property into an example
 *
 * @param  {Object} property
 * @param  {Object} settings
 * @return {Object}
 */
schema.property = function (property, settings) {

    let out;
    switch (property.type) {
        case 'string':
            out = String(Utilities.getValue(property, settings));
            break;
        case 'integer':
            out = parseInt(Utilities.getValue(property, settings), 10);
            break;
        case 'number':
            out = parseFloat(Utilities.getValue(property, settings));
            break;
        case 'boolean':
            out = (Utilities.getValue(property, settings) === 'true');
            break;
        case 'file':
            out = String(Utilities.getValue(property, settings));
            break;
    }
    return out;
};
