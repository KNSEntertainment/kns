"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const ActiveMenuContext = createContext();

export const ActiveMenuProvider = ({ children }) => {
	const pathname = usePathname();
	const [activeMenu, setActiveMenu] = useState("dashboard");

	useEffect(() => {
		// Extract the menu ID from the pathname
		const pathSegments = pathname.split("/");
		if (pathSegments.includes("dashboard")) {
			setActiveMenu(pathSegments[pathSegments.length - 1] || "dashboard");
		}
	}, [pathname]);

	return <ActiveMenuContext.Provider value={{ activeMenu, setActiveMenu }}>{children}</ActiveMenuContext.Provider>;
};

export const useActiveMenu = () => useContext(ActiveMenuContext);