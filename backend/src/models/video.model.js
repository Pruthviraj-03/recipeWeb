import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    videoURL: {
      type: String,
      required: true,
    },
    thumbnailURL: {
      type: String,
      required: true,
    },
    trending: {
      type: Boolean,
    },
    topRated: {
      type: Boolean,
    },
    highQuality: {
      type: Boolean,
    },
    isPaid : {
      type: Boolean,
      required: true
    }
  }
);

const Videos = mongoose.model("Videos", VideoSchema);

export { Videos };
