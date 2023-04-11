

export function hasArray<T>(sourceArr: T[], checkedArr: T[]): boolean {
  // new Set([...note.tags, ...selectValue.map(el => el.label)]).size === note.tags.length
  return new Set([...sourceArr, ...checkedArr]).size === sourceArr.length
}