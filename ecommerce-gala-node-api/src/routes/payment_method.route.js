
const contrl = require("../controllers/payment_method.controller")
const payment_method = (app) => {
    app.get("/api/payment-method/get-list",contrl.getList)
}
module.exports = payment_method