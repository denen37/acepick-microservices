const express = require('express');
const router = express.Router();
import { addAccount, deleteAccount, getAccounts, getBanks, updateAccount } from "../controllers/account";
import { initiatePayment, initiateTransfer, verifyPayment } from "../controllers/payment";
import { getAllTransactions, getTransactionById } from "../controllers/transaction";
import { createWallet, creditWallet, debitWallet, resetPin, setPin, viewWallet } from "../controllers/wallet";
import { allowRoles } from "../middleware/allowRoles";


router.post('/payments/initiate-payment', /*allowRoles(UserRole.SEEKER),*/ initiatePayment);
router.post('/payments/verify-payment/:ref', /*allowRoles(UserRole.SEEKER),*/ verifyPayment);
router.post('/payments/initiate-transfer', /*allowRoles(UserRole.PROVIDER),*/ initiateTransfer);

router.post('/create-wallet', /*allowRoles(UserRole.SEEKER),*/ createWallet);
router.get('/view-wallet', /*allowRoles(UserRole.SEEKER),*/ viewWallet);
router.post('/debit-wallet', /*allowRoles(UserRole.SEEKER),*/ debitWallet);
router.post('/credit-wallet', /*allowRoles(UserRole.SEEKER),*/ creditWallet);
router.post('/set-pin', /*allowRoles(UserRole.SEEKER),*/ setPin);
router.post('/reset-pin', resetPin);

router.get('/transactions', /*allowRoles(UserRole.SEEKER, UserRole.PROVIDER),*/ getAllTransactions);
router.get('/transactions/:id', /*allowRoles(UserRole.SEEKER, UserRole.PROVIDER),*/ getTransactionById);

router.get('/accounts/banks', /*allowRoles(UserRole.PROVIDER),*/ getBanks);
router.post('/accounts', /*allowRoles(UserRole.PROVIDER),*/ addAccount);
router.get('/accounts', /*allowRoles(UserRole.PROVIDER),*/ getAccounts);
router.put('accounts/:recipientCode', updateAccount);
router.delete('/accounts/:recipientCode', deleteAccount);

export default router;