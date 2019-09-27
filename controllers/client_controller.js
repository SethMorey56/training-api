const knex = require("../db/knex.js");
const hasher = require("../config/hasher");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || 'secret';

module.exports = {

    getUsers: function(req, res) {
        knex.select('*').from('client')
        .then((result) => {
            res.json(result)
        });
    },

    // create: (req, res) => {
    //     hasher.hash(req.body).then((newClient) => {
    //         knex('client').insert({
    //             name: req.body.name,
    //             email: req.body.email,
    //             password: hash,
    //             age: req.body.age,
    //             gender: req.body.gender
    //         }, 'id').then((results) => {
    //             res.json({ message: "Successfully Registered, please log in", id: results[0], token: req.body.password })
    //         })
    //         .catch((err) => {
    //             res.sendStatus(400).send({ message: err })
    //         })
    //     })
    // },

    login: (req, res) => {
        knex('client').where('email', req.body.email)
        .first()
        .then((user) => {
            if (user) {
                newHasher.check(user, req.body).then((match) => {
                    if (match) {
                        const token = jwt.sign(user, secret)
                        res.json({ message: "Success", token })
                    } else {
                        res.status(400).send({ message: "Invalid Credentials" })
                    }
                })
            } else {
                res.satus(400).send({ message: "Invalid Credentials" })
            }
        }).catch((err) => {
            res.send(400).send({ message: "Invalid Credentials" })
        })
    }

}
