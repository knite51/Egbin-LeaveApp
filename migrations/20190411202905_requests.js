
exports.up = async function(knex, Promise) {
    try {
        const tableExist = await knex.schema.hasTable('requests');
        if (!tableExist) {
            return knex.schema.createTable('requests', function (table) {
                table.increments();
                table.string('user_id').notNullable();
                table.string('organization_id').notNullable();
                table.string('employee_id', 15).notNullable();
                table.string('request_type', 15).notNullable();
                table.date('start_date').notNullable();
                table.date('end_date').notNullable();
                table.string('status', ).notNullable();
                table.date('timestamp').nullable();


                table.index('user_id');
                table.index('employee_id');
                table.index('organization_id');

            })
        } else {
            console.log('Table already exists');
            
        }
    } catch (error) {
        console.log(error);
    }

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('requests')
};
