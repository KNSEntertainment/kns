"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, Ticket } from "lucide-react";

export function BuyTicketButton({ btnText }: { btnText: string }) {
	const handleBuyTicket = async () => {
		alert("This feature is under development process.");
	};

	return (
		<Button onClick={handleBuyTicket} className={` ${btnText === "Get Your Tickets Now" ? "w-full" : "bg-red-700 flex items-center justify-center"}`}>
			{btnText === "Get Your Tickets Now" ? <Ticket className="hidden md:block h-4 w-4" /> : <ShoppingCart className="hidden md:block h-4 w-4" />}
			<span className="ml-2">{btnText}</span>
		</Button>
	);
}
