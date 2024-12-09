"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createCheckoutSession } from "@/app/actions/stripe";
import { ShoppingCart, Ticket } from "lucide-react";

export function BuyTicketButton({ eventId, price, btnText }: { eventId: string; price: number; btnText: string }) {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleBuyTicket = async () => {
		setIsLoading(true);
		try {
			const sessionUrl = await createCheckoutSession(eventId, price);
			router.push(sessionUrl);
		} catch (error) {
			console.error("Failed to create checkout session:", error);
			alert("Failed to initiate checkout. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button onClick={handleBuyTicket} disabled={isLoading} className={` ${btnText === "Get Your Tickets Now" ? "w-full" : "flex items-center justify-center"}`}>
			{btnText === "Get Your Tickets Now" ? <Ticket className="hidden md:block h-4 w-4" /> : <ShoppingCart className="hidden md:block h-4 w-4" />}
			<span className="ml-2">{isLoading ? "Adding..." : btnText}</span>
		</Button>
	);
}
