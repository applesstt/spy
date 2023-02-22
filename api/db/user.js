import mongoose from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {type: String, default: '', trim: true},
  city: { type: String, default: 'jinzhou' },
  isSuperAdmin: { type: Boolean, default: false }, //超级管理员
  isAdmin: { type: Boolean, default: false }, //普通管理员
  salt: { type: String, default: '' },
  hashed_password: { type: String, default: '' },
  createdAt: {type: Date, default: Date.now}
});

/**
 * virtual
 */
UserSchema
  .virtual('password')
  .set(function(password) {
   this._password = password;
   this.salt = this.makeSalt();
   this.hashed_password = this.encryptPassword(password);
  })
  .get(function() { return this._password });

/**
 * Validations
 */

var validatePresenceOf = function (value) {
  return value && value.length;
};

UserSchema.path('hashed_password').validate(function (hashed_password) {
  return hashed_password.length;
}, 'Password cannot be blank');

/**
 * Pre-save hook
 */

UserSchema.pre('save', function(next) {
  if (!this.isNew) return next();

  if (!validatePresenceOf(this.password)) {
    next(new Error('Invalid password'));
  } else {
    next();
  }
})

/**
 * Methods
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */

  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */

  makeSalt: function () {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  }
};

/**
 * Statics
 */

UserSchema.statics = {

  /**
   * Load
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  load: function (options, cb) {
    this.findOne(options.criteria)
      .select(options.select)
      .exec(cb);
  },

  /**
   * List users
   *
   * @param options
   * @param cb
   */

  list: function (options, cb) {
    var criteria = options.criteria || {};
    var sort = options.sort || {createdAt: -1};
    this.find(criteria)
      .sort(sort)
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  }
}

module.exports = mongoose.model('User', UserSchema);
