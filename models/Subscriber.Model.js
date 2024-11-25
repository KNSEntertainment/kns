import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
	subscriber: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema);
