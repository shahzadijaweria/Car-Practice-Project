const User= require('../Model/Users');
const bcrypt = require('bcrypt');
const authMiddleware = require("../MIddleware/authMiddleware");


createUser  = async (req,res) => {
    const name = req.body.name;
    const age = req.body.age;
    const cnic = req.body.cnic;
    const email = req.body.email;
    const password = req.body.password;
    try{
         // Encryption of password

         const salt = await bcrypt.genSalt();  // generate salt of by default value
        const hashedPassword = await bcrypt.hash(password, salt); // 10 is by default val of salt
        
        const newUser = new User({
            name: name,
            age: age,
            cnic: cnic,
            email: email,
            password: hashedPassword   // encrypted password stored

        }) 
    
          //console.log("new user: " + newUser);
          await newUser.save();       
          return res.status(200).send("User added " + JSON.stringify(newUser));

    }
    catch (err){
        return res.status(400).send(err);

    }
}

login = async (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;

    let user = {username: email, userId : ""};


    try{
        if (email ==="" || password ==="")
            return res.status(400).send("Please enter credentials ....")
        else
        {            
            let findUser = await User.find({email: email}); 
            if (findUser.length == 0){
                findUser = "Unauthorized user.... You don't have an account yet. Sign up first!";
                return res.status(401).send(findUser);
            }
            else { 
                user.userId = findUser[0]._id;  // save id of user in payload

                req.user = user;

                let  userEncryptedPassword = findUser[0].password;  // destructuring
                
                if (await bcrypt.compare(password, userEncryptedPassword) ){
                    
                    const token = authMiddleware.generateToken(req,res);
                  
                     res.status(200).send( "token: " +token); 
                }
                else {
                    findUser  =  "Password is incorrect.... ";
                    return res.status(401).send( findUser );
                }
            }
        }    
        
    }
    catch (err){
        //console.log("catch block of userController ");
        return res.status(400).json({ status: 400, message: err.message });
    }
    next();
    
}

module.exports = {
    createUser,
    login
}