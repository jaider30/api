const express = require('express')
const client = require('../utils/connectdb/conn')
const {ObjectId} = require("mongodb")


const empleados = express.Router()

// Get all empleados
empleados.get("/", async(req, res)=>{   
    try {
        await client.connect()
        const results = await client.db("SOFF_Monda").collection("empleados").find({}).toArray()
        if(Array.isArray(results) >= 1){
            res.status(200).json({
                status: 200,
                amount_results: results.length,
                data: results 
            })
        }else{
           res.status(404).json({
            status: 404,
            message: "empleados not found"
           })
        }
    } finally {
    }
})

// Get one empleado
empleados.get("/:id", async(req, res)=>{
    let id = req.params.id
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("empleados").findOne({"_id": new ObjectId(id)})
        if(result){
            res.status(200).json({
                status: 200,
                data: result 
            })
        }else{
           res.status(404).json({
            status: 404,
            message: "empleado not found"
           })
        }
    } finally {
    }
})


// Create empleado
empleados.post("/", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()
        // body["fecha_nacimiento"] = convertDate(body["fecha_nacimiento"])
        const result = await client.db("SOFF_Monda").collection("empleados").insertOne(body)
        if(result){
            res.status(201).json({
                status: 201,
                message: 'created empleado',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "empleado not created"
            })
        }
    } finally {
    }
})

// Create empleado
empleados.post("/insert_many", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()
        // body["fecha_nacimiento"] = convertDate(body["fecha_nacimiento"])
        const result = await client.db("SOFF_Monda").collection("empleados").insertMany(body)
        if(result){
            res.status(201).json({
                status: 201,
                message: 'created empleado',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "empleado not created"
            })
        }
    } finally {
    }
})

// Update empleado upsert
empleados.patch("/upsert/:id", async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("empleados").updateOne({_id: new ObjectId(id)}, {$set: body}, {upsert: true})
        if(result){
            res.status(201).json({
                status: 201,
                message: 'update empleado',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "empleado not update"
            })
        }
    } finally {
    }
})


// UpdateMany empleado sin upsert
empleados.put("/update_many", async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("empleados").updateMany({edad:{$eq:"3"}}, {$set: body}, );
        if(result){
            res.status(201).json({
                status: 201,
                message: 'update many empleado',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "empleado not update many"
            })
        }
    } finally {
    }
})


// UpdateMany empleado upsert
empleados.put("/update_many/upsert", async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("empleados").updateMany({edad:{$eq:"3"}}, {$set: body}, {upsert: true});
        if(result){
            res.status(201).json({
                status: 201,
                message: 'update many empleado',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "empleado not update many"
            })
        }
    } finally {
    }
})

// DeleteOne empleado
empleados.delete("/:id", async(req, res)=>{
    const id = req.params.id
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("empleados").deleteOne({"_id": new ObjectId(id)})
        if(result){
            res.status(204).json({
                status: 204,
                message: 'delete empleado',
                data: result
            })
        }else{
            res.status(404).json({
                status: 404,
                message: "empleado not found"
            })
        }
    } finally {
    }
})

//deleteMany empleado
empleados.delete("/delete_many", async(req, res)=>{
    const id = req.params.id
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("empleados").deleteMany({telefono:{$eq:"3"}})
        if(result){
            res.status(204).json({
                status: 204,
                message: 'delete empleado',
                data: result
            })
        }else{
            res.status(404).json({
                status: 404,
                message: "empleado not found"
            })
        }
    } finally {
    }
})






module.exports = empleados
