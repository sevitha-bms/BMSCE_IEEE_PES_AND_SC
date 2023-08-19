const express = require('express');
const router = express.Router();
const Login = require('../models/LoginModel');

router.get('/' , async (req,res) =>{
    try{
        const result = await Login.findOne();
        res.send(result);
    }
    catch(error)
    {
        console.log("Error:",error);
        res.status(500).send('Internal server error');
    }
})

module.exports = router;