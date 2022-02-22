require("colors");
const Todo = require("./todo");

class Todos {
  _list = {};

  constructor() {
    this._list = {};
  }

  create(desc = "", id = null, completed_at = null) {
    const todo = new Todo(desc, id, completed_at);
    this._list[todo.id] = todo;
  }

  delete(id = "") {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  get listAsArr() {
    return Object.values(this._list);
  }

  getByFilter(completed = true) {
    let list = [];
    if (completed) {
      list = Object.values(this._list).filter((todo) =>
        !todo.completed_at ? null : todo
      );
    } else {
      list = Object.values(this._list).filter((todo) =>
        todo.completed_at ? null : todo
      );
    }

    return list;
  }

  toggleStatus(ids = []) {
    ids.forEach((id) => {
      const todo = this._list[id];
      if (todo.completed_at) return;
      todo.complete();
    });

    Object.values(this._list).forEach(({id}) => {
      if (ids.includes(id)) return;
      this._list[id].completed_at = null;
    });
  }
}

module.exports = Todos;
