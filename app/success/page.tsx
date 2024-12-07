import { stripe } from "@/lib/stripe-server";
import ConnectDB from "@/lib/mongodb";
import Payment from "@/models/Payment.Model";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Home } from "lucide-react";
import Link from "next/link";

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id: string }> }) {
	const { session_id: sessionId } = await searchParams;

	if (!sessionId) {
		return (
			<div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 flex items-center justify-center p-4">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<div className="mx-auto my-4 bg-red-100 text-red-600 rounded-full p-3 w-16 h-16 flex items-center justify-center">
							<AlertCircle className="w-8 h-8" />
						</div>
						<CardTitle className="text-2xl font-bold text-red-600">Error</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-center">No session ID provided. Unable to retrieve payment details.</p>
					</CardContent>
					<CardFooter className="flex justify-center">
						<Button asChild>
							<Link href="/">
								<Home className="w-4 h-4 mr-2" />
								Return to Home
							</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		);
	}

	const session = await stripe.checkout.sessions.retrieve(sessionId);

	await ConnectDB();
	const paymentDetails = await Payment.findOne({ stripeSessionId: sessionId });

	return (
		<div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center p-4">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="mx-auto my-4 bg-green-100 text-green-600 rounded-full p-3 w-16 h-16 flex items-center justify-center">
						<CheckCircle className="w-8 h-8" />
					</div>
					<CardTitle className="text-2xl font-bold text-green-600">Payment Successful!</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<p className="text-center">Thank you for your purchase. A confirmation email has been sent to your email address.</p>
					<div className="bg-gray-50 p-4 rounded-lg">
						<p className="text-sm text-gray-500">Order ID</p>
						<p className="font-mono text-gray-700 break-all">{session.id}</p>
					</div>
					{paymentDetails && (
						<div className="space-y-2">
							<h2 className="text-xl font-semibold text-center">Payment Details:</h2>
							<div className="grid grid-cols-2 gap-2">
								<p className="text-gray-600">Event ID:</p>
								<p>{paymentDetails.eventId}</p>
								<p className="text-gray-600">Amount:</p>
								<p>
									{paymentDetails.amount / 100} {paymentDetails.currency.toUpperCase()}
								</p>
								<p className="text-gray-600">Status:</p>
								<p>{paymentDetails.status}</p>
								<p className="text-gray-600">Customer Email:</p>
								<p>{paymentDetails.customerEmail}</p>
							</div>
						</div>
					)}
				</CardContent>
				<CardFooter className="flex justify-center">
					<Button asChild>
						<Link href="/">
							<Home className="w-4 h-4 mr-2" />
							Return to Home
						</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
