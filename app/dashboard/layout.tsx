"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useActiveMenu } from "@/context/ActiveMenuContext";
import { ArrowLeft, BookImage, Drama, MessageCircle, Mail, Settings, GalleryThumbnails, LayoutDashboard } from "lucide-react";

const menuItems = [
	{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ id: "events", label: "Events", icon: BookImage },
	{ id: "artists", label: "Artists", icon: Drama },
	{ id: "testimonials", label: "Testimonials", icon: MessageCircle },
	{ id: "subscribers", label: "Subscribers", icon: Mail },
	{ id: "gallery", label: "Gallery", icon: GalleryThumbnails },
	{ id: "settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { activeMenu, setActiveMenu } = useActiveMenu();

	return (
		<div className="mx-auto my-12 flex flex-col md:flex-row h-screen bg-gray-100">
			{/* Sidebar */}
			<div className="w-64 flex-col md:flex-row bg-white shadow-lg">
				<div className="flex flex-col space-y-4 p-4">
					<Link href="/" className="flex gap-2 bg-slate-100 hover:bg-slate-200 w-fit px-4 py-2 rounded-full">
						<ArrowLeft /> <p>Back</p>
					</Link>
					<h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
				</div>
				<nav className="mt-4">
					{menuItems.map((item) => {
						const Icon = item.icon;
						return (
							<Link
								key={item.id}
								href={item.id === "dashboard" ? `/${item.id}` : `/dashboard/${item.id}`}
								className={`w-full flex items-center px-4 py-3 text-sm 
                  ${activeMenu === item.id ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : "text-gray-600 hover:bg-gray-50"}`}
								onClick={() => setActiveMenu(item.id)}
							>
								<Icon className="w-5 h-5 mr-3" />
								{item.label}
							</Link>
						);
					})}
				</nav>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header */}
				<header className="bg-white shadow-sm">
					<div className="p-4">
						<h2 className="text-lg font-semibold text-gray-800">{menuItems.find((item) => item.id === activeMenu)?.label}</h2>
					</div>
				</header>

				{/* Content Area */}
				<main className="flex-1 overflow-x-auto overflow-y-auto bg-gray-50 p-6">{children}</main>
			</div>
		</div>
	);
}
