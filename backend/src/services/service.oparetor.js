
const { body } = require('express-validator');
const prisma=require('../lib/prisma');
const bcrypt=require('bcryptjs');
const getParmutation=require('../lib/rumbleCreate')

const addAgent=async({body,user})=>{
    const {name,address,phone,email,gadgetId, userName, password,agentCode}=body;
    const {oparetor}=user;
    if(!oparetor||!oparetor.branchId){throw{messgae:'Oparetor Not Found',status:404}}
    if(!name||!address||!phone||!gadgetId||!userName||!password||!agentCode){throw {message:'All Field Required',status:400}}
    const existing= await prisma.agent.findFirst({
        where:{OR:[{phone},{userName}]}
    });
    if(existing){throw{message:'Agent already Exisit' ,status:409}}
    const salt= await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(password,salt);
    try{
    await prisma.agent.create({
        data:{
            name,address,phone,email,gadgetId,userName,branchId:oparetor.branchId,password:secPass,agentCode
        }
    });
        }catch (err){throw{message:'Agent Not Created', status:500}}

  return {message:'Agent Added Successfully'}

};

const getAllAgentByBranch= async(data)=>{
    const {oparetor}=data
    const AllAgent= await prisma.agent.findMany({
        where:{branchId:oparetor.branchId},
        select:{
            id:true,name:true, gadgetId:true, assignStatus:true,phone:true,address:true,createdAt:true,updatedAt:true,userName:true,
            agentCode:true,
        }
    });

    return AllAgent
};

const deleteAgent= async({params,user})=>{
  const {agentId}=params;
  const {oparetor}=user;
  const agent= await prisma.agent.findUnique({
    where:{id:agentId}
  });
  const loginOparetor= await prisma.user.findUnique({
    where:{id:oparetor}
  });
  if(!agent){throw{message:'Agent Not Found', status:404}}
  if(!loginOparetor){throw{message:'Oparetor Not Found',status:404}}
  await prisma.agent.delete({
    where:{id:agent.id,branch:loginOparetor.branchId}
  });
  return{message:'Agent Delete Successfully'}
};

const editAgentInfo=async({body,params,user})=>{
  const {agentId}=params;
  const {oparetor}=user;
  const {newName,newAddress,newPhone,newEmail,newGadgetId,newUserName,newAgentCode}=body
  const loginOparetor= await prisma.user.findUnique({
    where:{id:oparetor}
  });
  const agent= await prisma.agent.findUnique({
    where:{id:agentId}
  });
  if(!agent){throw{message:'Agent Not Found', status:404}}
  if(!loginOparetor){throw{message:'Oparetor Not Found',status:404}}
  await prisma.agent.update({
    where:{id:agent.id,branchId:loginOparetor.branchId},
    data:{
      name:newName,address:newAddress,phone:newPhone,email:newEmail,gadgetId:newGadgetId,agentCode:newAgentCode,userName:newUserName
    }
  });
  return {message:'Agent Information Edited Successfully'}
}

const getAllUnassignedAgentByCashier= async(data)=>{
    const {oparetor}=data;
    const allUnassignedAgent= await prisma.agent.findMany({
        where:{branchId:oparetor.branchId, assignStatus:"NOT_ASSIGNED"},
          select:{
            id:true,name:true, gadgetId:true, assignStatus:true,phone:true,address:true,createdAt:true,updatedAt:true,userName:true,
            agentCode:true,
                }
    });
    return allUnassignedAgent
};




const getAllAssignedAgentByCashier= async({user,query})=>{
    const {cashierId}=query;
    const {oparetor}=user;
    const allAssignedAgent= await prisma.agent.findMany({
        where:{branchId:oparetor.branchId,cashierId, assignStatus:"ASSIGNED"},
          select:{
            id:true,name:true, gadgetId:true, assignStatus:true,phone:true,address:true,createdAt:true,updatedAt:true,userName:true,
            agentCode:true,
            }
    });
    return allAssignedAgent
};


const assignAgent=async({body,user})=>{
     const {cashierId,agentId}=body;
     const {oparetor}=user;
        const cashier= await prisma.user.findFirst({
            where:{id:cashierId, role:'CASHIER',branchId:oparetor.branchId}
        });
        if(!cashier){throw {message:'Cashier Not Found',status:404}}

        await prisma.$transaction([prisma.agent.updateMany({
            where:{id:{in:agentId},branchId:oparetor.branchId},
            data:{cashierId,assignStatus:'ASSIGNED'}
        })])
        return{
             message:'Agents Assigned Cashier Successfully'
        }
       
};

