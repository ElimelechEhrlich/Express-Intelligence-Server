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
        agents.push({id: req.body.id , name: req.body.name, nickname: req.body.nickname, reportsCount: 0})
        await writeData("./data/agents.json", JSON.stringify(agents))
        res.send("agent added")
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
            if (!req.body.id) {
                const newAgent = {...agent, ...req.body}
                agents.splice(agents.indexOf(agent), 1, newAgent)
                await writeData("./data/agents.json", JSON.stringify(agents))
                res.send(agents.find(agent => agent.id === newAgent.id))
            }
        } catch (error) {
            console.error(error);
            res.json(error)
        }
    }
    else res.sendStatus(401);
}

const deletedAgent = async (agent) => {
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
            await deletedAgent(agent)
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
