import { getData } from "../data/utils/getData.js";
import { writeData } from "../data/utils/writhData.js";

const validateuser = async (req, res, next) => {
    const users = await getData("./data/users.json")
    console.log(users);
    const user = users.find(user => user.username === req.headers.name && user.password === req.headers.pass)
    if (user) {
        try {
            next()
        } catch (error) {
            res.status().json({error})
        }
    }
    else res.sendStatus(401);
}

const getAllUsers = async (req, res) => {
    const users = await getData("./data/users.json")
    try {
        res.json(users)
    } catch (error) {
        console.error(error)
        res.status().json(error)
    }
}

const isUsernameExsist = async (req, res, next) => {
    const users = await getData("./data/users.json")
    const usernameExsist = users.find(user => user.username === req.body.username)
    if (!usernameExsist) {
        try {
            next()
        } catch (error) {
            console.error(error);
            res.json({error})
        }
    }
    else res.sendStatus(409);
}

const addUser = async (req, res) => {
    const users = await getData("./data/users.json")
    try {
        users.push({username: req.body.username, password: req.body.password})
        await writeData("./data/users.json", JSON.stringify(users))
        res.send("user added")
    } catch (error) {
        console.error(error);
        res.json({error})
    }
}

const updateUser = async (req, res) => {
    const users = await getData("./data/users.json")
    const user = users.find(user => user.username === req.params.username)
    if (user) {
        try {
            if (req.body.password) {
                user.password = req.body.password;
                await writeData("./data/users.json", JSON.stringify(users))
                res.send()
            }
            else res.send("Only the `password` field can be updated.");
        } catch (error) {
            console.error(error);
            res.json(error)
        }
    }
    else res.sendStatus(401);
}

const deleteUser = async (req, res) => {
    const users = await getData("./data/users.json")
    const user = users.find(user => user.username === req.params.username)
    if (user) {
        try {
            users.splice(users.indexOf(user), 1)
            writeData("./data/users.json", JSON.stringify(users))
            res.json("deleted user")
        } catch (error) {
            console.error(error);
            res.json(error)
        }
    }
    else res.sendStatus(401);
}




export {
    validateuser,
    getAllUsers,
    isUsernameExsist,
    addUser,
    updateUser,
    deleteUser
}