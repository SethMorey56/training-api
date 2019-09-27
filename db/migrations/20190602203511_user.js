exports.up = function(knex, Promise) {
    return knex.schema.createTable('client', (table) => {
        table.increments(),
        table.string('name'),
        table.string('email'),
        table.string('password'),
        table.integer('age'),
        table.string('gender'),
        table.timestamps(true, true)
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('client')
};
