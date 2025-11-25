export const toHtmlList = (text) => {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");
  return `<ul>${lines.map((line) => `<li>${line}</li>`).join("")}</ul>`;
};
