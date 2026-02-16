const prisma=require('../lib/prisma');
const bcrypt=require('bcryptjs');


const addOparetor=async(data)=>{
     const {name,email,password,userName,branchId}=data
        if(!name||!email||!password||!userName||!branchId){throw{message:'All field Required',status:400}}
        const existing= await prisma.user.findFirst({
            where:{OR:[userName,phone,email]}})
        if(existing){throw{message:'User Already Exists',status:401}}
        const salt= await bcrypt.genSalt(10)
        const secPass= await bcrypt.hash(password,salt)
        await prisma.user.create({
            data:{name,userName,password:secPass,email,branchId,role:'OPARETOR'}
        });
        return {message:'Oparetor Create Successfully'}
};

const addHeadCashier= async(data)=>{
     const {name,email,password,userName,branchId}=data
        if(!name||!email||!password||!userName||!branchId){throw{message:'All field Required',status:400}}
        const existing= await prisma.user.findFirst({
            where:{OR:[userName,phone,email]}})
        if(existing){throw{message:'User Already Exists',status:401}}
        const salt= await bcrypt.genSalt(10)
        const secPass= await bcrypt.hash(password,salt)
        await prisma.user.create({
            data:{name,userName,password:secPass,email,branchId,role:'HEAD_CASHIER'}
        });
        return {message:'Head-Cashier Create Successfully'}
};

const addCashier=async(data)=>{
    const {name,email,password,userName,branchId}=data
        if(!name||!email||!password||!userName||!branchId){throw{message:'All field Required',status:400}}
        const existing= await prisma.user.findFirst({
            where:{OR:[userName,phone,email]}})
        if(existing){throw{message:'User Already Exists', status:401}}
        const salt= await bcrypt.genSalt(10)
        const secPass= await bcrypt.hash(password,salt)
        await prisma.user.create({
            data:{name,userName,password:secPass,email,branchId,role:'CASHIER'}
        });
        return {message:'Cashier Create Successfully'}
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
        return allOparetor
};