const unassignAgent=async(data)=>{
    const {agentId}=data
      if (!Array.isArray(agentId) || agentId.length === 0) {
    throw new Error("Need Min: 1 agent");
  }
    await prisma.$transaction([prisma.agent.updateMany({
        where:{id:{in:agentId, assignStatus:'ASSIGNED'}},
        data:{cashierId:null,assignStatus:'NOT_ASSIGNED'}
    })])
return{
    message:'Agent Unassigned Cashier Successfully'
}
   
};

const addHotNumber= async({body,user})=>{
    const {number,limit,drewTimeId}=body;
    const {oparetor}=user
    if(!number||!limit||!drewTimeId){throw{message:'All Field Required', status:400}}
    if(!oparetor||!oparetor.branchId){throw{messgae:'Oparetor Not Found',status:404}}
    const existing= await prisma.hotNumber.findFirst({
        number,branchId:oparetor.branchId,isActive:true, drewTimeId
    });
    if(existing){throw{message:'Hot Number Already Added',status:400}}
    await prisma.hotNumber.create({
        data:{
            number,limit,branchId:oparetor.branchId,drewTimeId
        }
    });
    return{message:'Hot Number Addes Successfully'}
};

const getMostBettingNumber= async({body,user})=>{
     let { branchId, drewTimeId, date} =body
     const {oparetor}=user;
     if(!oparetor||!oparetor.branchId){throw{message:'Oparetor Not Found',status:404}}
      branchId = branchId ? Number(branchId) : 1
      drewTimeId = drewTimeId ? Number(drewTimeId) : 1


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
    const mostBetNumber= await prisma.betNumber.groupBy({
        by:['number'],
        where:{branchId:oparetor.branchId,
            createdAt:{gte:start,lte:end},drewTimeId
        },
        _count:{bettingNumber:true},
        orderBy:{_count:{bettingNumber:'desc'}},
        take:10
    });
    return mostBetNumber
};

const getTotalInOutReportByBranch=async({query,user})=>{
    let { date } = query
    let drewTimeId=Number(query.drewTimeId)
    const{oparetor}=user
    
    if(!oparetor||!oparetor.branchId){throw{message:'Oparetor Not Found'}}
     drewTimeId = drewTimeId ? Number(drewTimeId) : 1
      

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
          branchId: oparetor.branchId,
          drewTimeId: drewTimeId,
        },
        select: {
          totalInAmount: true,
          totalOutAmount: true,
        },
        orderBy:{ createdAt:"desc" }
     
      });

      const totalInOutAmountByCashier= await prisma.transaction.findMany({
        where:{createdAt:{gte:start,lte:end},branchId:oparetor.branchId,drewTimeId,user:{some:{role:'CASHIER'}}},
        select:{
            totalInAmount:true,totalOutAmount:true,
            user:{
                select:{
                    id:true,
                    name:true
                }
            },
         
        },
        orderBy:{ createdAt:"desc" }
      });

     

      return {totalInOutAmount, totalInOutAmountByCashier}
};

const totalInOutDetailsReportByCashier= async({query,user,params})=>{
    const {date}=query;
    const userId=Number(params.userId);
    const drewTimeId=Number(query.drewTimeId)
    const {oparetor}=user;

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
    if(!oparetor||!oparetor.branchId){throw {message:'Oparetor Not Found'}}
     const totalReceivedByCashier= await prisma.transaction.findFirst({
      where:{createdAt:{gte:start,lte:end},branchId:oparetor.branchId,drewTimeId,userId,user:{some:{role:'CASHIER'}},status:'SETELLED'},
        select:{netRimteAmount},
      });

      const totalPaidByCashier= await prisma.transaction.findFirst({
        where:{createdAt:{gte:start,lte:end},branchId:oparetor.branchId,drewTimeId,userId,user:{some:{role:'CASHIER'}},status:'SETELLED'},
        select:{netPayableAmount}
      });

      const totalPendingRecivedByCashier=await prisma.transaction.findFirst({
        where:{createdAt:{gte:start,lte:end},branchId:oparetor.branchId,drewTimeId,userId,user:{some:{role:'CASHIER'}},status:'PENDING'},
        select:{netRimteAmount},
         
      });

      const totalPendingPaidByCashier= await prisma.transaction.findFirst({
        where:{createdAt:{gte:start,lte:end},branchId:oparetor.branchId,drewTimeId,userId,user:{some:{role:'CASHIER'}},status:'PENDING'},
         select:{netPayableAmount},
         
      });

      return {totalPaidByCashier,totalReceivedByCashier,totalPendingPaidByCashier,totalPendingRecivedByCashier}
};

