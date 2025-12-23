import { getData } from "../data/utils/getData.js";

function validateagentId(id) {
    const agents = getData("./data/agents.json")
    const agent = agents.find(agent => agent.id === id)
    if (agent) return agent;
    else {
        return `There is no agent with id ${id}`;
    }
}
