// Importamos las dependencias necesarias
// const express = require('express'); // Framework para gestionar el servidor HTTP
// const cors = require('cors'); // Middleware para habilitar CORS
// const mongoose = require('mongoose'); // Para conectarnos a la base de datos MongoDB
// require('dotenv').config(); // Para cargar las variables de entorno desde el archivo .env
//const itemRoutes = require('./routes/itemesroute');
import { fileURLToPath } from 'url';
import path from 'path'
import  router  from './routes/itemesroute.js'; // Importamos las rutas de los items
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Para cargar las variables de entorno desde el archivo .env
// import env from 'env-var';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env


// Inicializamos la aplicación Express
const app = express();
app.use(cors()); // Habilitar CORS para permitir peticiones de otros orígenes
app.use(express.json()); // Parsear JSON en las solicitudes entrantes

// const DB_URL= env.get('DB_URL').required().asString();
const PORT = process.env.PORT; // Puerto donde correrá el servidor
const DB_URI = process.env.DB_URL; // URL de conexión a la base de datos (definida en .env)'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Conectamos a la base de datos de MongoDB
mongoose.connect(process.env.DB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true })
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.log('Error al conectar a la base de datos: ', err));

// Importamos las rutas del CRUD para los items

app.use(express.static(path.join(__dirname,'../public')))
app.get('/',(req,res) => {
  res.sendFile(path.join(__dirname,'../public','index.html'))
})
app.use('/api/items', router); // Definimos las rutas para gestionar los items

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
