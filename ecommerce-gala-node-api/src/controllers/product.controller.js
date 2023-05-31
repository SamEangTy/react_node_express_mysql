
const db = require("../config/db.config")
const {isEmptyOrNull} = require("../util/service")

const getList = async (req,res) => {

    var sql = "SELECT " +
	" p.*, "+
    " c.name as category_name "+
    " FROM product p  "+
    " INNER JOIN category c ON p.category_id = c.category_id "

    var query = req.query
    if(!isEmptyOrNull(query)){
        if(query.text_search != null){
            sql+=" WHERE p.name LIKE '%"+query.text_search+"%' OR  p.name LIKE '%"+query.text_search+"%'" 
        }
    }
    sql += " ORDER BY p.product_id DESC "
    
    
    var list_category = await db.query("SELECT * FROM category")

    db.query(sql, (error,rows)=>{
        if(!error){
            res.json({
                list: rows,
                list_category : list_category
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
    db.query("SELECT * FROM product WHERE product_id = ?",[id],(error,rows)=>{
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
        category_id,
        name,
        barcode ,
        price ,
        quantity,
        image,
        description,
        status,
        create_by
    } = req.body

    var message = {}
    if(isEmptyOrNull(category_id)){
        message.category_id = "Parameter category_id required!"
    }
    if(isEmptyOrNull(name)){
        message.name = "Please fill in product name!"
    }
    if(isEmptyOrNull(barcode)){
        message.barcode = "Please fill in barcode!"
    }
    if(isEmptyOrNull(price)){
        message.price = "Please fill in price!"
    }
    if(isEmptyOrNull(quantity)){
        message.quantity = "Please fill in quantity!"
    }
    if(isEmptyOrNull(create_by)){
        message.create_by = "Parameter create_by required!"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return 
    }
    var image = null 
    if(req.file){
        image = req.file.filename
    }
    var sql = "INSERT INTO `product` (`category_id`, `name`, `barcode`, `price`, `quantity`,`image`,`description`,`status`,`create_by`) VALUES (?,?,?,?,?,?,?,?,?)"
    var paramSql = [ 
        category_id,
        name,
        barcode ,
        price ,
        quantity,
        image,
        description,
        status,
        create_by
    ]
    db.query(sql,paramSql,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message : "Product insert success!",
            })
        }
    })
}
const update = (req,res) => {
    var { 
        product_id,
        category_id,
        name,
        barcode ,
        price ,
        quantity,
        image,
        description,
        status,
        create_by
    } = req.body

    var message = {}
    if(isEmptyOrNull(product_id)){
        message.product_id = "Parameter product_id required!"
    }
    if(isEmptyOrNull(category_id)){
        message.category_id = "Parameter category_id required!"
    }
    if(isEmptyOrNull(name)){
        message.name = "Please fill in product name!"
    }
    if(isEmptyOrNull(barcode)){
        message.barcode = "Please fill in barcode!"
    }
    if(isEmptyOrNull(price)){
        message.price = "Please fill in price!"
    }
    if(isEmptyOrNull(quantity)){
        message.quantity = "Please fill in quantity!"
    }
    if(isEmptyOrNull(create_by)){
        message.create_by = "Parameter create_by required!"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return 
    }
    var image = null 
    if(req.file){
        image = req.file.filename
    }
    var sql = "UPDATE `product` SET `category_id`=?, `name`=?, `barcode`=?, `price`=?, `quantity`=?,`image`=IFNULL(?,image),`description`=?,`status`=? ,`create_by`= ? WHERE product_id = ?"
    var paramSql = [ 
        category_id,
        name,
        barcode ,
        price ,
        quantity,
        image,
        description,
        status,
        create_by,
        product_id
    ]
    db.query(sql,paramSql,(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message : "Product update success!",
            })
        }
    })
}
const remove = (req,res) => {
    var {id} = req.params
    db.query("DELETE FROM product WHERE product_id = ? ",[id],(error,rows)=>{
        if(!error){
            res.json({
                message:"Product remove success!"
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