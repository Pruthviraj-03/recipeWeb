import { Videos } from '../models/video.model.js';

const getVideos = async (req, res) => {
  try {
    const videos = await Videos.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getVideoById = async (req, res) => {
  const videoId = req.params.id;

  try {
    const video = await Videos.findById(videoId);
    
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }

    res.json(video);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getVideos, getVideoById };
