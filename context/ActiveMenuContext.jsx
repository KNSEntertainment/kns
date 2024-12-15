"use client";

import React, { createContext, useContext, useState } from "react";

const ActiveMenuContext = createContext({
	activeMenu: "gurungknsadmin1234",
	setActiveMenu: (menu) => {},
});

export const useActiveMenu = () => useContext(ActiveMenuContext);

export const ActiveMenuProvider = ({ children }) => {
	const [activeMenu, setActiveMenu] = useState("gurungknsadmin1234");

	return <ActiveMenuContext.Provider value={{ activeMenu, setActiveMenu }}>{children}</ActiveMenuContext.Provider>;
};

// "use client";

// import React, { createContext, useContext, useState, useEffect } from "react";
// import { usePathname } from "next/navigation";

// const ActiveMenuContext = createContext();

// export const ActiveMenuProvider = ({ children }) => {
// 	const pathname = usePathname();
// 	const [activeMenu, setActiveMenu] = useState("gurungknsadmin1234");

// 	useEffect(() => {
// 		// Extract the menu ID from the pathname
// 		const pathSegments = pathname.split("/");
// 		if (pathSegments.includes("gurungknsadmin1234")) {
// 			setActiveMenu(pathSegments[pathSegments.length - 1] || "gurungknsadmin1234");
// 		}
// 	}, [pathname]);

// 	return <ActiveMenuContext.Provider value={{ activeMenu, setActiveMenu }}>{children}</ActiveMenuContext.Provider>;
// };

// export const useActiveMenu = () => useContext(ActiveMenuContext);
