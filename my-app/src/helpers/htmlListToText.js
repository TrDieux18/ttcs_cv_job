export const htmlListToText = (html) => {
  if (!html) return "";

  const matches = html.match(/<li>(.*?)<\/li>/g);

  if (!matches) return "";

  return matches.map((li) => li.replace(/<\/?li>/g, "")).join("\n");
};
