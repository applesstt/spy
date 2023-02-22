import mongoose from 'mongoose';
import moment from 'moment';
const Schema = mongoose.Schema;

moment.locale('zh-cn');

var ChatSchema = new Schema({
  text: {type: String, default: '', trim: true},
  nickname: {type: String, default: '', trim: true},
  city: { type: String, default: 'jinzhou' },
  user: { type: Schema.ObjectId, ref: 'User'},
  createdAt: {type: Date, default: Date.now}
});

/**
 * virtual
 */
ChatSchema.set('toJSON', { virtuals: true, getters: true });
ChatSchema.virtual('fromNow').get(function() {
  return moment(this.createdAt).fromNow();
});

/**
 * Statics
 */

ChatSchema.statics = {

  list: function (options, cb) {
    var last7Days = new Date((new Date()).getTime() - 1000 * 60 * 60 * 24 * 7);
    var criteria = options.criteria || {};
    var sort = options.sort || {createdAt: 1};
    this.find({
      ...criteria,
      createdAt: {
        $gte: last7Days
      }
    }).populate('user', 'name')
      .sort(sort)
      .exec(cb);
  }
}

module.exports = mongoose.model('Chat', ChatSchema);
