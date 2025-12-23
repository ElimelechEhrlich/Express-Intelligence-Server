import { getData } from "../data/utils/getData.js";

const validateAgentId = async (req, res, next) => {
    const agents = getData("./data/agents.json")
    const agent = agents.find(agent => agent.id === req.body.agentId)
    if (agent) next();
    else {
        console.error(`There is no agent with id ${req.body.agentId}`);
        res.status(404).json()
    }
}

const deleteReportsByAgent = async (agent) => {
    const reports = await getData("./data/reports.json")
    reports.filter(report => report.agentId === agent.id).forEach(agentReport => {
        reports.splice(reports.indexOf(agentReport), 1)
        agent.reportsCount -= 1
    });   
}

const getAllReports = async (req, res) => {
    const reports = await getData("./data/reports.json")
    try {
        res.json(reports)
    } catch (error) {
        console.error(error)
        res.status().json(error)
    }
}

const getReportById = async (req, res) => {
    const reports = await getData("./data/reports.json")
    const report = reports.find(report => report.id === req.params.id)
    try {
        res.json(report)
    } catch (error) {
        console.error(error)
        res.status().json(error)
    }
}

const isIdExsist = async (req, res, next) => {
    const reports = await getData("./data/reports.json")
    const idExsist = reports.find(report => report.id === req.body.id)
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

const addReport = async (req, res) => {
    const reports = await getData("./data/reports.json")
    try {
        reports.push({id: reports.Length + 1 , date: new Date, content: req.body.content, agentId: req.body.agentId})
        await writeData("./data/reports.json", JSON.stringify(reports))
        res.send("report added")
    } catch (error) {
        console.error(error);
        res.json({error})
    }
}

// const updateReport = async (req, res) => {
//     const agents = await getData("./data/agents.json")    
//     const agent = agents.find(agent => agent.id === Number(req.params.id))      
//     if (agent) {
//         try {
//             if (!req.body.id) {
//                 const newAgent = {...agent, ...req.body}
//                 agents.splice(agents.indexOf(agent), 1, newAgent)
//                 await writeData("./data/agents.json", JSON.stringify(agents))
//                 res.send(agents.find(agent => agent.id === newAgent.id))
//             }
//         } catch (error) {
//             console.error(error);
//             res.json(error)
//         }
//     }
//     else res.sendStatus(401);
// }

// const deletedReport = async (agent) => {
//     if (agent.reportsCount === 0) {
//         agents.splice(agents.indexOf(agent), 1)
//         writeData("./data/agents.json", JSON.stringify(agents))
//         res.json("deleted agent")
//     }
// }

// const deleteReport = async (req, res) => {
//     const agents = await getData("./data/agents.json")    
//     const agent = agents.find(agent => agent.id === Number(req.params.id))      
//     if (agent) {
//         try {
//             await deleteReportsByAgent(agent)
//             await deletedAgent(agent)
//         } catch (error) {
//             console.error(error);
//             res.json(error)
//         }
//     }
//     else res.sendStatus(401);
// }

export {
    validateAgentId,
    deleteReportsByAgent,
    getAllReports,
    getReportById,
    isIdExsist,
    addReport,
    updateReport,
    deleteReport
}

