const multer = require("multer")
const { upload } = require('../util/service')
// const image_path = "C:/xampp/htdocs/image_path/ecm_backend_g1/"
// const storage = multer.diskStorage({
//     destination : function (req,file,callback){
//         callback(null,image_path)
//     },
// })
// const upload = multer({
//     storage : storage,
//     limits : {
//         fileSize : 1024*1024*3
//     }
// })
// arrow function

const customerController = require("../controllers/customer.controller")
const customer = (app) => {
    app.get("/api/customer/get-list",customerController.getList)
    app.post("/api/customer/create",upload.single("myfile"),customerController.create)
    app.post("/api/customer/upload-image",upload.single("myfile"),customerController.uploadImage)
    app.post("/api/customer/login",customerController.login)
    app.put("/api/customer/update",upload.single("myfile"),customerController.update)
    app.get("/api/customer/get-cart",customerController.getCart)
    app.delete("/api/customer/delete/:id",customerController.remove)
}


module.exports = customer
