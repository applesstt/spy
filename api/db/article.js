import mongoose from 'mongoose';
import moment from 'moment';
const Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  name: {type: String, default: '', trim: true},
  info: {type: String, default: '', trim: true},
  city: {type: String, default: 'jinzhou'},
  user: {type: Schema.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now}
});

ArticleSchema.set('toJSON', { virtuals: true, getters: true });
ArticleSchema.virtual('fromNow').get(function() {
  return moment(this.createdAt).fromNow();
});

/**
 * Statics
 */

ArticleSchema.statics = {

  /**
   * Find article by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .exec(cb);
  },

  /**
   * List articles
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {};
    var sort = options.sort || {'createdAt': -1};
    this.find(criteria)
      .populate('user', 'name')
      .sort(sort)
      .limit(options.perPage)
      .skip(options.perPage * (options.currentPage - 1))
      .exec(cb);
  }
}

module.exports = mongoose.model('Article', ArticleSchema);
