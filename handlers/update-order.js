const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

function updateOrder(orderId, options) {
  if (!orderId || !options || !options.pizza || !options.address) {
    throw new Error('Order ID and updates object are required for updating the order');
  }

  return docClient.update({
    TableName: 'pizza-orders',
    Key: {
      orderId: orderId
    },
    UpdateExpression: 'set pizza = :p, address=:a',
    ConditionExpression: "orderStatus = :orderStatus",
    ExpressionAttributeValues: {
      ':p': options.pizza,
      ':a': options.address,
      ':orderStatus': 'pending'
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