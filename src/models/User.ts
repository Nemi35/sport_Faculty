import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
    email: string;
    password: string;
}

const userSchema: Schema<IUser> = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model("User", userSchema);

export default User;