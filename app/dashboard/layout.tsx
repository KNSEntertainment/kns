"use client";

import React from "react";
import Link from "next/link";
import { useActiveMenu } from "@/context/ActiveMenuContext";
import { BookImage, Drama, MessageCircle, Mail, Settings, GalleryThumbnails, LayoutDashboard, Home, Handshake } from "lucide-react";

const menuItems = [
	{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ id: "events", label: "Events", icon: BookImage },
	{ id: "artists", label: "Artists", icon: Drama },
	{ id: "testimonials", label: "Testimonials", icon: MessageCircle },
	{ id: "gallery", label: "Gallery", icon: GalleryThumbnails },
	{ id: "partners", label: "Partners", icon: Handshake },
	{ id: "subscribers", label: "Subscribers", icon: Mail },
	{ id: "settings", label: "Profile Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const { activeMenu, setActiveMenu } = useActiveMenu();

	return (
		<div className="mx-auto mb-12 flex flex-col md:flex-row">
			{/* Sidebar */}
			<div className="hidden md:block w-64 flex-col md:flex-row bg-slate-800 shadow-lg h-screen">
				<div className="flex p-7">
					<Link href="/" className="flex justify-center items-center gap-2 bg-slate-100 hover:bg-slate-200 w-fit px-4 py-2 rounded-full">
						<Home /> <p>Home</p>
					</Link>
				</div>
				<nav className="">
					{menuItems.map((item) => {
						const Icon = item.icon;
						return (
							<Link
								key={item.id}
								href={item.id === "dashboard" ? `/${item.id}` : `/dashboard/${item.id}`}
								className={`w-full flex items-center px-4 py-4 text-sm 
                  ${activeMenu === item.id ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600" : "text-white hover:text-black hover:bg-gray-50"}`}
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
				<header className="bg-slate-800 shadow-sm">
					<div className="flex gap-2 items-center p-8">
						<Link href="/dashboard" className="flex justify-center items-center gap-2 bg-slate-100 hover:bg-slate-200 w-fit px-4 py-2 rounded-full">
							<LayoutDashboard /> <p>Dashboard</p>
						</Link>
						<h2 className="text-2xl font-semibold text-white ml-8">{menuItems.find((item) => item.id === activeMenu)?.label}</h2>
					</div>
				</header>

				{/* Content Area */}
				<main className="flex-1 overflow-x-auto overflow-y-auto bg-gray-50 p-6">{children}</main>
			</div>
		</div>
	);
}
