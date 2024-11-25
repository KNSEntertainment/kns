"use client";
import { useState } from "react";

export default function EventForm() {
	const [formData, setFormData] = useState({
		eventname: "",
		eventaddress: "",
		eventdate: "",
		eventposter: null,
	});
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSubmitting(true);

		try {
			const form = new FormData();
			form.append("eventname", formData.eventname);
			form.append("eventaddress", formData.eventaddress);
			form.append("eventdate", formData.eventdate);
			if (formData.eventposter) {
				form.append("eventposter", formData.eventposter);
			}
			console.log("form", form);
			const response = await fetch("/api/events/create", {
				method: "POST",
				body: form,
			});

			const result = await response.json();
			console.log("result", result);
			if (!response.ok) {
				throw new Error(result.error || "Failed to create event");
			}

			if (result.success) {
				alert("Event created successfully!");
				setFormData({
					eventname: "",
					eventaddress: "",
					eventdate: "",
					eventposter: null,
				});
				// Reset eventposter input
				const eventposterInput = document.getElementById("eventposter");
				if (eventposterInput) {
					eventposterInput.value = "";
				}
			}
		} catch (error) {
			setError(error.message);
			console.error("Error creating event:", error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="container mx-auto w-full md:w-1/2 p-6">
			<form onSubmit={handleSubmit} className="space-y-4">
				{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
				<div>
					<label htmlFor="eventname" className="block mb-2 font-bold">
						Name of Event
					</label>
					<input type="text" id="eventname" value={formData.eventname} onChange={(e) => setFormData({ ...formData, eventname: e.target.value })} className="w-full p-2 border rounded" required />
				</div>
				<div>
					<label htmlFor="eventaddress" className="block mb-2 font-bold">
						Event Venue
					</label>
					<input id="eventaddress" value={formData.eventaddress} onChange={(e) => setFormData({ ...formData, eventaddress: e.target.value })} className="w-full p-2 border rounded" required />
				</div>
				<div>
					<label htmlFor="eventdate" className="block mb-2 font-bold">
						Event Date
					</label>
					<input type="date" id="eventdate" value={formData.eventdate} onChange={(e) => setFormData({ ...formData, eventdate: e.target.value })} className="w-full p-2 border rounded" required />
				</div>
				<div>
					<label htmlFor="eventposter" className="block mb-2 font-bold">
						Event Poster
					</label>
					<input type="file" id="eventposter" onChange={(e) => setFormData({ ...formData, eventposter: e.target.files[0] })} className="w-full p-2 border rounded" required />
				</div>
				<button type="submit" disabled={submitting} className={`w-full p-2 rounded ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white font-bold`}>
					{submitting ? "Creating Event..." : "Create Event"}
				</button>
			</form>
		</div>
	);
}