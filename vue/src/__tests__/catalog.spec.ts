import { describe, expect, it } from 'vitest'
import { vueCatalog, vueCatalogBySlug, vueCategories } from '@/catalog'

describe('Vue component catalog', () => {
  it('covers all 82 Element Plus entries with unique routes', () => {
    const slugs = vueCatalog.map(({ slug }) => slug)

    expect(vueCatalog).toHaveLength(82)
    expect(new Set(slugs).size).toBe(82)
    expect(vueCatalogBySlug.size).toBe(82)
  })

  it('uses known categories and documentation links', () => {
    for (const entry of vueCatalog) {
      expect(vueCategories).toContain(entry.category)
      expect(entry.docsUrl).toMatch(/^https:\/\/element-plus\.org\//)
    }
  })
})
