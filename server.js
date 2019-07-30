const express = require('express');
const app = express();

// Routes
const userRoutes = require('./routes/users');

app.use('/db/users', userRoutes);

// Deploy
app.listen(process.env.PORT || 8081, (err) => { if (err) console.log(err) });