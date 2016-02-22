db.dropDatabase();

var orders = [
  { customerName: 'Vincent Vega',   customerPhoneNumber: '+15551234321' },
  { customerName: 'Mia Wallace',   customerPhoneNumber: '+15551239483' },
];

db.orders.insert(orders);
