'use strict';

const API = require('claudia-api-builder');
const api = new API();

api.get('/pizzas', () => {
  return [
    'Capricciosa',
    'Quattro Formaggi',
    'Napoletana',
    'Margherita'
  ];
});

module.exports = api;