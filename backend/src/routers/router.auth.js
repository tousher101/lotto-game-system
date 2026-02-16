const express=require('express');
const route=express.Router();
const verification=require('../middle-wear/verification');
const roleVerification=require('../middle-wear/roleAuthorization');
const {body,validationResult}=require('express-validator')
const authController=require('../controllers/controller.auth')

route.put('/create-admin',[body('email','Enter Valid Email').isEmail(), body('name','Enter Valid Name').isLength({min:3}),
body('password', 'Enter Valid Password').isLength({min:5}), body('phone').isLength({max:10,min:10})],authController.createAdmin);

route.post('/login',authController.loginControl);
route.post('/refresh',authController.refreshControl);
route.post('/agentlogin',authController.agentLoginControll);
route.post('refreshforagent',authController.refreshForAgentControll);






module.exports=route