const validator = require('validator');
const knex = require('../database_setup/db');

const helloWorld = (async (req, res) => {
    try {
        return res.status(200).json({msg: 'hello world'})
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({error: 'could not fetch'})
    }
})

module.exports = {helloWorld}