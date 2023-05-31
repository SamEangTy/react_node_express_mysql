const contrl = require("../controllers/order.contoller")
const order = (app) => {
    app.get("/api/order/get-list",contrl.getList)
    app.get("/api/order/get-one",contrl.getOne)
    app.post("/api/order/create",contrl.create)
    app.put("/api/order/update",contrl.update)
    app.delete("/api/order/remove",contrl.remove)
    app.get("/api/order/detail/:id",contrl.getOrderDetail)
    
}
module.exports = order