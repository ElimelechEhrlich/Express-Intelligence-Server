import express from "express"
import { addUser, deleteUser, getAllUsers, isUsernameExsist, updateUser } from "../ctrls/usersC.js";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/", isUsernameExsist, addUser);

router.put("/:username", updateUser);

router.delete("/:username", deleteUser);

export default router;