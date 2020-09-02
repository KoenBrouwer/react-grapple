import React from 'react';
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Conditional from "../Conditional";

configure({adapter: new Adapter()});

test("Conditional should render when show is true", () => {
	const result = shallow(<Conditional show={true}><p>Test</p></Conditional>);
	expect(result.html()).toEqual("<p>Test</p>");
});

test("Conditional should not render when show is false", () => {
	const result = shallow(<Conditional show={false}><p>Test</p></Conditional>);
	expect(result.html()).toEqual(null);
});

test("Conditional should render when show is not passed", () => {
	const result = shallow(<Conditional><p>Test</p></Conditional>);
	expect(result.html()).toEqual("<p>Test</p>");
});