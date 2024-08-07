exports.up = function(knex) {
    return knex.schema.createTable('user_details', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.text('address');
      table.string('phone_number1');
      table.string('phone_number2');
      table.decimal('latitude', 10, 8);
      table.decimal('longitude', 11, 8);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('user_details');
  };