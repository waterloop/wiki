/* global wiki */

// ------------------------------------
// Dropbox Account
// ------------------------------------

const DropboxStrategy = require('passport-dropbox-oauth2').Strategy

module.exports = {
  key: 'dropbox',
  title: 'Dropbox',
  useForm: false,
  props: ['clientId', 'clientSecret'],
  init (passport, conf) {
    passport.use('dropbox',
      new DropboxStrategy({
        apiVersion: '2',
        clientID: conf.clientId,
        clientSecret: conf.clientSecret,
        callbackURL: conf.callbackURL
      }, (accessToken, refreshToken, profile, cb) => {
        wiki.db.User.processProfile(profile).then((user) => {
          return cb(null, user) || true
        }).catch((err) => {
          return cb(err, null) || true
        })
      })
    )
  }
}