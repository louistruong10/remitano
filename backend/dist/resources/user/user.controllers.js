"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMe = exports.me = exports.getVideos = void 0;
var _videos = require("../videos/videos.model");
var _user = require("./user.model");
const me = (req, res) => {
  res.status(200).json({
    data: req.user
  });
};
exports.me = me;
const updateMe = async (req, res) => {
  try {
    const user = await _user.User.findByIdAndUpdate(req.user._id, req.body, {
      new: true
    }).lean().exec();
    res.status(200).json({
      data: user
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
exports.updateMe = updateMe;
const getVideos = async (req, res) => {
  try {
    const subscribedVideos = await _videos.Videos.find({
      subscribers: req.user._id
    });
    res.status(200).json({
      data: subscribedVideos
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
exports.getVideos = getVideos;