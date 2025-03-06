// Import packages
import { Router } from 'express';
import {/* ProfAccountInfo, accountInfo, accountSingleInfo,*/ changePassword, corperateReg, deleteUsers, login, passwordChange, register, registerStepThree, registerStepTwo, sendOtp, swithAccount, updateFcmToken, /*updateProfessional*/ updateProfile, verifyBvnDetail, verifyOtp } from '../controllers/auth';
import { uploads } from '../utils/upload';


const routes = Router();

/*************************************************************************
API CALL START
*************************************************************************/

// INDEX ROUTE TO SHOW API IS WORKING FINE.
routes.post('/send-otp', sendOtp);
// routes.get('/profile', accountInfo);
routes.get('/switch', swithAccount);
// routes.get('/profile/:id', accountSingleInfo)
routes.post('/update-profile', updateProfile);
// routes.post('/update-professional', updateProfessional);
// routes.get('/professional/profile', ProfAccountInfo);
// routes.post('/corperate', ProfAccountInfo);
routes.post('/register', register);
routes.post('/register-steptwo', uploads.single('avatar'), registerStepTwo);
routes.post('/prof-register-stepthree', registerStepThree);
routes.post('/corperate-register', corperateReg);
routes.post('/login', login);
routes.post('/password-change', passwordChange);
routes.post('/change-password', changePassword);
routes.post('/verify-otp', verifyOtp);
routes.post('/update-fcm-token', updateFcmToken)
routes.post("/verify-bvn", verifyBvnDetail)
routes.get("/delete-users", deleteUsers)
// routes.get("/createCat", createCat)


export default routes;
