# Portfolio Website – Developer Instructions (HTML, CSS, JS)

This document explains the updates made and how to customize them.

---

## 1. General Design
- Colors are stored in `:root` CSS variables inside `styles.css`.
- Fonts are loaded via Google Fonts in the `<head>` of `index.html`.
- Font sizes and weights are set in `styles.css` for headings, paragraphs, and buttons.
- Animations use `transition` and `@keyframes` for smooth effects.

---

## 2. Cursor
- A custom circular cursor replaces the default.
- The cursor is styled in `styles/cursor.css` and follows the mouse via `scripts/cursor.js`.
- **To customize size or color**:  
  Change the `width`, `height`, and `background` properties in the `#custom-cursor` CSS selector.

---

## 3. Hero Section – Particle Bubbles
- Small rounded bubbles are generated with JavaScript in `scripts/particles.js`.
- Bubbles float subtly and can be popped with a click.
- **Customization options** in `particles.js`:
  - `bubbleCount` → number of bubbles.
  - `bubbleColors` → matching the page’s palette.
  - `bubbleSizeRange` → minimum and maximum size.
- Designed to be subtle, not distracting.

---

## 4. Project Page – Hover Image Effect
- On hover over a `.project-card`, a hidden image follows the mouse position.
- Implemented via `scripts/projectHover.js`.
- Creates the illusion that the cursor turns into the image.
- Change the hover image in `projects.html` by editing the `data-hover` attribute.

---

## 5. Contact Page
- Includes email, phone, and social media links.
- Styled for clarity in `styles/contact.css`.
- Edit contact details in `contact.html`.

---

## 6. About Me Section
- Made visually engaging without extra text.
- Enhancements include:
  - Border highlights.
  - Subtle background fade.
  - Smooth fade-in animation.
- Animation styles in `styles/about.css`.

---

## 7. Animations
- Scroll-based animations are triggered with `IntersectionObserver` in `scripts/scrollAnimations.js`.
- For advanced effects, GSAP can be included via CDN in `index.html` and scripts placed in `scripts/gsapAnimations.js`.
- Adjust animation timing and easing in the JS files.

---

## 8. Assets & Customization
- All images are stored in `/assets`.
- Colors, fonts, and animation durations are controlled through variables in `styles.css`.
- JavaScript files are modular for easy editing.

---

## 9. Running the Project
- Open `index.html` in a browser.
- No build process or server is required.

---

**Tip:**  
Keep bubbles small and hover effects subtle for a clean, professional look.
