const db = require("../db/sql");

module.exports = class client {
  constructor(clientName, companyName, location) {
    this.clientName = clientName;
    this.companyName = companyName;
    this.location = location;
  }
  save() {
    return db.execute(
      "INSERT INTO client (clientName, companyName, location) VALUES (?,?,?)",
      [this.clientName, this.companyName, this.location]
    );
  }
  static findByCompany(companyName) {
    console.log(companyName);
    return db.execute("SELECT * FROM client WHERE companyName = ?", [
      companyName,
    ]);
  }

  static findAll() {
    return db.execute("SELECT * FROM client");
  }
  static delete() {
    return db.execute("DELETE FROM client");
  }
};
