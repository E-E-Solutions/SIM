const db = require("../db/sql");

module.exports = class users {
  constructor(userName, email, password, role) {
    this.userName = userName;
    this.email = email;
    this.password = password;
    this.role = role;
  }
  save() {
    return db.execute(
      "INSERT INTO users (userName, email, password, role) VALUES (?,?,?,?)",
      [this.userName, this.email, this.password, this.role]
    );
  }
  static findWithEmail(email) {
    return db.execute("SELECT * FROM users WHERE email = ?", [email]);
  }

  static delete() {
    return db.execute("DELETE FROM users");
  }
};
