import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
	stripeSessionId: {
		type: String,
		required: true,
		unique: true,
	},
	eventId: {
		type: String,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	currency: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	customerEmail: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
