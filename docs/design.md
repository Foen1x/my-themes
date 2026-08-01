# My Themes Design System

## 1. Product Definition

My Themes is a pnpm workspace containing two parallel component theme laboratories:

- `vue`: Vue 3, Element Plus, and Tailwind CSS. Development port: `3201`.
- `shadcn`: Next.js, shadcn/ui conventions, and Tailwind CSS. Development port: `3202`.

The applications are not marketing sites. Their first screen is a usable component catalog dashboard for evaluating themes, component states, responsive behavior, and future UI composition.

## 2. Goals

1. Provide the same five semantic themes in both frameworks.
2. Catalog every component in the official Element Plus and shadcn/ui component indexes.
3. Give every catalog item a stable, directly addressable component page.
4. Show interactive states, variants, theme behavior, and realistic composition patterns.
5. Keep the information architecture aligned across the two applications so Vue and React implementations can be compared directly.
6. Make completeness measurable through catalog manifests and automated checks.

## 3. Workspace Architecture

```text
my-themes/
|-- docs/design.md
|-- package.json
|-- pnpm-workspace.yaml
|-- packages/
|   `-- theme-contract/
|-- vue/
`-- shadcn/
```

The root workspace owns shared scripts and one lockfile. Each application remains independently runnable and deployable.

## 4. Technology Decisions

### Vue Application

- Vue 3 stable, TypeScript strict mode, Composition API, and `<script setup>`.
- Official `create-vue`/Vite scaffolding.
- Vue Router for catalog routes.
- Pinia for theme and catalog preferences.
- Element Plus as the primary component framework. Legacy Element UI is not used because it targets Vue 2.
- Tailwind CSS 4 for application shell layout and catalog-specific utilities.
- Element Plus theme customization is implemented through its CSS variable API, not utility-class overrides of component internals.
- `@element-plus/icons-vue`, VueUse, `unplugin-auto-import`, and `unplugin-vue-components` where they remove real boilerplate.

### shadcn Application

- Next.js 16 App Router, React 19, TypeScript strict mode, and Tailwind CSS 4.
- shadcn/ui component ownership conventions with Base UI primitives and Nova styling direction.
- Server Components for static catalog structure; small Client Components only for interactive examples and browser state.
- `next-themes`, React Hook Form, Zod, TanStack Table, Recharts, Lucide, and date-fns for expected component scenarios.
- Direct imports and route-level code splitting are preferred over large barrel exports.

### Tooling

- pnpm workspace with a pinned package manager version.
- Node.js 22.12 or newer; Node.js 24 LTS is the recommended runtime.
- ESLint, TypeScript checks, Vitest/Testing Library, Playwright, and accessibility checks.

## 5. Information Architecture

Both applications use equivalent routes:

| Route | Purpose |
| --- | --- |
| `/` | Catalog dashboard and representative live previews |
| `/components` | Searchable complete component index |
| `/components/:slug` | Dedicated component page |
| `/themes` | Theme token explorer and palette inspection |
| `/compare` | Side-by-side theme comparison |
| `/patterns` | Composite product patterns |
| `/patterns/:slug` | Dashboard, form, table, feedback, and navigation examples |

Every component page contains:

- Name, category, description, and upstream documentation link.
- A real interactive preview.
- Important variants and component states.
- Theme-sensitive surfaces and status colors.
- Preview/code tabs where a useful code sample exists.
- A focus mode that removes catalog navigation for inspection and screenshots.

## 6. Application Shell

The shell is a quiet, work-focused documentation dashboard:

- Fixed desktop sidebar with grouped component navigation.
- Mobile sidebar drawer with the same navigation hierarchy.
- Compact top bar with search, theme switcher, and framework identity.
- Main content uses open sections, lists, tables, and purpose-built preview frames rather than nested card grids.
- Controls use familiar icons and accessible labels.
- Typography uses Geist Sans with Chinese system fallbacks and Geist Mono for code/data.
- Spacing uses a 4px base unit; component pages are comfortable but information-dense.
- Motion is functional and limited to state transitions between 120ms and 220ms, with reduced-motion support.

## 7. Shared Theme Contract

