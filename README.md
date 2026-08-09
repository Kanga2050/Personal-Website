# Universe

A personal site laid out as a graph. Each section is a node; moving between
them is navigating the graph, either through the page content or through the
site map in the top-right corner.

Built with React, Vite and Framer Motion.

## Getting started

```bash
npm install
npm start      # http://localhost:3000
npm test       # unit + graph-integrity tests
npm run build  # production bundle into dist/
```

## How it is put together

### Content is data, not components

Every page's copy lives in [`src/data/site.js`](src/data/site.js) as one map
keyed by node id. A node is either a **collection** (a hub listing other nodes)
or a **detail** (a write-up), and both render through a single generic
component. Adding a page means adding an entry to that map — there is no
per-page component to copy.

```js
'my-project': {
  kind: 'detail',
  title: 'My Project',
  short: 'Project',        // label used in the site map
  theme: 'projects',       // accent ramp, see src/theme/themes.js
  icon: 'printer',         // glyph, see src/components/Icon.jsx
  tagline: 'One line of what it is.',
  status: 'Prototype',
  parent: 'projects',
  sections: [
    { heading: 'Overview', body: ['…'] },
    { heading: 'Key features', list: ['…'] },
    { heading: 'Specifications', specs: [['Label', 'Value']] },
  ],
}
```

Then add the id to its parent's `items` array and to the matching level in the
`graph` export below it. `npm test` fails if a node is orphaned, if a
collection links to something that does not exist, or if a detail page points
at a missing parent.

### Theming

A theme is a two-stop accent ramp defined in
[`src/theme/themes.js`](src/theme/themes.js). `<Page>` publishes the active
theme as the `--accent` / `--accent-2` custom properties on `:root`, so the
background wash, cards, buttons and the fixed navigation chrome all tint
together. Everything else — surfaces, borders, type — is shared and lives in
[`src/index.css`](src/index.css).

### Motion

One easing curve and three durations, exported from
[`src/motion.js`](src/motion.js) and mirrored as CSS custom properties.
Pages crossfade; content inside them staggers in. Everything collapses under
`prefers-reduced-motion`.

### Navigation

[`src/App.jsx`](src/App.jsx) holds two pieces of state: the current node and
the path of ancestor levels. `navigate(id)` resolves the shallowest graph level
containing the target, so a link never needs to know which level it is on. The
site map can additionally descend into a hub's own level, or step back out.

## Layout

```
src/
  App.jsx              navigation state and page selection
  motion.js            shared easing and durations
  index.css            design system
  data/site.js         all page content + the navigation graph
  theme/themes.js      accent ramps
  components/          Page, NavMap, Icon, Starfield, ErrorBoundary
  pages/               Start, Universe, Memories, Collection, Detail
```
