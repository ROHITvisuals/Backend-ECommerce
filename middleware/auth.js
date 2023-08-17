const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser =  async (req, res , next) => {
    
        
    
    const token = req.cookies.token; 




    if (!token) { 
              
        res.json({
            success:false,
            Error_message:"No Token , please please login to access this resourse, 401",
            user:null
        })
     
        return "unhandle error"
    }
    const decodeData = jwt.verify(token , process.env.JWT_SECRET             
        ,function (err , decoded) {
          if (err) {
            res.cookie("token", null, {             // if token in browser cookie
                expires: new Date(Date.now()),
                httpOnly: true
            })
            res.json({
                success:false,
                Error_message:"No Token ,  please Login Again to access this resourse",
                user:null
            })
         }
         return decoded
     }   
     )

    if (decodeData) {
        req.user = await User.findById(decodeData._id)
        next()
    }else{
        return
    }

}

exports.authorizeRoles = (...roles)=>{
    return (req , res , next )=>{
        if (!roles.includes(req.user.role)) {                      
            res.send(`Role ${req.user.role} is not allowed to acces the resourses , 403`)
            return "unhandle error"
        }
        next();
    }
}



