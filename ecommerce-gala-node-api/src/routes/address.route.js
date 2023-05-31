
const contrl = require("../controllers/address.controller")
const address = (app) => {
    app.get("/api/address/get-list",contrl.getList)
    app.get("/api/address/get-one/:id",contrl.getOne)
    app.post("/api/address/create",contrl.create)
    app.put("/api/address/update",contrl.update)
    app.delete("/api/address/remove/:id",contrl.remove)
}
module.exports = address