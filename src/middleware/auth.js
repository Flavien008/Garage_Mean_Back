const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       console.log("idUser from token"+userId)
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({  message: 'Token invalid or expired!'  });
       console.log(error);
   }
};