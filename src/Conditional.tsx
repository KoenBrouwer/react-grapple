import React from "react";

export type ConditionalProps = {
	children: React.ReactNode,
	show?: boolean
}

export const Conditional: React.FC<ConditionalProps> = ({children, show = true}) => {
	if (!show) {
		return null;
	}

	return <>{children}</>;
};

export default Conditional;
