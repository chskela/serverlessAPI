const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const docCLient = new AWS.DynamoDB.DocumentClient();

function createOrder(request) {
  if (!request || !request.pizza || !request.address) {
    throw new Error('To order pizza please provide pizza type and address where pizza should be delivered.');
  }

  return docCLient.put({
    TableName: 'pizza-orders',
    Item: {
      orderId: uuidv4(),
      pizza: request.pizza,
      address: request.address,
      orderStatus: 'pending'
    }
  }).promise()
    .then(res => {
      console.log('Order is saved!', res);
      return res;
    })
    .catch(saveError => {
      console.log(`Oops? order is not saved :(`, saveError);
      throw saveError;
    });
}

module.exports = createOrder;