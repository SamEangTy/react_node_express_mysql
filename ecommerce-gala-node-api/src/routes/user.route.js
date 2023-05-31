const user = (app) => {
    app.get("/api/user/getList",(req,res)=>{
        res.send("getList user")
    })
    app.get("/api/user/create",(req,res)=>{
        res.send("create user")
    })
    app.get("/api/user/upate",(req,res)=>{
        res.send("upate user")
    })
    app.get("/api/user/delete",(req,res)=>{
        res.send("delete user")
    })
}

module.exports = user