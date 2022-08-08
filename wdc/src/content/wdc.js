(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    var cols = [{
      id: "id",
      dataType: tableau.dataTypeEnum.string
    }, {
        id: "mag",
        alias: "magnitude",
        dataType: tableau.dataTypeEnum.float
    }, {
        id: "title",
        alias: "title",
        dataType: tableau.dataTypeEnum.string
    }, {
        id: "location",
        dataType: tableau.dataTypeEnum.geometry
    }];

    var tableSchema = {
        id: "earthquakeFeed",
        alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
        columns: cols
    };

    schemaCallback([tableSchema]);
  };

  myConnector.getData = function (table, doneCallback) {

  };

  tableau.registerConnector(myConnector);


  $(document).ready(function () {
    console.log("TABLEAU OBJECT", tableau);
    $("#submitButton").click(function () {
        tableau.connectionName = "USGS Earthquake Feed";

        tableau.submit();
    });
});
})();