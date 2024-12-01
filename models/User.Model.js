import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: String, default: "admin" },
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	}
);

export default mongoose.models.User || mongoose.model("User", userSchema);
