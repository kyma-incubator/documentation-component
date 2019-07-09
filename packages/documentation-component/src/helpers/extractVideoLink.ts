export const extractVideoLink = (link: string) => {
  const re = new RegExp(`\(\.\*\):\(\.\*\)`, "i");
  const processValue = link.match(re);

  if (processValue && processValue.length === 3) {
    const type = processValue[1];
    const url = processValue[2].trim();

    return [url, type];
  }
  return null;
};
