import { catalog, catalogBySlug, categories } from "../src/catalog.ts"

const slugs = catalog.map(({ slug }) => slug)
const invalid = catalog.filter((entry) => !categories.includes(entry.category))

if (catalog.length !== 63) throw new Error(`Expected 63 catalog entries, received ${catalog.length}`)
if (new Set(slugs).size !== 63) throw new Error("Catalog slugs must be unique")
if (catalogBySlug.size !== 63) throw new Error("Slug index is incomplete")
if (invalid.length) throw new Error(`Unknown categories: ${invalid.map(({ slug }) => slug).join(", ")}`)

console.log("shadcn catalog coverage: 63/63")
