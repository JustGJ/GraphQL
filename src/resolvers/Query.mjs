export const Query = {
  hello: (_, { name }) => {
    return `Hello ${name || "World"}`;
  },
  getTodos: (parent, { filter }, { db }) => {
    let todos = [];
    if (filter !== null) {
      todos = db.todos.filter((e) => e.status === "WAITING");
    } else {
      todos = db.todos;
    }
    return todos;
  },
  getTodoById: (_, { todoId }, { db }) => {
    const todo = db.todos.find((e) => e.id === todoId);
    if (!todo) {
      throw new Error(`La todo avec l'id ${todoId} n'existe pas`);
    }
    return todo;
  },
};
