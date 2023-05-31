
const contrl = require("../controllers/order_status.controller")
const order_status = (app) => {
    app.get("/api/order-status/get-list",contrl.getList)
}
module.exports = order_status