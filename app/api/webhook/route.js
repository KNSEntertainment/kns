import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe-server";
import ConnectDB from "@/lib/mongodb";
import Payment from "@/models/Payment.Model";
import { sendConfirmationEmail } from "@/lib/email";

export async function POST(req) {
	console.log("Webhook received");
	const body = await req.text();
	const sig = req.headers.get("stripe-signature");

	let event;

	try {
		event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
	} catch (err) {
		console.error("Webhook signature verification failed:", err.message);
		return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
	}

	console.log("Event type:", event.type);

	// Handle the event
	if (event.type === "checkout.session.completed") {
		const session = event.data.object;
		console.log("Stripe session data:", JSON.stringify(session, null, 2));

		try {
			await ConnectDB();
			console.log("Successfully connected to the database");

			console.log("Attempting to save payment:", {
				stripeSessionId: session.id,
				eventId: session.metadata?.eventId,
				amount: session.amount_total,
				currency: session.currency,
				status: session.payment_status,
				customerEmail: session.customer_details?.email,
			});

			const payment = new Payment({
				stripeSessionId: session.id,
				eventId: session.metadata?.eventId,
				amount: session.amount_total,
				currency: session.currency,
				status: session.payment_status,
				customerEmail: session.customer_details?.email,
			});

			try {
				const savedPayment = await payment.save();
				console.log("Payment saved successfully:", savedPayment);
			} catch (error) {
				console.error("Error saving payment:", error);
				return NextResponse.json({ error: "Error saving payment", details: error.message }, { status: 500 });
			}

			// Send confirmation email
			if (session?.customer_details?.email) {
				try {
					await sendConfirmationEmail(session.customer_details.email, {
						orderId: session?.id || "Unknown Order ID",
						eventId: session?.metadata?.eventId || "Unknown Event ID",
						amount: session?.amount_total || 0,
						currency: session?.currency || "USD",
					});
					console.log("Confirmation email sent successfully");
				} catch (error) {
					console.error("Error sending confirmation email:", error);
				}
			} else {
				console.error("Email address is missing in session.customer_details");
			}
		} catch (error) {
			console.error("Detailed error:", error);
			console.error("Error stack:", error.stack);
			return NextResponse.json({ error: "Error processing payment", details: error.message }, { status: 500 });
		}
	}

	return NextResponse.json({ received: true });
}

export const config = {
	api: {
		bodyParser: false,
	},
};
