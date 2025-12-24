import express from "express"
import { addReport, deleteReport, getAllReports, getReportById, isIdExsist, updateReport, validateAgentId } from "../ctrls/reportsC.js";
import { validateuser } from "../ctrls/usersC.js";

const router = express.Router();

router.get("/", getAllReports);

router.get("/:id", getReportById);

router.post("/", validateuser, validateAgentId, isIdExsist, addReport);

router.put("/:id", validateuser, updateReport);

router.delete("/:id", validateuser, deleteReport);

export default router;