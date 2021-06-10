const Config = require("../config");
const Mongoose = require("mongoose");
const crypto = require("crypto");
const UsersSchema = new Mongoose.Schema({
    email: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    password: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Users = Mongoose.model("Users", UsersSchema);

module.exports = {
    login: (email, password) => {
        return Users.findOne({ email: email, password: crypto.createHash("md5").update(password).digest('hex')});
    },
    register: (email, first_name, last_name, password) => {
        const user = new Users({
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: crypto.createHash("md5").update(password).digest('hex')
        });

        return user.save();
    },
    checkEmail: (email) => {
        return Users.find({ email: email});
    }
}