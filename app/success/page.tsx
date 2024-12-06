import { stripe } from "@/lib/stripe-server";
import ConnectDB from "@/lib/mongodb";
import Payment from "@/models/Payment.Model";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id: string }> }) {
	const { session_id: sessionId } = await searchParams;

	if (!sessionId) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
				<div className="bg-white p-8 rounded-lg shadow-md text-center">
					<h1 className="text-2xl font-bold mb-4 text-red-600">Error</h1>
					<p className="mb-4">No session ID provided. Unable to retrieve payment details.</p>
				</div>
			</div>
		);
	}

	const session = await stripe.checkout.sessions.retrieve(sessionId);

	await ConnectDB();
	const paymentDetails = await Payment.findOne({ stripeSessionId: sessionId });

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md text-center">
				<h1 className="text-2xl font-bold mb-4 text-green-600">Payment Successful!</h1>
				<p className="mb-4">Thank you for your purchase. A confirmation email has been sent to your email address.</p>
				<p className="text-gray-600">Order ID: {session.id}</p>
				{paymentDetails && (
					<div className="mt-4">
						<h2 className="text-xl font-semibold mb-2">Payment Details:</h2>
						<p>Event ID: {paymentDetails.eventId}</p>
						<p>
							Amount: {paymentDetails.amount / 100} {paymentDetails.currency.toUpperCase()}
						</p>
						<p>Status: {paymentDetails.status}</p>
						<p>Customer Email: {paymentDetails.customerEmail}</p>
					</div>
				)}
			</div>
		</div>
	);
}
