/**
 * @jest-environment jsdom
 */

import {act, renderHook} from '@testing-library/react-hooks'
import useIsMobile from "../hooks/useIsMobile";
import useIsMobileOnce from "../hooks/useIsMobileOnce";

interface Window {
	innerWidth: number
}

const setWindowWidth = (value: number) => {
	// @ts-ignore (window.innerWidth normally is readonly, but for testing we must change it somehow)
	window.innerWidth = value;
}

describe("useIsMobile hook", () => {

	test("Should be false when window innerWidth is above breakpoint", () => {
		setWindowWidth(1920);
		const {result} = renderHook(() => useIsMobile());
		expect(result.current).toBe(false);
	})

	test("Should be true when window innerWidth is above breakpoint", () => {
		setWindowWidth(400);
		const {result} = renderHook(() => useIsMobile());
		expect(result.current).toBe(true);
	})

	test("Should update after resizing the window to below the default threshold of 650", () => {
		setWindowWidth(1920);

		const {result} = renderHook(() => useIsMobile());
		expect(result.current).toBe(false);

		act(() => {
			setWindowWidth(649);
			act(() => {
				window.dispatchEvent(new Event("resize"));
			});
		});

		expect(result.current).toBe(true);

		act(() => {
			setWindowWidth(650);
			act(() => {
				window.dispatchEvent(new Event("resize"));
			});
		});

		expect(result.current).toBe(false);
	});

	test("Should update after resizing the window to below a custom breakpoint", () => {
		setWindowWidth(1920);

		let breakpoint = 250;
		const {result} = renderHook(() => useIsMobile(breakpoint));
		expect(result.current).toBe(false);

		act(() => {
			setWindowWidth(breakpoint - 1);
			act(() => {
				window.dispatchEvent(new Event("resize"));
			});
		});

		expect(result.current).toBe(true);

		act(() => {
			setWindowWidth(breakpoint);
			act(() => {
				window.dispatchEvent(new Event("resize"));
			});
		});

		expect(result.current).toBe(false);
	});

});

describe("useIsMobileOnce hook", () => {

	test("Should be false when window innerWidth is above breakpoint", () => {
		setWindowWidth(1920);
		const {result} = renderHook(() => useIsMobileOnce());
		expect(result.current).toBe(false);
	})

	test("Should be true when window innerWidth is above breakpoint", () => {
		setWindowWidth(400);
		const {result} = renderHook(() => useIsMobileOnce());
		expect(result.current).toBe(true);
	})

	test("Should not update after resizing the window to below the default threshold of 650", () => {
		setWindowWidth(1920);

		const {result} = renderHook(() => useIsMobileOnce());
		expect(result.current).toBe(false);

		act(() => {
			setWindowWidth(649);
			act(() => {
				window.dispatchEvent(new Event("resize"));
			});
		});

		expect(result.current).toBe(false);

		act(() => {
			setWindowWidth(650);
			act(() => {
				window.dispatchEvent(new Event("resize"));
			});
		});

		expect(result.current).toBe(false);
	});

	test("Should not update after resizing the window to below a custom breakpoint", () => {
		setWindowWidth(1920);

		let breakpoint = 250;
		const {result} = renderHook(() => useIsMobileOnce(breakpoint));
		expect(result.current).toBe(false);

		act(() => {
			setWindowWidth(breakpoint - 1);
			act(() => {
				window.dispatchEvent(new Event("resize"));
			});
		});

		expect(result.current).toBe(false);

		act(() => {
			setWindowWidth(breakpoint);
			act(() => {
				window.dispatchEvent(new Event("resize"));
			});
		});

		expect(result.current).toBe(false);
	});

});
