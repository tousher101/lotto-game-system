
const prism=require('../lib/prisma')

const getAllAgentTransection = async ({ user, body }) => {
  const { cashierId } = user;
  const { date, drewTimeId } = body;

  let start = new Date();
  let end = new Date();

  if (date) {
    start = new Date(date);
    end = new Date(date);
  }

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);


  const loginCashir = await prism.agent.findUnique({
    where: { id: cashierId },
  });

  if (!loginCashir) {
    throw { message: "Cashier Not Found", status: 404 };
  }


  const bettings = await prism.betting.groupBy({
    by: ["agentId"],
    where: {
      createdAt: { gte: start, lte: end },
      drewTimeId,
      branchId: loginCashir.branchId,
      isVoid: false,
    },
    _sum: {
      totalBetAmount: true,
    },
    _count: {
      _all: true,
    },
  });

  
  const transactions = await prism.transaction.findMany({
    where: {
      createdAt: { gte: start, lte: end },
      drewTimeId,
      branchId: loginCashir.branchId,
    },
    select: {
      agentId: true,
      grossPayable: true,
      netPayableAmount: true,
    },
  });


  const agents = await prism.agent.findMany({
    where: {
      branchId: loginCashir.branchId,
    },
    select: {
      id: true,
      name: true,
      commission: true,
    },
  });

 
  const result = agents.map((agent) => {
    const bet = bettings.find((b) => b.agentId === agent.id);
    const trx = transactions.find((t) => t.agentId === agent.id);

    const betCount = bet?._count?._all || 0;
    const grossBetAmount = bet?._sum?.totalBetAmount || 0;
    const comission= agent.commission 
    const comissionAmount= Math.round(grossBetAmount*(comission/100)) 
    const netBetAmount=Math.round(grossBetAmount-(grossBetAmount*(comission/100))) 
    const bettingFee=10 
    if(betCount>0){netBetAmount=netBetAmount+bettingFee}

    return {
      agentId: agent.id,
      agentName: agent.name,

      betCount,

      grossRemit,
      comissionAmount,
      bettingFee,
      netRemit,

      grossPayable: trx?.grossPayable || 0,
      netPayable: trx?.netPayableAmount || 0,
    };
  });

  return result;
};



const getRemitTransectionSummarybyAgent=async({user,params})=>{
    const {cashierId}=user;
    const {agentId}=params;
    const agent= await prism.agent.findUnique({
        where:{id:agentId}
    });
    const loginCashier= await prism.user.findUnique({
        where:{id:cashierId}
    });
    if(!loginCashier){throw{message:'Cashier Not Found',status:404}}
   
    if(!agent){throw{message:'Agent Not Found',status:404}}
    const transectionSummary= await prism.betting.aggregate({
        where:{agentId:agent.id, branchId:loginCashier.branchId,drewTimeId},
        _sum:{totalBetAmount:true},
        _count:{_all:true}
    });
    const grossRemit= transectionSummary._sum.totalBetAmount||0;
    const totalbetCount= transectionSummary._count._all||0;
    const comission= agent.commission 
    const comissionAmount= Math.round(grossRemit*(comission/100)) 
    const netBetAmount=Math.round(grossBetAmount-(grossRemit*(comission/100))) 
    const bettingFee=10 
    if(totalbetCount>0){netBetAmount=netBetAmount+bettingFee}




    return {grossRemit,netBetAmount,comissionAmount,bettingFee}
};



const getPayableTransectionSummarybyAgent=async({user,params})=>{
    const {cashierId}=user;
    const {agentId}=params;
    const agent= await prism.agent.findUnique({
        where:{id:agentId}
    });
    const loginCashier= await prism.user.findUnique({
        where:{id:cashierId}
    });
    if(!loginCashier){throw{message:'Cashier Not Found',status:404}}
   
    if(!agent){throw{message:'Agent Not Found',status:404}}
    const transectionSummary= await prism.transaction.findFirst({
        where:{agentId:agent.id, userId:Number(cashierId),drewTimeId},
        select:{ id:true,
            grossPayable:true,netPayableAmount:true,
            drewTime:{
                select:{
                    time:true,timePost:true
                }
            },agentWining:true
        }
    })


    return transectionSummary
};

