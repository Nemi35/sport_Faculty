import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
    {
        _id: { type: String, required: true }, 
        name: { type: String, required: true },
        title: { type: String, required: true },
        image: { type: String, default: "/default.jpg" },
    },
    { timestamps: true }
);

export default mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
