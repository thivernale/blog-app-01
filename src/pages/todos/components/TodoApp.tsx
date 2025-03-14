import { useEffect, useState } from 'react';
import { Todo, TodoOps, TodoProvider } from '../contexts/TodoContext';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const todoOps: Omit<TodoOps, 'todos'> = {
    addTodo: t => setTodos((prevState) => [{ id: Date.now(), ...t }, ...prevState]),
    updateTodo: (id, t) => {
      setTodos((prevState) => [...prevState.map(value => value.id === id ? { ...value, ...t } : value)]);
    },
    removeTodo: id => {
      setTodos((prevState) => [...prevState.filter(value => value.id !== id)]);
    },
    toggleCompleteTodo: id => {
      setTodos((prevState) => [
        ...prevState.map(value => value.id === id ? {
          ...value,
          complete: !value.complete,
        } : value),
      ]);
    },
  };

  // when component loads, load todos from local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') as string);
    if (storedTodos && storedTodos.length) {
      setTodos(storedTodos);
    }

    // when component unmounts, remove from local storage
    return () => {
      localStorage.removeItem('todos');
    };
  }, []);

  // when todos change, store todos in local storage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ ...todoOps, todos }}>
      <div className="flex flex-col flex-wrap grow items-center gap-2 p-2">
        <TodoForm />
        <TodoList />
      </div>
    </TodoProvider>
  );
}