const makeSetteledTransection=async({params})=>{
const {transactionId}=params;
if(!transactionId){throw{message:'Transection Not Available',status:404}}
 await prism.transaction.update({
    where:{id:Number(transactionId),status:'PENDING'},
    data:{status:'SETTELED'}
 });
 return {message:'Transection Setteled Successfully'}
};

const getAgentBet=async({user,body})=>{
    const {cashierId}=user;
    const {date}=body;
    let{agentId,drewTimeId}=body;

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

        drewTimeId=drewTimeId?Number(drewTimeId):1
    
    

    const loginCashier= await prism.user.findUnique({
        where:{id:cashierId}
    });
    if(!loginCashier){throw{message:'Cashier Not Found',status:404}};

    const getAllAgent= await prism.agent.findMany({
        where:{cashierId,branchId:loginCashier.branchId},
        select:{id:true,name:true,agentCode:true}
    });
    

    const getBetTransection= await prism.betting.findMany({
        where:{agentId, drewTimeId, branchId:loginCashier.branchId,createdAt:{gte:start,lte:end},isVoid:false},
        select:{
            id:true,totalBetAmount:true, createdAt:true, isVoid:true
        }
    });
    const totalBet= await prism.betting.count({
        where:{agentId, drewTimeId, branchId:loginCashier.branchId,createdAt:{gte:start,lte:end},isVoid:false}
    });

    const totalWin= await prism.transaction.findFirst({
        where:{agentId, drewTimeId, branchId:loginCashier.branchId,createdAt:{gte:start,lte:end}},
        select:{netPayableAmount:true,status:true}
    });

    const totalWinRecipt= await prism.transaction.count({
        where:{agentId, drewTimeId, branchId:loginCashier.branchId,agentWining:{some:{betTrxId}},createdAt:{gte:start,lte:end}}
    });

    const totalBetting= await prism.betNumber.groupBy({
        by:['bettingOption'],
        where:{agentId,drewTimeId,branchId:loginCashier.branchId,createdAt:{gte:start,lte:end}},
        _count:{_all:true},
        _sum:{amount}
    });

    const grandTotalAmount=totalBetting.reduce((sum,item)=>sum+(item?._sum.amount||0),0)
    const grandTotalCount= totalBetting.reduce((sum,item)=>sum+(item?._count._all||0),0)
    
    const last2= totalBetting.find(i=>i.bettingOption==='L_2');
    const totalAmountOfLast2=last2?._sum.amount||0;
    const totalCountOfLast2=last2?._count._all||0;

    const stright=totalBetting.find(i=>i.bettingOption==='S_3');
    const totalAmountOfStright=stright?._sum.amount||0;
    const totalCounttOfStright=stright?._count._all||0;

    const rumble=totalBetting.find(i=>i.bettingOption==='RS_3');
    const totalAmountOfRumble=rumble?._sum.amount||0;
    const totalcountOfRumble=rumble?._count._all||0;

return{getAllAgent,getBetTransection,totalBet,totalWin,totalWinRecipt,grandTotalAmount,grandTotalCount,totalAmountOfLast2,
    totalCountOfLast2,totalAmountOfStright,totalCounttOfStright,totalAmountOfRumble,totalcountOfRumble
}
 
};

const getBetSlip=async(data)=>{
    const {bettingId}=data;
    const bet= await prism.betting.findUnique({
        where:{id:bettingId}
    });
    if(!bet){throw{message:'Bet Not Found',status:404}}
    const betingData= await prism.betting.findUnique({
        where:{id:bet.id},
        select:{
            bettingNumber:true,totalBetAmount:true,betTrxId:true,qrPayload:true,createdAt:true,isVoid:true,
            drewTime:{
                select:{
                    time:true,timePost:true
                }
            },
            agent:{
                select:{
                    name:true,gadgetId:true,agentCode:true
                }
            },
            branch:{
                select:{
                    name:true,code:true
                }
            }
        }
    });
    return betingData
};

const makeVoidBet= async(data)=>{
    const {betId}=data;
    const bet= await prism.betting.findUnique({
        where:{id:Number(betId)}
    });
    if(!bet){throw{message:'Bet Not Found',status:404}}
await prism.betting.update({
    where:{id:bet.id},
    data:{isVoid:true}
});
return{messgae:'Bet Receipt Void Successfully'}
};



module.exports={getRemitTransectionSummarybyAgent,getAllAgentTransection,getPayableTransectionSummarybyAgent, getAgentBet,getBetSlip,
makeVoidBet
}