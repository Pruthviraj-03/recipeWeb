import { Router } from "express"; 
import { getVideos, getVideoById } from "../controllers/video.controller.js"

const router = Router()

router.route("/videos").get(getVideos)
router.route("/videos/:id").get(getVideoById)


export { router }
