const db = require("../db/sql");

module.exports = class SIM {
  constructor(ICCID, IMSI, clientName, connectionType, location, companyName) {
    this.idSIM;
    this.ICCID = ICCID;
    this.IMSI = IMSI;
    this.clientName = clientName;
    this.connectionType = connectionType;
    this.location = location;
    this.companyName = companyName;
  }

  // save details in sql
  save() {
    return db.execute(
      "INSERT INTO sim (ICCID, IMSI, clientName, connectionType, location, companyName) VALUES (?, ?, ?, ?, ?, ?)",
      [
        this.ICCID,
        this.IMSI,
        this.clientName,
        this.connectionType,
        this.location,
        this.companyName,
      ]
    );
  }

  static findAll(companyName) {
    return db.execute("SELECT * FROM sim");
  }

  static findWithId(id) {
    return db.execute("SELECT * FROM sim WHERE idSIM = ?", [id]);
  }

  static findWithCompany(companyName) {
    return db.execute("SELECT * FROM sim WHERE companyName = ?", [companyName]);
  }

  static findWithClient(clientName) {
    return db.execute("SELECT * FROM sim WHERE clientName = ?", [clientName]);
  }

  static findWithLocation(location) {
    return db.execute("SELECT * FROM sim WHERE location = ?", [location]);
  }

  static findWithICCID(ICCID) {
    return db.execute("SELECT * FROM sim WHERE ICCID = ?", [ICCID]);
  }
  static findWithIMSI(IMSI) {
    return db.execute("SELECT * FROM sim WHERE IMSI = ?", [IMSI]);
  }

  static updateById(sim, id) {
    return db.execute(
      "UPDATE sim SET ICCID = ?, IMSI = ?, location =?, connectionType = ?, clientName = ?, companyName = ? WHERE idSIM = ? ",
      [
        sim.ICCID,
        sim.IMSI,
        sim.location,
        sim.connectionType,
        sim.clientName,
        sim.companyName,
        id,
      ]
    );
  }

  static deleteById(id) {
    return db.execute("DELETE FROM  sim WHERE idSIM = ? ", [id]);
  }
};
