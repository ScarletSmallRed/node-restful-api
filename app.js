const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});

app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});