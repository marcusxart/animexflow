const formatScrapedText = (text: string): string => {
  if (!text) return "";

  return text
    .split(/\n\s*\n/)
    .map((p) =>
      p
        .replace(/[\n\r\t]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
    )
    .filter(Boolean)
    .join("\n\n");
};

export default formatScrapedText;
