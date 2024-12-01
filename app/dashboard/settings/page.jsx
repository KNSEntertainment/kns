"use client";

import React, { useEffect, useState } from "react";
import SettingForm from "@/components/SettingForm";

export default function SettingsPage() {
	const [setting, setSetting] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		fetchSettings();
	}, []);

	const fetchSettings = async () => {
		try {
			setLoading(true);
			const res = await fetch("/api/settings");
			const data = await res.json();
			if (data.success) {
				setSetting(data.settings);
			} else {
				throw new Error(data.error || "Failed to fetch settings");
			}
		} catch (error) {
			console.error("Error fetching settings:", error);
			setError("Failed to load settings. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return <div className="text-center p-4">Loading...</div>;
	}

	if (error) {
		return <div className="text-center p-4 text-red-500">{error}</div>;
	}

	return (
		<div className="bg-white p-12 mx-8 rounded-lg shadow-lg max-w-6xl">
			<h2 className="text-lg font-bold text-gray-800 bg-red-100 p-4 mb-6 text-center">Update Profile</h2>
			<SettingForm fetchSettings={fetchSettings} settingdata={setting} />
		</div>
	);
}
