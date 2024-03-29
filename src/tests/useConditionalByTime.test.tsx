import {act, render, renderHook} from "@testing-library/react";
import React from "react";
import useConditionalByTime from "../hooks/useConditionalByTime";

test("Should only render Before component when we're past the date", () => {
	const dateBeforeNow = new Date();
	dateBeforeNow.setHours(dateBeforeNow.getHours() - 24);

	const {result} = renderHook(() => useConditionalByTime(dateBeforeNow));

	const [Before, After] = result.current;

	const before = render(
		<Before>
			<p>beforeElement</p>
		</Before>
	);
	const after = render(
		<After>
			<p>afterElement</p>
		</After>
	);

	expect(before.container.innerHTML).toBe("");
	expect(after.container.innerHTML).toBe("<p>afterElement</p>");
});

test("Should only render After component when we're not yet past the date", () => {
	const dateAfterNow = new Date();
	dateAfterNow.setHours(dateAfterNow.getHours() + 24);

	const {result} = renderHook(() => useConditionalByTime(dateAfterNow));

	const [Before, After] = result.current;

	const before = render(<Before>
		<p>beforeElement</p>
	</Before>);
	const after = render(<After>
		<p>afterElement</p>
	</After>);

	expect(before.container.innerHTML).toBe("<p>beforeElement</p>");
	expect(after.container.innerHTML).toBe("");
});

test("Should hide <Before/> and make <After/> visible when we get past the date in realtime mode", () => {
	jest.useFakeTimers().setSystemTime(new Date("2020-01-01 00:00:00"));

	let Before, After, renderedBefore, renderedAfter;

	/* Construct a date one hour from now. */
	const dateAfterNow = new Date();
	dateAfterNow.setHours(dateAfterNow.getHours() + 1);

	/* Render both the components that come from the hook */
	const {result} = renderHook(() => useConditionalByTime(dateAfterNow, true));
	[Before, After] = result.current;
	renderedBefore = render(<Before>
		<p>beforeElement</p>
	</Before>);
	renderedAfter = render(<After>
		<p>afterElement</p>
	</After>);

	expect(renderedBefore.container.innerHTML).toBe("<p>beforeElement</p>");
	expect(renderedAfter.container.innerHTML).toBe("");

	/* Let the timers tick once. */
	act(() => {
		jest.advanceTimersToNextTimer();
	});

	/* Now nothing should change */
	[Before, After] = result.current;
	renderedBefore = render(<Before>
		<p>beforeElement</p>
	</Before>);
	renderedAfter = render(<After>
		<p>afterElement</p>
	</After>);

	expect(renderedBefore.container.innerHTML).toBe("<p>beforeElement</p>");
	expect(renderedAfter.container.innerHTML).toBe("");

	/* Advance time by 2 hours  ------------ ▼ */
	jest.setSystemTime(new Date("2020-01-01 02:00:00"));

	/* And let the timers tick once again. */
	act(() => {
		jest.advanceTimersToNextTimer();
		jest.advanceTimersToNextTimer();
	});

	[Before, After] = result.current;
	renderedBefore = render(<Before>
		<p>beforeElement</p>
	</Before>);
	renderedAfter = render(<After>
		<p>afterElement</p>
	</After>);

	/* Now it should have changed */
	expect(renderedBefore.container.innerHTML).toBe("");
	expect(renderedAfter.container.innerHTML).toBe("<p>afterElement</p>");
});

test("Should not hide <Before/> and make <After/> visible when we get past the date when not in realtime mode", () => {
	jest.useFakeTimers().setSystemTime(new Date("2020-01-01 00:00:00"));

	let Before, After, renderedBefore, renderedAfter;

	/* Construct a date one hour from now. */
	const dateAfterNow = new Date();
	dateAfterNow.setHours(dateAfterNow.getHours() + 1);

	/* Render both the components that come from the hook (realtime mode off) ------------- ▼ */
	const {result} = renderHook(() => useConditionalByTime(dateAfterNow, false));
	[Before, After] = result.current;
	renderedBefore = render(<Before>
		<p>beforeElement</p>
	</Before>);
	renderedAfter = render(<After>
		<p>afterElement</p>
	</After>);

	expect(renderedBefore.container.innerHTML).toBe("<p>beforeElement</p>");
	expect(renderedAfter.container.innerHTML).toBe("");

	/* Let the timers tick once. */
	act(() => {
		jest.advanceTimersToNextTimer();
	});

	/* Now nothing should change */
	[Before, After] = result.current;
	renderedBefore = render(<Before>
		<p>beforeElement</p>
	</Before>);
	renderedAfter = render(<After>
		<p>afterElement</p>
	</After>);

	expect(renderedBefore.container.innerHTML).toBe("<p>beforeElement</p>");
	expect(renderedAfter.container.innerHTML).toBe("");

	/* Advance time by 2 hours  ------------ ▼ */
	jest.setSystemTime(new Date("2020-01-01 02:00:00"));

	/* And let the timers tick once again. */
	act(() => {
		jest.advanceTimersToNextTimer();
		jest.advanceTimersToNextTimer();
	});

	[Before, After] = result.current;
	renderedBefore = render(<Before>
		<p>beforeElement</p>
	</Before>);
	renderedAfter = render(<After>
		<p>afterElement</p>
	</After>);

	/* Still nothing should have changed because realtime mode is off */
	expect(renderedBefore.container.innerHTML).toBe("<p>beforeElement</p>");
	expect(renderedAfter.container.innerHTML).toBe("");
});
