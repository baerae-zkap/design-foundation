/**
 * Expands size abbreviations to full words in token names
 * lg → Large, md → Medium, sm → Small
 * xs → ExtraSmall, xl → ExtraLarge
 * 2xl → 2XLarge, 3xl → 3XLarge
 */
export function expandSize(key: string): string {
  const sizeMap: Record<string, string> = {
    'xs': 'ExtraSmall',
    'sm': 'Small',
    'md': 'Medium',
    'lg': 'Large',
    'xl': 'ExtraLarge',
    '2xl': '2XLarge',
    '3xl': '3XLarge',
  };

  // Check if the key itself is a size abbreviation
  if (sizeMap[key]) {
    return sizeMap[key];
  }

  return key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Formats a token name with prefix and expanded size
 * e.g., formatTokenName('display', 'lg') → 'displayLarge'
 */
export function formatTokenName(prefix: string, key: string): string {
  return `${prefix}${expandSize(key)}`;
}
