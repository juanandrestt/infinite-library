import React from "react";

export type AuthorNodeProps = {
	id: string;
	name: string;
	x: number;
	y: number;
	isCentral?: boolean;
	onClick?: (id: string) => void;
};

const AuthorNode: React.FC<AuthorNodeProps> = ({
	id,
	name,
	x,
	y,
	isCentral = false,
	onClick,
}) => (
	<div
		className='absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer'
		style={{
			left: `${x}px`,
			top: `${y}px`,
			fontWeight: isCentral ? "bold" : "normal",
		}}
		onClick={() => onClick?.(id)}>
		{name}
	</div>
);

export default AuthorNode;
