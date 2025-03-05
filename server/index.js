// index.js

const express = require('express');
const cors = require('cors');
const blogRouter = require('./route/blogRoute');

require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRouter);

app.use('/api', (req, res) => {
    res.json('Hello World');
});

app.listen(5000, () => console.log('Server is running on port 5000'));