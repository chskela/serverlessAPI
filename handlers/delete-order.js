function deleteOrder(orderId) {
  if (!orderId) {
    throw new Error('Order ID is required for deleting the order');
  }

  return {};
}

module.exports = deleteOrder;