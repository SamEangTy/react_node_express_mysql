var data = ["C++","C#","C++","C#","C++","C#"]
const db = require("../config/db.config");
const { Config } = require("../util/service");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config();

const getList = async  (req,res) => {
    
    const list1 = await db.query("SELECT * FROM customers");
    db.query("SELECT * FROM customers",(err,result)=>{
        res.json({
            list_customer:result,
            list1 : list1
        })
    })
   
    return 
    // ASC a-z. DESC z-a
    // column ? , order (ASC,DESC) ?
    var query = req.query;
    var text_search =  query.text_search
    var page =  query.page
    var sqlSelect = "SELECT * FROM customers"
    if(text_search != null){
        sqlSelect += " WHERE firstname LIKE '%"+text_search+"%' "
    }
    
    sqlSelect += " ORDER BY customer_id DESC"
    var offset = (page - 1) * Config.pagination
    // page 1 => (1-1) * 4 => 0
    // page 2 => (2-1) * 4 => 4
    sqlSelect += " LIMIT "+offset+","+Config.pagination+" "
    db.query(sqlSelect,(e,rows)=>{
        db.query("SELECT count(customer_id) as total FROM customers",(e1,row1)=>{
            var total_record = row1[0].total
            res.json({
                total_record:total_record,
                pagination : Config.pagination,
                // total_page:Math.ceil(total_record/Config.pagination),
                list_customer : rows,
                token : "eee"+process.env.USER_ID
            })
        })
    })
}

const getCart = (req,res) => {
    var authorization = req.headers.authorization;
    var token_from_client = null
    if(authorization != null && authorization != ""){
        token_from_client = authorization.split(" ")
        token_from_client = token_from_client[1]
    }

    if(token_from_client == null){
        res.json({
            error: true,
            message : "You have permission access this method!"
        })
    }else{
        jwt.verify(token_from_client,process.env.KEY_ACCESS_TOKEN,(err,data)=>{
            if(err){
                res.json({
                    error: true,
                    message : "Invalid token!"
                })
            }else{
                res.json({
                    cart : []
                })
            }
        })
    }
}

const uploadImage =  (req,res) => {
    // aaaa
    res.json({
        body : req.body,
        file : req.file
    })
}

const create =  (req,res) => {
    // get parameter from client site
    var body = req.body
    console.log(body)
    if(body.firstname == null || body.firstname == ""){
        res.json({
            error:true,
            message : "Please fill in firstname"
        })
        return false
    }
    if(body.lastname == null || body.lastname == ""){
        res.json({
            error:true,
            message : "Please fill in lastname"
        })
        return false
    }

    // username = email or tel // 
   
    if(body.username == null || body.username == ""){
        res.json({
            error:true,
            message : "Please fill in username"
        })
        return false
    }else{
        // username  is email or tel 
        // ifEmail username store in column email
        // ifTel username store in column tel
    }

    if(body.password == null || body.password == ""){
        res.json({
            error:true,
            message : "Please fill in password"
        })
        return false
    }

    var image = null
    if(req.file){
        image = req.file.filename
    }

    

    db.query("SELECT * FROM customers WHERE email = ?", [body.username] , (err,rows)=>{
        if(err){
            res.json({
                error:true,
                message : err
            })
        }else{
            if(rows.length == 0){
                // can create new account
                var password = bcrypt.hashSync(body.password,10)
                var sqlInsert = "INSERT INTO customers ( firstname, lastname, gender, dob, tel, email, password, image, is_active) VALUES (?,?,?,?,?,?,?,?,?)"
                db.query(sqlInsert,[body.firstname, body.lastname, body.gender, body.dob, body.tel, body.username, password, image, body.is_active],(error,rows)=>{
                    if(error){
                        res.json({
                            error : true,
                            message : error
                        })
                    }else{
                        res.json({
                            message : "Customer inserted!",
                            data : rows
                        })
                    }
                })

            }else{
                res.json({
                    error:true,
                    message : "Account already exist!"
                })
                // can not create new accoute
            }
        }
    })

    
}

const login = (req,res) => {
    // var username = req.body.username
    // var password = req.body.password
    var {username,password}  = req.body;
    if(username == null || username == ""){
        res.json({
            error : true,
            message : "Please fill in username!"
        })
        return 
    }else if(password == null || password == ""){
        res.json({
            error : true,
            message : "Please fill in password!"
        })
        return 
    }

    db.query("SELECT * FROM customers WHERE email = ?",[username],(err,result)=>{
        if(err){
            res.json({
                error : true,
                message : err
            })
        }else{
            if(result.length == 0){
                res.json({
                    error : true,
                    message : "User dose not exist. Please register!"
                })
            }else{
                var data = result[0]
                var passwordInDb = data.password;

                var isCorrectPassword = bcrypt.compareSync(password,passwordInDb) // true/false
                if(isCorrectPassword){
                    delete data.password;
                    data.username = data.email
                    var token = jwt.sign({profile:data},process.env.KEY_ACCESS_TOKEN)
                    res.json({
                        is_login : true,
                        message : "Login success!",
                        profile : data,
                        token : token
                    })
                }else{
                    res.json({
                        message : "Incorrect password!"
                    })
                }
            }
        }
    })
}

const update = (req,res) => {
    var body = req.body
    if(body.firstname == null || body.firstname == ""){
        res.json({
            error:true,
            message : "Please fill in firstname"
        })
        return false
    }
    if(body.lastname == null || body.lastname == ""){
        res.json({
            error:true,
            message : "Please fill in lastname"
        })
        return false
    }

    var image = null
    if(req.file){
        image = req.file.filename
    }
    var sqlUpdate = "UPDATE customers SET firstname=?, lastname=?, gender=?, dob=?, tel=?, email=?, is_active=?, image=IFNULL(?, image) WHERE customer_id = ?"
    db.query(sqlUpdate,[body.firstname, body.lastname, body.gender, body.dob, body.tel, body.email, body.is_active, image, body.customer_id],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message : "Customer updated!",
                data : rows
            })
        }
    })
}

const remove = (req,res) => { 
    db.query("DELETE FROM customers WHERE customer_id = "+req.params.id,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            if(rows.affectedRows !=0 ){
                res.json({
                    message : "Customer deleted!",
                    data : rows
                })
            }else{
                res.json({
                    message : "Delete not complete. Customer not found"
                })
            }
           
        }
    })
}

module.exports = {
    getList,
    create,
    update,
    remove,
    login,
    getCart,
    uploadImage
}