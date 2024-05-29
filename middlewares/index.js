const jwt = require('jsonwebtoken');
const multer = require('multer');
require('dotenv').config();

//set multer Storage
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads'); // Specific route where image will be saved 
    },
    filename: function(req, file, cb) {
        cb(null, Date.now()+ '-'+ file.originalname); // it generates uniquie names for images
    }
});

// instance for multer
const upload = multer({ storage : storage});


const verifyUser = (req,res,next) => {
    const bearerHeader = req.headers['authorization'];
    // console.log("this the token",bearerHeader)
    if(typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(bearerToken, process.env.SECRET_KEY, async(err,authData) =>{
            if (err){
                return  res.status(400).json({msg: 'Invalid Token'});
            } else{
                req.user = authData,
                next();

            }
        })

    } else{
        return res.status(500).json({msg: 'Token Not Found'});
    }
};


const verifyAdmin = (req,res,next) => {
    const bearerHeader = req.headers['authorization'];
    // console.log("this the token",bearerHeader)
    if(typeof bearerHeader !== "undefined"){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(bearerToken, process.env.SECRET_KEY, async(err,authData) =>{
            if (err){
                return  res.status(400).json({msg: 'Invalid Token'});
            } else{
                req.user = authData,
                next();

            }
        })

    } else{
        return res.status(500).json({msg: 'Token Not Found'});
    }
};


module.exports = {
    verifyUser,
    verifyAdmin,
    upload
}