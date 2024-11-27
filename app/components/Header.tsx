"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
		<motion.header className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<div className="flex items-center space-x-4 cursor-pointer group">
					<Image src="/kns_logo_rect.png" alt="KNS Entertainment" width={400} height={200} className="w-auto h-16 bg-slate-200 group-hover:bg-slate-100" />
					<span className={`hidden sm:block text-2xl font-bold text-primary ${isScrolled ? "text-black " : "text-slate-200"}`}>KNS Entertainment</span>
				</div>
				<nav className="hidden md:flex space-x-6">
					<Link href="#events" className={`${isScrolled ? "text-black " : "text-slate-200"}`}>
						Events
					</Link>
					<Link href="#about" className={`${isScrolled ? "text-black " : "text-slate-200"}`}>
						About
					</Link>
					<Link href="#artists" className={`${isScrolled ? "text-black " : "text-slate-200"}`}>
						Artists
					</Link>
					<Link href="#contact" className={`${isScrolled ? "text-black " : "text-slate-200"}`}>
						Contact
					</Link>
				</nav>
				<div className="md:hidden">
					<div className="cursor-pointer" onClick={toggleMenu}>
						{isMenuOpen ? <X style={{ height: "32px", width: "32px", backgroundColor: "slategray" }} /> : <Menu style={{ height: "32px", width: "32px", backgroundColor: "whitesmoke" }} />}
					</div>
				</div>
			</div>
			{isMenuOpen && (
				<motion.div className="md:hidden bg-white" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}>
					<nav className="flex flex-col items-center py-4">
						<NavLink href="#events" onClick={toggleMenu}>
							Events
						</NavLink>
						<NavLink href="#about" onClick={toggleMenu}>
							About
						</NavLink>
						<NavLink href="#artists" onClick={toggleMenu}>
							Artists
						</NavLink>
						<NavLink href="#contact" onClick={toggleMenu}>
							Contact
						</NavLink>
					</nav>
				</motion.div>
			)}
		</motion.header>
	);
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
	return (
		<a href={href} className="text-gray-600 hover:text-primary transition-colors duration-300 py-2" onClick={onClick}>
			{children}
		</a>
	);
}
