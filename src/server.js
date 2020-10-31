const express = require('express')
const cors = require('cors')
const routes = require('./app')

console.clear()

const PORT = 3333

const app = express()

app.use(cors())

app.use(routes)

if( app.listen() ) {
    let server = app.listen();
    server.close();
}

const server = app.listen( PORT, () => { console.log( `Servidor rodando na porta ${PORT}` ) } );
