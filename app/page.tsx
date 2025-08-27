"use client";

import { useRouter } from "next/navigation";
import { Author } from "./types";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import SearchBar from "../components/SearchBar";
import Background from "@/components/Background";

export default function HomePage() {
  const router = useRouter();

  function handleAuthorSelect(author: Author) {
    router.push(`/${author.id}`);
  }

  return (
    <>
      <Background />
      <Header />
      <Main>
        <SearchBar onSelect={handleAuthorSelect} />
      </Main>
      <Footer />
    </>
  );
}
