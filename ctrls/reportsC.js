import { getData } from "../data/utils/getData.js";

const validateagentId = async (req, res, next) => {
    const agents = getData("./data/agents.json")
    const agent = agents.find(agent => agent.id === req.body.agentId)
    if (agent) next();
    else {
        console.error(`There is no agent with id ${req.body.agentId}`);
        res.status(404).json()
    }
}




export {
    validateagentId
}