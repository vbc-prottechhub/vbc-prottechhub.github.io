# VBC ProtTechHub

Static website for the **VBC Proteomics Technology Hub** at the Vienna BioCenter,
hosted with GitHub Pages at **https://vbc-prottechhub.github.io**.

## About

A clean, responsive, single-page academic research-lab site built with plain
HTML, CSS, and JavaScript — no build step required. All content is placeholder
text intended to be replaced with the hub's real information.

## Structure

```
.
├── index.html        # All page sections (Hero, Research, News, Team, Publications, Contact, Footer)
├── css/
│   └── style.css     # Styles, design tokens, responsive layout
├── js/
│   └── script.js     # Hamburger menu, smooth scroll, sticky header, form demo
├── .nojekyll         # Serve files as-is (bypass Jekyll processing)
└── README.md
```

## Features

- Sticky top navbar with logo and section links
- Full-width hero with call-to-action
- Research focus card grid (6 technology areas)
- News list, team cards, publications list
- Contact section with a front-end-only demo form
- Mobile-first responsive layout with a hamburger menu
- Smooth in-page scrolling and a subtle header shadow on scroll

## Design

- **Colors:** deep teal/navy primary (`#1a3a5c`), warm-white background, amber/gold accent (`#f0b429`)
- **Typography:** Inter (sans) + Merriweather (serif) via Google Fonts

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

Pushing to the `main` branch of `vbc-prottechhub/vbc-prottechhub.github.io`
publishes the site automatically via GitHub Pages.

---

_Content is placeholder and does not represent final copy. Design is original and
created for VBC ProtTechHub._
