import { Router } from 'express'
import { me, updateMe, getVideos } from './user.controllers'

const router = Router()

router.get('/', me)
router.put('/', updateMe)
router.get('/:id/videos', getVideos)

export default router
