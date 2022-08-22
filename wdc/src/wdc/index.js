(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    // Get scraped and cached table schema
    $.getJSON("tableSchema.json", function (tableSchema) {
      schemaCallback(tableSchema);
    }); 
  };

  myConnector.getData = function (table, doneCallback) {
    // Get data from the API URL, using the endpoint corresponding to the table ID
    $.getJSON(`http://localhost:8000/${table.tableInfo.id}`, function(tableData) {
      table.appendRows(tableData);
      doneCallback();
    });
  };

  tableau.registerConnector(myConnector);

  $(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "Democratizing Data API";

        tableau.submit();
    });
});
})();