const oparetorService=require('../services/service.oparetor')



const addAgentControll= async(req,res)=>{
    try{
        const result= await oparetorService.addAgent({body:req.body,user:req.user})
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const getAllAgentByBranchControll= async(req,res)=>{
    try{
        const result= await oparetorService.getAllAgentByBranch({user:req.user, query:req.query})
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(500).json({msg: 'Server Error'})}
};

const getAllAssignedAgentByCashierControll=async(req,res)=>{
    try{
        const result= await oparetorService.getAllAssignedAgentByCashier({user:req.user,query:req.query})
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(500).json({msg: 'Server Error'})}
};

const getAllUnassignedAgentByCashierControll=async(req,res)=>{
    try{
        const result= await oparetorService.getAllUnassignedAgentByCashier(req.user)
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(500).json({msg: 'Server Error'})}
};

const assignAgentControll= async(req,res)=>{
    try{
        const result= await oparetorService.assignAgent({user:req.user,body:req.body})
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const unassignedAgentControll= async(req,res)=>{
    try{
        const result= await oparetorService.unassignAgent(req.body);
       
        res.status(200).json({result})
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
      
    };

    const addHotNumberControll= async(req,res)=>{
        try{
            const result= await oparetorService.addHotNumber({body:req.body,user:req.user})
            res.status(200).json(result)
        }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
    };

    const getMostBettingNumberControll= async(req,res)=>{
        try{
            const result= await oparetorService.getMostBettingNumber({body:req.body,user:req.user})
            res.status(200).json(result)
        }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
    };

   
    const blockedAgentGadgetControll=async(req,res)=>{
        try{
            const result=await oparetorService.blockedAgentGadget(req.params)
            res.status(200).json(result)
        }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
    };

    const unblockedAgentControll=async(req,res)=>{
        try{
            const result=await oparetorService.unblockedAgent(req.params)
            res.status(200).json(result)
        }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
    };

    const openBetSessionControll=async(req,res)=>{
        try{
            const result= await oparetorService.openBetSession({body:req.body,user:req.user})
            res.status(200).json(result)
        }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
    };

    const closeBetSessionControll=async(req,res)=>{
        try{
            const result= await oparetorService.closeBetSession({params:req.params})
            res.status(200).json(result)
        }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
    };

    const getActiveBetSessionControll=async(req,res)=>{
        try{
            const result= await oparetorService.getActiveBetSession();
            res.status(200).json(result)
        }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
    };

    const drewResultControll= async(req,res)=>{
        try{
            const result= await oparetorService.drewResult({body:req.body,user:req.user})
            res.status(200).json(result)
        }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
    };

    const deleteAgentControll= async(req,res)=>{
        try{
            const result= await oparetorService.deleteAgent({user:req.user, params:req.params})
            res.status(200).json(result)
        }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
    };

 
    const getTotalInOutReportByBranchControll=async(req,res)=>{
        try{
            const result= await oparetorService.getTotalInOutReportByBranch({query:req.query, user:req.user})
            res.status(200).json(result)
        }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
    };

    const searchAgentControll= async(req,res)=>{
        try{
            const result= await oparetorService.searchAgent({user:req.user, query:req.query})
            res.status(200).json(result)
        }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
    };

    const getAllGadgetByBranchControll=async(req,res)=>{
        try{
            const result= await oparetorService.getAllGadgetByBranch({user:req.user, query:req.query})
            res.status(200).json(result)
        }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
    };

    const editGadgetByAgentControll=async(req,res)=>{
        try{
            const result= await oparetorService.editGadgetByAgent({user:req.user, params:req.params, body:req.body})
            res.status(200).json(result)
        }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
    };

    const searchAgentByGadgetIdControll=async(req,res)=>{
        try{
            const result= await oparetorService.searchAgentByGadgetId({user:req.user, query:req.query})
            res.status(200).json(result)
        }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
    };

    const getAllCashierByBranchControll= async(req,res)=>{
        try{
            const result= await oparetorService.getAllCashierByBranch(req.user)
            res.status(200).json(result)
        }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
    }
    

module.exports={addAgentControll,getAllAgentByBranchControll, getAllAssignedAgentByCashierControll,getAllUnassignedAgentByCashierControll,
    assignAgentControll,unassignedAgentControll, addHotNumberControll,getMostBettingNumberControll, getTotalInOutReportByBranchControll,
    blockedAgentGadgetControll,unblockedAgentControll,openBetSessionControll,closeBetSessionControll,searchAgentByGadgetIdControll,getAllCashierByBranchControll,
    getActiveBetSessionControll, drewResultControll,deleteAgentControll, searchAgentControll, getAllGadgetByBranchControll, editGadgetByAgentControll

}