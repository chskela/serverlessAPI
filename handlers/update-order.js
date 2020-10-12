const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const docClient = new AWS.DynamoDB.DocumentClient();

function updateOrder(orderId, options) {
  if (!orderId || !options || !options.pizza || !options.address) {
    throw new Error('Order ID and updates object are required for updating the order');
  }

  return docClient.update({
    TableName: 'pizza-orders',
    Key: {
      orderId: id
    }, 
    UpdateExpression: 'set pizza = :p, address=:a',
    ExpressionAttributeValues: {
      ':p': options.pizza, 
      ':a': options.address
    },
    ReturnValues: 'ALL_NEW'
  }).promise()
  .then(res => {
    console.log('Order is updated!', res);
    return res;
  })
  .catch(updateError => {
    console.log(`Oops? order is not updated :(`, updateError);
    throw updateError;
  });
}

module.exports = updateOrder;