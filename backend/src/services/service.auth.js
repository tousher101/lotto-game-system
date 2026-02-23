const prisma=require('../lib/prisma')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')



const addNewAdmin= async({body})=>{
          const {name,email,password,userName, secCode,phone}=body;
            if(!name||!password||!userName|| !email || !secCode||!phone){throw{message:'All field required', status:400}}
            if(secCode !== process.env.ADMIN_SECRET_CODE){throw {message:'Admin Secret Code Not Correct', status:400}}
            const existing= await prisma.user.findFirst({where:{OR:[{email},{userName},{phone}]}})
            if(existing){throw{message:'Email or Username Already Exsist',status:401}}
            const salt= await bcrypt.genSalt(10)
            const secPass= await bcrypt.hash(password,salt)
            await prisma.user.create({
                data:{name,userName, email,password:secPass, role:'ADMIN', phone}
            });
            return {message:'Admin Create Successfully'}
};

const login=async(data)=>{
    
     const {userName,password}=data
        const user= await prisma.user.findUnique({
            where:{userName}
        });

        if(!user){throw{message:'User Not Found', status:404}}
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){throw{message:'Invalid username or password', status:400}}
        const payload={id:user.id,role:user.role,branch:user.branchId}
        const accessToken=jwt.sign(payload, process.env.JWT_ACCESS_SECRATE,{expiresIn:'15m'})
        const refreshToken=jwt.sign(payload,process.env.JWT_REFRESH_SECRATE,{expiresIn:'7d'})
        return {accessToken,refreshToken,payload}
    
};

const refresh=async(data)=>{
         const refreshToken= data
            if(!refreshToken){throw{message:'No Refresh Token',status:401}}
            const decode= jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRATE)
            const payload= {id:decode.id, role:decode.role}
            const accessToken=jwt.sign(payload,process.env.JWT_ACCESS_SECRATE,{expiresIn:'15m'});
            return  accessToken
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
    const accessToken=jwt.sign(payload, process.env.JWT_AGENT_ACCESS_SECRATE,{expiresIn:'7d'})
    return {accessToken,id:agent.id, branch:agent.branchId, cashier:agent.cashierId, message:'Login Success!'}
};

const agentChangePassword=async({body,user})=>{
    const {oldPassword,newPassword}=body;
    const{agentId}=user;
    if(!oldPassword||!newPassword){throw{message:'All Fields Required', status:400}}
    const loginAgent= await prisma.agent.findUnique({
        where:{id:Number(agentId)}
    });

    if(!loginAgent){throw{message:'Agent Not Found', status:404}}
    const isMatch= await bcrypt.compare(loginAgent.password,oldPassword)
    if(!isMatch){throw{message:'Password Not Matched',status:400}}
    const salt= await bcrypt.genSalt(10)
    const secPass= await bcrypt.hash(newPassword,salt)
    await prisma.agent.update({
        where:{id:loginAgent.id},
        data:{password:secPass}
    });
    return {message:'Password Change Successfully'}
};

const userForgetPassword=async(data)=>{
    const {userName, newPassword}=data;
    if(!userName||!newPassword){throw{message:'All required', status:400}}
    const user= await prisma.user.findFirst({
        where:{userName}
    });
    if(!user){throw{message:'User Not Found', status:404}}
    const salt= await bcrypt.genSalt(10)
    const secPass= await bcrypt.hash(newPassword,salt)
    await prisma.user.update({
        where:{id:user.id},
        data:{password:secPass}
    });
    return {message:'Password Changed Successfully'}
};

const getAllUserInfo=async(data)=>{    
const {id}=data
const User= await prisma.user.findUnique({
    where:{id:Number(id)}
});
if(!User){throw{message:'User Not Found',status:404}}
const userData= await prisma.user.findUnique({
    where:{id:User.id},
    select:{
        name:true,email:true,phone:true,id:true, userName:true, role:true,
        branch:{
            select:{
                name:true
            }
        }
    }
});
return userData
}








module.exports={addNewAdmin,login,refresh, agentLogin, agentChangePassword, userForgetPassword, getAllUserInfo}