The reference palette comes from `NexagentPortal/apps/web/src/app/globals.css` and uses OKLCH semantic tokens.

| Theme ID | Display Name | Direction |
| --- | --- | --- |
| `light` | Spring / 春色 | Warm white, green, and gold |
| `morninglight` | Morning Light / 晨光 | White, sky blue, and orange |
| `sunshine` | Sunshine / 阳光 | White, orange, and red |
| `dusk` | Dusk / 暮色 | Ochre, deep blue, and gold |
| `dark` | Night / 夜色 | Blue-black, green, and gold |

Core tokens include:

- Surfaces: `background`, `card`, `popover`, `sidebar`, and overlays.
- Content: `foreground`, muted content, inverse content, and placeholders.
- Actions: `primary`, `secondary`, `accent`, focus ring, and selection.
- Status: `success`, `warning`, `info`, and `destructive`.
- Structure: border, input, radius, and elevation.
- Data: `chart-1` through `chart-5`.

The shared package exports theme metadata and CSS variables. Framework adapters map the contract to shadcn semantic variables and Element Plus `--el-*` variables. A selected theme is applied as a class on the root element, persisted locally, and available through a `theme` query parameter for shareable links.

## 8. Component Coverage

### Element Plus

The Vue catalog targets all 82 entries in the official overview:

- Basic: 12
- Configuration: 1
- Form: 25
- Data: 23
- Navigation: 9
- Feedback: 10
- Others: 2

This includes newer and virtualized components such as Splitter, Input OTP, Input Tag, Mention, Color Picker Panel, Date Picker Panel, Virtualized Select, Virtualized Table, Virtualized Tree, Segmented, and Tour.

### shadcn/ui

The React catalog targets all 63 entries in the current official component directory, including the newer Attachment, Bubble, Marker, Message, Message Scroller, and Toast entries.

Each application has a typed catalog manifest. Automated tests require unique slugs, a valid category, a route, and at least one preview definition for every manifest entry. Target coverage is `82/82` for Vue and `63/63` for shadcn.

## 9. Composite Patterns

Primitive catalogs are supplemented with equivalent composition pages in both applications:

- Analytics dashboard
- Account and notification settings
- Validated profile form
- Searchable and paginated data table
- Authentication form
- Command/search palette
- Loading, empty, error, and success states
- Dialog, drawer, popover, and notification workflows
- Responsive navigation shell

These pages exist to reveal theme behavior that isolated controls cannot show.

## 10. Performance and Accessibility

- Catalog routes are lazy loaded.
- Long component indexes use `content-visibility` and stable preview dimensions.
- Heavy chart, table, calendar, and editor-like examples load only on their routes.
- Theme switching must not cause layout shifts.
- Keyboard navigation, focus visibility, dialog labels, form labels, reduced motion, and color contrast are required.
- Desktop, tablet, and mobile layouts must avoid clipping, incoherent overlap, and horizontal page overflow.

## 11. Verification and Definition of Done

The implementation is complete when:

1. `vue` runs on `http://localhost:3201` and `shadcn` runs on `http://localhost:3202`.
2. Both projects build, lint, and type-check successfully.
3. Component coverage checks report `82/82` and `63/63`.
4. Every component route renders meaningful content without a framework error overlay or console error.
5. All five themes switch immediately and persist after reload.
6. Search, category navigation, focus mode, theme comparison, and representative component interactions work.
7. Browser QA passes at 1440px, 1024px, and 390px widths.
8. Representative screenshots across the five themes show consistent semantic intent in both frameworks.

## 12. Decision Log

| Date | Decision | Rationale |
| --- | --- | --- |
| 2026-08-01 | Use two parallel apps in one pnpm workspace | Shared dependency management without coupling application runtimes |
| 2026-08-01 | Use ports 3201 and 3202 | Predictable simultaneous development |
| 2026-08-01 | Replace Element UI with Element Plus | Vue 3 support and complete current component catalog |
| 2026-08-01 | Use shadcn Base UI with a Nova direction | Matches the current shadcn toolchain and the reference project |
| 2026-08-01 | Share semantic OKLCH tokens through an internal package | Prevents theme drift between Vue and React implementations |
