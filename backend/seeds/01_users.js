const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Inserts seed entries
  await knex('users').insert([
    { email: 'user1@example.com', password: hashedPassword, name_of_guardian: 'Guardian 1', name_of_student: 'Student 1' },
    { email: 'user2@example.com', password: hashedPassword, name_of_guardian: 'Guardian 2', name_of_student: 'Student 2' },
  ]);
};