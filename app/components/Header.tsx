import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

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
				<div className="flex items-center space-x-2">
					<Music className="h-8 w-8 text-primary" />
					<span className="text-2xl font-bold text-primary">NepalEvents</span>
				</div>
				<nav className="hidden md:flex space-x-4">
					<NavLink href="#events">Events</NavLink>
					<NavLink href="#about">About</NavLink>
					<NavLink href="#artists">Artists</NavLink>
					<NavLink href="#contact">Contact</NavLink>
				</nav>
				<div className="md:hidden">
					<Button variant="ghost" size="icon" onClick={toggleMenu}>
						{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</Button>
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
