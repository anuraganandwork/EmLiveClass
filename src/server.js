const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3000; // Choose your preferred port

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const API_KEY = '07754ed4-6398-4ba0-a73c-7f2e792efefc';
const SECRET = 'aecf6df286fa90448131616751e51c4553cc6e90342fdd3c5df856a0483df665';

app.get('/get-token', (req, res) => {
  const options = { 
    expiresIn: '6000m', 
    algorithm: 'HS256' 
  };
  
  const payload = {
    apikey: API_KEY,
    permissions: [`allow_join`,`allow_mod` ], // `ask_join` || `allow_mod` 
   // version: 2, //OPTIONAL
    //roomId: `2kyv-gzay-64pg`, //OPTIONAL
    //participantId: `lxvdplwt`, //OPTIONAL 
    //roles: ['crawler', 'rtc'], //OPTIONAL
  };
  
  const token = jwt.sign(payload, SECRET, options);
  console.log(token);
  
  res.json({ token });
});

app.listen(port,  () => {
  console.log(`Server running on http://localhost:${port}`);
 
});