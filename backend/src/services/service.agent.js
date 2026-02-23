const prisma=require('../lib/prisma')
const betTicketNumber=require('../lib/genTrxCode');
const getPurmutations=require('../lib/rumbleCreate')


const bettingByAgent=async({user,body})=>{
    const {agent}=user;
    const {drewTimeId,number}=body;
    const loginAgent= await prisma.agent.findUnique({
        where:{id:agent}
    });
    if(!loginAgent){throw{message:'Agent Not Found',status:404}}
    if(loginAgent.status==='INACTIVE'){throw{message:'Gadget is blocked! Please contact with cashier',status:401}}
    if(loginAgent.isPaid===false){throw{message:'Gadget is blocked! Please pay your all remittance', status:401}}
    if(loginAgent.assignStatus==='NOT_ASSIGNED'){throw {message:'Your are Not Assigned Agent',status:401}}
    if(!drewTimeId||!Array.isArray(number)){throw{message:'All Fields Required', status:400}}

    const activeBetSession= await prisma.betSession.findFirst({
        where:{betSessionStatus:"ACTIVE",branchId:loginAgent.branchId}
    });
    if(!activeBetSession){throw{messgae:'Betting not active'}}
    if(activeBetSession.betSessionStatus==='CUT_OFF'){throw{message:'Betting Closed',status:400}}

    const result=await prisma.$transaction(async(tx)=>{

    let betNumberData=[]
    for(const n of number){
        if(n.bettingOption==='RS-3'){
            const combination=getPurmutations(n.number.toString());
            const baseAmount= Math.floor(n.amount/combination.length);
            let remainder= n.amount-(baseAmount*combination.length);
            for(let combo of combination){
                let finalAmount=baseAmount;
                if(remainder>0){finalAmount+=1;remainder--}
                betNumberData.push({
                number:combo,amount:finalAmount,bettingOption:'RS-3'
            })
            };
            

        } 
        else{
             const hotNumber= await tx.hotNumber.findFirst({
        where:{number:n.number,isActive:true,branchId:loginAgent.branchId,drewTimeId,betSessionId:activeBetSession.id}
        });
        if(hotNumber){
        const totalAmount= await tx.betNumber.aggregate({
        _sum:{amount:true},
        where:{number:n.number,
            betting:{
                branchId:loginAgent.branchId,drewTimeId,betSessionId:activeBetSession.id
            }
        }
    });
    const alreadyBet= totalAmount._sum.amount||0;
    if(alreadyBet+n.amount>hotNumber.limit){throw{messgae:`Number ${n.number} Solde Out`,status:400} }
        
    }
    betNumberData.push({
     number:n.number,amount:n.amount,bettingOption:n.bettingOption
    })
        }
        };
        const ticketId=betTicketNumber();
        const calculatedTotalAmount= betNumberData.reduce((sum,item)=>sum+item.amount,0)
       const betting= await tx.betting.create({
        data:{
            bettingNumber:{
                create:betNumberData,
            },
            totalBetAmount:calculatedTotalAmount, betTrxId:ticketId,drewTimeId,agentId:loginAgent.id,branchId:loginAgent.branchId,qrPayload:ticketId,
            isBetting:true,betSessionId:activeBetSession.id
        }
    });
    
    return {message:"Bet Create Successfully",betting}

    });
    return result

   
};



