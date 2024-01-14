const validator = require('validator');
const knex = require('../database_setup/db');

const helloWorld = (async (req, res) => {
    try {
        return res.status(200).json({msg: 'hello world'})
    }
    catch (e) {
        console.error('Error getting home:', e);
        return res.status(500).json({error: 'could not get data'})
    }
})


function databaseFailCheck(data, res) {
    if (data === 0 || data.length === 0) {
        return res.status(404).json({msg: 'No data found to update'});
    }
}

const groceriesController = (async (req, res) => {
    try {
        const {id} = req.params;
        const filters = req.query.filter;

        if (id) {
            if (!validator.isUUID(id, [4])) {
                return res.status(500).json({msg: 'that is the wrong id'})
            }
            if (req.path.includes('add')) {
                const data = await knex('groceries').select('*').where({id: id}).increment({stock: 1}).returning('*')
                databaseFailCheck(data, res);
                return res.status(200).json(data)

            } else if (req.path.includes('remove')) {
                const data = await knex('groceries').select('*').where({id: id}).decrement({stock: 1}).returning('*')
                databaseFailCheck(data, res);
                return res.status(200).json(data)
            }

        }

        console.log(filters)
        console.log(filters?.name)
        if (filters) {
            if (!validator.isAlpha(filters.name)) {
                return res.status(500).json({msg: 'that is not a valid name'})
            }
            const data = await knex('groceries').select('*').where('name', 'ILIKE', `%${filters.name}%`)
            //if table does not find record it returns a 0, this is different from invalid uuid
            databaseFailCheck(data, res);
            console.table(data)
            return res.status(200).json(data)
        }

        const data = await knex('groceries').select('*').orderBy('name')
        //if table does not find record it returns a 0, this is different from invalid uuid
        databaseFailCheck(data, res);
        console.table(data)
        return res.status(200).json(data)
    }
    catch (e) {
        console.error(e)
        return res.status(500).json({Error: 'Internal server error'})
    }
})

module.exports = {helloWorld}