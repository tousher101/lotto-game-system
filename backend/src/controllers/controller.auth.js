const {body,validationResult}=require('express-validator')
const authService=require('../services/service.auth')

const createAdmin= async(req,res)=>{
const errors = validationResult(req); 
        if (!errors.isEmpty()) {
         return res.status(400).json({ msg: 'Something Went Wrong. Check Your Information', errors: errors.array() });}
         try{
            const result=await authService.addNewAdmin(req.body);
            res.status(200).json(result)
         }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const loginControl= async(req,res)=>{
    try{
    const result= await authService.login(req.body);
    res.status(200).json(result)
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

const refreshForAgentControll=async(req,res)=>{
    try{
        const result= await authService.refreshForAgent(req.cookies.refreshToken)
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
}







module.exports={createAdmin,loginControl,refreshControl,agentLoginControll,refreshForAgentControll}