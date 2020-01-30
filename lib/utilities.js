const utilities = module.exports = {};

/**
 * gets a value for property based on type, format and settings
 *
 * @param  {String} type
 * @param  {Object} property
 * @param  {Object} settings
 * @return {String}
 */
utilities.getValue = function (property, settings) {

    let out = settings.defaults[property.type];

    if (property.format) {
        out = settings.defaults[property.format];
    }

    if (settings.useEnum === true && property.enum && property.enum.length > 0) {
        out = property.enum[0];
    }

    if (settings.useDefaults === true && property.default) {
        out = property.default;
    }

    if (settings.useExamples === true && property.example) {
        out = property.example;
    }

    // all values are set as strings
    return String(out);
};
