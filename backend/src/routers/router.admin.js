const express=require('express');
const route=express.Router();
const verification=require('../middle-wear/verification');
const roleVerification=require('../middle-wear/roleAuthorization');
const adminController=require('../controllers/controller.admin');



route.put('/addnewoparetor',verification,roleVerification('ADMIN'),adminController.addOparetorControll);
route.put('/addnewheadcashier',verification,roleVerification('ADMIN'),adminController.addHeadCashierControll);
route.put('/addnewcashier',verification,roleVerification('ADMIN'),adminController.addCashierControll);
route.get('/getalloparetor',verification,roleVerification('ADMIN'),adminController.getAllOparetorControll);
route.get('/getallheadcashier',verification,roleVerification('ADMIN'),adminController.getAllHeadCashierControll);
route.get('/getallcashier',verification,roleVerification('ADMIN'),adminController.getAllCashierControll);
route.delete('/deleteopretor/:id',verification,roleVerification('ADMIN'),adminController.deleteOparetorControll);
route.delete('deleteheadcashier/:id',verification,roleVerification('ADMIN'),adminController.deleteHeadCashierControll);
route.delete('deletecashier/:id',verification,roleVerification('ADMIN'),adminController.deleteCashierControll);
route.put('/addnewbranch',verification,roleVerification('ADMIN'),adminController.addNewBranchControll);
route.put('/editbranch/:id',verification,roleVerification('ADMIN'),adminController.editBranchControll);
route.put('/addnewdrawtime',verification,roleVerification('ADMIN'),adminController.addNewDrawTimeControll);
route.put('/editdrawtime/:id',verification,roleVerification('ADMIN'),adminController.editDrawTimeControll);
route.get('/getallagent',verification,roleVerification('ADMIN'),adminController.getAllAgentByBranchControll);
route.get('/gettotalinoutreportbybranch',verification,roleVerification('ADMIN'),adminController.getTotalInOutReportByBranchControll);
route.get('/getallagentreport',verification,roleVerification('ADMIN'),adminController.getAllAgentReportControll);
route.get('/agentdetailsreport/:id',verification,roleVerification('ADMIN'),adminController.getAgentDetailsReportControll);
route.get('/getallbranched',verification,roleVerification('ADMIN'),adminController.getAllBranchesControll);
route.get('/getalldrawtime',verification,roleVerification('ADMIN'),adminController.getAllDrawTimeControll);
route.get('/getallcashierbybranch',verification,roleVerification('ADMIN'),adminController.getAllCashierByBranchControll);
route.get('/allassignedagent',verification,roleVerification('ADMIN'),adminController.allAssignedAgentControll);
route.get('allunassignedagent',verification,roleVerification('ADMIN'),adminController.allUnassignedAgentControll);
route.get('/totalinoutdetailsbycashier',verification,roleVerification('ADMIN'),adminController.totalInOutDetailsReportByCashierControll);







module.exports=route