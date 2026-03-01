const fs = require("fs")

class StorageEngine {
  private store: Map<string, string>;
  private logFilepath: string;

  constructor() {
    this.store = new Map();
    this.logFilepath = './data/storage.log';
    if (!fs.existsSync(this.logFilepath)) {
      fs.writeFileSync(this.logFilepath, "");
    }

    try{
      const data = fs.readFileSync(this.logFilepath, "utf8")
      const lines = data.split("\n");

      for(const line of lines){
        const trimmed = line.trim();

        if(trimmed.startsWith("PUT")){
          const parts = trimmed.split(" ");
          if(parts.length >=3){
            const key=parts[1];
            const value=parts.slice(2).join(" ");
            this.store.set(key, value)
          }
        } else if (trimmed.startsWith("DELETE")){
          const parts = trimmed.split(" ");
          if(parts.length >=2){
            const key=parts[1];
            this.store.delete(key);
          }
        }
      }
    } catch(err){
      console.error(err);
    }
  }


  put(key: string, value: string): void {
    this.store.set(key, value);
    const path = this.logFilepath;
    fs.appendFileSync(path, (`PUT ${key} ${value} \n`))
  }

  get(key: string): string | null {

    const value = this.store.get(key);
    return value ?? null;
  }

  delete(key: string): void {
    this.store.delete(key)
    const path = this.logFilepath;
    fs.appendFileSync(path, (`DELETE ${key} \n`))
  }
}

export = StorageEngine;