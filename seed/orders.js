db.dropDatabase();

const orders = [
  {
    customerName: "Vincent Vega",
    customerPhoneNumber: "+17654532001",
    status: "Ready",
    notificationStatus: "None",
  },
  {
    customerName: "Mia Wallace",
    customerPhoneNumber: "+17654532002",
    status: "Ready",
    notificationStatus: "None",
  },
];

db.orders.insert(orders);
