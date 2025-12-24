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

const addReportCountByAgent = async (report) => {
    const agents = await getData("./data/agents.json")
    const agent = agents.find(agent => agent.id === Number(report.agentId))  
    agent.reportsCount += 1
    await writeData("./data/agents.json", JSON.stringify(agents))
    }

const subReportCountByAgent = async (report) => {
    const agents = await getData("./data/agents.json")
    const agent = agents.find(agent => agent.id === Number(report.agentId))  
    agent.reportsCount -= 1
    await writeData("./data/agents.json", JSON.stringify(agents))
    }

const deleteReportsByAgent = async (agent) => {
    const reports = await getData("./data/reports.json")
    reports.filter(report => report.agentId === agent.id).forEach(async agentReport => {
        await subReportCountByAgent(agentReport)
        reports.splice(reports.indexOf(agentReport), 1)
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
        if ((req.body.content) && (req.body.agentId)) {
            const report = {id: reports.Length + 1 , date: new Date, content: req.body.content, agentId: req.body.agentId}
            reports.push()
            await addReportCountByAgent(report)
            await writeData("./data/reports.json", JSON.stringify(reports))
            res.send("report added")
        }
        else res.sendStatus(400)
    } catch (error) {
        console.error(error);
        res.json({error})
    }
}

const updateReport = async (req, res) => {
    const reports = await getData("./data/reports.json")    
    const report = reports.find(report => report.id === Number(req.params.id))      
    if (report) {
        try {
            if (req.body.content) {
                report.content = req.body.content;
                await writeData("./data/reports.json", JSON.stringify(reports))
                res.send(report)
            }
            else res.send("Only the `content` field can be updated.");;
        } catch (error) {
            console.error(error);
            res.json(error)
        }
    }
    else res.sendStatus(401);
}

const deleteReport = async (req, res) => {
    const reports = await getData("./data/reports.json")    
    const report = reports.find(report => report.id === Number(req.params.id))      
    if (report) {
        try {
            await subReportCountByAgent(report)
            reports.splice(reports.indexOf(report), 1)
        } catch (error) {
            console.error(error);
            res.json(error)
        }
    }
    else res.sendStatus(401);
}

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

