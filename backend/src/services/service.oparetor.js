
const prisma=require('../lib/prisma');
const bcrypt=require('bcryptjs');
const getParmutation=require('../lib/rumbleCreate')

const addAgent=async({body,user})=>{
    const {name,address,phone,email,gadgetId, userName, password,agentCode,comission,imeino}=body;
    const {id}=user;
    const logingOparetor= await prisma.user.findUnique({
      where:{id:Number(id)}
    })
    if(!logingOparetor){throw{message:'Oparetor Not Found',status:404}}
    if(!name||!address||!phone||!gadgetId||!userName||!password||!agentCode||!comission||!imeino){throw {message:'All Field Required',status:400}}
    const existing= await prisma.agent.findFirst({
        where:{OR:[{phone},{userName}]}
    });
    if(existing){throw{message:'Agent already Exisit' ,status:409}}
    const salt= await bcrypt.genSalt(10);
    const secPass= await bcrypt.hash(password,salt);

    await prisma.agent.create({
        data:{
            name,address,phone,email,gadgetId,userName,branchId:logingOparetor.branchId,password:secPass,agentCode, commission:parseFloat(comission), imeino
        }
    });
        

  return {message:'Agent Added Successfully', success:true}

};

const getAllAgentByBranch= async({user, query})=>{
    const {id}=user
    const page=Number(query.page)||1;
    const limit=Number(query.limit)||100;
    const skip=(page-1)*limit
      const loginOparetor= await prisma.user.findUnique({
      where:{id:Number(id)}
    });
  const totalAgent= await prisma.agent.count({
    where:{branchId:loginOparetor.branchId}
  })
 
    if(!loginOparetor){throw{message:'Oparetor Not Found', status:404}}
    const AllAgent= await prisma.agent.findMany({
        where:{branchId:loginOparetor.branchId},
        select:{
            id:true,name:true, assignStatus:true,phone:true,address:true,createdAt:true,updatedAt:true,userName:true,
            agentCode:true, status:true
        },
        skip:skip,
        take:limit
    });

    return {AllAgent, totalPage:Math.ceil(totalAgent/limit), success:true}
};

const deleteAgent= async({params,user})=>{
  console.log('Oparetor', user)
  const {id}=params;
  const oparetor=Number(user.id);
    const loginOparetor= await prisma.user.findUnique({
    where:{id:Number(oparetor)}
  });
   if(!loginOparetor){throw{message:'Oparetor Not Found',status:404}}
  
   const agent= await prisma.agent.findUnique({
    where:{id:Number(id)}
  });
  if(!agent){throw{message:'Agent Not Found', status:404}}
 
  await prisma.agent.delete({
    where:{id:agent.id,branchId:loginOparetor.branchId}
  });
  return{message:'Agent Delete Successfully', success:true}
};



