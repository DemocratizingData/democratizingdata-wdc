# Democratizing Data Web Data Connector

## Dev Environment

The development environment serves two containers, each with their own HTTP servers. You may start the development environment with:

```bash
docker-compose -f docker-compose.dev.yml up
```

The first is the Tableau Web Data Connector simulator. It is used to validate that the Web Data Connector can be consumed by Tableau. You may access it at `http://localhost:8888/Simulator/index.html`. The second container is a server for the Web Data Connector web application, accessible at `http://localhost:8889`. It does not function on its own, but the URL for it may be supplied to the *Connector URL* field in the simulator. You can then test that the simulator can consume the WDC by clicking the *Start Interactive Phase* button in the simulator.

## Updating the Schema

The OpenAPI spec for the Democratizing Data API is scraped and converted into a structure that is compatible with Tableau's Web Data Connector table schema format.
To run the scraper, and you should always if you're updating WDC.
1. `cd ./wdc/src`
2. `npm run scrape_spec http://dev.democratizing-data.tacc.utexas.edu/openapi.json`
    - Change the url to whichever site you want to scrape the spec from.
    - You might have to `npm install swagger-parser` if it's not yet installed.
3. Generated json at [`./wdc/src/wdc/tableSchema.json`](./wdc/src/wdc/tableSchema.json)
4. Commit said file to this repo to update.
5. NOTE: `scrape_spec.js` only parses endpoints specified in the `endpoints` variable. Add to the file if new endpoints are created.