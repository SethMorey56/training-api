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

    loginUser: (req, res, next) => {
        
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

        if(validUser(req.body)) {
            getOneByEmail(req.body.email).then(user => {
                console.log('user', user) 
                if(user) {
                    bcrypt.compare(req.body.password, user.password).then((result) => {
                        if(result) {
                            // const isSecure = req.app.get('env') != 'development';
                            // res.cookie('user_id', user.id, {
                            //     httpOnly: true,
                            //     secure: isSecure,
                            //     signed: true
                            // })
                            res.json({
                                message: 'Loggin In '
                            })
                        }
                    })
                } else {
                    next(new Error('Invalid Login'))
                }
            });
        } else {
            next(new Error('Invalid Login'))
        }
    }

}