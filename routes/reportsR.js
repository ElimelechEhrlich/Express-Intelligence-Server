import express from "express"
import { addReport, getAllReports, getReportById, isIdExsist, validateAgentId } from "../ctrls/reportsC";
import { validateuser } from "../ctrls/usersC";

const router = express.Router();

router.get("/", getAllReports);

router.get("/:id", getReportById);

router.post("/", validateuser, validateAgentId, isIdExsist, addReport);

router.put("/:id", validateuser, async (req, res) => {
});
router.delete("/:id", validateuser, async (req, res) => {
});

export default router;