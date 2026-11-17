"use client";

import React from "react";

interface RichTextProps {
  text: string;
  onOpenPop: (code: string) => void;
}

function decodeEntities(input: string): string {
  return input
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
}

const TOKEN_PATTERN =
  /<(strong|em|kbd)>([\s\S]*?)<\/\1>|<code\s+class="inline-code">([\s\S]*?)<\/code>|<pop\s+code="([^"]+)">([\s\S]*?)<\/pop>/g;

export function RichText({ text, onOpenPop }: RichTextProps) {
  const nodes: React.ReactNode[] = [];
  const regex = new RegExp(TOKEN_PATTERN.source, "g");
  let lastIndex = 0;
  let keyCounter = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;

    if (matchIndex > lastIndex) {
      nodes.push(decodeEntities(text.slice(lastIndex, matchIndex)));
    }

    const simpleTag = match[1];
    const simpleContent = match[2];
    const codeContent = match[3];
    const popCode = match[4];
    const popLabel = match[5];

    const key = `rt-${keyCounter++}`;

    if (simpleTag === "strong") {
      nodes.push(<strong key={key}>{decodeEntities(simpleContent)}</strong>);
    } else if (simpleTag === "em") {
      nodes.push(<em key={key}>{decodeEntities(simpleContent)}</em>);
    } else if (simpleTag === "kbd") {
      nodes.push(<kbd key={key}>{decodeEntities(simpleContent)}</kbd>);
    } else if (codeContent !== undefined) {
      nodes.push(
        <code key={key} className="inline-code">
          {decodeEntities(codeContent)}
        </code>
      );
    } else if (popCode !== undefined) {
      nodes.push(
        <button
          key={key}
          type="button"
          onClick={() => onOpenPop(popCode)}
          className="text-crimson font-bold underline hover:text-crimson-dark transition"
        >
          {decodeEntities(popLabel)}
        </button>
      );
    }

    lastIndex = matchIndex + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(decodeEntities(text.slice(lastIndex)));
  }

  return <>{nodes}</>;
}
