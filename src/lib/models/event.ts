import mongoose, { Schema } from "mongoose";
import { IVenue } from "./venue";

export interface IEvent {
  _id?: string;
  artist: string;
  description: string;
  date: string;
  slug: string;
  venue: string | IVenue;
}

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
