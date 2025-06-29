//core modules
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');

// local modules
const recipeRouter = require('./routes/recipeRouter');
const dbconn = require('./utils/database');
const userRouter = require('./routes/userRouter');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true    
}));

// Routes
app.use('/', recipeRouter);
app.use('/', userRouter);
app.get('/favicon.ico', (req, res) => res.status(204));
dbconn().then( () => {
    const PORT = process.env.PORT || 1234;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    });
})


