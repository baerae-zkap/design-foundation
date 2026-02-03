/**
 * Expands size abbreviations to full words in token names
 * lg → Large, md → Medium, sm → Small
 * xs → ExtraSmall, xl → ExtraLarge
 * 2xl → 2XLarge, 3xl → 3XLarge
 * t1 → 1, st1 → 1 (title/subtitle numbered variants)
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

  // Handle title variants (t1 → 2XLarge, t2 → ExtraLarge, t3 → Large, t4 → Medium)
  const titleMap: Record<string, string> = {
    't1': '2XLarge',
    't2': 'ExtraLarge',
    't3': 'Large',
    't4': 'Medium',
  };
  if (titleMap[key]) {
    return titleMap[key];
  }

  // Handle subtitle variants (st1 → Large, st2 → Medium, st3 → Small, st4 → ExtraSmall)
  const subtitleMap: Record<string, string> = {
    'st1': 'Large',
    'st2': 'Medium',
    'st3': 'Small',
    'st4': 'ExtraSmall',
  };
  if (subtitleMap[key]) {
    return subtitleMap[key];
  }

  return key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Formats a token name with prefix and expanded size
 * e.g., formatTokenName('display', 'lg') → 'displayLarge'
 * e.g., formatTokenName('title', 't1') → 'title1'
 */
export function formatTokenName(prefix: string, key: string): string {
  return `${prefix}${expandSize(key)}`;
}
