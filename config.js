// Database Configuration
const Mongoose = require("mongoose");
const db = Mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'express_users',
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, err => err ? console.log(err) : console.log('Connected to MongoDB!'));

// Redis Configuration
const Redis = require("redis");
const Client = Redis.createClient();

Client.on("connect", () => {
    console.log("Connected to Redis!");
});

module.exports = {
    Client,
    db
}