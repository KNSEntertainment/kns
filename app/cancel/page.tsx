import Link from "next/link";

export default function CancelPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md text-center">
				<h1 className="text-2xl font-bold mb-4 text-red-600">Payment Cancelled</h1>
				<p className="mb-4">Your payment was cancelled. No charges were made.</p>
				<Link href="/" className="text-blue-500 hover:underline">
					Return to Home
				</Link>
			</div>
		</div>
	);
}
