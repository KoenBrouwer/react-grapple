import {DEFAULT_BREAKPOINT} from "./useIsMobile";

const useIsMobileOnce = (breakpoint: number = DEFAULT_BREAKPOINT): boolean => {
	return window.innerWidth < breakpoint;
};

export default useIsMobileOnce;