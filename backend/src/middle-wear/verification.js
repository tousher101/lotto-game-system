const jwt=require('jsonwebtoken');


const verification=(req,res,next)=>{
   try{
    
      const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'No or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRATE);
    req.user = decoded;
    next();
    }catch(err){console.error(err); res.status(403).json({msg:'Invalid Token'})}
}

module.exports=verification