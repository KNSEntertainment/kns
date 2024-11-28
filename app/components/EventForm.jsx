import { Button } from "@/components/ui/button";
import { useState } from "react";
// import { toast } from "react-toastify";

export default function EventForm({ handleCloseEventModal }) {
	const [formData, setFormData] = useState({
		eventname: "",
		eventcountry: "",
		eventvenue: "",
		eventdate: "",
		eventtime: "",
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
			form.append("eventcountry", formData.eventcountry);
			form.append("eventvenue", formData.eventvenue);
			form.append("eventdate", formData.eventdate);
			form.append("eventtime", formData.eventtime);
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
				toast.success("Event created successfully!");
				setFormData({
					eventname: "",
					eventcountry: "",
					eventvenue: "",
					eventdate: "",
					eventtime: "",
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
		<form onSubmit={handleSubmit} className="space-y-4">
			{error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}
			<div>
				<label htmlFor="eventname" className="block mb-2 font-bold">
					Name of Event
				</label>
				<input type="text" id="eventname" value={formData.eventname} onChange={(e) => setFormData({ ...formData, eventname: e.target.value })} className="w-full p-2 border rounded" required />
			</div>
			<div>
				<label htmlFor="eventcountry" className="block mb-2 font-bold">
					Event Country
				</label>
				<input id="eventcountry" value={formData.eventcountry} onChange={(e) => setFormData({ ...formData, eventcountry: e.target.value })} className="w-full p-2 border rounded" required />
			</div>
			<div>
				<label htmlFor="eventvenue" className="block mb-2 font-bold">
					Event Venue
				</label>
				<input id="eventvenue" value={formData.eventvenue} onChange={(e) => setFormData({ ...formData, eventvenue: e.target.value })} className="w-full p-2 border rounded" />
			</div>
			<div>
				<label htmlFor="eventdate" className="block mb-2 font-bold">
					Event Date
				</label>
				<input type="date" id="eventdate" value={formData.eventdate} onChange={(e) => setFormData({ ...formData, eventdate: e.target.value })} className="w-full p-2 border rounded" />
			</div>
			<div>
				<label htmlFor="eventtime" className="block mb-2 font-bold">
					Event Time
				</label>
				<input type="text" id="eventtime" value={formData.eventtime} onChange={(e) => setFormData({ ...formData, eventtime: e.target.value })} className="w-full p-2 border rounded" />
			</div>
			<div>
				<label htmlFor="eventposter" className="block mb-2 font-bold">
					Event Poster
				</label>
				<input type="file" id="eventposter" onChange={(e) => setFormData({ ...formData, eventposter: e.target.files[0] })} className="w-full p-2 border rounded" required />
			</div>
			<div className="grid grid-cols-2 gap-2">
				<button type="submit" disabled={submitting} className={`w-full p-1.5 rounded ${submitting ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"} text-white font-bold`}>
					{submitting ? "Creating Event..." : "Create Event"}
				</button>
				<Button variant="outline" onClick={handleCloseEventModal}>
					Close
				</Button>
			</div>
		</form>
	);
}
