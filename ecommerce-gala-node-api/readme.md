



#  Authentication
    > npm install bcrypt
        + bcrypt password
            password = bcrypt.hashSync(password,10);
        + compare password
            isCorrect = bcrypt.compareSync(password,dataPassword)
    > npm install jsonwebtoken
        +  
            var access_token = jwt.sign({user:objInfo.user},secret_access_token,{expiresIn:60})
            var refresh_token = jwt.sign({user:objInfo.user},secret_refresh_token,{expiresIn:"1h"})
        + generate token
            const generateAccessToken = (obj_inof) =>{
                return jwt.sign(obj_inof,config.key_access_token,{expiresIn:"1h"})
            }
        + validat token
            const validateToken = (req,res,next) => {
                var AuthHeader = req.headers["authorization"]
                if(AuthHeader){
                    AuthHeader = AuthHeader.split(" ");
                    var token = AuthHeader[1]
                    jwt.verify(token,config.key_access_token,(err,obj_info)=>{
                        if(!err){
                            req.user = obj_info.user
                            next();
                        }else{
                            res.json({
                                error:true,
                                message : "Invalid token"
                            })
                        }
                    })
                }else{
                    res.json({
                        error:true,
                        message : "Please fill in token"
                    })
                }
            }
# Updload file/image
    + Install new libray
        > npm install multer
