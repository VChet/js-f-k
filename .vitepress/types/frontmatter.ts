export interface Frontmatter {
  [key: string]: any
  title: string
  description: string
  author: string | string[]
  tags: string[]
  discussionId?: number
  date?: string
  publish?: false
  hero?: string
}
