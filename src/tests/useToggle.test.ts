import {act, renderHook} from "@testing-library/react"
import useToggle from "../hooks/useToggle";

test("Should initiate with false as default value", () => {
	const {result} = renderHook(() => useToggle());
	const [state] = result.current;
	expect(state).toBe(false);
})

test("Should initiate with provided value true", () => {
	const {result} = renderHook(() => useToggle(true));
	const [state] = result.current;
	expect(state).toBe(true);
})

test("Should initiate with provided value false", () => {
	const {result} = renderHook(() => useToggle(false));
	const [state] = result.current;
	expect(state).toBe(false);
})

test("Should toggle from false to true", () => {
	const {result} = renderHook(() => useToggle(false));

	let [state, toggleState] = result.current;

	act(() => {
		toggleState();
	});

	[state] = result.current;
	expect(state).toBe(true);
})

test("Should toggle from true to false explicitly", () => {
	const {result} = renderHook(() => useToggle(true));

	let [state, toggleState] = result.current;

	act(() => {
		toggleState(false);
	});

	[state] = result.current;
	expect(state).toBe(false);
})

test("Should toggle from false to true explicitly", () => {
	const {result} = renderHook(() => useToggle(false));

	let [state, toggleState] = result.current;

	act(() => {
		toggleState(true);
	});

	[state] = result.current;
	expect(state).toBe(true);
})
