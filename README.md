# Tree T-Pee — static business website concept

A responsive single-page concept website built with semantic HTML, CSS, and dependency-free vanilla JavaScript. No backend, package manager, build step, analytics, cookies, or contact-form data collection is required.

## Project structure

```text
.
├── index.html                 # Main page content and metadata
├── 404.html                   # Friendly not-found page (platform support varies)
├── robots.txt                 # Basic crawl policy; add sitemap after domain setup
├── _headers                   # Netlify-style security and cache headers
├── vercel.json                # Vercel security and cache headers
├── .gitignore
├── README.md
└── assets/
    ├── images/                 # All replaceable PNG image assets, including favicon
    ├── scripts/
    │   └── main.js             # Navigation, scroll state, reveal effects, FAQ, year
    └── styles/
        └── main.css            # Design tokens, layout, components, responsive rules
```

## Run locally

Because this site uses relative static assets, opening `index.html` directly usually works. For a more realistic local-server test, run one of these from the project root:

- Python: `python -m http.server 8080` then open `http://localhost:8080`
- Node (if already installed): `npx serve .`

There is no `package.json` because no build tooling or third-party JavaScript dependencies are needed. Do not install a framework just to serve this static page.

## Customize content and images

- Edit copy, navigation, metadata, FAQ content, and official links in `index.html`.
- Adjust colors and responsive presentation in `assets/styles/main.css`. The olive-green palette is defined near the top in CSS custom properties.
- Update navigation, reveal animations, and FAQ behavior in `assets/scripts/main.js`. The code uses safe, fixed selectors and class toggles; it does not inject HTML from strings or process user input.
- Replace `assets/images/hero-orchard.png`, `assets/images/sustainability-orchard.png`, and `assets/images/founder-orchard.png` with approved PNG artwork. Keep the filenames to avoid changing CSS. These files are illustrative artwork, not photographs; use landscape images and check crop and contrast after replacement.
- Replace `assets/images/tree-tpee-product-diagram.png` to update the product illustration. The four `icon-*.png` files are benefit icons, and `tree-tpee-favicon.png` is the browser icon. Keep the filenames and approximate aspect ratios so the layout remains unchanged.
- Keep any externally opened links using `rel="noopener noreferrer"` with `target="_blank"`.

## Security and performance

- No runtime packages, third-party JavaScript, API keys, forms, analytics, or cookies are present. Google Fonts is the only external asset provider; if fully self-hosting is preferred, download properly licensed font files, update the CSS font-face declarations, remove the Google Fonts links in `index.html`, and simplify CSP accordingly.
- `_headers` is intended for Netlify-compatible hosts; `vercel.json` configures equivalent response headers for Vercel. Deploy using only the configuration for your actual host. Security headers cannot be enforced by a local HTML file, and some hosts require configuration in their dashboard or server config.
- The CSP allows only same-origin scripts and images, plus Google Fonts styles/fonts. It blocks objects, frames, and form submissions to other origins. Do not add inline scripts or third-party widgets without updating and reviewing CSP.
- HTTPS and HSTS must only be enabled when the production domain is served exclusively over HTTPS. Ensure HTTPS redirects and certificate provisioning are enabled at the hosting provider.
- Static assets receive long-lived immutable caching; HTML is revalidated. The hosting platform should serve Brotli/Gzip compression automatically.
- Scroll handling is coalesced with `requestAnimationFrame`; reveal effects use `IntersectionObserver`, animate opacity/transform, and honor `prefers-reduced-motion`.

## Deployment checklist

1. Confirm business copy, testimonials, product claims, phone number, address, image rights, and official links with the business owner. This is an independent concept, not the official Tree T-Pee website.
2. Deploy the project root to Netlify or Vercel (or configure equivalent headers on another static host). Do not publish both host configuration files to a platform that interprets them unexpectedly.
3. Configure a real custom domain, HTTPS certificate, and HTTP-to-HTTPS redirect. Verify the HSTS policy against all intended subdomains before enabling it.
4. Once the final domain is known, add a canonical URL, absolute Open Graph URL/image, and a `sitemap.xml` containing the actual public URL. These are intentionally not fabricated because the deployment domain is not specified and this concept should not claim the official company's domain.
5. Test the deployed site on mobile and desktop, check response headers, run Lighthouse/PageSpeed, and verify 404 routing on the chosen host.

## Validation

This project intentionally has no dependency audit target because it has no npm dependencies. Use the checks documented in the delivery summary (HTML/asset/link checks, JavaScript syntax check, and host configuration review). Run Lighthouse and browser/device testing after deployment for real-world performance and responsive verification.

## Content and legal notes

- Product illustrations are conceptual and not to scale.
- Replace artwork with approved, licensed company assets before public launch.
- Reconfirm all business information and permissions before publishing.
- No privacy policy or cookie banner is added because this static concept does not collect personal data or use analytics/cookies. Reassess if you add third-party tracking or data collection.


## Image assets

All image assets are stored in `assets/images/` as PNG files. The HTML contains no inline SVG artwork or data-URL images, and CSS uses local PNG files for visual backgrounds. To replace an image, keep the existing filename and use a PNG with the same role; no HTML, CSS, or JavaScript changes are needed. For orchard backgrounds, use a landscape image to preserve the existing crop and composition. The product diagram and four benefit icons are transparent, high-resolution PNGs. The favicon is `tree-tpee-favicon.png`.
