"use client";
import { useEffect, useState } from "react";

const useFetchData = (apiEndpoint, responseKey = "data") => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!apiEndpoint) return;
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await fetch(apiEndpoint);
				if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
				const result = await res.json();

				setData(result[responseKey] || []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [apiEndpoint, responseKey]);

	return { data, error, loading };
};

export default useFetchData;
