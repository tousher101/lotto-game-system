const agentService=require('../services/service.agent')

const bettingByAgentControll= async(req,res)=>{
    try{
        const result= await agentService.bettingByAgent({user:req.user,body:req.body})
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const getBetSlipControll= async(req,res)=>{
    try{
        const result= await agentService.getBetSlip(req.params);
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const getAllBetByAgentControll=async(req,res)=>{
    try{
        const result= await agentService.getAllBetByAgent({user:req.user,body:req.body})
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const getAgentInfoControll=async(req,res)=>{
    try{
        const result= await agentService.getAgentInfo(req.user)
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const getAgentTransectionControll=async(req,res)=>{
    try{
        const result= await agentService.getAgentTransection({user:req.user,body:req.body})
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const getBetSlipDetailsControll=async(req,res)=>{
    try{
        const result= await agentService.getBetSlipDetails({user:req.user,params:req.params})
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
}

module.exports={bettingByAgentControll,getBetSlipControll,getAllBetByAgentControll,getAgentInfoControll,getAgentTransectionControll,
    getBetSlipDetailsControll
}