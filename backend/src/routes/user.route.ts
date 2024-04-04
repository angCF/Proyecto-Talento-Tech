// path = '/api/v1/user' 

import { Router } from "express";
import { createdUser } from "../controllers/user.controller";
import { validateFields } from "../middlewares/validate-fields";
import { check } from "express-validator";
import validateJWT from "../middlewares/validate-jwt";

const router = Router();

router.post("/",
validateJWT, 
[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty().isEmail(),
    check('documentType', 'Document type is required').not().isEmpty(),
    check('documentNumber', 'Document number is required').not().isEmpty(),
    check('login', 'Login is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
],createdUser);

export default router;