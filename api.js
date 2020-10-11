'use strict';

const API = require('claudia-api-builder');

const api = new API();

const getPizzas = require('./handlers/get-pizzas');
const createOrder = require('./handlers/create-order');
const updateOrder = require('./handlers/update-order');
const deleteOrder = require('./handlers/delete-order');
const getOrders = require('./handlers/get-orders');

api.get('/', () => 'Welcome to Pizza API');

api.get('/pizzas', () => getPizzas());

api.get('/pizzas/{id}',
  request => getPizzas(request.pathParams.id),
  {
    error: 404
  });

// 
api.get('/orders',
  request => getOrders(),
  {
    error: 404
  });
api.get('/orders/{id}',
  request => getOrders(request.pathParams.id),
  {
    error: 404
  });
// curl -i -H "Content-Type: application/json" -X POST -d '{"pizzaId":1,"address":"221B Baker Street"}' https://pw7ortv99l.execute-api.eu-central-1.amazonaws.com/latest/orders
api.post('/orders',
  request => createOrder(request.body),
  {
    success: 201,
    error: 400
  });
// curl -i -H "Content-Type: application/json" -X PUT -d '{"pizzaId":2}' https://pw7ortv99l.execute-api.eu-central-1.amazonaws.com/latest/orders/42
api.put('/orders/{id}',
  request => updateOrder(request.pathParams.id, request.body),
  {
    error: 400
  });
// curl -i -H "Content-Type: application/json" -X DELETE https://pw7ortv99l.execute-api.eu-central-1.amazonaws.com/latest/orders/42
api.delete('/orders/{id}',
  request => deleteOrder(request.pathParams.id),
  {
    error: 400
  });

module.exports = api;

// curl -i -H "Content-Type: application/json" -X POST -d '{"pizzaId":1,"address":"221B Baker Street"}' https://pw7ortv99l.execute-api.eu-central-1.amazonaws.com/latest/orders

