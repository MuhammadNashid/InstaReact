import { Router } from "express";

import * as rh from './requestHandler.js'
import Auth from "./middle/Auth.js";

const router=Router();

router.route('/adduser').post(rh.adduser)
router.route('/login').post(rh.login)
router.route('/verify').post(rh.verifyemail)
router.route('/getUser').get(Auth,rh.getUser)


export default router;