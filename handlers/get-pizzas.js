const pizzas = require('../data/pizzas.json');

function getPizzas(pizzaId) {
  if (!pizzaId) {
    return pizzas;
  }
  
  const pizza = pizzas.find(pizza => pizza.id === pizzaId);
  
  if (pizza) {
    return pizza;
  }
  
  throw Error('The pizza you requested was not found');
};

module.exports = getPizzas;
