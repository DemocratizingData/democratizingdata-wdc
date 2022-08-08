var parser = require('swagger-parser');
var fs = require('fs');

//var url = "https://showusthedata-dev.tacc.utexas.edu/openapi.json"
var url = "http://localhost:8000/openapi.json"
var endpoints = ["/topics", "/publications"]


function tableauDataType(dataType) {
  switch(column.dataType) {
    case "integer": return "int";
    case "string": return "string";
    case "number": return "float";
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
            dataType: spec_columns[key].type
          })
        )
      }
      return tableSchema
    }
  );
  console.log(tableSchema);
  fs.writeFileSync(
    `${__dirname}/content/tableSchema.json`,
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