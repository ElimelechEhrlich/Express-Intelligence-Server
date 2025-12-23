import express from "express"
import { addAgent, deleteAgent, getAgentById, getAllAgents, isIdExsist, updateAgent } from "../ctrls/agentsC.js";
import { validateuser } from "../ctrls/usersC.js";

const router = express.Router();

router.get("/", getAllAgents);

router.get("/:id", getAgentById);

router.post("/", validateuser, isIdExsist, addAgent);

router.put("/:id", validateuser, updateAgent);

router.delete("/:id", validateuser, deleteAgent);

export default router;