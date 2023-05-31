const multer = require("multer")

const Config = {
    pagination : 10,
    image_path : "C:/xampp2/htdocs/image_path/ecm_backend_g1/"
}

const isEmptyOrNull = (value) => {
    if(value == "" || value == null || value == "null"){
        return true
    }
    return false
}


const upload = multer({
    storage : multer.diskStorage({
        destination : function (req,file,callback){
            callback(null,Config.image_path)
        },
    }),
    limits : {
        fileSize : 1024*1024*3
    }
})


module.exports = {
    Config,
    isEmptyOrNull,
    upload
}