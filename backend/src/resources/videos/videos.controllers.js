import { crudControllers } from '../../utils/crud'
import { Videos } from './videos.model'

export const getVideos = async (req, res) => {
  try {
    const subscribedVideos = await Videos.find({ subscribers: req.user._id })

    res.status(200).json({ data: subscribedVideos })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const subscribeVideos = async (req, res) => {
  try {
    const updatedDoc = await Videos.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { subscribers: req.body } },
      {
        new: true
      }
    )
    if (!updatedDoc) {
      return res.status(400).send({ error: 'Document not found' })
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).send({ error: e })
  }
}

export const likeVideos = async (req, res) => {
  try {
    const updatedDoc = await Videos.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { users_like: req.body.users_like, like: req.body.like } },
      {
        new: true
      }
    )
    if (!updatedDoc) {
      return res.status(400).send({ error: 'Document not found' })
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const dislikeVideos = async (req, res) => {
  try {
    console.log(req.body)
    const updatedDoc = await Videos.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          users_dislike: req.body.users_dislike,
          dislike: req.body.dislike
        }
      },
      {
        new: true
      }
    )

    if (!updatedDoc) {
      return res.status(400).send({ error: 'Document not found' })
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export default crudControllers(Videos)
