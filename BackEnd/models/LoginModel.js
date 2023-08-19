const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
    },
    {collection:'Login'}
)

const Login = mongoose.model('Login',loginSchema);
module.exports = Login;