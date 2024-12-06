"use server";

import { stripe } from "@/lib/stripe-server";

export async function createCheckoutSession(eventId: string, price: number) {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: "usd",
					product_data: {
						name: `Ticket for Event ${eventId}`,
					},
					unit_amount: price * 100, // Stripe expects amounts in cents
				},
				quantity: 1,
			},
		],
		mode: "payment",
		success_url: `${process.env.NEXT_PUBLIC_API_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/cancel`,
		metadata: {
			eventId: eventId,
		},
	});

	if (!session.url) {
		throw new Error("Failed to create checkout session");
	}

	return session.url;
}
