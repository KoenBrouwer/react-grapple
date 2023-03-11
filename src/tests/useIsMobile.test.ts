import {renderHook} from "@testing-library/react";
import useIsMobile, {DEFAULT_BREAKPOINT} from "../hooks/useIsMobile";

interface Window {
	innerWidth: number;
}

// Can't get this to work with Jest for now.
xdescribe("useIsMobile", () => {
	it("returns true when window width is less than default breakpoint", () => {
		const {result} = renderHook(() => useIsMobile());
		window.innerWidth = DEFAULT_BREAKPOINT - 1;
		window.dispatchEvent(new Event("resize"));
		expect(result.current).toBe(true);
	});

	it("returns false when window width is greater than or equal to default breakpoint", () => {
		const {result} = renderHook(() => useIsMobile());
		window.innerWidth = DEFAULT_BREAKPOINT;
		window.dispatchEvent(new Event("resize"));
		expect(result.current).toBe(false);
	});

	it("accepts a custom breakpoint", () => {
		const {result} = renderHook(() => useIsMobile(800));
		window.innerWidth = 799;
		window.dispatchEvent(new Event("resize"));
		expect(result.current).toBe(true);
		window.innerWidth = 800;
		window.dispatchEvent(new Event("resize"));
		expect(result.current).toBe(false);
	});
});
