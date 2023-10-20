"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _user = require("./user.controllers");
const router = (0, _express.Router)();
router.get('/', _user.me);
router.put('/', _user.updateMe);
router.get('/:id/videos', _user.getVideos);
var _default = exports.default = router;