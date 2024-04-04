// path: /api/v1/customer
import { Router } from "express";
import { createOpportunity, deleteOpportunity, getAllOpportunities, getOpportunity, updateOpportunity, updateStateOpportunity } from "../controllers/opportunity.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields"
import validateJWT from "../middlewares/validate-jwt";

const router = Router();

router.post("/",
    validateJWT,
    [
        check('name', 'Name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('state', 'State is required').not().isEmpty(),
        check('customer', 'Customer is required').not().isEmpty(),
        validateFields
    ],
    createOpportunity);
router.get("/", validateJWT, getAllOpportunities);
router.get("/:id", validateJWT, getOpportunity);
router.put("/:id", validateJWT, updateOpportunity);
router.put("/update-state/:id", validateJWT, updateStateOpportunity);
router.delete("/:id", validateJWT, deleteOpportunity);

export default router;