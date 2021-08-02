import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema({
  text: String,
  creaatedDate: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});

const MovieSchema = new Schema({
  title: String,
  comments: [CommentSchema],
});

const Movie = mongoose.model('Movie', MovieSchema);
export default Movie;
