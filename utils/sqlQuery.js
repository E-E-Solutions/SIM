const db = require("../db/sql");

module.exports = class SIM {
  constructor(
    idSIM,
    ICCID,
    IMSI,
    clientName,
    connectionType,
    location,
    companyName,
    companyId
  ) {
    this.idSIM = idSIM;
    this.ICCID = ICCID;
    this.IMSI = IMSI;
    this.clientName = clientName;
    this.connectionType = connectionType;
    this.location = location;
    this.companyName = companyName;
    this.companyId = companyId;
  }

  // save details in sql
  save() {
    return db.execute(
      "INSERT INTO sim (ICCID, IMSI, clientName, connectionType, location, companyName, companyId) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        this.ICCID,
        this.IMSI,
        this.clientName,
        this.connectionType,
        this.location,
        this.companyName,
        this.companyId,
      ]
    );
  }

  static findAll() {
    return db.execute("SELECT * FROM sim");
  }
  static delete() {
    return db.execute("DELETE FROM sim");
  }
  static findWithId(id) {
    return db.execute("SELECT * FROM sim WHERE idSIM = ?", [id]);
  }

  static findWithCompany(company, pageSize, offSet) {
    return db
      .execute(
        `SELECT * FROM sim WHERE companyName = ?  LIMIT ${pageSize} OFFSET ${offSet}`,
        [company]
      )
      .then()
      .catch((err) => console.log(err));
  }

  static findWithClient(clientName) {
    return db.execute("SELECT * FROM sim WHERE clientName = ?", [clientName]);
  }

  static findWithLocation(location) {
    return db.execute("SELECT * FROM sim WHERE location = ?", [location]);
  }

  static findWithICCID(len, ICCID) {
    return db.execute("SELECT * FROM sim WHERE RIGHT(iccid, ?) = ?", [
      len,
      ICCID,
    ]);
  }

  static findWithIMSI(len, IMSI) {
    return db.execute("SELECT * FROM sim WHERE RIGHT(IMSI, ?) = ?", [
      len,
      IMSI,
    ]);
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
