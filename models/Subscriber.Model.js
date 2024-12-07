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
					return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
				},
				message: (props) => `${props.value} is not a valid email address!`,
			},
		},
	},
	{ timestamps: true }
);

export default mongoose.models.Subscriber || mongoose.model("Subscriber", SubscriberSchema);

// import mongoose from "mongoose";

// const subscriberSchema = new mongoose.Schema({
// 	subscriber: { type: String, required: true },
// 	createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.Subscriber || mongoose.model("Subscriber", subscriberSchema);
