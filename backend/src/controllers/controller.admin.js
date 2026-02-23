const serviceAdmin=require('../services/service.admin');

const addOparetorControll=async(req,res)=>{
    try{
        const result= await serviceAdmin.addOparetor(req.body)
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};


const addHeadCashierControll=async(req,res)=>{
    try{
        const result= await serviceAdmin.addHeadCashier(req.body);
         res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const addCashierControll= async(req,res)=>{
    try{
        const result= await serviceAdmin.addCashier(req.body)
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const getAllOparetorControll=async(req,res)=>{
    try{
        const result= await serviceAdmin.getAllOparetor();
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(500).json({msg: 'Server Error'})}
};

const getAllHeadCashierControll=async(req,res)=>{
    try{
        const result= await serviceAdmin.getAllHeadCashier();
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(500).json({msg: 'Server Error'})}
};

const getAllCashierControll=async(req,res)=>{
    try{
        const result= await serviceAdmin.getAllCashier();
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(500).json({msg: 'Server Error'})}
};

const deleteOparetorControll=async(req,res)=>{
    try{
        const result= await serviceAdmin.deleteOparetor(req.params);
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const deleteHeadCashierControll= async(req,res)=>{
    try{
        const result= await serviceAdmin.deleteHeadCashier(req.params)
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const deleteCashierControll= async(req,res)=>{
    try{
        const result= await serviceAdmin.deleteCashier(req.params)
         res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const addNewBranchControll=async(req,res)=>{
    try{
        const result= await serviceAdmin.addNewBranch(req.body)
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const editBranchControll=async(req,res)=>{
    try{
        const result= await serviceAdmin.editBranch({body:req.body,params:req.params})
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const addNewDrawTimeControll= async(req,res)=>{
    try{
        const result= await serviceAdmin.addNewDrawTime(req.body)
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(500).json({msg: 'Server Error'})}
};

const editDrawTimeControll=async(req,res)=>{
    try{
        const result= await serviceAdmin.editDrawTime({body:req.body,params:req.params})
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};


const getTotalInOutReportByBranchControll=async(req,res)=>{
    try{
        const result= await serviceAdmin.getTotalInOutReportByBranch(req.query)
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(500).json({msg: 'Server Error'})}
};



const getAllAgentReportControll= async(req,res)=>{
    try{
        const result= await serviceAdmin.getAllAgentReport(req.query)
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(500).json({msg: 'Server Error'})}
};

const getAgentDetailsReportControll=async(req,res)=>{
    try{
        const result= await serviceAdmin.getAgentDetailsReport({params:req.params,query:req.query})
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(500).json({msg: 'Server Error'})}
};

const getAllBranchesControll= async(req,res)=>{
    try{
        const result= await serviceAdmin.getAllBranches()
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(500).json({msg: 'Server Error'})}
};

const getAllDrawTimeControll=async(req,res)=>{
    try{
        const result= await serviceAdmin.getAllDrawTime()
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(500).json({msg: 'Server Error'})}
};

const getAllCashierByBranchControll=async(res,req)=>{
    try{
        const result=await serviceAdmin.getAllCashierByBranch(req.query)
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(500).json({msg: 'Server Error'})}
};

const getAllAgentByBranchControll=async(req,res)=>{
    try{
        const result= await serviceAdmin.getAllAgentByBranch(req.query)
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(500).json({msg: 'Server Error'})}
};






module.exports={addOparetorControll,addHeadCashierControll,addCashierControll,getAllOparetorControll,getAllHeadCashierControll,
getAllCashierControll,deleteOparetorControll,deleteHeadCashierControll,deleteCashierControll,addNewBranchControll, editBranchControll,
addNewDrawTimeControll,editDrawTimeControll,getAllAgentByBranchControll ,getTotalInOutReportByBranchControll,getAllAgentReportControll,
getAgentDetailsReportControll,getAllBranchesControll, getAllDrawTimeControll,getAllCashierByBranchControll

}