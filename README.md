# Spideez — Landing Page (v1)

A static, dependency-free landing page for Spideez, built with plain HTML5, CSS3, and vanilla JavaScript. No frameworks, no build step — just open `index.html`.

## Structure

```
spideez-website/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

## Running locally

Just open `index.html` in any modern browser. No build tools or servers required.

For local development with live reload, you can optionally serve it with any static server, e.g.:

```bash
npx serve .
```

## Design system

Colors, spacing, and typography are controlled through CSS custom properties defined in `css/style.css` under `:root`. Update the palette by changing the variables:

```css
:root {
  --bg-primary: #05070d;
  --bg-secondary: #0b0f1a;
  --text-primary: #f3f5f9;
  --text-secondary: #9aa3b5;
  --accent: #5b6bff;
  --accent-2: #8a5bff;
  --border: #ffffff17;
}
```

Fonts: **Manrope** (display/body) and **IBM Plex Mono** (labels, small data text), loaded from Google Fonts.

## JavaScript

`js/script.js` is organized into small, single-purpose functions, each handling one feature:

- `initNavbar()` — adds a blurred background to the navbar on scroll
- `initMobileMenu()` — opens/closes the hamburger menu, manages ARIA state
- `initSmoothScroll()` — smooth-scrolls to in-page anchors, offset for the fixed navbar
- `initScrollAnimations()` — reveals sections/cards as they enter the viewport (IntersectionObserver)
- `initActiveNavIndicator()` — highlights the nav link for the section in view
- `initBackToTop()` — shows/hides and wires the back-to-top button

All effects respect `prefers-reduced-motion`.

## Future React migration

The page is structured so each section maps cleanly to a future component:

```
App
├── Navbar
├── Hero
├── IntroStrip
├── About
├── Products
├── WhySpideez
├── Technologies
├── Process
├── CTA
└── Footer
```

Each section in `index.html` is a distinct `<section>` with its own class namespace (e.g. `.product-card`, `.process-step`), and CSS is scoped by component-style class names rather than IDs, so styles can be lifted into component-level stylesheets or CSS modules later with minimal rework.

## Accessibility

- Semantic HTML5 landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`)
- Visible keyboard focus states on all interactive elements
- Hamburger menu uses `aria-expanded` / `aria-controls`
- Decorative visuals marked `aria-hidden="true"`
- Reduced-motion media query disables animation for users who prefer it

## Notes

- No external images are used — the hero's app-interface visual is built entirely from HTML/CSS.
- The "Start a Conversation" CTA opens a pre-filled email to `ixbalaji07@gmail.com`. Swap it for a business address before launch, and replace the social icon links with real destinations.
- Add a real `assets/images/og-image.png` for the Open Graph preview referenced in `index.html`.
