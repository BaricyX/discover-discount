# CartCrush

An interactive shopping prototype for discovering and comparing everyday Australian retail offers.

**Website:** [Open CartCrush](https://baricyx.github.io/discover-discount/)

## Features

- **Find offers:** search and filter offers by category, retailer, distance, stock and promotion dates, and switch the shopping area.
- **Compare:** put up to three matching products on the compare board (a floating tray on smaller screens) and switch between pack price and unit price.
- **Offer details:** price history, sources, conditions, membership requirements and delivery estimates.
- **Shopping desk:** adjust quantities, track the list against a budget and download the list.
- **Preferences:** simulated saved-offer reminders, reports and clearing local data.

The layout adapts from a sidebar on desktop, to an icon rail on tablets, to a bottom tab bar on phones.

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
