export default function Main({ children }: { children: React.ReactNode }) {
	return (
		<main className='relative min-h-screen flex flex-col items-center justify-center'>
			{children}
		</main>
	);
}
