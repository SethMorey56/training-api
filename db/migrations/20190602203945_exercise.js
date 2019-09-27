exports.up = function(knex, Promise) {
    return knex.schema.createTable('exercise', (table) => {
        table.increments(),
        table.string('name'),
        table.text('description'),
        table.string('example'),
        table.integer('rep'),
        table.integer('set'),
        table.timestamps(true, true)
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('exercise')
};