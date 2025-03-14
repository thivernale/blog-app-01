import { Todo, useTodoContext } from '../contexts/TodoContext';
import { FormEvent, useState } from 'react';

export function TodoForm() {
  const initialState = {
    text: '',
    complete: false,
    due: '',
  };
  const [todo, setTodo] = useState<Todo>(initialState);
  const { addTodo } = useTodoContext();

  function saveTodo(e: FormEvent) {
    e.preventDefault();

    if (!todo.text) return;

    addTodo({
      ...todo,
      created: Date.now(),
    });

    setTodo(initialState);
  }

  function updateTodoForm(element: HTMLInputElement) {
    setTodo({
      ...todo,
      [element.name]: element.value,
    });
  }

  return (
    <form onSubmit={saveTodo} className="flex flex-wrap w-2xl">
      <input
        type="text"
        name="text"
        className="grow border px-3 py-1.5 outline-none duration-200 rounded-l-lg"
        placeholder="Add todo"
        value={todo.text}
        onChange={e => updateTodoForm(e.currentTarget)}
        autoComplete="off"
      />
      <input
        type="datetime-local"
        name="due"
        className="w-1/3 border px-3 py-1.5 outline-none duration-200"
        value={todo.due}
        onChange={e => updateTodoForm(e.currentTarget)}
      />
      <button
        type="submit"
        className="border cursor-pointer px-3 py-1.5 rounded-r-lg shrink-0 bg-green-600"
      >
        Add
      </button>
    </form>
  );
}
