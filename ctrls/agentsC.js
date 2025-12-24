import { getData } from "../data/utils/getData.js";
import { writeData } from "../data/utils/writhData.js";
import { deleteReportsByAgent } from "./reportsC.js";


const getAllAgents = async (req, res) => {
    const agents = await getData("./data/agents.json")
    try {
        res.json(agents)
    } catch (error) {
        console.error(error)
        res.status().json(error)
    }
}

const getAgentById = async (req, res) => {
    const agents = await getData("./data/agents.json")
    const agent = agents.find(agent => agent.id === req.params.id)
    try {
        res.json(agent)
    } catch (error) {
        console.error(error)
        res.status().json(error)
    }
}

const isIdExsist = async (req, res, next) => {
    const agents = await getData("./data/agents.json")
    const idExsist = agents.find(agent => agent.id === req.body.id)
    if (!idExsist) {
        try {
            next()
        } catch (error) {
            console.error(error);
            res.json({error})
        }
    }
    else res.sendStatus(409);
}

const addAgent = async (req, res) => {
    const agents = await getData("./data/agents.json")
    try {
        if ((req.body.name) && (req.body.nickname)) {
            agents.push({id: agents.sort((a, b) => b.id - a.id)[0] + 1 , name: req.body.name, nickname: req.body.nickname, reportsCount: 0})
            await writeData("./data/agents.json", JSON.stringify(agents))
            res.send("agent added")
        }
        else res.sendStatus(400)
    } catch (error) {
        console.error(error);
        res.json({error})
    }
}

const updateAgent = async (req, res) => {
    const agents = await getData("./data/agents.json")    
    const agent = agents.find(agent => agent.id === Number(req.params.id))      
    if (agent) {
        try {
            if (req.body.name) agent.name = req.body.name;
            if (req.body.nickname) agent.nickname = req.body.nickname;
            else if ((!req.body.name) && (!req.body.nickname)) return res.send("Only the `name` or `nickname` fields can be updated.");;
            await writeData("./data/agents.json", JSON.stringify(agents))
            res.send(agent)
        } catch (error) {
            console.error(error);
            res.json(error)
        }
    }
    else res.sendStatus(401);
}

const deletedAgent = async (agent, agents) => {
    if (agent.reportsCount === 0) {
        agents.splice(agents.indexOf(agent), 1)
        writeData("./data/agents.json", JSON.stringify(agents))
        res.json("deleted agent")
    }
}

const deleteAgent = async (req, res) => {
    const agents = await getData("./data/agents.json")    
    const agent = agents.find(agent => agent.id === Number(req.params.id))      
    if (agent) {
        try {
            await deleteReportsByAgent(agent)
            await deletedAgent(agent, agents)
        } catch (error) {
            console.error(error);
            res.json(error)
        }
    }
    else res.sendStatus(401);
}

export {
    getAllAgents,
    getAgentById,
    isIdExsist,
    addAgent,
    updateAgent,
    deleteAgent
}
