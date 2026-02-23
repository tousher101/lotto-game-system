const express=require('express');
const route=express.Router();

const authController=require('../controllers/controller.auth')
const verification=require('../middle-wear/verification')
route.post('/createadmin',authController.createAdminControll);

route.post('/login',authController.loginControl);
route.post('/refresh',authController.refreshControl);
route.post('/agentlogin',authController.agentLoginControll);
route.put('/agentpasswordchange',authController.agentChangePasswordControll);
route.put('/userforgetpassword',authController.userForgetPasswordControll);
route.post('/logout',authController.logOutControll);
route.get('/alluserdata',verification,authController.getAllUserInfoControll);







module.exports=route