
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function (table) {
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('cidade').notNullable();
    //   o numero 2 abaixo ↓ limita a quantidade de caracteres por 2.
      table.string('uf', 2).notNullable();
  }); 
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};
