"use client";

import React from "react";
import SettingForm from "@/components/SettingForm";
import useFetchData from "@/hooks/useFetchData";

export default function SettingsPage() {
	const { data: settings, error, loading } = useFetchData("/api/settings", "settings");

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="bg-white p-12 mx-8 rounded-lg shadow-lg max-w-6xl">
			<h2 className="text-lg font-bold text-gray-800 bg-red-100 p-4 mb-6 text-center">Update Profile</h2>
			<SettingForm fetchSettings={settings} settingdata={settings} />
		</div>
	);
}