const blockedAgentGadget=async(data)=>{
  const {agentId}=data;
  const agent= await prisma.agent.findUnique({
    where:{id:agentId}
  });
  if(!agent){throw{message:'Agent Not Found',status:404}}
  await prisma.agent.update({
    where:{id:agent.id,status:'ACTIVE'},
    data:{
      status:'INACTIVE'
    }
  });
  return{message:'Agent Gadget Blocked Successfully'}
};

const openBetSession=async({body,user})=>{
  const {drewTimeId}=body;
  const {oparetor}=user
  const loginOparetor= await prisma.user.findUnique({
    where:{id:oparetor}
  });
  if(!loginOparetor){throw{message:'Oparetor Not Found',status:404}}
  if(!drewTimeId){throw{message:'Need DrewTime',status:400}}
  await prisma.betSession.create({
    data:{
      drewTimeId,branchId:loginOparetor.branchId,
    }
  });
  return {message:'Bet Session Create Successfully'}
};

const closeBetSession=async({params})=>{
 const {betSessionId}=params
  await prisma.betSession.update({
    where:{id:betSessionId,betSessionStatus:'ACTIVE'},
    data:{
      betSessionStatus:'CUT_OFF'
    }
  });
  return {message:'Bet Closed Successfully'}
};
const getActiveBetSession=async()=>{
  const activeBetSession= await prisma.betSession.findFirst({
    where:{betSessionStatus:'ACTIVE'},
    select:{
      id:true,betSessionStatus:true,betSessionTime:true,
      drewTime:{
        select:{
          time:true,timePost:true
        }
      },
      branch:{
        select:{
          name:true
        }
      }
    }
  });
  return activeBetSession
}

const unblockedAgent=async(data)=>{
  const {agentId}=data;
    const agent= await prisma.agent.findUnique({
    where:{id:agentId}
  });
  if(!agent){throw{message:'Agent Not Found',status:404}}
  await prisma.agent.update({
    where:{id:agent.id,status:"INACTIVE"},
    data:{
      status:'ACTIVE'
    }
  });
  return{message:'Agent Gadget Unblocked Successfully'}

};


