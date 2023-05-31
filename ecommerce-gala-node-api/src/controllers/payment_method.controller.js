
const db = require("../config/db.config")
const {isEmptyOrNull} = require("../util/service")


const getList = (req,res) => {
    var sql = "SELECT * FROM payment_method"
    var query = req.query
    if(!isEmptyOrNull(query)){
        if(query.text_search != null){
            sql+=" WHERE name LIKE '%"+query.text_search+"%' " 
        }
    }
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

module.exports = {
    getList
}