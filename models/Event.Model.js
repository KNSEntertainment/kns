import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	date: { type: String, required: true },
	fileUrl: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
