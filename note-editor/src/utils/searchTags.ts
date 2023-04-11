
const regex = /(#(?! )[|$\!\?a-zA-Z0-9_-]*)/g

export function searchTags(text: string): string[] {
  return [...new Set(text.split(regex).filter((el)=> el.match(regex)))]
}