
const contrl = require("../controllers/category.controller")
const {upload} = require("../util/service")
const category = (app) => {
    app.get("/api/category/get-list",contrl.getList)
    app.get("/api/category/get-one/:id",contrl.getOne)
    app.post("/api/category/create",upload.single("image"),contrl.create)
    app.put("/api/category/update",upload.single("image"),contrl.update)
    app.delete("/api/category/remove/:id",contrl.remove)
}
module.exports = category