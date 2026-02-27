const express=require('express');
const route=express.Router();
const oparetorController=require('../controllers/controller.oparetor');
const verification=require('../middle-wear/verification');
const roleVerification=require('../middle-wear/roleAuthorization');

route.post('/addagent',verification,roleVerification('OPARETOR'),oparetorController.addAgentControll);
route.get('/getallagent',verification,roleVerification('OPARETOR'),oparetorController.getAllAgentByBranchControll);
route.get('/getallassignedagent',verification,roleVerification('OPARETOR'),oparetorController.getAllAssignedAgentByCashierControll);
route.get('/getallunassignedagent',verification,roleVerification('OPARETOR'),oparetorController.getAllUnassignedAgentByCashierControll);
route.put('/assignagent',verification,roleVerification('OPARETOR'),oparetorController.assignAgentControll);
route.put('/unassigendagent',verification,roleVerification('OPARETOR'),oparetorController.unassignedAgentControll);
route.put('/addhotnumber',verification,roleVerification('OPARETOR'),oparetorController.addHotNumberControll);
route.get('/getmostbettingnumber',verification,roleVerification('OPARETOR'),oparetorController.getMostBettingNumberControll);
route.put('/blockedagentgadget/:id',verification,roleVerification('OPARETOR'),oparetorController.blockedAgentGadgetControll);
route.put('/unblockedagent/:id',verification,roleVerification('OPARETOR'),oparetorController.unblockedAgentControll);
route.put('/openbetsession',verification,roleVerification('OPARETOR'),oparetorController.openBetSessionControll);
route.put('/closedbetsession/:id',verification,roleVerification('OPARETOR'),oparetorController.closeBetSessionControll);
route.get('/getactivebetsession',verification,roleVerification('OPARETOR'),oparetorController.getActiveBetSessionControll);
route.put('/drewresultpublish',verification,roleVerification('OPARETOR'),oparetorController.drewResultControll);
route.delete('/deleteagent/:id',verification,roleVerification('OPARETOR'),oparetorController.deleteAgentControll);
route.get('/branchreportbycashier',verification,roleVerification('OPARETOR'),oparetorController.getTotalInOutReportByBranchControll);
route.get('/searchagent',verification, roleVerification('OPARETOR'),oparetorController.searchAgentControll);
route.get('/getallgadgets',verification,roleVerification('OPARETOR'),oparetorController.getAllGadgetByBranchControll);
route.put('/editagentgadget/:id', verification, roleVerification('OPARETOR'),oparetorController.editGadgetByAgentControll);
route.get('/searchagentbygadget',verification,roleVerification('OPARETOR'),oparetorController.searchAgentByGadgetIdControll);
route.get('/getallcashier',verification,roleVerification('OPARETOR'),oparetorController.getAllCashierByBranchControll)



module.exports=route