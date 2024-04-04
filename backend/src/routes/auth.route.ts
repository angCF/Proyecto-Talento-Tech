// path = '/api/v1/auth' 
import { Router } from "express";
import { login, recoveAccess, renovateToken, resetPassword } from "../controllers/auth.controller";
import { validateFields } from "../middlewares/validate-fields";
import { check } from "express-validator";
import validateJWT, { validatePassJWT } from "../middlewares/validate-jwt";

const router = Router();

router.post("/", 
[
    check('login', 'Login is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
],login);
router.get('/',validateJWT, renovateToken);
router.post("/recover-access", 
[
    check('email', 'Email is required').not().isEmpty(),
    check('documentNumber', 'Document number is required').not().isEmpty(),
    validateFields
],recoveAccess);
router.put("/reset-password", validatePassJWT,
[
    check('login', 'Login is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
],resetPassword);

export default router;