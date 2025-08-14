import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "The Infinite Library",
	description: "Every Author in Relation to All Others",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	);
}
