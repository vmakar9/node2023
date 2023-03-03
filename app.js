const express = require("express")
const  app = express();
const fs = require("fs")
const fsService = require("./fs.service")


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/users',async (req,res)=>  {
  const users = await fsService.reader()
    res.json(users)
})

app.post('/users',async (req,res)=>  {
    const {name,age ,gender} = req.body;
    if(!name || name.length < 2){
        res.status(400).json("Name is invalid")
    }
    if (age <= 0 ){
        res.status(400).json("Age is invalid")
    }
    const users = await fsService.reader()
    const newUser = {
        id:users[users.length - 1]?.id + 1 || 1,
        name,
        age,
        gender
    }
    users.push(newUser)
    await fsService.writer(users)
    res.status(201).json(newUser)
})

app.get('/users/:userId',async (req, res)=> {
    const {userId} = req.params
    const users = await fsService.reader()
    const user =users.find((user) =>  user.id ===   +userId)
    if(!user){
        res.status(422).json(`User with id:${userId} not found`)
    }
    res.json(user)
})
app.put('/users/:userId',async (req,res)=>  {
    const {userId} = req.params;
    const {name,age ,gender} = req.body;
    if(name && name.length < 2){
        res.status(400).json("Name is invalid")
    }
    if (age <= 0 ){
        res.status(400).json("Age is invalid")
    }
    const users = await fsService.reader()
    const index = users.findIndex((user)=>  user.id ===   +userId)
    users[index] = {...users[index],...req.body}

    await fsService.writer(users)
    res.status(201).json(users[index])
})
app.delete('/users/:userId',async (req,res)=>  {
    const {userId} = req.params
    const users = await fsService.reader()
    const index = users.findIndex((user)=>  user.id ===   +userId)
    if(index ===   -1 ){
        res.status(422).json(`User with id:${userId} found`)
    }
    users[index] = {...users[index],...req.body}
    users.splice(index,1)

    await fsService.writer(users)

    res.sendStatus(204)
})
const PORT = 5000

app.listen(PORT, ()=>  {
    console.log(`Server has started on PORT ${PORT}`)
})





