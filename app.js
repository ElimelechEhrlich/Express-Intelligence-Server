import express from "express"
import usersRoutes from "./routes/usersR.js";
import agentsRoutes from "./routes/agentsR.js";
import reportsRoutes from "./routes/reportsR.js";
import { validateuser } from "./ctrls/usersC.js";

const app = express()
const port = 3002

app.use(express.json());
app.use("/users", validateuser, usersRoutes)
app.use("/agents", agentsRoutes)
app.use("/reports", reportsRoutes)

app.get("/health", (req, res) => res.json({ok: true}))

app.listen(port, () => {
    console.log(`server runing on http://localhost:${port}`);
})

