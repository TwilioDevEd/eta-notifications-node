db.dropDatabase();

var orders = [
  { customerName: 'Vincent Vega',   customerPhoneNumber: '+593999760268',  status : 'Ready', notificationStatus : 'None' },
  { customerName: 'Mia Wallace',   customerPhoneNumber: '+15551239483' , status : 'Ready', notificationStatus : 'None'  },
];

db.orders.insert(orders);
