const jwt = require('jsonwebtoken');


generateToken = (req,res) => {
    try{
       const user = req.user;
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "15s"});
        return token;
    }
    catch (err){
        return res.status(400).json({ status: 400, message: err.message });
    }

    
}

authenticateToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    console.log("in authenticate token of authMIddleware.js " + token);

    if(token == null)
        return res.status(401).send("Token is required.... ");   
        try
          {
            var user = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)        
            req.user = user; 
            //console.log("user = " + JSON.stringify(req.user));
            next();   

          }
          catch (err){
            return res.status(403).send(err + " i.e. Forbidden Access (Token Expired).... ");    
          }
        
 
}

module.exports = {
     generateToken,
     authenticateToken,
 }