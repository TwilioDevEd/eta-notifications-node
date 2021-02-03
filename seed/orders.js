db.dropDatabase();

const orders = [
  {
    customerName: "Vincent Vega",
    customerPhoneNumber: "+61490915488",
    status: "Ready",
    notificationStatus: "None",
  },
  {
    customerName: "Mia Wallace",
    customerPhoneNumber: "+61490915488",
    status: "Ready",
    notificationStatus: "None",
  },
];

db.orders.insert(orders);
