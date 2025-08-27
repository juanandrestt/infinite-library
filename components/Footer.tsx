import Link from "next/link";

export default function Footer() {
  return (
    <footer className="absolute right-8 bottom-4 flex flex-col">
      <Link href="/about">about</Link>
      <Link href="https://www.juantrujillo.world">by Juan Trujillo</Link>
    </footer>
  );
}
