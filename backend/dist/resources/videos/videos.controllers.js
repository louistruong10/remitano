"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribeVideos = exports.likeVideos = exports.getVideos = exports.dislikeVideos = exports.default = void 0;
var _crud = require("../../utils/crud");
var _videos = require("./videos.model");
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
const subscribeVideos = async (req, res) => {
  try {
    const updatedDoc = await _videos.Videos.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        subscribers: req.body
      }
    }, {
      new: true
    });
    if (!updatedDoc) {
      return res.status(400).send({
        error: 'Document not found'
      });
    }
    res.status(200).json({
      data: updatedDoc
    });
  } catch (e) {
    console.error(e);
    res.status(400).send({
      error: e
    });
  }
};
exports.subscribeVideos = subscribeVideos;
const likeVideos = async (req, res) => {
  try {
    const updatedDoc = await _videos.Videos.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        users_like: req.body.users_like,
        like: req.body.like
      }
    }, {
      new: true
    });
    if (!updatedDoc) {
      return res.status(400).send({
        error: 'Document not found'
      });
    }
    res.status(200).json({
      data: updatedDoc
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
exports.likeVideos = likeVideos;
const dislikeVideos = async (req, res) => {
  try {
    console.log(req.body);
    const updatedDoc = await _videos.Videos.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        users_dislike: req.body.users_dislike,
        dislike: req.body.dislike
      }
    }, {
      new: true
    });
    if (!updatedDoc) {
      return res.status(400).send({
        error: 'Document not found'
      });
    }
    res.status(200).json({
      data: updatedDoc
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
exports.dislikeVideos = dislikeVideos;
var _default = exports.default = (0, _crud.crudControllers)(_videos.Videos);