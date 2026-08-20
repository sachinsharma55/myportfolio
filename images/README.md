# Images

The zip you uploaded didn't include an `images/` folder at all, so every
photo/screenshot reference in the old `index.html` was pointing at a file
that didn't exist. Rather than invent fake photos or fake screenshots of
real, named websites, the CSS now has graceful fallbacks (a gradient
placeholder, a monogram, or a Font Awesome icon) everywhere an image is
missing — so the site still looks intentional. Drop the real files below
back in and each placeholder disappears automatically, no code changes
needed.

## What to add back

| File | Used for | Where |
|---|---|---|
| `images/sachin.png` (or similar) | Your hero portrait | Inside `.head-main-image__frame` in `index.html` — just add `<img src="images/sachin.png" alt="Sachin Sharma">` where the comment is |
| `images/about-photo.png` | About-section photo | Inside `.about-model-img` in `index.html` |
| `images/favicon.png` (optional) | Browser tab icon | A generated `favicon.svg` monogram is already wired up in `<head>` — replace it with a real PNG/ICO if you'd rather use a photo/logo |
| `images/projects/*.png` | Project card screenshots | See table below — filenames must match exactly |

## Expected project screenshots

These filenames are already referenced in `index.html`'s Projects section:

- `images/projects/realincridibleindia.png`
- `images/projects/dls-engineers.png`
- `images/projects/home-optima.png`
- `images/projects/boatflex.png`
- `images/projects/car-connect.png`
- `images/projects/outbusters.png`
- `images/projects/zenegy.png`
- `images/projects/rex.png`
- `images/projects/saniona.png`

Until these exist, each project card shows an animated gradient in place
of the screenshot (see `styles/scss/components/_portfolio-cards.scss`).
