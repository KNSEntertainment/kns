import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
	eventname: { type: String, required: true },
	eventaddress: { type: String, required: true },
	eventdate: { type: String, required: true },
	eventposterUrl: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
