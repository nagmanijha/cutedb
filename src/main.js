var StorageEngine = require("./storage/engine");
var newdb = new StorageEngine();
newdb.put("name", "nagmani");
console.log(newdb.get("name"));
