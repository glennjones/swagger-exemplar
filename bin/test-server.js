'use strict';
const Hapi = require('hapi');
const Blipp = require('blipp');
const Routes = require('../bin/routes.js');


const goodOptions = {
    reporters: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
    }]
};


let server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 3008
});


server.register([
    Blipp,
    {
        register: require('good'),
        options: goodOptions
    }], (err) => {

        server.route(Routes);

        server.start((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Server running at:', server.info.uri);
            }
        });
    });
