const express = require('express')
const client = require('../utils/connectdb/conn')
const {ObjectId} = require("mongodb")


const clientes = express.Router()

// Get all clientes
clientes.get("/", async(req, res)=>{
    try {
        await client.connect()
        const results = await client.db("SOFF_Monda").collection("clientes").find({}).toArray()
        if(Array.isArray(results) >= 1){
            res.status(200).json({
                status: 200,
                amount_results: results.length,
                data: results 
            })
        }else{
           res.status(404).json({
            status: 404,
            message: "clientes not found"
           })
        }
    } finally {
    }
})

// Get one cliente
clientes.get("/:id", async(req, res)=>{
    let id = req.params.id
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("clientes").findOne({"_id": new ObjectId(id)})
        if(result){
            res.status(200).json({
                status: 200,
                data: result 
            })
        }else{
           res.status(404).json({
            status: 404,
            message: "cliente not found"
           })
        }
    } finally {
    }
})


// Create cliente
clientes.post("/", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()
        // body["fecha_nacimiento"] = convertDate(body["fecha_nacimiento"])
        const result = await client.db("SOFF_Monda").collection("clientes").insertOne(body)
        if(result){
            res.status(201).json({
                status: 201,
                message: 'created cliente',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "cliente not created"
            })
        }
    } finally {
    }
})

// Create cliente
clientes.post("/insert_many", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()
        // body["fecha_nacimiento"] = convertDate(body["fecha_nacimiento"])
        const result = await client.db("SOFF_Monda").collection("clientes").insertMany(body)
        if(result){
            res.status(201).json({
                status: 201,
                message: 'created cliente',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "cliente not created"
            })
        }
    } finally {
    }
})

// Update cliente upsert
clientes.patch("/upsert/:id", async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("clientes").updateOne({_id: new ObjectId(id)}, {$set: body}, {upsert: true})
        if(result){
            res.status(201).json({
                status: 201,
                message: 'update cliente',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "cliente not update"
            })
        }
    } finally {
    }
})


// UpdateMany cliente sin upsert
clientes.put("/update_many", async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("clientes").updateMany({edad:{$eq:"3"}}, {$set: body}, );
        if(result){
            res.status(201).json({
                status: 201,
                message: 'update many cliente',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "cliente not update many"
            })
        }
    } finally {
    }
})


// UpdateMany cliente upsert
clientes.put("/update_many/upsert", async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("clientes").updateMany({edad:{$eq:"3"}}, {$set: body}, {upsert: true});
        if(result){
            res.status(201).json({
                status: 201,
                message: 'update many cliente',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "cliente not update many"
            })
        }
    } finally {
    }
})

// DeleteOne cliente
clientes.delete("/:id", async(req, res)=>{
    const id = req.params.id
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("clientes").deleteOne({"_id": new ObjectId(id)})
        if(result){
            res.status(204).json({
                status: 204,
                message: 'delete cliente',
                data: result
            })
        }else{
            res.status(404).json({
                status: 404,
                message: "cliente not found"
            })
        }
    } finally {
    }
})

//deleteMany cliente
clientes.delete("/delete_many", async(req, res)=>{
    const id = req.params.id
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("clientes").deleteMany({telefono:{$eq:"3"}})
        if(result){
            res.status(204).json({
                status: 204,
                message: 'delete cliente',
                data: result
            })
        }else{
            res.status(404).json({
                status: 404,
                message: "cliente not found"
            })
        }
    } finally {
    }
})






module.exports = clientes
