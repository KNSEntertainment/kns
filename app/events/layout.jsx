import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EventLayout({ children }) {
	return (
		<div className="flex flex-col">
			<Header />
			<main className="mt-20 lg:mt-0">{children}</main>
			<Footer />
		</div>
	);
}
