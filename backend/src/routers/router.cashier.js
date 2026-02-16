const express=require('express')
const route=express.Router();
const verification=require('../middle-wear/verification');
const roleVerification=require('../middle-wear/roleAuthorization');
const cashierController=require('../controllers/controller.cashier');


route.get('/allagenttransection',verification,roleVerification('CASHIER'),cashierController.getAllAgentTransectionControll);
route.get('/getagentremittransection/:id',verification,roleVerification('CASHIER'),cashierController.getRemitTransectionSummarybyAgentControll);
route.get('/getagentpayabletransection/:id',verification,roleVerification('CASHIER'),cashierController.getPayableTransectionSummarybyAgentControll);


module.exports=route