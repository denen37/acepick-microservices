"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import packages
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const upload_1 = require("../utils/upload");
const routes = (0, express_1.Router)();
/*************************************************************************
API CALL START
*************************************************************************/
// INDEX ROUTE TO SHOW API IS WORKING FINE.
routes.post('/send-otp', auth_1.sendOtp);
// routes.get('/profile', accountInfo);
routes.get('/switch', auth_1.swithAccount);
// routes.get('/profile/:id', accountSingleInfo)
routes.post('/update-profile', auth_1.updateProfile);
// routes.post('/update-professional', updateProfessional);
// routes.post('/corperate', ProfAccountInfo);
routes.post('/register', auth_1.register);
routes.post('/upload_avatar', upload_1.uploads.single('avatar'), auth_1.upload_avatar);
routes.post('/register-steptwo', auth_1.registerStepTwo);
routes.post('/register-stepthree', auth_1.registerStepThree);
routes.post('/corperate-register', auth_1.corperateReg);
routes.post('/login', auth_1.login);
routes.post('/change-password-loggedin', auth_1.passwordChange);
routes.post('/change-password-forgot', auth_1.changePassword);
routes.post('/verify-otp', auth_1.verifyOtp);
routes.post('/update-fcm-token', auth_1.updateFcmToken);
// routes.post("/verify-bvn", verifyBvnDetail)
routes.post("/verify-bvn2", auth_1.verifyMyBvn);
routes.get("/delete-users", auth_1.deleteUsers);
routes.post('/verify-token', auth_1.authorize);
// routes.get("/createCat", createCat)
exports.default = routes;
//# sourceMappingURL=auth.js.map