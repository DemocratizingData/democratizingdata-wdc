# Democratizing Data Web Data Connector

## Dev Environment

The development environment serves two containers, each with their own HTTP servers. You may start the development environment with:

```bash
docker-compose -f docker-compose.dev.yml up
```

The first is the Tableau Web Data Connector simulator. It is used to validate that the Web Data Connector can be consumed by Tableau. You may access it at `http://localhost:8888/Simulator/index.html`. The second container is a server for the Web Data Connector web application. It does not function on its own, but the URL for it may be supplied to the *Connector URL* field in the simulator. You can then test that the simulator can consume the WDC by clicking the *Start Interactive Phase* button in the simulator.