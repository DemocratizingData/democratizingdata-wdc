var parser = require('swagger-parser');
var fs = require('fs');

//var url = "https://showusthedata-dev.tacc.utexas.edu/openapi.json"
var url = "http://localhost:8000/openapi.json"
var endpoints = [
  "/topics", "/publications", "/authors", "/agency_runs", "/dataset_aliases", "/models", "/datasets",
  "/asjcs", "/publishers", "/journals", "/publication_authors", "/publication_asjcs", "/publication_dataset_aliases",
  "/pda_models", "/author_affiliations", "/issns", "/affiliations"
]


function tableauDataType(dataType) {
  switch(dataType) {
    case "integer": return "int";
    case "string": return "string";
    case "number": return "float";
    default: return null;
  }
}

function parseSpec(spec, endpoints) {
  const tableSchema = endpoints.map(
    (endpoint) => {
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
  console.log(tableSchema);
  fs.writeFileSync(
    `${__dirname}/wdc/tableSchema.json`,
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