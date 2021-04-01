const config = require('./knexfile');
const knex = require('knex')(config.development);

// knex.on('connected', () => {
//     console.log('Connected to DB')
// })
// knex.on('error', (err) => console.log(err))

// knex.raw('SELECT VERSION()')
//     .then(version => {
//         console.log('DB VERSION', version)
//     }, err => console.log(err) )
// const version = await knex.raw('SELECT VERSION()')
(async () => {
    try {
        const user = {
            first_name: 'Sodiq',
            last_name: 'Alabi',
            password: '1234577',
            email: 'adisco4420@mail.com',
            timestamps: '2019-04-02',
        }
        const result = await knex('users').insert(user);
        console.log(result);
        
        // const version = await knex.raw('SELECT VERSION()');
        // console.log(version)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
    
})();