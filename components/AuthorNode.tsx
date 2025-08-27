import React from "react";
import { Author } from "../app/types/author";

export type AuthorNodeProps = {
  author: Author;
  x: number;
  y: number;
  isCentral?: boolean;
  onClick?: (id: string) => void;
};

const AuthorNode: React.FC<AuthorNodeProps> = ({
  author,
  x,
  y,
  isCentral = false,
  onClick,
}) => (
  <div
    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
    style={{
      left: `${x}px`,
      top: `${y}px`,
      fontWeight: isCentral ? "bold" : "normal",
    }}
    onClick={() => onClick?.(author.id)}
    aria-label={`Author: ${author.name}`}
  >
    {author.name}
  </div>
);

export default AuthorNode;
