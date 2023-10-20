import mongoose from 'mongoose'

const listSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    price: Number,
    priceVND: Number,
    image: String,
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'user',
      required: true
    }
  },
  { timestamps: true }
)

listSchema.index({ user: 1, name: 1 }, { unique: true })

export const List = mongoose.model('list', listSchema)
