
const db = require("../config/db.config")
const {isEmptyOrNull} = require("../util/service")

const getList = (req,res) => {
    db.query("SELECT * FROM address",(error,rows)=>{
        if(!error){
            res.json({
                list: rows
            })
        }else{
            res.json({
                error: true,
                message : error
            })
        }
    })
}
const getOne = (req,res) => {
    var {id} = req.params
    if(isEmptyOrNull(id)){
        res.json({
            error : true,
            message :{
                id : "Please fill in param id"
            } 
        })
    }
    db.query("SELECT * FROM address WHERE address_id = ?",[id],(error,rows)=>{
       if(!error){
            res.json({
                list : rows,
            })
       }else{
            res.json({
                error : true,
                message : error
            })
       }
    })
}
const create = (req,res) => {
    var { 
        customer_id, 
        province_id, 
        firstname, 
        lastname,
        tel,
        email,
        address_des 
    } = req.body

    var message = {}
    if(isEmptyOrNull(customer_id)){
        message.customer_id = "Parameter customer_id required!"
    }
    if(isEmptyOrNull(province_id)){
        message.province_id = "Parameter province_id required!"
    }
    if(isEmptyOrNull(firstname)){
        message.firstname = "Please fill in fristname!"
    }
    if(isEmptyOrNull(lastname)){
        message.lastname = "Please fill in lastname!"
    }
    if(isEmptyOrNull(tel)){
        message.tel = "Please fill in tel!"
    }
    if(isEmptyOrNull(address_des)){
        message.address_des = "Please fill in address_des!"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return 
    }
    var sql = "INSERT INTO `address` (`customer_id`, `province_id`, `firstname`, `lastname`, `tel`,`email`,`address_des`) VALUES (?,?,?,?,?,?,?)"
    var paramSql = [ customer_id, province_id, firstname, lastname, tel, email, address_des]
    db.query(sql,paramSql,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message : "Address insert success!",
            })
        }
    })
}
const update = (req,res) => {
    var { 
        address_id,
        customer_id, 
        province_id, 
        firstname, 
        lastname,
        tel,
        email,
        address_des 
    } = req.body

    var message = {}
    if(isEmptyOrNull(address_id)){
        message.address_id = "Parameter address_id required!"
    }
    if(isEmptyOrNull(customer_id)){
        message.customer_id = "Parameter customer_id required!"
    }
    if(isEmptyOrNull(province_id)){
        message.province_id = "Parameter province_id required!"
    }
    if(isEmptyOrNull(firstname)){
        message.firstname = "Please fill in fristname!"
    }
    if(isEmptyOrNull(lastname)){
        message.lastname = "Please fill in lastname!"
    }
    if(isEmptyOrNull(tel)){
        message.tel = "Please fill in tel!"
    }
    if(isEmptyOrNull(address_des)){
        message.address_des = "Please fill in address_des!"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return 
    }
    var sql = "UPDATE `address` SET `customer_id`=?, `province_id`=?, `firstname`=?, `lastname`=?, `tel`=?,`email`=?,`address_des`=? WHERE address_id = ?"
    var paramSql = [ customer_id, province_id, firstname, lastname, tel, email, address_des,address_id]
    db.query(sql,paramSql,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message : "Address insert success!",
            })
        }
    })
}
const remove = (req,res) => {
    var {id} = req.params
    db.query("DELETE FROM address WHERE address_id = ? ",[id],(error,rows)=>{
        if(!error){
            res.json({
                message:"Address remove success!"
            })
        }else{
            res.json({
                error:true,
                message : error
            })
        }
    })
}

module.exports = {
    getList,
    getOne,
    create,
    update,
    remove,
}