const getBetSlip=async(data)=>{
    const {bettingId}=data;
    const bet= await prisma.betting.findUnique({
        where:{id:bettingId}
    });
    if(!bet){throw{message:'Bet Not Found',status:404}}
    const betingData= await prisma.betting.findUnique({
        where:{id:bet.id},
        select:{
            bettingNumber:true,totalBetAmount:true,betTrxId:true,qrPayload:true,createdAt:true,
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

const getAllBetByAgent=async({user,body})=>{
    const {agent}=user;
    const {date}=body;
    let{drewTimeId}=body
    const loginAgent= await prisma.agent.findUnique({
        where:{id:agent}
    });
    if(!loginAgent){throw{message:'Agent Not Found',status:404}}
    const activeBetSession= await prisma.betSession.findFirst({
        where:{betSessionStatus:'ACTIVE'}
    });
    if(!activeBetSession){throw{message:'Bet Session Not Active',status:400}}

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
        drewTimeId=drewTimeId?Number(drewTimeId):activeBetSession.id

    const allBetByAgent= await prisma.betting.findMany({
        where:{agentId:loginAgent.id,drewTimeId,createdAt:{gte:start,lte:end}},
        select:{id:true,betTrxId:true}
    });

    return allBetByAgent
    
};

const getBetSlipDetails= async({user,params})=>{
    const {agentId}=user;
    const {betId}=params;
      const bet= await prisma.betting.findUnique({
        where:{id:betId}
    });
    const loginAgent= await prisma.agent.findUnique({
        where:{id:agentId}
    });
    if(!loginAgent){throw{message:'Agent Not Found',status:404}}
    if(!bet){throw{message:'Bet Not Found',status:404}}
    const betingData= await prisma.betting.findFirst({
        where:{id:bet.id,agentId:loginAgent.id},
        select:{
            bettingNumber:true,totalBetAmount:true,betTrxId:true,qrPayload:true,createdAt:true,
            drewTime:{
                select:{
                    time:true,timePost:true
                }
            },
            agent:{
                select:{
                    name:true,gadgetId:true,
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
}

const getAgentInfo= async(data)=>{
    const {agentId}=data;
    const loginAgent= await prisma.agent.findUnique({
        where:{id:agentId}
    });
    if(!loginAgent){throw{message:'Agent Not Found',status:404}}
    const agentData= await prisma.agent.findFirst({
        where:{id:loginAgent.id},
        select:{ id:true,
            name:true,gadgetId:true,phone:true,agentCode:true,status:true,email:true, assignStatus:true,
            branch:{
                select:{
                    name:true
                }
            }
        }
    });
    return agentData
};

const getAgentTransection=async({body,user})=>{
    const {agentId}=user;
    const {date}=body;
    let {drewTimeId}=body;

    let start = new Date();
  let end = new Date();

  if (date) {
    start = new Date(date);
    end = new Date(date);
  }

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

    drewTimeId=drewTimeId?Number(drewTimeId):1
    const loginAgent= await prisma.agent.findUnique({
        where:{id:agentId}
    });

    if(!loginAgent){throw{message:'Agent Not Found', status:404}}

    const winNumber= await prisma.drewResult.findFirst({
        where:{drewTimeId:Number(drewTimeId),createdAt:{gte:start,lte:end}},
        select:{winNumberStright}
    });

   const totalBetting= await prisma.betting.aggregate({
    _sum:{totalBetAmount:true},
    _count:{_all:true},
    where:{agentId:loginAgent.id, drewTimeId, createdAt:{gte:start,lte:end},branchId:loginAgent.branchId}
   });
   const totalBetAmount= totalBetting._sum.totalBetAmount||0;
   const totalBetCount= totalBetting._count._all||0;
   const comission=loginAgent.commission
   const comissionAmount= Math.round(totalBetAmount*comission/100)
   let bettingFee=0;
   if(totalBetCount>0){bettingFee=10}
   const beforeNetBettingAmount= totalBetAmount-comissionAmount;
   const netBettingAmount=beforeNetBettingAmount+bettingFee;

    const transectionHistory= await prisma.transaction.findFirst({
        where:{agentId:loginAgent.id,branchId:loginAgent.branchId, createdAt:{gte:start,lte:end},drewTimeId:Number(drewTimeId),branchId:loginAgent.branchId},
        select:{
            netPayableAmount:true,status:true,agentWining:true
        }
    });
    const totalNumBetting= await prism.betNumber.groupBy({
        by:['bettingOption'],
        where:{agentId,drewTimeId,branchId:loginCashier.branchId,createdAt:{gte:start,lte:end}},
        _count:{_all:true},
        _sum:{amount}
    });

    const last2= totalNumBetting.find(i=>i.bettingOption==='L_2');
    const totalAmountOfLast2=last2?._sum.amount||0;
    const totalCountOfLast2=last2?._count._all||0;

    const stright=totalNumBetting.find(i=>i.bettingOption==='S_3');
    const totalAmountOfStright=stright?._sum.amount||0;
    const totalCounttOfStright=stright?._count._all||0;

    const rumble=totalNumBetting.find(i=>i.bettingOption==='RS_3');
    const totalAmountOfRumble=rumble?._sum.amount||0;
    const totalcountOfRumble=rumble?._count._all||0;
    return {transectionHistory,winNumber, totalBetAmount,totalBetCount,comission,comissionAmount,bettingFee, netBettingAmount,

    }
};






module.exports={bettingByAgent,getBetSlip,getAllBetByAgent,getAgentInfo,getAgentTransection,getBetSlipDetails}