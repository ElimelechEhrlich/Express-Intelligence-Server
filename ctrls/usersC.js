import { getData } from "../data/utils/getData.js";
import { writeData } from "../data/utils/writhData.js";

const validateuser = async (req, res, next) => {
    const users = getData("./data/users.json")
    const user = users.find(user => user.username === req.headers.name && user.password === req.headers.pass)
    if (user) {
        try {
            next()
        } catch (error) {
            res.status().json(error)
        }
    }
    else res.status(401).json();
}

const getAllUsers =  async(req, res) => {
    const users = getData("./data/users.json")
    try {
        res.json(users)
    } catch (error) {
        console.error(error)
        res.status().json(error)
    }
}

const isUsernameExsist = (req, res, next) => {
    const users = getData("./data/users.json")
    const usernameExsist = users.find(user => user.username === req.body.username)
    if (!usernameExsist) {
        try {
            next()
        } catch (error) {
            res.status().json(error)
        }
    }
    else res.status(409).json();
}

const addUser = async(req, res) => {
    try {
        users.push({username: req.body.username, password: req.body.password})
        writeData("./data/users.json", users)
    } catch (error) {
        res.status().json(error)
    }
}

const updateUser = (req, res) => {
    const users = getData("./data/users.json")
    const user = users.find(user => user.username === req.params.username)
    if (user) {
        try {
            user.password = req.body.password;
            writeData("./data/users.json", users)
        } catch (error) {
            res.status().json(error)
        }
    }
    else res.status(401).json();
}

const deleteUser = (req, res) => {
    const users = getData("./data/users.json")
    const user = users.find(user => user.username === req.params.username)
    if (user) {
        try {
            users.splice(users.IndexOf(user), 1)
            writeData("./data/users.json", users)
        } catch (error) {
            res.status().json(error)
        }
    }
    else res.status(401).json();
}




export {
    validateuser,
    getAllUsers,
    isUsernameExsist,
    addUser,
    updateUser,
    deleteUser
}