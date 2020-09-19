import {useState} from "react";
import useEventListener from "./useEventListener";

export const DEFAULT_BREAKPOINT = 650;

export const useIsMobile = (breakpoint: number = DEFAULT_BREAKPOINT): boolean => {
	const isMobileFn = () => window.innerWidth < breakpoint;
	const [isMobile, setIsMobile] = useState<boolean>(isMobileFn());

	useEventListener("resize", () => {
		setIsMobile(isMobileFn());
	});

	return isMobile;
};

export default useIsMobile;
