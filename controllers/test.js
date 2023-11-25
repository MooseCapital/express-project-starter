const validator = require('validator');
const knex = require('../database_setup/db');


const getPage = (async (req, res) => {
      const numId = Number(req.params.id);
      const id = req.params.id;
      const page  = req.query.page || 0;   // normalize it with req.query.name.toLowerCase() if query is text
      const rowsPerPage = 10;
      const body = req.body;
        try {
          const data = await knex('people').select('*').orderBy('birthdate').offset(page * rowsPerPage).limit(rowsPerPage)
          console.table(data)
            // console.log(req.body)
          res.status(200).json(data)
        } catch (e) {
          console.log(e)
          res.status(500).json({error:'could not fetch'})
        }
})

const test = (async (req, res) => {
        try {
            console.log(req.ip)
          res.status(200).json({msg: 'test response'})
        } catch (e) {
          console.log(e)
          res.status(500).json({error:'could not fetch'})
        }
})

const helloWorld = (async (req, res) => {

        try {
          res.status(200).json({msg: 'hello world'})
        } catch (e) {
          console.log(e)
          res.status(500).json({error:'could not fetch'})
        }
})

module.exports = {getPage, test }





