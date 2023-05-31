
const db = require("../config/db.config")
const {isEmptyOrNull} = require("../util/service")


const getList = (req,res) => {
    var sql = "SELECT * FROM category"
    var query = req.query
    if(!isEmptyOrNull(query)){
        if(query.text_search != null){
            sql+=" WHERE name LIKE '%"+query.text_search+"%' " 
        }
    }
    sql += " ORDER BY category_id DESC"
    db.query(sql,(error,rows)=>{
        if(!error){
            res.json({
                list: rows,
                param : req.query
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
    db.query("SELECT * FROM category WHERE category_id = ?",[id],(error,rows)=>{
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
    var {name,description,parent_id,create_by} = req.body
    var message = {}
    if(isEmptyOrNull(name)){
        message.name = "Please fill in category name!"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return 
    }

    var image = null 
    if(req.file?.filename){
        image = req.file?.filename
    }

    var sql = "INSERT INTO `category`(`name`, `description`, `parent_id`, `image`, `create_by`) VALUES (?,?,?,?,?)"
    db.query(sql,[name,description,parent_id,image,create_by],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message : "Category insert success!",
            })
        }
    })
}
const update = (req,res) => {
    var {category_id,name,description,parent_id,create_by} = req.body
    var message = {}
    if(isEmptyOrNull(category_id)){
        message.category_id = "Parameter required!"
    }
    if(isEmptyOrNull(name)){
        message.name = "Please fill in category name!"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return 
    }

    var image = null 
    if(req.file?.filename){
        image = req.file?.filename
    }
    var sql = "UPDATE `category` SET `name` = ?, `description` = ?, `parent_id` = ?, `image` = IFNULL(?,image) WHERE category_id = ?"
    db.query(sql,[name,description,parent_id,image,category_id],(error,rows)=>{
        if(error){
            res.json({
                error : true,
                message : error
            })
        }else{
            res.json({
                message : "Category update success!",
            })
        }
    })
}
const remove = (req,res) => {
    var {id} = req.params
    db.query("DELETE FROM category WHERE category_id = ? ",[id],(error,rows)=>{
        if(!error){
            res.json({
                message:"Category remove success!"
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