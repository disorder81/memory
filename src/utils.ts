// Thanks lodash
export function shuffle<T>(array: Array<T>) {
  const length = array == null ? 0 : array.length;
  if (!length || typeof array === 'string') {
    return [];
  }
  let index = -1;
  const lastIndex = length - 1;
  const result = array.slice(0);
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1));
    const value = result[rand];
    result[rand] = result[index];
    result[index] = value;
  }
  return result;
}
