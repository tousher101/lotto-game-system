const prisma=require('../lib/prisma');
const bcrypt=require('bcryptjs');


const addOparetor=async(data)=>{
     const {name,email,password,userName,branchId,phone}=data
        if(!name||!email||!password||!userName||!branchId||!phone){throw{message:'All field Required',status:400}}
        const existing= await prisma.user.findFirst({
            where:{OR:[{userName},{phone},{email}]}})
        if(existing){throw{message:'User Already Exists',status:401}}
        const salt= await bcrypt.genSalt(10)
        const secPass= await bcrypt.hash(password,salt)
        await prisma.user.create({
            data:{name,userName,password:secPass,email,branchId:Number(branchId),role:'OPARETOR',phone}
        });
        return {message:'Oparetor Create Successfully',success:true}
};

const addHeadCashier= async(data)=>{
     const {name,email,password,userName,branchId,phone}=data
        if(!name||!email||!password||!userName||!branchId||!phone){throw{message:'All field Required',status:400}}
        const existing= await prisma.user.findFirst({
            where:{OR:[{userName},{phone},{email}]}})
        if(existing){throw{message:'User Already Exists',status:401}}
        const salt= await bcrypt.genSalt(10)
        const secPass= await bcrypt.hash(password,salt)
        await prisma.user.create({
            data:{name,userName,password:secPass,email,branchId:Number(branchId),role:'HEAD_CASHIER',phone}
        });
        return {message:'Head-Cashier Create Successfully',success:true}
};

const addCashier=async(data)=>{
    const {name,email,password,userName,branchId,phone}=data
        if(!name||!email||!password||!userName||!branchId||!phone){throw{message:'All field Required',status:400}}
        const existing= await prisma.user.findFirst({
            where:{OR:[{userName},{phone},{email}]}})
        if(existing){throw{message:'User Already Exists', status:401}}
        const salt= await bcrypt.genSalt(10)
        const secPass= await bcrypt.hash(password,salt)
        await prisma.user.create({
            data:{name,userName,password:secPass,email,branchId:Number(branchId),role:'CASHIER',phone}
        });
        return {message:'Cashier Create Successfully', success:true}
};

const getAllOparetor=async()=>{
    const allOparetor= await prisma.user.findMany({
            where:{role:'OPARETOR'},
            select:{
                id:true,
                name:true,
                email:true,
                phone:true,
                role:true,
                userName:true,
                
                branch:{
                    select:{
                        name:true,
                        code:true
                    }
                }
            }
        });
        return {allOparetor,success:true}
}; 


const getAllHeadCashier=async()=>{
    const allHeadCashier= await prisma.user.findMany({
            where:{role:'HEAD_CASHIER'},
            select:{
                id:true,
                name:true,
                email:true,
                phone:true,
                role:true,
                userName:true,
                branch:{
                    select:{
                        name:true,
                        code:true
                    }
                }
            }
        })
        return {allHeadCashier, success:true}
};

const getAllCashier=async()=>{
     const allCashier= await prisma.user.findMany({
            where:{role:'CASHIER'},
            select:{
                id:true,
                name:true,
                email:true,
                phone:true,
                role:true,
                userName:true,
                branch:{
                    select:{
                        name:true,
                        code:true
                    }
                }
            }
        })
        return {allCashier, success:true}
};

const deleteOparetor=async(data)=>{
    
    const {id}=data
       const user= await prisma.user.findFirst({
            where:{id:Number(id),role:'OPARETOR'}
        });
        if(!user){throw{message:'Oparetor Not Found',status:404}}
        await prisma.user.delete({
            where:{id:Number(id)}
        });
        return {message:'Oparetor Delete Successfully',success:true}
};

const deleteHeadCashier= async(data)=>{
    const {id}=data
       const user= await prisma.user.findFirst({
            where:{id:Number(id),role:'HEAD_CASHIER'}
        });
        if(!user){throw{message:'Head-Cashier Not Found',status:404}}
        await prisma.user.delete({
            where:{id:user.id}
        });
        return {message:'Head-Cashier Delete Successfully',success:true}
};


const deleteCashier=async(data)=>{
     const {id}=data
       const user= await prisma.user.findFirst({
            where:{id:Number(id),role:'CASHIER'}
        });
        if(!user){throw{message:'Cashier Not Found',status:404}}
        await prisma.user.delete({
            where:{id:user.id}
        });
        return {message:'Cashier Delete Successfully', success:true}
};

