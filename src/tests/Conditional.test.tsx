import {render} from "@testing-library/react";
import React from "react";
import Conditional from "../Conditional";

test("Conditional should render when show is true", () => {
	const {container} = render(<Conditional show={true}>
		<p>Test</p>
	</Conditional>);
	expect(container.innerHTML).toEqual("<p>Test</p>");
});

test("Conditional should not render when show is false", () => {
	const {container} = render(<Conditional show={false}>
		<p>Test</p>
	</Conditional>);
	expect(container.innerHTML).toEqual("");
});

test("Conditional should render when show is not passed", () => {
	const {container} = render(<Conditional>
		<p>Test</p>
	</Conditional>);
	expect(container.innerHTML).toEqual("<p>Test</p>");
});
