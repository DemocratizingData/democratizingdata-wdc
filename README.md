# Democratizing Data Web Data Connector

## Dev Environment

The development environment serves two containers, each with their own HTTP servers. You may start the development environment with:

```bash
docker-compose -f docker-compose.dev.yml up
```

The first is the Tableau Web Data Connector simulator. It is used to validate that the Web Data Connector can be consumed by Tableau. You may access it at `http://localhost:8888/Simulator/index.html`. The second container is a server for the Web Data Connector web application, accessible at `http://localhost:8889`. It does not function on its own, but the URL for it may be supplied to the *Connector URL* field in the simulator. You can then test that the simulator can consume the WDC by clicking the *Start Interactive Phase* button in the simulator.

## Updating the Schema

The OpenAPI spec for the Democratizing Data API is scraped and converted into a structure that is compatible with Tableau's Web Data Connector table schema format. To run the scraper, make sure that [`./src/scrape_spec.js`](./src/scrape_spec.js) is pointing to the correct API URL. Then, inside the `./src/` directory, run `npm run scrape_spec`. This will generate a new [`./src/content/tableSchema.json`](./src/content/tableSchema.json) file that can be committed to this repo