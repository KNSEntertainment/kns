// models/Subscriber.js
import mongoose from "mongoose";

const SubscriberSchema = new mongoose.Schema(
	{
		subscriber: {
			type: String,
			required: [true, "Please provide an email address"],
			unique: true,
			trim: true,
			lowercase: true,
			validate: {
				validator: function (v) {
					return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
				},
				message: (props) => `${props.value} is not a valid email address!`,
			},
		},
	},
	{ timestamps: true }
);

// Ensure unique index
SubscriberSchema.index({ subscriber: 1 }, { unique: true });

export default mongoose.models.Subscriber || mongoose.model("Subscriber", SubscriberSchema);
