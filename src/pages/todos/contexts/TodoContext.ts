import { createContext, useContext } from 'react';

export type Todo = {
  id?: number;
  text?: string;
  created?: number;
  due?: string;
  complete?: boolean;
};
export type TodoOps = {
  todos: Todo[];
  addTodo: (t: Todo) => void;
  updateTodo: (id: number, t: Todo) => void;
  removeTodo: (id: number) => void;
  toggleCompleteTodo: (id: number) => void;
};

export const TodoContext = createContext<TodoOps>({
  todos: new Array<Todo>(),
  addTodo: () => {},
  updateTodo: () => {},
  removeTodo: () => {},
  toggleCompleteTodo: () => {},
});

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
