import mongoose, { Schema } from "mongoose";

export interface IVenue {
  _id?: string;
  name: string;
  address: string;
  state: string;
}

const venueSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  address: {
    type: String,
    required:'Missing Address'
  },
  state: {
    type: String,
    required:'Missing Name'
  },
})

export default mongoose.models.Venue || mongoose.model('Venue', venueSchema);