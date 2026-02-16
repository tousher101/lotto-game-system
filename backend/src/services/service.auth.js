const prisma=require('../lib/prisma')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')






const addNewAdmin= async(data)=>{
          const {name,email,password,userName, secCode}=data;
            if(!name||!password||!userName|| !email || !secCode){return res.status(400).json({msg:'All field requierd'})}
            if(secCode !== process.env.ADMIN_SECRET_CODE){return res.status({msg:'Invalid secret code!'})}
            const existing= await prisma.user.findFirst({where:{OR:[{email},{phone}]}})
            if(existing){return res.status(401).json({msg:'Admin with this email or phone already exists'})}
            const salt= await bcrypt.genSalt(10)
            const secPass= await bcrypt.hash(password,salt)
            await prisma.user.create({
                data:{name, email,phone,password:secPass, role:'ADMIN'}
            });
            return res.status(200).json({msg:'Admin create sucess fully'})
};

const login=async(data)=>{
     const {userName,password}=data
        const user= await prisma.user.findUnique({
            where:{userName}
        });

        if(!user){return res.status(404).json({msg:'User not found'})}
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){return res.status(400).json({msg:'Invalid Email or Password'})}
        const payload={id:user.id,role:user.role,branch:user.branchId}
        const accessToken=jwt.sign(payload, process.env.JWT_ACCESS_SECRATE,{expiresIn:'15m'})
        const refreshToken=jwt.sign(payload,process.env.JWT_REFRESH_SECRATE,{expiresIn:'7d'})
        res.cookie('refreshToken',refreshToken,{httpOnly:false, secure:false, sameSite:'none',path:'/', maxAge: 7*24*60*60*1000})
        return res.status(200).json({accessToken, role:user.role, branch:user.branchId})
};

const refresh=async(data)=>{
         const refreshToken= data
            if(!refreshToken){return res.status(401).json({msg:'No Refresh Token'})}
            const decode= jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRATE)
            const payload= {id:decode.id, role:decode.role}
            const accessToken=jwt.sign(payload,process.env.JWT_ACCESS_SECRATE,{expiresIn:'15m'});
            return  res.status(200).json({accessToken})
};


const agentLogin= async(data)=>{
    const {userName,password}=data;
    const agent= await prisma.agent.findUnique({
        where:{userName}
    });
    if(!agent){throw{message:'Agent Not Found',status:404}}
    const isMatch= await bcrypt.compare(password,agent.password);
    if(!isMatch){throw{message:'Invalid Username or Password',status:400}}
    const payload= {id:agent.id,branch:agent.branchId,cashier:agent.cashierId}
    const accessToken=jwt.sign(payload, process.env.JWT_AGENT_ACCESS_SECRATE,{expiresIn:'15m'})
    const refreshToken=jwt.sign(payload,process.env.JWT_AGENT_REFRESH_SECRATE,{expiresIn:'7d'})
    res.cookie('refreshToken',refreshToken,{httpOnly:false, secure:false, sameSite:'none',path:'/', maxAge: 7*24*60*60*1000})
    return {accessToken, branch:agent.branchId, cashier:agent.cashierId}
};

const refreshForAgent=async(data)=>{
    const refreshToken= data
     if(!refreshToken){throw {message:'No Refresh Token',status:400}}
        const decode= jwt.verify(refreshToken,process.env.JWT_AGENT_REFRESH_SECRATE)
        const payload= {id:decode.id, branch:decode.branchId, cashier:decode.cashierId}
        const accessToken=jwt.sign(payload,process.env.JWT_AGENT_ACCESS_SECRATE,{expiresIn:'15m'});
        return  accessToken

}







module.exports={addNewAdmin,login,refresh, agentLogin, refreshForAgent}