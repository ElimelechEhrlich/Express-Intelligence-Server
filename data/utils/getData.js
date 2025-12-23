import { readFile } from "fs"


export const readDataFromFile = async (file) => {
    const p = new Promise((res, rej) => {
        readFile(file,"utf-8" , (err, data) => {
            if (err) rej(err)
            res(data)
        })
    })
    return p
}

async function getData(file) {
    const dataP = await readDataFromFile(file)
    // console.log(dataP);
    const data = JSON.parse(dataP)
    // console.log(data);
    // console.log(typeof data);
    // console.log(data[1]);
    return data
}

export {
    getData
}





