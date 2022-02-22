require("colors");
const inquirer = require("inquirer");
const { menuOptions } = require("../libs/questions.json");
const { saveData } = require("./dbInteraction");
const {
  printTodo,
  readInput,
  deleteTodoList,
  confirm,
  checkTodoList,
} = require("./menuFunctions");

const menu = async () => {
  console.clear();
  console.log("\n====================".green);
  console.log("Todo APP");
  console.log("====================\n".green);
  const { opt } = await inquirer.prompt(menuOptions);
  return opt;
};

const pause = async () => {
  console.log("\n");
  await inquirer.prompt([
    {
      type: "input",
      name: "enter",
      message: "Press ENTER to continue",
    },
  ]);
};

const menuNavigation = async (todos) => {
  let opt = "";
  do {
    opt = await menu();
    switch (opt) {
      case "1":
        const desc = await readInput("Description: ");
        todos.create(desc);
        break;

      case "2":
        const allTodos = todos._list;
        Object.values(allTodos).forEach((todo, index) => {
          printTodo(todo, index);
        });
        break;

      case "3":
        const completedTodos = todos.getByFilter(true);
        completedTodos.forEach((todo, index) => {
          printTodo(todo, index);
        });
        break;

      case "4":
        const pendingTodos = todos.getByFilter(false);
        pendingTodos.forEach((todo, index) => {
          printTodo(todo, index);
        });
        break;

      case "5":
        const ids = await checkTodoList(todos.listAsArr);
        todos.toggleStatus(ids);
        break;

      case "6":
        const id = await deleteTodoList(todos.listAsArr);
        if (id === 0) continue;
        const ok = await confirm("You're sure");
        if (ok) {
          todos.delete(id);
          console.log("The todo was deleted successfully");
        }
        break;
    }
    if (opt !== "0") await pause();
  } while (opt !== "0");

  saveData(todos.listAsArr);
};

module.exports = {
  menuNavigation,
};
