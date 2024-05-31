const express = require('express');
const dotenv = require('dotenv');

const app = express();
dotenv.config({ path: 'BackEnd/config/config.env' });

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});