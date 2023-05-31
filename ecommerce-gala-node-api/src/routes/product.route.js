

const contrl = require("../controllers/product.controller")
const {upload}  = require("../util/service")
// array
const product = (app) => {
    app.get("/api/product/get-list",contrl.getList)
    app.get("/api/product/get-one/:id",contrl.getOne)
    app.post("/api/product/create",upload.single("image"),contrl.create)
    app.put("/api/product/update",upload.single("image"),contrl.update)
    app.delete("/api/product/remove/:id",contrl.remove)
}
module.exports = product