import { Router } from 'express'
import controllers, {
  getVideos,
  subscribeVideos,
  dislikeVideos,
  likeVideos
} from './videos.controllers'

const router = Router()

router
  .route('/')
  .get(controllers.getAll)
  .post(controllers.createOne)

router.route('/subscribe_videos').get(getVideos)
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne)

router.route('/:id/subscribe').put(subscribeVideos)
router.route('/:id/like').put(likeVideos)
router.route('/:id/dislike').put(dislikeVideos)

export default router
