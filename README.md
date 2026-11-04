# Police Chief-Inspired Gift Store

An independent responsive storefront demo inspired by the layout and shopping flow at https://pay.walgames.com/en/store/gift?game_id=176.

## Website

- Compact game store header with Pack List, Cart and language display
- Police-themed game banner
- Gift pack catalog with category filters, product artwork and example prices
- Add to Cart, quantity adjustments, order summary and persisted cart
- Gift recipient form with player ID, optional name and message
- Demo order preview
- Mobile and desktop layouts

This is an original frontend implementation rather than a direct copy of the reference website. All products, prices and artwork are placeholders; the source website could not be fully visually inspected.

## Run locally

Open `index.html` or launch a local web server:

```bash
python3 -m http.server 8000
```

Open http://localhost:8000.

## Publish via GitHub Pages

In repository Settings > Pages, choose Deploy from a branch, select `main` and `/ (root)`, then save.

Once deployment succeeds, the expected link is https://error-404y.github.io/WW-A/.

## Limitations

The store is an independent concept and is not affiliated with WALGAMES. It does not collect payment information, process purchases or deliver in-game items. Before launching real sales, implement an authorized game-product inventory source, appropriate payments, server-side order processing, security, policies, and fulfillment.

Change demo products in `app.js`; edit presentation in `styles.css`.
