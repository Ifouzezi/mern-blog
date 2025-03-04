const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose
  .connect("mongodb+srv://mernapp:mernapptrial@mern-blog.wxplk.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

  