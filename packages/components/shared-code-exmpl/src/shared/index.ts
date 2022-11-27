const iconsCache = new Map<string, string>();

export function loadIcon(icon: string) {
  const cachedIcon = iconsCache.get(icon);
  if (!cachedIcon) {
    const loadedIcon = require(`./${icon}-svgrepo-com.svg`);
    iconsCache.set(icon, loadedIcon);
    return loadedIcon;
  }
  return cachedIcon;
}
