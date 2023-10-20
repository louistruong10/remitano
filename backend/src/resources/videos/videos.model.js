import mongoose from 'mongoose'

const videosSchema = new mongoose.Schema(
  {
    _id: mongoose.SchemaTypes.ObjectId,
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
    subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    users_dislike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    users_like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
)

export const Videos = mongoose.model('videos', videosSchema)
