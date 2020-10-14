const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

function deleteOrder(orderId) {
  if (!orderId) {
    throw new Error('Order ID is required for deleting the order');
  }

  return docClient.delete({
    TableName: 'pizza-orders',
    Key: {
      orderId: orderId
    },
    ConditionExpression: "orderStatus = :orderStatus",
    ExpressionAttributeValues: {
      ':orderStatus': 'pending'
    },
  }).promise()
    .then(res => {
      console.log('Order is deleted!', res);
      return res;
    })
    .catch(deleteError => {
      console.log(`Oops? order is not deleted :(`, deleteError);
      throw deleteError;
    });
}

module.exports = deleteOrder;