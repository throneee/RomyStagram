// 1. Require
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./routes/UserRoute');
const postRouter = require('./routes/PostRoute');

// 2. Initialize
const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mern-social.utlbv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        );
        console.log('MongoDB Connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

// 3. Main
connectDB();
app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/posts', postRouter);

// 4. Listen
app.listen(PORT, () => {
    console.log(`Server is listen on port ${PORT}`);
});
