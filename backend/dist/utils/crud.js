"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOne = exports.removeOne = exports.getOne = exports.getMany = exports.getAll = exports.crudControllers = exports.createOne = void 0;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const getAll = model => async (req, res) => {
  try {
    const docs = await model.find().lean().exec();
    res.status(200).json({
      data: docs
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
exports.getAll = getAll;
const getOne = model => async (req, res) => {
  try {
    const doc = await model.findOne({
      createdBy: req.user._id,
      _id: req.params.id
    }).lean().exec();
    if (!doc) return res.status(400).end();
    res.status(200).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
exports.getOne = getOne;
const getMany = model => async (req, res) => {
  try {
    const docs = await model.find().lean().exec();
    res.status(200).json({
      data: docs
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
exports.getMany = getMany;
const createOne = model => async (req, res) => {
  const createdBy = req.user._id;
  try {
    const doc = await model.create(_objectSpread(_objectSpread({}, req.body), {}, {
      createdBy
    }));
    res.status(201).json({
      data: doc
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
exports.createOne = createOne;
const updateOne = model => async (req, res) => {
  try {
    const updatedDoc = await model.findOneAndUpdate({
      video_id: req.body.video_id
    }, {
      $set: req.body
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
exports.updateOne = updateOne;
const removeOne = model => async (req, res) => {
  try {
    const removed = await model.findOneAndRemove({
      createdBy: req.user._id,
      _id: req.params.id
    });
    if (!removed) {
      return res.status(400).end();
    }
    return res.status(200).json({
      data: removed
    });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
exports.removeOne = removeOne;
const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getAll: getAll(model),
  getOne: getOne(model),
  createOne: createOne(model)
});
exports.crudControllers = crudControllers;