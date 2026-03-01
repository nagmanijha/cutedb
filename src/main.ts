const StorageEngine = require("./storage/engine");

const newdb = new StorageEngine();

// newdb.put("name", "nagmani");
// console.log(newdb.get("name"));
newdb.put("x","10")
newdb.put("y","20")
newdb.delete("x")

console.log(newdb.get("name"))
console.log(newdb.get("x"))
console.log(newdb.get("y"))