const drewResult=async({body,user})=>{
  const {winNumberStright,winNumberLast2,drewTimeId}=body
  const {oparetor}=user;


 const result= await prisma.$transaction(async(tx)=>{
  const loginOparetor= await tx.user.findUnique({
    where:{id:oparetor}
  });

  if(!loginOparetor){throw{message:'Oparetor Not Found',status:404}}

  if(!winNumberLast2||!winNumberStright||!drewTimeId){throw{message:'All Fields Required',status:400}}

  const activeDrewSession= await tx.drewSession.create({
    data:{drewTimeId,branchId:loginOparetor.branchId}
  });

  const drewResult= await tx.drewResult.create({
    data:{
      winNumberStright,winNumberLast2,drewTimeId,branchId:loginOparetor.branchId,drewSessionId:activeDrewSession.id
    }
  });

  const cutOffBetSession= await tx.betSession.findFirst({
    where:{betSessionStatus:'CUT_OFF',branchId:loginOparetor.branchId}
  });

  const getAllBetNumber= await tx.betNumber.findMany({
    where:{betting:{betSessionId:cutOffBetSession.id,drewTimeId,branchId:loginOparetor.branchId,isVoid:false}},
    select:{number:true,bettingOption:true,amount:true,betting:{select:{agentId:true,betTrxId:true}}
    },
    
  });
  let payout=0;
  let winAmount=0;
  
const agentMap={}
  for( const n of getAllBetNumber){
    let isWin=false;
    
  if(n.bettingOption==='S-3' && n.number===drewResult.winNumberStright){ 
    payout = 600; 
    isWin = true;
}
if(n.bettingOption==='L-2' && n.number===drewResult.winNumberLast2){ 
    payout = 85; 
    isWin = true;
}
if(n.bettingOption==='RS-3' && rumbleMatch(n.number, drewResult.winNumberStright)){ 
    const combCount=getParmutation(n.number);
    payout = 600/combCount; 
    isWin = true;
}
if(!isWin) continue;

  winAmount=payout*n.amount
      const agentId=n.betting.agentId
      if(!agentMap[agentId]){agentMap[agentId]={totalWin:0,numbers:[]}
    };
    
    agentMap[agentId].totalWin+=winAmount
    agentMap[agentId].numbers.push({
      number:n.number,bettingOption:n.bettingOption,amount:n.amount, betTrxId:bettingData.betTrxId
    });
};


    for (const agentId in agentMap){
      const agentData=agentMap[agentId];
      const agent= await tx.agent.findUnique({
        where:{id:Number(agentId)}
      })
    // await tx.agent.updateMany({
    // where:{betting:{some:{isBetting:true,drewTimeId}}},
    // data:{
    //   isPaid:false
    // }
    // });

    const betCount= await tx.betting.count({
      where:{agentId:agent.id,drewTimeId,branchId:loginOparetor.branchId}
    })

    if(betCount>0){await prisma.agent.updateMany({
      where:{id:agent.id,betting:{isBetting:true, drewTimeId,betSeesionId:cutOffBetSession.id}},
      data:{isPaid:false}
    })};

    const comission= agent.commission
    
    const totalRemitResult=  await tx.betting.aggregate({
      _sum:{totalBetAmount:true},
      where:{agentId:Number(agent.id),drewTimeId,branch:loginOparetor.branchId}
    });
    const totalRemit = totalRemitResult._sum.totalBetAmount || 0;
    let betingFee=0
    if(betCount>0){betingFee=10}
    const comissionAmount= Math.round(totalRemit*(comission/100))
    const netRemit=totalRemit-comissionAmount+betingFee
    
    const debitCredit=netRemit-agentData.totalWin
    const totalInAmountResult=  await tx.betting.aggregate({
      _sum:{totalBetAmount:true},
      where:{drewTimeId,branchId:loginOparetor.branchId}
    });
    const totalInAmount=totalInAmountResult._sum.totalBetAmount||0;
   

    

   const transaction=await tx.transaction.create({
    data:{
      totalInAmount,
      grossPayable:agentData.totalWin,
      grossRemit: totalRemit,
      netRimteAmount:netRemit,
      netPayableAmount:agentData.totalWin,
      debitCredit,
      agentId,
      branchId:loginOparetor.branchId,
      drewTimeId,
      userId:agent.cashierId,
      drewSessionId:activeDrewSession.id,
      betSeesionId:cutOffBetSession.id

    }
   })
   for(n of agentMap[agentId].numbers){
        await tx.agentWining.create({
        data:{
        number:n.number,
        amount:n.amount,
        betTrxId:n.betTrxId,
        bettingOption:n.bettingOption,
        transactionId :transaction.id,
        comissionAmount,
        betingFee
        
      }
    })
   };
    };
    const totalOutAmountResult=await tx.transaction.aggregate({
    _sum:{grossPayable:true},
    where:{drewTimeId,branchId:loginOparetor.branchId}
   });
   const totalOutAmount = totalOutAmountResult._sum.grossPayable || 0
   await tx.transaction.updateMany({
    where:{drewTimeId,branchId:loginOparetor.branchId},
    data:{
      totalOutAmount
    }
   });
   await tx.betSession.update({
    where:{id:cutOffBetSession.id,betSessionStatus:'CUT_OFF'},
    data:{betSessionStatus:'CLOSED'}
   });
   await tx.drewSession.update({
    where:{id:activeDrewSession.id,drewSessionStatus:'ACTIVE'},
    data:{drewSessionStatus:'CLOSED'}
   });
   await tx.hotNumber.update({
    where:{isActive:true},
    data:{isActive:false}
   });
  
   return {message:'Drew Result Published Successfully'}
   });
   return result
     
};






module.exports={addAgent,getAllAgentByBranch,getAllAssignedAgentByCashier,getAllUnassignedAgentByCashier,assignAgent,unassignAgent,addHotNumber,
    getMostBettingNumber,totalInOutDetailsReportByCashier,getTotalInOutReportByBranch,blockedAgentGadget,unblockedAgent,openBetSession,closeBetSession,getActiveBetSession,
    drewResult,deleteAgent,editAgentInfo

}