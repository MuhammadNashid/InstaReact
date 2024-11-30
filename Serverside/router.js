import { Router } from "express";

import * as rh from './requestHandler.js'
import Auth from "./middle/Auth.js";

const router=Router();

router.route('/adduser').post(rh.adduser)
router.route('/login').post(rh.login)
router.route('/getUser').get(Auth,rh.getUser)
router.route('/getUserDetails/').get(Auth,rh.getUserDetails)
router.route('/emailvalidate').post(rh.emailValidate)
router.route('/updatePass').put(rh.updatePass)

export default router;