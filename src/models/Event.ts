// models/Event.ts
import mongoose, { Schema, Document } from 'mongoose';

const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
  }
);

const EventModel = mongoose.models.Event || mongoose.model('Event', eventSchema);
export default EventModel;