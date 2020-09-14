import {useEffect, useState} from "react";

export const DEFAULT_BREAKPOINT = 650;

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


export default useIsMobile;
