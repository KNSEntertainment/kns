"use client";

import * as React from "react";
import { Calendar, Facebook, Linkedin, Mail, Share2, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ShareEvent({ title, description, url, startDate, endDate }) {
	const shareData = {
		title,
		text: description,
		url,
	};

	const handleShare = async (platform) => {
		switch (platform) {
			case "native":
				if (navigator.share) {
					try {
						await navigator.share(shareData);
					} catch (err) {
						console.log("Error sharing:", err);
					}
				}
				break;
			case "facebook":
				window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
				break;
			case "twitter":
				window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
				break;
			case "linkedin":
				window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
				break;
			case "email":
				window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description}\n\n${url}`)}`;
				break;
			case "whatsapp":
				window.open(`https://wa.me/?text=${encodeURIComponent(`${title}\n\n${url}`)}`);
				break;
		}
	};

	const generateCalendarLinks = () => {
		const formatDate = (date) => date.toISOString().replace(/-|:|\.\d+/g, "");

		const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&dates=${formatDate(startDate)}/${formatDate(endDate)}`;

		const outlook = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}`;

		const ics = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${url}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${title}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`;

		return { google, outlook, ics };
	};

	const calendarLinks = generateCalendarLinks();

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader className="text-center">
				<CardTitle className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800">Share This Event</CardTitle>
				<CardDescription>Share this event with your friends and colleagues</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="flex justify-center gap-4">
					<Button size="icon" variant="outline" className="rounded-full w-12 h-12 hover:scale-110 transition-transform" onClick={() => handleShare("facebook")}>
						<Facebook className="w-5 h-5" />
						<span className="sr-only">Share on Facebook</span>
					</Button>
					<Button size="icon" variant="outline" className="rounded-full w-12 h-12 hover:scale-110 transition-transform" onClick={() => handleShare("twitter")}>
						<Twitter className="w-5 h-5" />
						<span className="sr-only">Share on Twitter</span>
					</Button>
					<Button size="icon" variant="outline" className="rounded-full w-12 h-12 hover:scale-110 transition-transform" onClick={() => handleShare("linkedin")}>
						<Linkedin className="w-5 h-5" />
						<span className="sr-only">Share on LinkedIn</span>
					</Button>
					<Button size="icon" variant="outline" className="rounded-full w-12 h-12 hover:scale-110 transition-transform" onClick={() => handleShare("email")}>
						<Mail className="w-5 h-5" />
						<span className="sr-only">Share via Email</span>
					</Button>
					{navigator.share && (
						<Button size="icon" variant="outline" className="rounded-full w-12 h-12 hover:scale-110 transition-transform" onClick={() => handleShare("native")}>
							<Share2 className="w-5 h-5" />
							<span className="sr-only">Share</span>
						</Button>
					)}
				</div>

				<div className="flex justify-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold gap-2">
								<Calendar className="w-5 h-5" />
								Add to Calendar
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="center">
							<DropdownMenuItem asChild>
								<a href={calendarLinks.google} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
									Google Calendar
								</a>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<a href={calendarLinks.outlook} target="_blank" rel="noopener noreferrer" className="cursor-pointer">
									Outlook Calendar
								</a>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<a href={calendarLinks.ics} download="event.ics" className="cursor-pointer">
									Download .ics
								</a>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</CardContent>
		</Card>
	);
}
