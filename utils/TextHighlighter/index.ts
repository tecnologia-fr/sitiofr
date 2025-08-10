import React from "react";

/**
 * Highlights text based on bracket patterns:
 * - Single brackets {text} -> <span className="font-bold">text</span>
 * - Double brackets {{text}} -> <span className="font-bold underline-z">text</span>
 */
export function textHighlighter(text: string): React.ReactNode {
  if (!text) return text;

  // First, handle double brackets {{text}} - bold and Z-shaped underline with destacado color
  let processedText = text.replace(
    /\{\{([^}]+)\}\}/g,
    '<span className="font-bold underline decoration-destacado">$1</span>'
  );

  // Then, handle single brackets {text} - bold only
  processedText = processedText.replace(
    /\{([^}]+)\}/g,
    '<span className="font-bold">$1</span>'
  );

  // Parse the HTML-like string and convert to React elements
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;

  // Find all span tags
  const spanRegex = /<span className="([^"]+)">([^<]+)<\/span>/g;
  let match;

  while ((match = spanRegex.exec(processedText)) !== null) {
    // Add text before the span
    if (match.index > currentIndex) {
      parts.push(processedText.slice(currentIndex, match.index));
    }

    // Add the span element
    const className = match[1];
    const content = match[2];
    parts.push(
      React.createElement("span", { className, key: currentIndex }, content)
    );

    currentIndex = match.index + match[0].length;
  }

  // Add remaining text after the last span
  if (currentIndex < processedText.length) {
    parts.push(processedText.slice(currentIndex));
  }

  // If no spans were found, return the original text
  if (parts.length === 0) {
    return text;
  }

  return parts;
}
