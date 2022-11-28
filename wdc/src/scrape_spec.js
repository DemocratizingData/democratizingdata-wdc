var parser = require('swagger-parser');
var fs = require('fs');

//var url = "https://showusthedata-dev.tacc.utexas.edu/openapi.json"
if (process.argv.length < 3) {
  throw "Missing required argument - URL"
}
var url = process.argv[2];

console.log(`Scraping from ${url}`);

var endpoints = [
  "/topics", "/publications", "/authors", "/agency_runs", "/dataset_aliases", "/models", "/datasets",
  "/asjcs", "/publishers", "/journals", "/publication_authors", "/publication_asjcs", "/publication_topics",
  "/publication_dataset_aliases", "/pda_models", "/author_affiliations", "/issns", "/affiliations"
]


function tableauDataType(dataType) {
  switch(dataType) {
    case "integer": return "int";
    case "string": return "string";
    case "number": return "float";
    case "boolean": return "bool";
    default: throw `Unknown dataType ${dataType}`;
  }
}

function parseSpec(spec, endpoints) {
  const tableSchema = endpoints.map(
    (endpoint) => {
      console.log(`Processing endpoint ${endpoint}`);
      path = spec.paths[endpoint];
      schema = path.get.responses['200'].content['application/json'].schema;
      schema_elems = schema.items['$ref'].split('/');
      schema_name = schema_elems[schema_elems.length - 1];
      spec_columns = spec.components.schemas[schema_name].properties;
      const tableSchema = {
        id: endpoint.substr(1),
        alias: path.get.summary,
        columns: Object.keys(spec_columns).map(
          key => ({
            id: key,
            alias: spec_columns[key].title,
            dataType: tableauDataType(spec_columns[key].type),
            description: spec_columns[key].description
          })
        )
      }
      return tableSchema
    }
  );
  console.log("Table schema");
  console.log(tableSchema);
  const outFile = `${__dirname}/wdc/tableSchema.json`;
  console.log(`Writing to ${outFile}`);
  fs.writeFileSync(
    outFile,
    JSON.stringify(tableSchema, null, 0)
  );
}


parser.parse(url).then(
  (spec) => {
    parseSpec(spec, endpoints);
  },
  (error) => {
    console.log("Parser error", error);
  }
)