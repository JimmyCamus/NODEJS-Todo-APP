const Todos = require("./models/todos");
const { readData } = require("./utils/dbInteraction");
const { menuNavigation } = require("./utils/menuManager");

const app = async () => {
  const todos = new Todos();
  const data = readData();
  if (data) {
    data.forEach((item) => {
      todos.create(item.desc, item.id, item.completed_at);
    });
  }
  menuNavigation(todos);
};

app();