const getAllHeadCashier=async()=>{
    const allHeadCashier= await prisma.user.findMany({
            where:{role:'HEAD-CASHIER'},
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
        return allHeadCashier
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
        return allCashier
};

const deleteOparetor=async(data)=>{
    const {userId}=data
       const user= await prisma.user.findFirst({
            where:{userId,role:'OPARETOR'}
        });
        if(!user){throw{message:'Oparetor Not Found',status:404}}
        await prisma.user.delete({
            where:{userId}
        });
        return {message:'Oparetor Delete Successfully'}
};

const deleteHeadCashier= async(data)=>{
    const {userId}=data
       const user= await prisma.user.findFirst({
            where:{userId,role:'HEAD_CASHIER'}
        });
        if(!user){throw{message:'Head-Cashier Not Found',status:404}}
        await prisma.user.delete({
            where:{userId}
        });
        return {message:'Head-Cashier Delete Successfully'}
};


const deleteCashier=async(data)=>{
     const {userId}=data
       const user= await prisma.user.findFirst({
            where:{id:userId,role:'CASHIER'}
        });
        if(!user){throw{message:'Cashier Not Found',status:404}}
        await prisma.user.delete({
            where:{id:userId}
        });
        return {message:'Cashier Delete Successfully'}
};

const addNewBranch=async(data)=>{
    const {name,code,address}=data
        if(!name||!code||!address){throw{msg:'All field required',status:400}}
        await prisma.branch.create({
            data:{name,code,address}
        });
        return {message:'New branch added successfully'}
};

const editBranch= async({body,params})=>{
    const {branchId}=params
        const {newName,newCode,newAddress}=body
        if(!newName||!newCode||!newAddress){throw {message:'All field required',status:400}}
        const branch= await prisma.branch.findUnique({
            where:{id:branchId}
        });
        if(!branch){throw{message:'Branch Not Found',status:400}}
        await prisma.branch.update({
            where:{id:branch.id},
            data:{name:newName,code:newCode,address:newAddress}
        });
        return {message:'Branch Edited Successfully'}
};

const addNewDrawTime= async(data)=>{
    const {time,timePost}=data
        if(!time||!timePost){return res.status(400).json({msg:'All field required'})}
        await prisma.drewtime.create({
            data:{time,timePost}
        });
        return {message:'Drew Time Added Successfully'}
};

const editDrawTime= async({body,params})=>{
     const {drawTimeId}=params;
        const {newTime,newTimePost}=body;
        if(!newTime||!newTimePost){return res.status(400).json({msg:'All field required'})}
        const drawTime= await prisma.drewtime.findUnique({
            where:{id:drawTimeId}
        });
        if(!drawTime){throw{message:'Draw Time Not Found', status:404}}
        await prisma.drewtime.update({
            where:{id:drawTimeId},
            data:{
                time:newTime,
                timePost:newTimePost
            }
        });
        return {message:'Draw Time Edited Successfully'}
};



const getTotalInOutReportByBranch=async(data)=>{
    let { date } = data;
    let drewTimeId=Number(data.drewTimeId);
    let branchId=Number(data.branchId)

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

      const totalInOutAmount = await prisma.transaction.findFirst({
        where: {
          createdAt: {
            gte: start,
            lte: end,
          },
          branchId: branchId,
          drewTimeId: drewTimeId,
        },
        select: {
          totalInAmount: true,
          totalOutAmount: true,
        },
        orderBy:{ createdAt:"desc" }
      });

      const totalInOutAmountByCashier= await prisma.transaction.findMany({
        where:{createdAt:{gte:startDate,lte:endDate},branchId,drewTimeId,user:{role:'CASHIER'}},
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

const totalInOutDetailsReportByCashier= async({params,query})=>{
    const {date}=query;
    const userId=Number(params.userId)
    const branchId=Number(query.branchId)
    const drewTimeId=Number(query.drewTimeId)
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

     const totalReceivedByCashier= await prisma.transaction.findFirst({
         where:{branchId,drewTimeId,userId,user:{role:'CASHIER'},status:'SETTELED'},
         select:{netRimteAmount}
      });

      const totalPaidByCashier= await prisma.transaction.findFirst({
        where:{branchId,drewTimeId,userId,user:{role:'CASHIER'},status:'SETTELED'},
         select:{netPayableAmount}
      });

      const totalPendingRecivedByCashier=await prisma.transaction.findFirst({
         where:{branchId,drewTimeId,userId,user:{role:'CASHIER'},status:'PENDING'},
         select:{netRimteAmount}
      });

      const totalPendingPaidByCashier= await prisma.transaction.findFirst({
        where:{branchId,drewTimeId,userId,user:{role:'CASHIER'},status:'PENDING'},
         select:{netPayableAmount}
      });

      return{totalPaidByCashier,totalReceivedByCashier,totalPendingPaidByCashier,totalPendingRecivedByCashier}


};

const getAllAgentReport=async(data)=>{
    let { branchId, drewTimeId, date,userId } = data
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

      const allAgentTransection= await prisma.transaction.findMany({
        where:{createdAt:{gte:start, lte:end}, branchId, drewTimeId, userId,user:{role:'CASHIER'}},
        select:{
            grossRemit:true,
            grossPayable:true,
            netremiteAmount:true,
            netpayableAmount:true,
            status:true,
            agent:{
                select:{
                    id:true,
                    name:true,
                    comission:true
                }
            },

        },
      });
      return allAgentTransection

};

const getAgentDetailsReport=async({params,query})=>{
    const {agentId}=params
        const {drewTimeId}=query
        const agent= await prisma.agent.findUnique({
            where:{id:agentId}
        });
        const totalBet= await prisma.betting.count({
            where:{agentId:agent.id,drewtimeId:drewTimeId}
        });

        const totalL2Bet= await prisma.betNumber.aggregate({
            _sum:{amount},
            where:{agentId:agent.id,bettingOption:'L-2',drewTimeId:drewTimeId}
        });

           const totalS2Bet= await prisma.betNumber.aggregate({
            _sum:{amount},
            where:{agentId:agent.id,bettingOption:'S-3',drewTimeId:drewTimeId}
        });

           const totalRS3Bet= await prisma.betNumber.aggregate({
            _sum:{amount},
            where:{agentId:agent.id,bettingOption:'RS-3',drewTimeId:drewTimeId}
        });

        const L2count= await prisma.betNumber.count({
            where:{agentId:agent.id, bettingOption:'L-2',drewTimeId:drewTimeId}
        });
        const S3count= await prisma.betNumber.count({
            where:{agentId:agent.id, bettingOption:'S-3',drewTimeId:drewTimeId}
        })
         const RS3count= await prisma.betNumber.count({
            where:{agentId:agent.id, bettingOption:'RS-3',drewTimeId:drewTimeId}
        })

        if(!agent){return res.status(404).json({msg:'Agent Not Found'})}
        const agentBetData= await prisma.agent.findUnique({
            where:{id:agent.id},
            select:{
                name:true,
                gadgetId:true,
                status:true,
                branch:true,
                isPaid:true,
                transaction:{
                    select:{
                       grossRemit:true,
                       grossPayable:true,
                       netremiteAmount:true,
                       netPayableAmount:true,
                       agentWining:true,
                    }
                },
            }
        });

        

        
        return totalBet,totalL2Bet,totalRS3Bet, totalS2Bet,L2count,S3count,RS3count,agentBetData
};

const getAllBranches= async()=>{
    const allBranches= await prisma.branch.findMany({
        select:{name:true,code:true}
    })
    return allBranches
};

const getAllDrawTime= async()=>{
    const allDrawTime= await prisma.drewtime.findMany({
        select:{
            time:true, timePost:true
        }
    });
    return allDrawTime
};

const getAllCashierByBranch=async(data)=>{
    const {branchId}=data;
    const allCashier= await prisma.user.findMany({
            where:{role:'CASHIER',branchId},
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
        return allCashier
};

const getAllAgentByBranch=async(data)=>{
     const {branchId}=data
    const AllAgent= await prisma.agent.findMany({
        where:{branchId},
        select:{
            id:true,name:true, gadgetId:true, assignStatus:true,phone:true,address:true,createdAt:true,updatedAt:true,userName:true,
            agentCode:true,
        }
    });
     return AllAgent
};

const getAllAssignedAgentByCashier=async(data)=>{
    const {cashierId,branchId}=data;
    const allAssignedAgent= await prisma.agent.findMany({
        where:{branchId,cashierId, assignStatus:"ASSIGNED"},
          select:{
            id:true,name:true, gadgetId:true, assignStatus:true,phone:true,address:true,createdAt:true,updatedAt:true,userName:true,
            agentCode:true,
            }
    });
    return allAssignedAgent
};

const getAllUnassignedAgentByCashier=async(data)=>{
    const {branchId}=data;
    const allUnassignedAgent= await prisma.agent.findMany({
        where:{branchId, assignStatus:"NOT_ASSIGNED"},
          select:{
            id:true,name:true, gadgetId:true, assignStatus:true,phone:true,address:true,createdAt:true,updatedAt:true,userName:true,
            agentCode:true,
                }
    });
    return allUnassignedAgent
}


module.exports={addOparetor,addHeadCashier,addCashier,getAllOparetor,getAllHeadCashier,getAllCashier,deleteOparetor,deleteHeadCashier,
    deleteCashier,addNewBranch,editBranch,addNewDrawTime,editDrawTime, getTotalInOutReportByBranch,getAllAgentReport,
    getAgentDetailsReport,getAllBranches,getAllDrawTime,getAllCashierByBranch,getAllAgentByBranch,getAllAssignedAgentByCashier,
    getAllUnassignedAgentByCashier,totalInOutDetailsReportByCashier
}