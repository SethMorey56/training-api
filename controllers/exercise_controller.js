const knex = require("../db/knex.js");

module.exports = {

    getExercise: function(req, res) {
        knex.select('*').from('exercise')
        .then((result) => {
            res.json(result)
        });
    },

    getSinlgeExercise: function(req, res) {
        knex('exercise').where('id', req.params.id).select()
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            res.status(400).send({message: err})
        })
    },
 
    postExercise: function(req, res) {
        knex('exercise').insert({
            name: req.body.name,
            description: req.body.description,
            example: req.body.example,
            rep: req.body.rep,
            set: req.body.set
        }).then((results) => {
            res.json(results[0])
            res.send("Thank for the exercise!")
        }).catch((err) => {
            res.status(422).send({message: err})
        })
    },

    updateExercise: function(req, res) {
        knex('exercise').where('id', req.params.id).update({
            name: req.body.name,
            description: req.body.description,
            example: req.body.example,
            rep: req.body.rep,
            set: req.body.set
        }).then((results) => {
            res.json(results[0])
        }).catch((err) => {
            res.status(422).send({message: err})
        })
    },

    deleteExercise: function(req, res) {
        knex('exercise').del().where('id', req.params.id)
        .then(() => {
            res.status(200).send({message: "successfull deleted exercise"})
        }).catch((err) => {
            res.status(422).send({message: err})
        })
    }

}
