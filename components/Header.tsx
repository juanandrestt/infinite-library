export default function Header() {
  return (
    <header
      className="absolute top-36 left-1/2 z-10 -translate-x-1/2 border border-black px-6 py-4"
      style={{ background: "var(--background)" }}
    >
      <h1 className="text-4xl font-bold">The Infinite Library</h1>
    </header>
  );
}
