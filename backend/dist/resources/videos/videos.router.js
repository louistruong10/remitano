"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _videos = _interopRequireWildcard(require("./videos.controllers"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const router = (0, _express.Router)();
router.route('/').get(_videos.default.getAll).post(_videos.default.createOne);
router.route('/subscribe_videos').get(_videos.getVideos);
router.route('/:id').get(_videos.default.getOne).put(_videos.default.updateOne).delete(_videos.default.removeOne);
router.route('/:id/subscribe').put(_videos.subscribeVideos);
router.route('/:id/like').put(_videos.likeVideos);
router.route('/:id/dislike').put(_videos.dislikeVideos);
var _default = exports.default = router;