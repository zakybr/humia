# Site imagery

The image slots on the homepage currently hold original **SVG artwork**
(Islamic geometric patterns and a mihrab arch), generated to match the site's
ink-and-emerald language. They stand in for photography because the original
site's photos could not be fetched from the build environment.

Wired in `src/app/page.tsx` via `<Figure src="/images/..." art ... />`:

| File               | Where                        | Art                          |
| ------------------ | ---------------------------- | ---------------------------- |
| `hero.svg`         | Hero media band (panoramic)  | 8-point star tessellation    |
| `about.svg`        | About section                | Mihrab (pointed arch)        |
| `community-1.svg`  | Community gallery (1 of 3)   | 8-point rosette medallion    |
| `community-2.svg`  | Community gallery (2 of 3)   | 12-point rosette medallion   |
| `community-3.svg`  | Community gallery (3 of 3)   | 10-point rosette medallion   |

## Swapping in real photos

Drop a photo in here (e.g. `hero.jpg`) and, in `src/app/page.tsx`, point the
matching `<Figure>` at it and remove the `art` prop, e.g.
`<Figure src="/images/hero.jpg" caption="Community gathering, Auckland" ratio="16 / 7" />`.
Removing `art` restores the photo treatment (object-cover + caption overlay).
Landscape ~1600px wide (hero ~2400px) looks best.
