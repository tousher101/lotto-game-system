
const authService=require('../services/service.auth')

const createAdminControll= async(req,res)=>{
         try{
            const result=await authService.addNewAdmin({body:req.body});
            res.status(200).json(result)
         }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const loginControl= async(req,res)=>{
    try{
        
    const result= await authService.login(req.body);
    res.cookie('refreshToken',result.refreshToken,{httpOnly:true, secure:false, sameSite:'Lax',path:'/', maxAge: 7*24*60*60*1000})
        res.status(200).json({message:'Login Successful', result})
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const refreshControl=async(req,res)=>{
    try{
        const result= await authService.refresh(req.cookies.refreshToken);
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const agentLoginControll= async(req,res)=>{
    try{
        const result= await authService.agentLogin(req.body)
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const agentChangePasswordControll= async(req,res)=>{
    try{
        const result= await authService.agentChangePassword({body:req.body, user:req.user})
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const userForgetPasswordControll=async(req,res)=>{
    try{
        const result= await authService.userForgetPassword(req.body)
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const logOutControll= async(req,res)=>{
try{
    res.clearCookie('refreshToken',{
        httpOnly:true, secure:false, sameSite:'Lax',path:'/'
    });
    res.status(200).json({message:'LogOut Successful'})
}catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const getAllUserInfoControll=async(req,res)=>{
    try{
        const result= await authService.getAllUserInfo(req.user)
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
}











module.exports={createAdminControll,loginControl,refreshControl,agentLoginControll,agentChangePasswordControll,userForgetPasswordControll,logOutControll,
    getAllUserInfoControll
}