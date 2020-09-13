import {useEffect, useState} from "react";

const DEFAULT_BREAKPOINT = 650;

const useIsMobile = (breakpoint: number = DEFAULT_BREAKPOINT): boolean => {
	const _isMobile = () => window.innerWidth < breakpoint;
	const [isMobile, setIsMobile] = useState(_isMobile());

	window.onresize = () => setIsMobile(_isMobile());

	useEffect(() => {
		return () => {
			window.onresize = null;
		}
	}, [])

	return isMobile;
};

const useIsMobileOnce = (breakpoint: number = DEFAULT_BREAKPOINT): boolean => {
	return window.innerWidth < breakpoint;
};

export {
	useIsMobileOnce,
	useIsMobile
};
export default useIsMobile;
