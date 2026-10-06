# CartCrush

An interactive shopping prototype for discovering and comparing everyday Australian retail offers.

**Website:** [Open CartCrush](https://baricyx.github.io/discover-discount/)

## Features

- Search and filter offers by product, retailer, distance, stock and promotion dates.
- Collapse the offers shelf on mobile to reach the comparison board and shopping list.
- Place matching products on a comparison board and switch between pack price and unit price.
- Inspect price history, sources, conditions, membership requirements and delivery estimates.
- Save a shopping list, adjust quantities and track a budget.
- Configure simulated reminders, share offer links and report issues locally.

Prices, stock, price histories, distances and offer sources are fictional demo data. Shopping lists, settings and reports are stored in the current browser. Reminder updates are simulated.

Fonts load online; the offline version uses system fonts.

## Run locally

Open `index.html` in a browser, or run this command from the project folder:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open [localhost:4173](http://127.0.0.1:4173/).

## Files

- `index.html`: page entry point
- `styles.css`: layout and visual design
- `app.js`: example offers and interactions

## Publish updates

GitHub Pages publishes the root of the `main` branch. After editing the files:

```sh
git add .
git commit -m "Update CartCrush"
git push
```
