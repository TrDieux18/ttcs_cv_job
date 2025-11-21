export const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  let words = string.split(" ");
  words =
    words[0].charAt(0).toUpperCase() +
    words[0].slice(1) +
    " " +
    words.slice(1).join(" ");
  return words.trim();
};
