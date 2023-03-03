const fs = require('node:fs/promises')
const path = require('node:path')

const dtPath = path.join(process.cwd(),'database','users.json')

const reader = async ()=>  {
    const buffer = await fs.readFile(dtPath)
    const data = buffer.toString();
    return data ? JSON.parse(data) : []
}

const writer = async (users)=>  {
    const buffer = await fs.writeFile(dtPath,JSON.stringify(users))

}

module.exports ={
 reader,writer
}