export const truncate = (str, no_words) => {
  return str !== ""
    ? str.split(" ").splice(0, no_words).join(" ") + "...."
    : "";
};
