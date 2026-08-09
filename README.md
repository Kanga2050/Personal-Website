# Shaurya Chauhan

A personal site built as a watercolour painting you can walk around in.

The landing view is a landscape, and the navigation is the scenery: a
farmhouse, a radio tower, a great tree and a stone lantern standing on parallax
hills under a cerulean sky that warms to pink at the horizon. The sun and moon
share one arc — clicking either turns the whole scene over, and the light
interpolates rather than switching.

Each section is the place its subject happens. The workshop is a bench with a
pegboard over it; the field notes are the inside of a treehouse; the code is a
loft full of paper. Every room is lit through a window, and that window is
where the sun and the moon are from inside.

Every mark on the site is drawn here, in paths and SVG filters. Nothing is
traced, photographed or generated, so there is no third-party asset with a
licence attached to it.

Built with React, Vite and Framer Motion.

## Getting started

```bash
npm install
npm start      # http://localhost:3000
npm test       # unit + content-integrity tests
npm run build  # production bundle into dist/
```

## Filling in the media

Every image, render, video and animation slot is already laid out and labelled
with what belongs there. They live in
[`src/data/site.js`](src/data/site.js) as `media`, `hero` and `portrait`
entries:

```js
hero: {
  kind: 'photo',                // 'photo' | 'video' | 'animation'
  note: 'Hero — printer three-quarter view, gantry and trunnion visible',
}
```

`npm test` checks that every slot declares a valid kind and a real caption.
To fill one in, replace the placeholder render in
[`src/components/Media.jsx`](src/components/Media.jsx) with the real asset —
the surrounding layout does not need to change.

## How it is put together

### Content is data, not components

All page copy lives in [`src/data/site.js`](src/data/site.js) as one map keyed
by node id. A node is a **section** (a hub listing what is below it), a
**project** (a write-up) or the single **about** page, and each kind renders
through one generic component. Adding a project means adding an entry, listing
its id in the parent's `items`, and adding it to the matching level of the
`graph` export. The tests fail if a node is orphaned or a link points at
nothing.

### Watercolour

[`src/scene/Paint.jsx`](src/scene/Paint.jsx) holds the paint box: a set of SVG
filters, mounted once at the root and referenced by id from every scene. Three
things separate a wash from a flat vector fill, and each is a stage in those
filters — the **bleed**, where water carries pigment past the outline you drew;
the **granulation**, where it settles into the tooth of the paper; and the
**pooling**, where it dries darker at the edge of a wet area.

All three are applied to geometry that holds still. Parallax and sway move a
wrapper's transform, never the filtered content, so a filter rasterises once
and is afterwards only a cached bitmap being moved around. Anything that does
animate — smoke, falling leaves, a beacon — is deliberately left outside the
filtered group.

On top of everything sits the paper itself: a multiply-blended noise sheet, so
the flat regions between the painted elements get the same tooth the washes do.
At night it switches to `overlay`, since multiplying onto a dark ground only
ever goes blacker.

### Wind

[`src/scene/Wind.jsx`](src/scene/Wind.jsx) publishes one gust for the whole
site, sampled at four lags.

Giving each leaf its own loop with its own duration is what makes a hedge look
like a screensaver: neighbours drift out of step and the mass never moves as a
mass. Real wind arrives as a front. Everything sharing a channel therefore
waves in phase, and channels differ only in how far behind the gust they sit —
so leaves lead, the limb they hang from lags, and a tree canopy on the near
hill answers at the same moment as the grass under it. Amplitude is the
caller's business, which is what lets one gust move a branch hard and the far
tree-line barely at all.

### Rooms

[`src/scene/Interior.jsx`](src/scene/Interior.jsx) builds each room from the
same five planes the landscape uses — wall, window, wall furniture, work
surface, near props — so the parallax, the wind and the filters carry straight
over and an interior page still moves the way the hills do. A project inherits
its section's room.

The window is the light source and the only control in there, which is why
every shaded face in every room is on the right. On a narrow screen it becomes
a clerestory across the top: a window in the corner would land on the pegboard
once the room is cropped that hard.

### Day and night

[`src/theme/palette.js`](src/theme/palette.js) holds two complete palettes and
writes the active one to `<html>` as custom properties. Because those feed
ordinary `color` / `background-color` / `fill` declarations, the long global
transition in [`src/index.css`](src/index.css) interpolates them — that is the
sunset. The sky itself is two stacked paintings that cross-fade, since CSS
gradients cannot interpolate, and the sun and moon sit half a turn apart on a
single rotating arc so one always rises as the other sets. Seen from indoors,
the same pair share the corner of a windowpane: one climbs out of frame as the
other rises into it.

Every landmark re-lights with the palette: cottage windows and the lantern come
on at night, the tower beacon gains a pulse, pollen becomes fireflies.

### Depth

Three mechanisms stack up, and every page uses all three.

[`src/scene/Parallax.jsx`](src/scene/Parallax.jsx) publishes a smoothed pointer
offset and the scroll position from a single listener. Each `<Layer depth>`
shifts by its own depth, so distant ridges barely move and the foreground
travels furthest. Landmarks share the depth of the band they stand on, which
keeps them planted on their hill. `scroll` scales how much the page's own
scrolling sinks a layer — near zero for anything that frames the viewport.

[`src/scene/Foreground.jsx`](src/scene/Foreground.jsx) is the plane in front of
the reader outdoors: a leafy branch in the top corner, broad-leaved plants in
the bottom ones, and leaves blowing through. It is drawn *over* the content, so
text passes behind it. Indoors the room draws its own near plane instead,
standing on the bench.

[`src/scene/Reveal.jsx`](src/scene/Reveal.jsx) moves content on the z axis. The
deck in [`Page`](src/components/Page.jsx) carries a perspective, so a `<Reveal>`
block genuinely swings up out of the depth of the scene as it enters the
viewport rather than sliding, and `<Drift>` separates neighbouring blocks into
planes as you scroll.

### Navigation

The map in the top-right corner is a graph: the current node at the centre,
everything reachable from it in orbit. Every node is one tap that travels
there. A section carries its own level with it — arriving at Workshop *is*
opening Workshop — so there is no separate gesture for stepping in or out.
Nodes that carry a level are ringed with three dots.

Day and night belong to the sky, not to the map: click the sun or the moon.

## Layout

```
src/
  App.jsx                 navigation state and page selection
  index.css               design system
  data/site.js            all page content + the navigation graph
  theme/palette.js        day and night palettes
  scene/                  Paint, Wind, Parallax, Scene, Interior,
                          Landmarks, Foreground, Reveal, Motes
  components/             NavigationMenu, Page, Media, Icon
  pages/                  Home, Section, Project, About
```
