let bcrypt = require("bcryptjs");
let SALT_WORK_FACTOR = 10;

module.exports = {
    
    // hash: function(user) {
    //     return new Promise((resolve, reject) => {
    //         bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    //             if (err) reject (err);

    //             //hash the password with our new salt
    //             bcrypt.hash(user.password, salt, function(err, hash) {
    //                 if (err) reject (err);

    //             //override the cleartext password with the hashed one
    //             user.password = hash;
    //             resolve(user);
    //             })
    //         })
    //     })
    // },

    hash: function(newClient) {
        return new Promise((req, res, next) => {
            bcrypt.hash(newClient.password, SALT_WORK_FACTOR).then((hash) => {
                newClient.password = hash;
            })
        })
    },

    check: function(encryptedUser, user) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(user.password, encryptedUser.password, function(err, match) {
                if (err) reject(err);
                resolve(match);
            })
        })
    }
    
}