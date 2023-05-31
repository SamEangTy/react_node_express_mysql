
const contrl = require("../controllers/wishlist.controller")
const wishlist = (app) => {
    app.get("/api/wishlist/get-list/:id",contrl.getList)
    app.get("/api/wishlist/get-one/:id",contrl.getOne)
    app.post("/api/wishlist/create",contrl.create)
    app.put("/api/wishlist/update",contrl.update)
    app.delete("/api/wishlist/remove/:id",contrl.remove)
}
module.exports = wishlist