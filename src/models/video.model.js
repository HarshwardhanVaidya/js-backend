import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, //cloudanary
      required: true
    },
    thumbnail: {
      type: String, //cloudanary
      required: true
    },
    title: {
      type: String, 
      required: true
    },
    description:{
      type: Number, 
      required: true
    },
    description:{
      type: Number,  //cloudanary
      required: true
    },
    views: {
      type: Number,
      default: 0
    },
    isPublished:{
      type: Boolean, 
      default: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)