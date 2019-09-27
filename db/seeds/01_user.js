exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('client').del()
    .then(function () {
      // Inserts seed entries
      return knex('client').insert([
        {name: 'Troy', email: 'troy@mail.com', password: 'asdfasdf', age: 23, gender: 'male'},
        {name: 'Kyle', email: 'kyle@mail.com', password: 'asdfasdf', age: 24, gender: 'male'},
        {name: 'Sammy', email: 'sammy@mail.com', password: 'asdfasdf', age: 24, gender: 'male'},
      ]);
    });
};
