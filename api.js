'use strict';

const API = require('claudia-api-builder');

const api = new API();

const getPizzas = require('./handlers/get-pizzas');
const createOrder = require('./handlers/create-order');

api.get('/', () => 'Welcome to Pizza API');

api.get('/pizzas', () => getPizzas());

api.get('/pizzas/{id}',
  request => getPizzas(request.pathParams.id),
  {
    error: 404
  });

api.post('/orders',
  request => createOrder(request.body),
  {
    success: 201,
    error: 400
  });

module.exports = api;

// curl -i -H "Content-Type: application/json" -X POST -d '{"pizzaId":1,"address":"221B Baker Street"}' https://pw7ortv99l.execute-api.eu-central-1.amazonaws.com/latest/orders

