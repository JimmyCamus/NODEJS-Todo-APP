require("colors");
const inquirer = require("inquirer");

const printTodo = (todo, index) => {
  console.log(`${index + 1}.`);
  console.log(todo.toString());
  console.log("---------------------------------------------------------");
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Please enter a value";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);

  return desc;
};

const deleteTodoList = async (todos) => {
  const choices = todos.map((todo, index) => {
    return {
      value: todo.id,
      name: `${index + 1}. ${todo.desc}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0. Cancel",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Delete todo",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

const checkTodoList = async (todos) => {
  const choices = todos.map((todo, index) => {
    return {
      value: todo.id,
      name: `${index + 1}. ${todo.desc}`,
      checked: todo.completed_at ? true : false,
    };
  });

  const questions = [
    {
      type: "checkbox",
      name: "ids",
      message: "Select",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(questions);
  return ids;
};

const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);

  return ok;
};

module.exports = {
  printTodo,
  deleteTodoList,
  readInput,
  confirm,
  checkTodoList,
};
