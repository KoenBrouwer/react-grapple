import {act, renderHook} from '@testing-library/react-hooks'
import useConditionalByTime from "./useConditionalByTime";
import React from 'react';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Mockdate from "mockdate";

configure({adapter: new Adapter()});

test("Should only render Before component when we're past the date", () => {
	const dateBeforeNow = new Date();
	dateBeforeNow.setHours(dateBeforeNow.getHours() - 24);

	const {result} = renderHook(() => useConditionalByTime(dateBeforeNow));

	const [Before, After] = result.current;

	const before = shallow(<Before><p>beforeElement</p></Before>);
	const after = shallow(<After><p>afterElement</p></After>);

	expect(before.html()).toBe("");
	expect(after.html()).toBe("<p>afterElement</p>");
});

test("Should only render After component when we're not yet past the date", () => {
	const dateAfterNow = new Date();
	dateAfterNow.setHours(dateAfterNow.getHours() + 24);

	const {result} = renderHook(() => useConditionalByTime(dateAfterNow));

	const [Before, After] = result.current;

	const before = shallow(<Before><p>beforeElement</p></Before>);
	const after = shallow(<After><p>afterElement</p></After>);

	expect(before.html()).toBe("<p>beforeElement</p>");
	expect(after.html()).toBe("");
});

test("Should hide <Before/> and make <After/> visible when we get past the date in realtime mode", () => {
	jest.useFakeTimers();
	Mockdate.set(new Date("2020-01-01 00:00:00"));

	let Before, After, renderedBefore, renderedAfter;

	/* Construct a date one hour from now. */
	const dateAfterNow = new Date();
	dateAfterNow.setHours(dateAfterNow.getHours() + 1);

	/* Render both the components that come from the hook */
	const {result} = renderHook(() => useConditionalByTime(dateAfterNow, true));
	[Before, After] = result.current;
	renderedBefore = shallow(<Before><p>beforeElement</p></Before>);
	renderedAfter = shallow(<After><p>afterElement</p></After>);

	expect(renderedBefore.html()).toBe("<p>beforeElement</p>");
	expect(renderedAfter.html()).toBe("");

	/* Let the timers tick once. */
	act(() => {
		jest.advanceTimersToNextTimer();
	});

	/* Now nothing should change */
	[Before, After] = result.current;
	renderedBefore = shallow(<Before><p>beforeElement</p></Before>);
	renderedAfter = shallow(<After><p>afterElement</p></After>);

	expect(renderedBefore.html()).toBe("<p>beforeElement</p>");
	expect(renderedAfter.html()).toBe("");

	/* Advance time by 2 hours  ------------ ▼ */
	Mockdate.set(new Date("2020-01-01 02:00:00"));

	/* And let the timers tick once again. */
	act(() => {
		jest.advanceTimersToNextTimer();
		jest.advanceTimersToNextTimer();
	});

	[Before, After] = result.current;
	renderedBefore = shallow(<Before><p>beforeElement</p></Before>);
	renderedAfter = shallow(<After><p>afterElement</p></After>);

	/* Now it should have changed */
	expect(renderedBefore.html()).toBe("");
	expect(renderedAfter.html()).toBe("<p>afterElement</p>");
});

test("Should not hide <Before/> and make <After/> visible when we get past the date when not in realtime mode", () => {
	jest.useFakeTimers();
	Mockdate.set(new Date("2020-01-01 00:00:00"));

	let Before, After, renderedBefore, renderedAfter;

	/* Construct a date one hour from now. */
	const dateAfterNow = new Date();
	dateAfterNow.setHours(dateAfterNow.getHours() + 1);

	/* Render both the components that come from the hook (realtime mode off) ------------- ▼ */
	const {result} = renderHook(() => useConditionalByTime(dateAfterNow, false));
	[Before, After] = result.current;
	renderedBefore = shallow(<Before><p>beforeElement</p></Before>);
	renderedAfter = shallow(<After><p>afterElement</p></After>);

	expect(renderedBefore.html()).toBe("<p>beforeElement</p>");
	expect(renderedAfter.html()).toBe("");

	/* Let the timers tick once. */
	act(() => {
		jest.advanceTimersToNextTimer();
	});

	/* Now nothing should change */
	[Before, After] = result.current;
	renderedBefore = shallow(<Before><p>beforeElement</p></Before>);
	renderedAfter = shallow(<After><p>afterElement</p></After>);

	expect(renderedBefore.html()).toBe("<p>beforeElement</p>");
	expect(renderedAfter.html()).toBe("");

	/* Advance time by 2 hours  ------------ ▼ */
	Mockdate.set(new Date("2020-01-01 02:00:00"));

	/* And let the timers tick once again. */
	act(() => {
		jest.advanceTimersToNextTimer();
		jest.advanceTimersToNextTimer();
	});

	[Before, After] = result.current;
	renderedBefore = shallow(<Before><p>beforeElement</p></Before>);
	renderedAfter = shallow(<After><p>afterElement</p></After>);

	/* Still nothing should have changed because realtime mode is off */
	expect(renderedBefore.html()).toBe("<p>beforeElement</p>");
	expect(renderedAfter.html()).toBe("");
});