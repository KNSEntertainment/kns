"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
	isMenuOpen: boolean;
	toggleMenu: () => void;
}

export default function Header({ isMenuOpen, toggleMenu }: HeaderProps) {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.header className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-black"}`} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<Link href="/" className="flex items-center space-x-4 cursor-pointer group">
					<Image src="/kns_logo_rect.png" alt="KNS Entertainment" width={400} height={200} className="w-auto h-12 md:h-16 rounded-md bg-slate-200 group-hover:bg-slate-100" />
					<span className={`hidden text-2xl font-bold text-primary ${isScrolled ? "text-black " : "text-slate-200"}`}>KNS Entertainment</span>
				</Link>

				<div className="flex gap-2 items-center">
					<nav className="hidden md:flex items-center space-x-6 mr-6">
						<Link href="/about-us" className={`border-b border-transparent hover:border-b hover:border-b-red-700 ${isScrolled ? "text-black " : "text-slate-200 hover:text-slate-200"}`}>
							About Us
						</Link>

						<Link href="request-offer" className={`border-b bg-red-700 rounded-full py-2 px-6 border-transparent hover:border-b hover:border-b-red-700 ${isScrolled ? "text-white" : "text-slate-200 hover:text-slate-200"}`}>
							Request an Offer
						</Link>
						<Link href="/gurungknsadmin1234" className={`border-b border-transparent hover:border-b hover:border-b-red-700 ${isScrolled ? "text-black " : "text-slate-200 hover:text-slate-200"}`}>
							Dashboard
						</Link>
					</nav>
					{/* <div className="relative p-1">
						<ShoppingCart className={`md:block ${isScrolled ? "text-black" : "text-slate-200"}`} style={{ height: "32px", width: "32px" }} />
						<span className="absolute top-0 right-0 bg-red-600 text-slate-200 text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center">1</span>
					</div> */}
					<div className="md:hidden cursor-pointer" onClick={toggleMenu}>
						{isMenuOpen ? <X className={`${isScrolled ? "text-black " : "text-slate-200"}`} style={{ height: "32px", width: "32px" }} /> : <Menu className={`${isScrolled ? "text-black " : "text-slate-200"}`} style={{ height: "32px", width: "32px" }} />}
					</div>
				</div>
			</div>
			{isMenuOpen && (
				<motion.div className="md:hidden bg-white" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
					<nav className="flex flex-col items-center text-lg py-6">
						<NavLink href="/events" onClick={toggleMenu}>
							Events
						</NavLink>
						<NavLink href="/about-us" onClick={toggleMenu}>
							About Us
						</NavLink>

						<NavLink href="/gallery" onClick={toggleMenu}>
							Gallery
						</NavLink>

						<NavLink href="/request-offer" onClick={toggleMenu}>
							Request an Offer
						</NavLink>
						<NavLink href="/gurungknsadmin1234" onClick={toggleMenu}>
							Dashboard
						</NavLink>
					</nav>
				</motion.div>
			)}
		</motion.header>
	);
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
	return (
		<a href={href} className="text-gray-600 hover:bg-slate-100 w-full text-center hover:text-red-600 transition-colors duration-300 py-2" onClick={onClick}>
			{children}
		</a>
	);
}
