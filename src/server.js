const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3000; // Choose your preferred port

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const API_KEY = '5f364fa1-a721-4a95-8385-2edea14593d0';
const SECRET = '0fdaa6cf77f2040f72f7dfc60ca001f4bdf93b8496daa57537e2c0a4aaecf5a8';

app.get('/get-token', (req, res) => {
  const options = { 
    expiresIn: '120m', 
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});