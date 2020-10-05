'use strict';

const API = require('claudia-api-builder');
const getPizzas = require('./handlers/get-pizzas.js');

const api = new API();

api.get('/', () => 'Welcome to Pizza API' );

api.get('/pizzas', () => getPizzas());

api.get('/pizzas/{id}', request => getPizzas(request.pathParam.id), {
  error: 404
});

module.exports = api;