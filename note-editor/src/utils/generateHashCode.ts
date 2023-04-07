

export const generateHashCode = function (string: string): number {
  let hash = 0, chr;
  if (string.length === 0)
    return hash;
  for (let i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
    return hash;
  }
  return 0;
};
