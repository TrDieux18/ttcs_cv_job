export const parseHTMLList = (html) => {
  if (!html) return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const items = doc.querySelectorAll("li");
  return Array.from(items).map((item) => item.textContent);
};
