export interface AuthorData {
  name: string
  avatar: string
  url: string
}
export const authorsData: ReadonlyMap<string, AuthorData> = new Map([
  ["vchet", { name: "VChet", avatar: "https://github.com/VChet.png", url: "https://github.com/VChet" }],
  ["rudnovd", { name: "rudnovd", avatar: "https://github.com/rudnovd.png", url: "https://github.com/rudnovd" }]
]);
