const express = require('express');
const mongoose = require('mongoose');

const {constants} = require("./configs");
const {userRouter} = require("./routers");

mongoose.connect('mongodb://localhost:27017/dec')
    .then(() => console.log('Connected to mongoDB'));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'unknown error',
            code: err.status || 500
        })
})


app.listen(constants.PORT, () => console.log(`Started on port ${constants.PORT}`));