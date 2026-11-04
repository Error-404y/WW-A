# WARFRONT Gift Store

A responsive, game-inspired digital gift storefront demo built with HTML, CSS and vanilla JavaScript.

## Features

- Responsive premium-style storefront with custom CSS artwork
- Eight sample gift products
- Product category filters
- Persistent shopping cart stored in the current browser
- Quantity editing, subtotal calculation and cart drawer
- Demo recipient checkout form
- Accessible labels, dialogs and keyboard dismissal
- Frequently asked questions section
- No build step or external JavaScript dependencies

## Run locally

Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy with GitHub Pages

1. Open repository Settings.
2. Select Pages.
3. Under Build and deployment, choose Deploy from a branch.
4. Select `main` and `/ (root)`.
5. Save and wait for GitHub to publish the page.

The expected Pages URL is `https://error-404y.github.io/WW-A/` once Pages is enabled and deployed.

## Important

This is an independent UI concept inspired by modern gaming gift stores. It is not affiliated with WalGames or any game publisher.

Products, prices, brands, rewards, and visual artwork are fictional placeholders. No checkout transaction is processed. The project does not accept payments, verify player identities, or deliver virtual goods. Never use this demo to collect payment card details.

To operate a real store, obtain authorization to sell and fulfill the relevant game items, connect an appropriate backend payment provider, configure secure server-side order validation and authentication, and implement actual fulfillment and a privacy policy.

## Configuration

Edit the `products` array in `app.js` to change items and prices. Edit CSS variables in `styles.css` to customize colors. The storefront currently displays USD prices only.
