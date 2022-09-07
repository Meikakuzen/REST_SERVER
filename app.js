import express from 'express'
import dotenv from 'dotenv'
import Server from './models/server.js'
import DBConnection from './config/db.js'


dotenv.config()


DBConnection()

const server = new Server()

server.listen()