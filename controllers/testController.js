const validator = require('validator');
const knex = require('../database_setup/db');


const getPage = (async (req, res) => {
    //search with querys like -   http://localhost:3000/test/page/?page=2
    const page = req.query.page || 0;   // normalize it with req.query.name.toLowerCase() if query is text
    const rowsPerPage = 10;
    const body = req.body;
    try {
        const data = await knex('people').select('*').orderBy('birthdate').offset(page * rowsPerPage).limit(rowsPerPage)
        console.table(data)
        // console.log(req.body)
        return res.status(200).json(data)
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({error: 'could not fetch'})
    }
})

const test = (async (req, res) => {
    try {
        console.log(req.ip)
        return res.status(200).json({msg: 'testController response'})
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({error: 'could not fetch'})
    }
})


module.exports = {getPage, test}





