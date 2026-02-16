const express=require('express');
const route=express.Router();
const oparetorController=require('../controllers/controller.oparetor');
const verification=require('../middle-wear/verification');
const roleVerification=require('../middle-wear/roleAuthorization');

route.put('/addagent',verification,roleVerification('OPARETOR'),oparetorController.addAgentControll);
route.get('/getallagent',verification,roleVerification('OPARETOR'),oparetorController.getAllAgentByBranchControll);
route.get('/getallassignedagent',verification,roleVerification('OPARETOR'),oparetorController.getAllAssignedAgentByCashierControll);
route.get('/getallunassignedagent',verification,roleVerification('OPARETOR'),oparetorController.getAllUnassignedAgentByCashierControll);
route.put('/assignagent',verification,roleVerification('OPARETOR'),oparetorController.assignAgentControll);
route.put('/unassigendagent',verification,roleVerification('OPARETOR'),oparetorController.unassignedAgentControll);
route.put('/addhotnumber',verification,roleVerification('OPARETOR'),oparetorController.addHotNumberControll);
route.get('/getmostbettingnumber',verification,roleVerification('OPARETOR'),oparetorController.getMostBettingNumberControll);
route.get('/detailsreportbycashier/:id',verification,roleVerification('OPARETOR'),oparetorController.totalInOutDetailsReportByCashierControll);
route.get('/branchreport',verification,roleVerification('OPARETOR'),oparetorController.getTotalInOutReportByBranchControll);
route.put('/blockedagentgadget/:id',verification,roleVerification('OPARETOR'),oparetorController.blockedAgentGadgetControll);
route.put('/unblockedagent/:id',verification,roleVerification('OPARETOR'),oparetorController.unblockedAgentControll);
route.put('/openbetsession',verification,roleVerification('OPARETOR'),oparetorController.openBetSessionControll);
route.put('/closedbetsession/:id',verification,roleVerification('OPARETOR'),oparetorController.closeBetSessionControll);
route.get('/getactivebetsession',verification,roleVerification('OPARETOR'),oparetorController.getActiveBetSessionControll);
route.put('/drewresultpublish',verification,roleVerification('OPARETOR'),oparetorController.drewResultControll);
route.delete('/deleteagent/:id',verification,roleVerification('OPARETOR'),oparetorController.deleteAgentControll);
route.put('/editagent/:id',verification,roleVerification('OPARETOR'),oparetorController.editAgentInfoControll);



module.exports=route