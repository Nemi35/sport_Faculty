import mongoose, { Schema, Document } from "mongoose";

interface IEvent extends Document {
  title: string;
  date: Date;
  description: string;
  createdAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const EventModel =
  mongoose.models.Event || mongoose.model<IEvent>("Event", eventSchema);

export default EventModel;
