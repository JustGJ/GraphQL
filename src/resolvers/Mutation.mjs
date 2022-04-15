export const Mutation = {
  addTodo: (_, { addTodoInput }, { db }) => {
    const { userId } = addTodoInput;
    if (!isInArray(db.users, "id", userId)) {
      throw new Error(
        `Il n'existe pas d'utilisateur ayant pour identifiant ${userId}`
      );
    } else {
      let todoId = db.todos.length ? db.todos[db.todos.length - 1].id + 1 : 0;
      const newTodo = {
        id: todoId,
        status: "WAITING",
        user: db.users.find((e) => e.id === userId),
        ...addTodoInput,
      };
      db.todos.push(newTodo);
      return newTodo;
    }
  },
};

const isInArray = (array, attribut, value) => {
  return array.some((element) => element[attribut] == value);
};
