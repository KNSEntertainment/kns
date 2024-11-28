import React from "react";

const EventsFilterBar = () => {
	return (
		<div className="flex gap-2 sm:gap-4 w-full items-center justify-center mb-6 sm:mb-12">
			<Button onClick={() => setFilter("all")} variant={filter === "all" ? "default" : "outline"} aria-pressed={filter === "all"}>
				All Events
			</Button>
			<Button onClick={() => setFilter("upcoming")} variant={filter === "upcoming" ? "default" : "outline"} aria-pressed={filter === "upcoming"}>
				Upcoming Events
			</Button>
			<Button onClick={() => setFilter("past")} variant={filter === "past" ? "default" : "outline"} aria-pressed={filter === "past"}>
				Past Events
			</Button>
		</div>
	);
};

export default EventsFilterBar;
