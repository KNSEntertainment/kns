import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
	eventname: { type: String, required: true },
	eventcountry: { type: String, required: true },
	eventvenue: { type: String, required: false },
	eventdate: { type: String, required: false },
	eventtime: { type: String, required: false },
	eventposterUrl: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Event || mongoose.model("Event", eventSchema);
