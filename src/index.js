const express = require('express')
const app = express()
const port = process.env.PORT || 5000

// Aquí vamos a importar todas las rutas
const clientesRouter = require('./routes/clientes')
const empleadosRouter = require('./routes/empleados')
const proveedoresRouter = require('./routes/proveedores')

// Middlewares
app.use(express.json())

// Rutas
app.use("/clientes", clientesRouter)
app.use("/empleados", empleadosRouter)
app.use("/proveedores", proveedoresRouter)


// Montrar el puerto que se
app.listen(port, ()=>{
    console.log(`Servidor escuchando en el puerto ${port}`)
})