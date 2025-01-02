import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function EventLayout({ children }) {
	return (
		<div className="flex flex-col">
			<Header />
			<main className="my-24 md:my-32 lg:my-40">{children}</main>
			<Footer />
		</div>
	);
}
