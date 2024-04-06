// path: /api/v1/customer
import { Router } from "express";
import { createCustomer, deleteCustomer, getActiveCustomers, getAllCustomers, getCustomer, getInactiveCustomers, updateCustomer, updateStateCustomer } from "../controllers/customer.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields"
import validateJWT from "../middlewares/validate-jwt";

const router = Router();

router.post("/",
    // validateJWT,
    [
        check('name', 'Name is required').not().isEmpty(),
        check('lastName', 'Lastname is required').not().isEmpty(),
        check('email', 'Email is required').not().isEmpty().isEmail(),
        check('phone', 'Phone is required').not().isEmpty(),
        check('address', 'Address is required').not().isEmpty(),
        check('documentType', 'Document type is required').not().isEmpty(),
        check('documentNumber', 'Document number is required').not().isEmpty(),
        check('city', 'City is required').not().isEmpty(),
        validateFields
    ],
    createCustomer);
// router.get("/", validateJWT, getAllCustomers);
router.get("/", getAllCustomers);
router.get("/active", validateJWT, getActiveCustomers);
router.get("/inactive", validateJWT, getInactiveCustomers);
router.get("/:id", validateJWT, getCustomer);
router.put("/:id", validateJWT, updateCustomer);
router.put("/update-state/:id", validateJWT, updateStateCustomer);
router.delete("/:id", validateJWT, deleteCustomer);

export default router;