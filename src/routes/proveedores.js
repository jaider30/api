const express = require('express')
const client = require('../utils/connectdb/conn')
const {ObjectId} = require("mongodb")



const proveedores = express.Router()

// Get all proveedores
proveedores.get("/", async(req, res)=>{
    try {
        await client.connect()
        const results = await client.db("SOFF_Monda").collection("proveedores").find({}).sort({_id:-1}).limit(5).toArray();
        if(Array.isArray(results) >= 1){
            res.status(200).json({
                status: 200,
                amount_results: results.length,
                data: results 
            })
        }else{
           res.status(404).json({
            status: 404,
            message: "proveedores not found"
           })
        }
    } finally {
    }
})

// Get one proveedor
proveedores.get("/:id", async(req, res)=>{
    let id = req.params.id
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("proveedores").findOne({"_id": new ObjectId(id)})
        if(result){
            res.status(200).json({
                status: 200,
                data: result 
            })
        }else{
           res.status(404).json({
            status: 404,
            message: "proveedor not found"
           })
        }
    } finally {
    }
})


// Create proveedor
proveedores.post("/", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("proveedores").insertOne(body)
        if(result){
            res.status(201).json({
                status: 201,
                message: 'created proveedor',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "proveedor not created"
            })
        }
    } finally {
    }
})

// Create proveedor
proveedores.post("/insert_many", async(req, res)=>{
    const body = req.body
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("proveedores").insertMany(body)
        if(result){
            res.status(201).json({
                status: 201,
                message: 'created proveedor',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "proveedor not create"
            })
        }
    } finally {
    }
})

// Update proveedor upsert
proveedores.patch("/upsert/:id", async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("proveedores").updateOne({_id: new ObjectId(id)}, {$set: body}, {upsert: true})
        if(result){
            res.status(201).json({
                status: 201,
                message: 'update proveedor',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "proveedor not update"
            })
        }
    } finally {
    }
})


// UpdateMany proveedor sin upsert
proveedores.put("/update_many", async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("proveedores").updateMany({edad:{$eq:31}}, {$set: body}, );
        if(result){
            res.status(201).json({
                status: 201,
                message: 'update many proveedor',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "proveedor not update many"
            })
        }
    } finally {
    }
})


// UpdateMany proveedor upsert
proveedores.put("/update_many/upsert", async(req, res)=>{
    const id = req.params.id
    const body = req.body
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("proveedores").updateMany({edad:{$eq:"31"}}, {$set: body}, {upsert: true});
        if(result){
            res.status(201).json({
                status: 201,
                message: 'update many proveedor',
                data: result
            })
        }else{
            res.status(400).json({
                status: 400,
                message: "proveedor not update many"
            })
        }
    } finally {
    }
})

// DeleteOne proveedor
proveedores.delete("/:id", async(req, res)=>{
    const id = req.params.id
    try {
        await client.connect()
        const result = await client.db("SOFF_Monda").collection("proveedores").deleteOne({"_id": new ObjectId(id)})
        if(result){
            res.status(204).json({
                status: 204,
                message: 'delete proveedor',
                data: result
            })
        }else{
            res.status(404).json({
                status: 404,
                message: "proveedor not found"
            })
        }
    } finally {
    }
})

//deleteMany proveedor
proveedores.delete("/delete_many", async(req, res)=>{
    const id = req.params.id
    try {
        await client.connect()
         
        if(result){
            res.status(204).json({
                status: 204,
                message: 'delete proveedor',
                data: result
            })
        }else{
            res.status(404).json({
                status: 404,
                message: "proveedor not found"
            })
        }
    } finally {
    }
})






module.exports = proveedores
