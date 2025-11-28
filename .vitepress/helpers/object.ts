export const getTypedKeys = Object.keys as <T extends object>(obj: T) => (keyof T)[];
export const getTypedEntries = Object.entries as <T extends object>(obj: T) => [keyof T, T[keyof T]][];
