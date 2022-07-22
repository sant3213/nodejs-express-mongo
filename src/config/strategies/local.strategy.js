const { MongoClient } = require('mongodb');
const passport = require('passport');
const debug = require('debug')('app:localStrategy');
const { Strategy } = require('passport-local');

module.exports = function localStrategy() {
    /**
     * This is the method to call whether or not somebody can be logged in.
     */
    passport.use(new Strategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        const url = "mongodb://localhost:27017";
        const dbName = "expressDb";
        (async function validateUser() {
            let client;
            try {
                client = await MongoClient.connect(url);
                debug('Connect to the mongo DB');

                const db = client.db(dbName);

                const user = await db.collection('users').findOne({username});

                if(user && user.password === password) {
                    done(null, user);
                } else {
                    /**
                     * I didn´t get an error but we also didn´t get a user.
                     */
                    done(null, false);
                }
            } catch (error) {
                done(error, false);
            }
        }())
        
    }))
}