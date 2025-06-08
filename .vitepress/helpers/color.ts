function getHsla(hue: number, opacity: number | string = 1): string {
  return `hsla(${hue}, 40%, 70%, ${opacity})`;
}

const predefinedColorMap: Readonly<Record<string, string>> = {
  html: "#e34c26",
  npm: "#cc3534",
  pinia: "#ffdc67",
  typescript: "#0086e0",
  vite: "#9499ff",
  vue: "#41b883"
};

export function composeHashColorFromString(name: string): string {
  const mapKey = Object.keys(predefinedColorMap).find((key) => name.includes(key));
  if (mapKey) return predefinedColorMap[mapKey];

  let hash = 0;
  for (let i = 0; i < name.length; i++) { hash = name.charCodeAt(i) + ((hash << 5) - hash); }
  return getHsla(hash % 360);
}
