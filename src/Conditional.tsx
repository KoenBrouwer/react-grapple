import React from "react";

interface IConditionalProps {
	children: any,
	show?: boolean
}

export const Conditional = ({children, show = true}: IConditionalProps) => {
	return show ? <>{children}</> : null;
};

export default Conditional;