const express = require("express");
const bcrypt = require("bcryptjs");
const knex = require("../db/knex.js");

module.exports = {

    createUser: (req, res, next) => {

        // simple check function to validate user
        validUser = (user) => {
            const validEmail = typeof user.email == 'string' &&
                                user.email.trim() != '';
            const validPassword = typeof user.password == 'string' &&
                                user.password.trim() != '' &&
                                user.password.trim().length >= 6;
                                
            return validEmail && validPassword;
        }

        // Knex query for user
        getOneByEmail = (email) => {
            return knex('client').where('email', email).first();
        }

        create = (client) => {
            return knex('client').insert(client, 'id').then(id => {
            return id[0];
            })
        }

        if(validUser(req.body)) {
            getOneByEmail(req.body.email).then(client => {
                console.log("client", client);
                if (!client) {
                    bcrypt.hash(req.body.password, 10).then((hash) => {
                        const client = {
                            email: req.body.email,
                            password: hash
                        }
                        create(client).then(id => {
                            res.json({ id, message: "✅" })
                        })
                    })
                } else {
                    next(new Error("Email is in Use"))
                }
            })
        } else {
            next(new Error("Invalid User"))
        }
    },

    login: (req, res, next) => {

        validUser = (user) => {
            const validEmail = typeof user.email == 'string' &&
                                user.email.trim() != '';
            const validPassword = typeof user.password == 'string' &&
                                user.password.trim() != '' &&
                                user.password.trim().length >= 6;
                                
            return validEmail && validPassword;
        }

        getOneByEmail = (email) => {
            return knex('client').where('email', email).first();
        }

        if(validUser(req.body)) {
            // check to see if in DB
            getOneByEmail(req.body.email)
            .then(client => {
                console.log('client', client)
                if(client) {
                    // compare password with hashed password
                    bcrypt.compare(req.body.password, client.password)
                    .then((result) => {
                        // if the passwords matched
                        if (result) {
                            // setting the 'set-cookie' header
                            res.cookie('client_id', client.id, {
                                httpOnly: true,
                                // may need to add functionality to later
                                secure: true,
                                signed: true
                            })
                            res.json({
                                result,
                                message: 'Logged in! 👨‍💻'
                            })
                        } else {
                            next(new Error('Invalid Login!'))
                        }
                    })
                } else {
                    next(new Error('Invalid Login!'))
                } 
            })
        } else {
            next(new Error('Invalid Login'))
        }
    }

    

}