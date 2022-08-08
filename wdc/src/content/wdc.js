(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    $.getJSON("tableSchema.json", function (tableSchema) {
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