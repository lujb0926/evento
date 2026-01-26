import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  artist: String,
  description: String,
  venue: {
    type: Schema.Types.ObjectId,
    ref: 'Venue',
    required: true
  },
  date: Date,
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  }
})

export default mongoose.models.Event || mongoose.model('Event', eventSchema);
