"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Facebook, Home, Instagram, Menu, Search, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchModal from "@/components/SearchModal";
import SearchBox from "@/components/SearchBox";

interface HeaderProps {
	isMenuOpen: boolean;
	toggleMenu: () => void;
}

export default function Header({ isMenuOpen, toggleMenu }: HeaderProps) {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.header className={`fixed w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-black"}`} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
			<div className="container mx-auto p-4 flex justify-between items-center">
				<Link href="/" className="flex items-center space-x-4 cursor-pointer group">
					<Image src="/kns_logo_rect.png" alt="KNS Entertainment" width={200} height={200} className="w-auto h-12 md:h-16 rounded-md bg-slate-200 group-hover:bg-slate-100" />
					<span className={`hidden text-2xl font-bold text-primary ${isScrolled ? "text-black " : "text-slate-200"}`}>KNS Entertainment</span>
				</Link>

				<div className="flex gap-6 items-center">
					<nav className="hidden md:flex items-center space-x-6">
						<Link href="/" className={`border-b border-transparent hover:border-b hover:scale-110 ${isScrolled ? "text-black " : "text-slate-200 hover:text-slate-200"}`}>
							<Home />
						</Link>
						<Link href="/gallery" className={`border-b border-transparent hover:border-b hover:border-b-red-700 ${isScrolled ? "text-black " : "text-slate-200 hover:text-slate-200"}`}>
							Project Gallery{" "}
						</Link>
						<Link href="/blog" className={`border-b border-transparent hover:border-b hover:border-b-red-700 ${isScrolled ? "text-black " : "text-slate-200 hover:text-slate-200"}`}>
							Blog{" "}
						</Link>
						<Link href="/about-us" className={`border-b border-transparent hover:border-b hover:border-b-red-700 ${isScrolled ? "text-black " : "text-slate-200 hover:text-slate-200"}`}>
							About Us
						</Link>
						<Link href="/about-us" className={`border-b border-transparent hover:border-b hover:border-b-red-700 ${isScrolled ? "text-black " : "text-slate-200 hover:text-slate-200"}`}>
							Contact Us
						</Link>

						{isModalOpen && <SearchModal closeModal={closeModal} />}
						{/* <Link href="europe-tour" className={`border-b bg-red-700 rounded-full py-2 px-6 border-transparent hover:border-b hover:border-b-red-700 ${isScrolled ? "text-white" : "text-slate-200 hover:text-slate-200"}`}>
							Europe Tour
						</Link> */}
					</nav>
					<button onClick={openModal} className="hidden md:block border-b border-transparent hover:border-b hover:scale-110">
						<span className={`border-b border-transparent hover:border-b hover:border-b-red-700 ${isScrolled ? "text-black " : "text-slate-200 hover:text-slate-200"}`}>
							<Search />
						</span>
					</button>
					<SearchBox handleSearch={undefined} isScrolled={undefined} />
				</div>

				<div className="flex gap-6 items-center">
					<Link href="/" className={`border-b border-transparent hover:border-b hover:scale-110 ${isScrolled ? "text-black " : "text-slate-200 hover:text-slate-200"}`}>
						<Facebook />
					</Link>
					<Link href="/" className={`border-b border-transparent hover:border-b hover:scale-110 ${isScrolled ? "text-black " : "text-slate-200 hover:text-slate-200"}`}>
						<Instagram />
					</Link>
					<div className="relative p-1">
						<ShoppingCart className={`h-6 w-6 transition-colors ${isScrolled ? "text-black" : "text-slate-200"}`} />
						<span className="absolute top-1 right-0 bg-red-600 text-white text-xs font-semibold rounded-full h-4 w-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">0</span>
						<span className={`absolute bottom-0 -right-8 text-lg font-semibold ${isScrolled ? "text-black" : "text-slate-200"}`}>$0</span>
					</div>

					<div className="md:hidden cursor-pointer ml-6" onClick={toggleMenu}>
						{isMenuOpen ? <X className={`${isScrolled ? "text-black " : "text-slate-200"}`} style={{ height: "32px", width: "32px" }} /> : <Menu className={`${isScrolled ? "text-black " : "text-slate-200"}`} style={{ height: "32px", width: "32px" }} />}
					</div>
				</div>
			</div>
			{isMenuOpen && (
				<motion.div className="md:hidden bg-red-700" initial={{ opacity: 0, x: 400 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 400 }} transition={{ duration: 0.3 }}>
					<div className="fixed right-0 w-48 bg-red-700">
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

							<NavLink href="/europe-tour" onClick={toggleMenu}>
								Europe Tour
							</NavLink>
						</nav>
					</div>
				</motion.div>
			)}
		</motion.header>
	);
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
	return (
		<a href={href} className="text-gray-300 hover:bg-slate-100 w-full text-center hover:text-red-600 transition-colors duration-300 py-2" onClick={onClick}>
			{children}
		</a>
	);
}
