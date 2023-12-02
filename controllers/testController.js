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
        console.error('Error getting page:', e);
        return res.status(500).json({error: 'could not get data'})
    }
})

const test = (async (req, res) => {
    try {
        return res.status(200).json({msg: 'testController response'})
    }
    catch (e) {
        console.error('Error getting test:', e);
        return res.status(500).json({error: 'could not get data'})
    }
})

const ip = (async (req, res) => {
        try {
        let ip = req.ip; // trust proxy sets ip to the remote client (not to the ip of the last reverse proxy server)
          if (ip.substr(0,7) === '::ffff:') { // fix for if you have both ipv4 and ipv6
            ip = ip.substr(7);
          }
          // req.ip and req.protocol are now set to ip and protocol of the client, not the ip and protocol of the reverse proxy server
          // req.headers['x-forwarded-for'] is not changed
          // req.headers['x-forwarded-for'] contains more than 1 forwarder when
          // there are more forwarders between the client and nodejs.
          // Forwarders can also be spoofed by the client, but
          // app.set('trust proxy') selects the correct client ip from the list
          // if the nodejs server is called directly, bypassing the trusted proxies,
          // then 'trust proxy' ignores x-forwarded-for headers and
          // sets req.ip to the remote client ip address
            console.log({"ip": ip, "protocol": req.protocol, "headers": req.headers['x-forwarded-for']})
             res.json({"ip": ip, "protocol": req.protocol, "headers": req.headers['x-forwarded-for']});
        } catch (e) {
          console.error('Error getting ip:', e);
          return res.status(500).json({error:'could not get data'})
        }
})

module.exports = {getPage, test, ip}





