export default function Footer() {
	return (
		<footer className="bg-gray-900 text-white py-12">
			<div className="container mx-auto px-4">
				{/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="max-w-sm">
						<h3 className="text-xl font-bold mb-4">KNS Entertainment</h3>
						<p className="text-gray-400">Bringing Nepalese culture to Europe through unforgettable events and performances.</p>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">Quick Links</h4>
						<ul className="space-y-2">
							<li>
								<a href="#events" className="text-gray-400 hover:text-white transition-colors">
									Events
								</a>
							</li>
							<li>
								<a href="#about" className="text-gray-400 hover:text-white transition-colors">
									About Us
								</a>
							</li>
							<li>
								<a href="#artists" className="text-gray-400 hover:text-white transition-colors">
									Artists
								</a>
							</li>
							<li>
								<a href="#contact" className="text-gray-400 hover:text-white transition-colors">
									Contact
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h4 className="text-lg font-semibold mb-4">Follow Us</h4>
						<div className="flex space-x-4">
							<a href="#" className="text-gray-400 hover:text-white transition-colors">
								<Facebook className="h-6 w-6" />
							</a>
							<a href="#" className="text-gray-400 hover:text-white transition-colors">
								<Instagram className="h-6 w-6" />
							</a>
							<a href="#" className="text-gray-400 hover:text-white transition-colors">
								<Twitter className="h-6 w-6" />
							</a>
							<a href="#" className="text-gray-400 hover:text-white transition-colors">
								<Youtube className="h-6 w-6" />
							</a>
						</div>
					</div>
				</div> */}
				<div className="pt-8 border-t border-gray-800 text-center text-gray-400">
					<p>&copy; {new Date().getFullYear()} KNS Entertainment. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
}