const addNewBranch=async(data)=>{
    const {name,code,address}=data
        if(!name||!code||!address){throw{msg:'All field required',status:400}}
        await prisma.branch.create({
            data:{name,code,address}
        });
        return {message:'New branch added successfully',success:true}
};



const addNewDrawTime= async(data)=>{
    const {time,timePost}=data
        if(!time||!timePost){throw{message:'All field required',status:400}}
        await prisma.drewtime.create({
            data:{time,timePost}
        });
        return {message:'Drew Time Added Successfully',success:true}
};

const editDrawTime= async({body,params})=>{
     const {id}=params;
        const {newTime,newTimePost}=body;
        if(!newTime||!newTimePost){return res.status(400).json({msg:'All field required'})}
        const drawTime= await prisma.drewtime.findUnique({
            where:{id:Number(id)}
        });
        if(!drawTime){throw{message:'Draw Time Not Found', status:404}}
        await prisma.drewtime.update({
            where:{id:drawTime.id},
            data:{
                time:newTime,
                timePost:newTimePost
            }
        });
        return {message:'Draw Time Edited Successfully', success:true}
};



const getTotalInOutReportByBranch=async(data)=>{
   
    let { date } = data;
    let drewTimeId=Number(data.drewTimeId);
    let branchId=Number(data.branchId);

      let start, end;

      if (date) {
        start = new Date(date);
        start.setHours(0, 0, 0, 0);

        end = new Date(date);
        end.setHours(23, 59, 59, 999);
      } else {
        start = new Date();
        start.setHours(0, 0, 0, 0);

        end = new Date();
        end.setHours(23, 59, 59, 999);
      }

      const totalInOutAmount = await prisma.transaction.findFirst({
        where: {
          createdAt: {
            gte: start,
            lte: end,
          },
          branchId: Number(branchId),
          drewTimeId: Number(drewTimeId),
        },
        select: {
          totalInAmount: true,
          totalOutAmount: true,
        },
        orderBy:{ createdAt:"desc" }
      });

      const reportData= await prisma.transaction.groupBy({
        by:['userId','status'],
        where:{createdAt:{gte:start,lte:end},branchId:Number(branchId),drewTimeId:Number(drewTimeId),user:{role:'CASHIER'}},
        _sum:{netPayableAmount:true,netRmiteAmount:true}
      });

      const report= {};
      reportData.forEach(item=>{if(!report[item.userId]){
        report[item.userId]={
             totalIn: 0,
            totalOut: 0,
            pendingIn: 0,
            pendingOut: 0,
            settledIn: 0,
            settledOut: 0
        };}
    const sumIn = item._sum.netRmiteAmount || 0;
  const sumOut = item._sum.netPayableAmount || 0;

  report[item.userId].totalIn += sumIn;
  report[item.userId].totalOut += sumOut;

  if (item.status === 'PENDING') {
    report[item.userId].pendingIn += sumIn;
    report[item.userId].pendingOut += sumOut;
  }

  if (item.status === 'SETTELED') {
    report[item.userId].settledIn += sumIn;
    report[item.userId].settledOut += sumOut;
  }

    });

    const users = await prisma.user.findMany({
  where: { id: { in: Object.keys(report).map(Number) } },
  select: { id: true, name: true }
});

return {totalInOutAmount, users, report ,success:true}
}



const getAllAgentReport=async(data)=>{
    
    let { branchId, drewTimeId, date } = data
     const page=Number(data.page)||1;
    const limit=Number(data.limit)||100;
    const skip=(page-1)*limit

    let start, end;

        if (date) {
        start = new Date(date);
        start.setHours(0, 0, 0, 0);

        end = new Date(date);
        end.setHours(23, 59, 59, 999);
        } else {
        start = new Date();
        start.setHours(0, 0, 0, 0);

        end = new Date();
        end.setHours(23, 59, 59, 999);
        }

    const report= await prisma.transaction.findMany({
        where:{createdAt:{gte:start, lte:end},branchId:Number(branchId), drewTimeId:Number(drewTimeId)},
        select:{ grossRemit:true,grossPayable:true,netRmiteAmount:true,netPayableAmount:true,comissionAmount:true,bettingFee:true,
            debitCredit:true,agentId:true
        }
        });

    const agents = await prisma.agent.findMany({
    where: {
      branchId:Number(branchId)
    },
    select: {
      id: true,
      name: true,
      agentCode:true,
      gadgetId:true,
   
    },
    skip:skip,
    take:limit,
    
  });

  const totalAgent= await prisma.agent.count({
    where:{branchId:Number(branchId)}
  });

  const result= agents.map((a)=>{
    const trx= report.find((f)=>f.agentId===a.id)
    return{
        agentId:a.id,
        agentName:a.name,
        agentCode:a.agentCode,
        gadgetId:a.gadgetId,
        grossRemit:trx.grossRemit,
        grossPayable:trx.grossPayable,
        netRmiteAmount:trx.netRmiteAmount,
        netPayableAmount:trx.netPayableAmount,
        comissionAmount:trx.comissionAmount,
        bettingFee:trx.bettingFee,
        debitCredit:trx.debitCredit


    }
  });

      
return {result, success:true, totalPage:Math.ceil(totalAgent/limit)}
};




