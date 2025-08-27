import Link from "next/link";

export default function About() {
  return (
    <div className="mx-auto flex w-[50%] flex-col p-8">
      <span className="text-justify">
        The Infinite Library interrogates the limits of algorithmic
        recommendation applied to literature. This project, built with Next.js
        and a vector database architecture, reproduces and extends{" "}
        <Link className="underline" href="https://www.literature-map.com/">
          literature-map.com
        </Link>{" "}
        concept by substituting user behavioral data with a{" "}
        <Link
          className="underline"
          href="https://en.wikipedia.org/wiki/Embedding_(machine_learning)"
        >
          vector embeddings
        </Link>{" "}
        system meant to capture <i>similarities</i> between authors. The
        technical principle is simple:{" "}
        <Link
          className="underline"
          href="https://en.wikipedia.org/wiki/Language_model"
        >
          language models
        </Link>{" "}
        transform author information into multidimensional numerical
        representations, enabling the calculation of mathematical proximities
        between writers*. These distances in vector space are then translated
        into recommendations, creating a cartography of literary affinities
        according to the machine.
        <br />
        <br />
        The result produces sometimes surprising connections, and we must be
        clear about what these connections reveal: these links are artificial.
        They proceed from no literary analysis in the traditional sense, rely on
        no knowledge of historical contexts, acknowledged influences, or
        aesthetic debates that actually traverse the works. The algorithm
        operates on linguistic patterns, lexical recurrences, syntactic
        structures, producing associations that say more about the biases of
        training corpora than about genuine literary kinships. Yet these
        mechanical approximations present a singular documentary interest. They
        offer a window into how machines process language, the implicit
        categories they construct, their particular way of <i>reading</i>{" "}
        without understanding.
        <br />
        <br />
        This project therefore explores less literature itself than the
        technical mediations that now interpose between readers and works,
        questioning what we accept to delegate to machines in our relationship
        to culture.
        <br />
        <br />*
        <i className="text-sm">
          Given my humble literary background, I have to admit the calculations
          mentionned were also generated with the help of an LLM.
        </i>
        <br />
        <br />
        Juan Trujillo
      </span>
      <Link
        className="text-start"
        href="https://github.com/juanandrestt/the-infinite-library"
      >
        GitHub
      </Link>
    </div>
  );
}
