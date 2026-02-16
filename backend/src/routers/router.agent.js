const express=require('express');
const route=express.Router();
const agentVerification=require('../middle-wear/agentVerification');
const agentController=require('../controllers/controller.agent')

route.post('/bet',agentVerification,agentController.bettingByAgentControll);
route.get('/betslip/:id',agentVerification,agentController.getBetSlipControll);
route.get('/getallbets',agentVerification,agentController.getAllBetByAgentControll);
route.get('/agentinfo',agentVerification,agentController.getAgentInfoControll);
route.get('/getagenttransection',agentVerification,agentController.getAgentTransectionControll);
route.get('/betslipdetails/:id',agentVerification,agentController.getBetSlipDetailsControll);



module.exports=route