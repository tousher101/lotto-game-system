const cashierServices=require('../services/service.cashier')

const getAllAgentTransectionControll= async(req,res)=>{
    try{
        const result= await cashierServices.getAllAgentTransection({user:req.user, body:req.body})
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const getRemitTransectionSummarybyAgentControll=async(req,res)=>{
    try{
        const result= await cashierServices.getRemitTransectionSummarybyAgent({user:req.user,params:req.params})
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
};

const getPayableTransectionSummarybyAgentControll= async(req,res)=>{
    try{
        const result= await cashierServices.getPayableTransectionSummarybyAgent({user:req.user,params:req.params})
        res.status(200).json(result)
    }catch(err){console.error(err); return res.status(err.status||500).json({msg:err.message|| 'Server Error'})}
}











module.exports={getAllAgentTransectionControll,getRemitTransectionSummarybyAgentControll,getPayableTransectionSummarybyAgentControll}
