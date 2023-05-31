const express = require("express")
const app = express()
const cors = require("cors")
const bodyPaser = require("body-parser")


app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({extended:false}))
app.use(cors({origin : "*"}))


app.get("/",(req,res)=>{
    res.send("Hello api")
}) 


require("./src/routes/customer.route")(app)
require("./src/routes/category.route")(app)
require("./src/routes/address.route")(app)
require("./src/routes/product.route")(app)
require("./src/routes/cart.route")(app)
require("./src/routes/order.route")(app)
require("./src/routes/wishlist.route")(app)

require("./src/routes/payment_method.route")(app)
require("./src/routes/order_status.route")(app)

const port = 8080
app.listen(port,()=>{
    console.log("running http://localhost:"+port)
    // console.log(`http://localhost:${port}`)
})
