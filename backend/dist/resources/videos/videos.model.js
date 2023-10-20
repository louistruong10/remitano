"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Videos = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const videosSchema = new _mongoose.default.Schema({
  _id: _mongoose.default.SchemaTypes.ObjectId,
  video_id: {
    type: String,
    required: true,
    trim: true
  },
  title: String,
  channel_name: String,
  channel_logo: String,
  like: Number,
  dislike: Number,
  subscribers: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  }],
  users_dislike: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  }],
  users_like: [{
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});
const Videos = exports.Videos = _mongoose.default.model('videos', videosSchema);