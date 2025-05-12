const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

router.get("/", ordersController.getAllOrders);
router.get("/:id", ordersController.getOrderById);
router.post("/", ordersController.createOrder);
router.put("/:id", ordersController.updateOrder);
router.delete("/:id", ordersController.deleteOrder);

app.get('/api/orders', (req, res) => {
  connection.query('SELECT * FROM orders', (err, results) => {
    if (err) {
      console.error(err); // 👈 este mensaje queremos ver en los logs
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }
    res.json(results);
  });
});

module.exports = router;
