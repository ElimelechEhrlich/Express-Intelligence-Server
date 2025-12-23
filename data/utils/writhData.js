import { writeFile } from "fs"

async function writeData(file, data) {
    writeFile(file, (data) , (err) => {if (err) {console.log(err)}})
}

export {
    writeData
}