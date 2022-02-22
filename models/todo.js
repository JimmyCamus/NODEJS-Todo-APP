require("colors");
const { v4: uuidv4 } = require("uuid");

class Todo {
  id = "";
  desc = "";
  completed_at = null;

  constructor(desc, id = null, completed_at = null) {
    this.id = id ? id: uuidv4();
    this.desc = desc;
    this.completed_at = completed_at 
  }

  complete() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    this.completed_at = `${dd}/${mm}/${yyyy}`;
  }

  toString() {
    return `Description: ${this.desc}
    Status: ${this.completed_at ? "completed".green : "pending".yellow}
    ${this.completed_at ? `Completed at: ${this.completed_at}` : ""}`;
  }
}

module.exports = Todo;
