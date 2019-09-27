exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('exercise').del()
    .then(function () {
      // Inserts seed entries
      return knex('exercise').insert([
        {name: 'bicep curl', description: 'just do it', example: 'url link', rep: 15, set: 3},
        {name: 'tricep extension', description: 'like this, and that', example: 'url link 2', rep: 15, set: 3},
        {name: 'chest fly', description: 'like a butterfly', example: 'url link 3', rep: 15, set: 3},
        {name: 'chest fly', description: 'like a butterfly', example: 'https://www.youtube.com/watch?v=IJTOtBrfp98', rep: 15, set: 3},
        {name: 'chest fly', description: 'like a butterfly', example: 'url link 3', rep: 15, set: 3}
      ]);
    });
};
