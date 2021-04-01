
exports.up = async function(knex, Promise) {
    try {
        const tableExist = await knex.schema.hasTable('users');
        if (!tableExist) {
            return knex.schema.createTable('users', function (table) {
                table.increments();
                table.string('first_name').notNullable();
                table.string('last_name').notNullable();
                table.string('email').nullable();
                table.string('password').notNullable();
                table.date('timestamps ').notNullable();


                table.index('user_id');
                table.index('first_name');
                table.index('last_name');
                table.unique('email');
            })
        } else {
            console.log('Table already exists');
            
        }
    } catch (error) {
        console.log(error);
    }

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
};