const getAllUnassignedAgentByCashier= async(data)=>{
    const {oparetor}=data;
    const loginOparetor= await prisma.user.findUnique({
      where:{id:Number(oparetor)}
    });
    if(!loginOparetor){throw{messgae:'Oparetor Not Found', status:404}}
    const allUnassignedAgent= await prisma.agent.findMany({
        where:{branchId:loginOparetor.branchId, assignStatus:"NOT_ASSIGNED"},
          select:{
            id:true,name:true, gadgetId:true, assignStatus:true, agentCode:true,
                }
    });
    return {allUnassignedAgent, success:true}
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

const getAllCashierByBranch= async(data)=>{
  const {oparetor}=data
  const loginOparetor= await prisma.user.findUnique({
    where:{id:Number(oparetor)}
  });
  if(!loginOparetor){throw{message:'Oparetor Not Found'}}

  const allCashier= await prisma.user.findMany({
    where:{branchId:loginOparetor.branchId, role:'CASHIER'},
    select:{
      name:true, id:true
    }
  });
  return {allCashier, success:true}
}

const addHotNumber= async({body,user})=>{
    const {number,limit,drewTimeId}=body;
    const {oparetor}=user
    const activeBetSession= await prisma.betSession.findFirst({
      where:{betSessionStatus:'ACTIVE',drewTimeId:Number(drewTimeId)},
    })
    if(!number||!limit||!drewTimeId){throw{message:'All Field Required', status:400}}
    if(!oparetor||!oparetor.branchId){throw{messgae:'Oparetor Not Found',status:404}}
    const existing= await prisma.hotNumber.findFirst({
        number,branchId:oparetor.branchId,isActive:true, drewTimeId
    });
    if(existing){throw{message:'Hot Number Already Added',status:400}}
    await prisma.hotNumber.create({
        data:{
            number,limit,branchId:oparetor.branchId,drewTimeId,betSessionId:activeBetSession.id
        }
    });
    return{message:'Hot Number Added Successfully'}
};

const getMostBettingNumber= async({body,user})=>{
     let { branchId, drewTimeId, date} =body
     const {oparetor}=user;
         const activeBetSession= await prisma.betSession.findFirst({
      where:{betSessionStatus:{in:['ACTIVE','CUT_OFF']},drewTimeId:Number(drewTimeId)},
      orderBy:{id:'desc'}
    })
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
            createdAt:{gte:start,lte:end},drewTimeId:Number(drewTimeId), betSessionId:activeBetSession.id
        },
        _count:{bettingNumber:true},
        orderBy:{_count:{bettingNumber:'desc'}},
        take:10
    });
    return mostBetNumber
};



