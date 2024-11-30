// import express from "express";
// import Router from "./router.js";
// import connection from "./connection.js";
// import dotenv from 'dotenv'

// dotenv.config()

// const app = express();


// app.use(express.json({limit:"50mb"}));
// app.use(express.static('frontend'));
// app.use('/api', Router);


// connection().then(() => {
//     app.listen(process.env.PORT, () => {
//         console.log(`server started at http://localhost:${process.env.PORT}`);
//     });
// }).catch((error) => {
//     console.log(error);
// });

import express from 'express';
import cors from 'cors';
import { loginUser } from './middle/Auth.js';

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());

// Login route
app.post('/login', loginUser);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
