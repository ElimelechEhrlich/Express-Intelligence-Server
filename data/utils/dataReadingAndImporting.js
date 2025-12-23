import { readFile, writeFile } from "fs"


export const readDataFromFile = (file) => {
    const p = new Promise((res, rej) => {
        readFile(file,"utf-8" , (err, data) => {
            if (err) rej(err)
            res(data)
        })
    })
    return p
}

async function getData(file) {
    const data = await readDataFromFile(file)
    return JSON.parse(data)
}

