(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    $.getJSON("tableSchema.json", function (tableSchema) {
      tableSchema.forEach(
        (schema) => {
          schema.columns.forEach(
            (column) => {
              let finalType;
              switch(column.dataType) {
                case "integer": finalType = tableau.dataTypeEnum.integer; break;
                case "string": finalType = tableau.dataTypeEnum.string; break;
                case "number": finalType = tableau.dataTypeEnum.float; break;
              }
            }
          )
        }
      );
      schemaCallback(tableSchema);
    }); 
  };

  myConnector.getData = function (table, doneCallback) {

  };

  tableau.registerConnector(myConnector);


  $(document).ready(function () {
    console.log("DATA TYPE ENUM", tableau.dataTypeEnum);
    $("#submitButton").click(function () {
        tableau.connectionName = "USGS Earthquake Feed";

        tableau.submit();
    });
});
})();