const blockedAgentGadget=async(data)=>{
  const {id}=data;
  const agent= await prisma.agent.findUnique({
    where:{id:Number(id)}
  });
  if(!agent){throw{message:'Agent Not Found',status:404}}
  await prisma.agent.update({
    where:{id:agent.id,status:'ACTIVE'},
    data:{
      status:'INACTIVE'
    }
  });
  return{message:'Agent Gadget Blocked Successfully', success:true}
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
  const {id}=data;
    const agent= await prisma.agent.findUnique({
    where:{id:Number(id)}
  });
  if(!agent){throw{message:'Agent Not Found',status:404}}
  await prisma.agent.update({
    where:{id:agent.id,status:"INACTIVE"},
    data:{
      status:'ACTIVE'
    }
  });
  return{message:'Agent Gadget Unblocked Successfully', success:true}

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
      where:{agentId:agent.id,drewTimeId,branchId:loginOparetor.branchId,isVoid:false}
    })

    if(betCount>0){await prisma.agent.updateMany({
      where:{id:agent.id,betting:{isBetting:true, drewTimeId,betSeesionId:cutOffBetSession.id}},
      data:{isPaid:false}
    })};

    const comission= agent.commission
    
    const totalRemitResult=  await tx.betting.aggregate({
      _sum:{totalBetAmount:true},
      where:{agentId:Number(agent.id),drewTimeId,branch:loginOparetor.branchId,isVoid:false}
    });
    const totalRemit = totalRemitResult._sum.totalBetAmount || 0;
    let betingFee=0
    if(betCount>0){betingFee=10}
    const comissionAmount= Math.round(totalRemit*(comission/100))
    const netRemit=totalRemit-comissionAmount+betingFee
    
    const debitCredit=netRemit-agentData.totalWin
    const totalInAmountResult=  await tx.betting.aggregate({
      _sum:{totalBetAmount:true},
      where:{drewTimeId,branchId:loginOparetor.branchId,isVoid:false}
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
      betSeesionId:cutOffBetSession.id,
      userId: agent.cashierId,
      bettingFee:betingFee,
      comissionAmount:comissionAmount

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

const getTotalInOutReportByBranch=async({query,user})=>{

    let { date } = query;
    let {drewTimeId}=query
    let {id}=user
 

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

      const loginOparetor= await prisma.user.findUnique({
        where:{id:Number(id)}
      });

      const totalInOutAmount = await prisma.transaction.findFirst({
        where: {
          createdAt: {
            gte: start,
            lte: end,
          },
          branchId: loginOparetor.branchId,
          drewTimeId:Number(drewTimeId) ,
        },
        select: {
          totalInAmount: true,
          totalOutAmount: true,
        },
        orderBy:{ createdAt:"desc" }
      });

      const reportData= await prisma.transaction.groupBy({
        by:['userId','status'],
        where:{createdAt:{gte:start,lte:end},branchId:loginOparetor.branchId,drewTimeId:Number(drewTimeId),user:{role:'CASHIER'}},
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
};

const searchAgent = async ({ user, query }) => {
  const { agentCode } = query;
  const { id } = user;

  if (!agentCode) {
    throw { message: "agentCode required", status: 400 };
  }

  const cleanCode = agentCode.trim();

  const loginOparetor = await prisma.user.findUnique({
    where: { id: Number(id) }
  });

  if (!loginOparetor) {
    throw { message: "Operator Not Found", status: 404 };
  }

  const getAgent = await prisma.$queryRaw`
    SELECT 
      id, name, assignStatus, phone, address,
      createdAt, updatedAt, userName, agentCode, status
    FROM agent
    WHERE agentCode = ${cleanCode}
    LIMIT 1
  `;

  const agent = getAgent[0];

  if (!agent) {
    throw { message: "Agent not found", status: 404 };
  }

  return {
    success: true,
    getAgent: agent
  };
};

const getAllGadgetByBranch=async({user, query})=>{
  const {id}=user;


  const page=Number(query.page)||1;
  const limit=Number(query.limit)||100;
  const skip=(page-1)*limit
      const loginOparetor= await prisma.user.findUnique({
      where:{id:Number(id)}
    });
  const totalAgent= await prisma.agent.count({
    where:{branchId:loginOparetor.branchId}
  })
 
    if(!loginOparetor){throw{message:'Oparetor Not Found', status:404}}

    const allGadget=await prisma.agent.findMany({
        where:{branchId:loginOparetor.branchId},
        select:{
            id:true,name:true, gadgetId:true, imeino:true
        },
        skip:skip,
        take:limit
    });

    return{allGadget,totalPage:Math.ceil(totalAgent/limit), success:true}
};

const editGadgetByAgent=async({user,params,body})=>{
  const {id}=params
  const oparetor=user.id
  const {gadgetId,imeino}=body

  if(!gadgetId||!imeino){throw{message:'All Fields Required', status:400}}
  const loginOparetor= await prisma.user.findUnique({
    where:{id:Number(oparetor)}
  });
  if(!loginOparetor){throw{message:'Oparetor Not Found', status:404}}

  const agent= await prisma.agent.findUnique({
    where:{id:Number(id)}
  });
  if(!agent){throw{message:'Agent Not Found',status:404}}

  await prisma.agent.update({
    where:{id:agent.id, branchId:loginOparetor.branchId},
    data:{gadgetId,imeino}
  })
  return{message:'Agent Gadget Edit Successfully', success:true}
};

const searchAgentByGadgetId = async ({ user, query }) => {
  const { gadgetId } = query;
  const { id } = user;

  if (!gadgetId) {
    throw { message: "Gadget Id required", status: 400 };
  }

  const cleanCode = gadgetId.trim();

  const loginOparetor = await prisma.user.findUnique({
    where: { id: Number(id) }
  });

  if (!loginOparetor) {
    throw { message: "Operator Not Found", status: 404 };
  }

  const getGadget = await prisma.$queryRaw`
    SELECT 
      id, name,gadgetId,imeino
    FROM agent
    WHERE gadgetId = ${cleanCode}
    LIMIT 1
  `;

  const gadget = getGadget[0];

  if (!gadget) {
    throw { message: "Agent not found", status: 404 };
  }

  return {
    success: true,
    getGadget: gadget
  };
};









module.exports={addAgent,getAllAgentByBranch,getAllAssignedAgentByCashier,getAllUnassignedAgentByCashier,assignAgent,unassignAgent,addHotNumber,
    getMostBettingNumber,blockedAgentGadget,unblockedAgent,openBetSession,closeBetSession,getActiveBetSession, getAllCashierByBranch,
    drewResult,deleteAgent,getTotalInOutReportByBranch, searchAgent,getAllGadgetByBranch,editGadgetByAgent,searchAgentByGadgetId

}