const getAgentDetailsReport=async({params,query})=>{
     let start, end;

        if (date) {
        start = new Date(date);
        start.setHours(0, 0, 0, 0);

        end = new Date(date);
        end.setHours(23, 59, 59, 999);
        } else {
        start = new Date();
        start.setHours(0, 0, 0, 0);

        end = new Date();
        end.setHours(23, 59, 59, 999);
        }
    const {id}=params
        const {drewTimeId}=query;
        const {branchId}=query;
        const {date}=query;
        const agent= await prisma.agent.findUnique({
            where:{id:Number(id)},
            select:{name:true,agentCode:true,
                branch:{
                    select:{
                        name:true
                    }
                },
                
            }
        });
        const totalBet= await prisma.betting.count({
            where:{agentId:agent.id,drewtimeId:Number(drewTimeId), createdAt:{gte:start,lte:end},branchId:Number(branchId)}
        });

        const totalL2Bet= await prisma.betNumber.aggregate({
            _sum:{amount},_count:{_all},
            where:{agentId:agent.id,drewtimeId:Number(drewTimeId), createdAt:{gte:start,lte:end},branchId:Number(branchId),bettingOption:'L_2'}
        });

        const totalL2BetAmount=totalL2Bet._sum.amount||0;
        const totalL2BetCount=totalL2Bet._count._all||0;

           const totalS3Bet= await prisma.betNumber.aggregate({
            _sum:{amount}, _count:{_all},
            where:{agentId:agent.id,drewtimeId:Number(drewTimeId), createdAt:{gte:start,lte:end},branchId:Number(branchId),bettingOption:'S_3'}
        });
            const totalS3betAmount= totalS3Bet._sum.amount||0;
            const totalS3Count=totalS3Bet._count._all||0;

           const totalRS3Bet= await prisma.betNumber.aggregate({
            _sum:{amount}, _count:{_all},
            where:{agentId:agent.id,drewtimeId:Number(drewTimeId), createdAt:{gte:start,lte:end},branchId:Number(branchId),bettingOption:'RS_3'}
        });
        const totalRS3BetAmount= totalRS3Bet._sum.amount||0;
        const totalRS3BetCount=totalRS3Bet._count._all||0;

 const winingData= await prisma.transaction.findMany({
    where:{agentId:agent.id,drewtimeId:Number(drewTimeId), createdAt:{gte:start,lte:end},branchId:Number(branchId)},
    select:{
        agentWining:true,
    }
 });


  
 return {totalBet,totalL2BetAmount,totalL2BetCount,totalS3betAmount,totalS3Count,totalRS3BetAmount,totalRS3BetCount, winingData,agent, success:true}
};

const getAllBranches= async()=>{
    const allBranches= await prisma.branch.findMany({
        select:{id: true,name:true, code:true, address:true}
    })
    return allBranches
};

const getAllDrawTime= async()=>{
    const allDrawTime= await prisma.drewtime.findMany({
        select:{ id:true,
            time:true, timePost:true
        }
    });
    return {allDrawTime, success:true}
};







module.exports={addOparetor,addHeadCashier,addCashier,getAllOparetor,getAllHeadCashier,getAllCashier,deleteOparetor,deleteHeadCashier,
    deleteCashier,addNewBranch,addNewDrawTime,editDrawTime, getTotalInOutReportByBranch,getAllAgentReport,
    getAgentDetailsReport,getAllBranches,getAllDrawTime,
    
}