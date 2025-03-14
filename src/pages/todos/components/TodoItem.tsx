import { FormEvent, useState } from 'react';
import { Todo, useTodoContext } from '../contexts/TodoContext';

export function TodoItem({ todo: oldTodo }: { todo: Todo }) {
  const [editable, setEditable] = useState(false);
  const [todo, setTodo] = useState<Todo>(oldTodo);
  const { updateTodo, removeTodo, toggleCompleteTodo } = useTodoContext();

  function saveTodo(e: FormEvent) {
    e.preventDefault();

    if (!todo.text || todo.complete) return;

    if (editable) {
      updateTodo(todo.id as number, todo);
    }
    setEditable(!editable);
  }

  function toggleComplete() {
    setTodo({
      ...todo,
      complete: !todo.complete,
    });
    toggleCompleteTodo(todo.id!);
  }

  function updateTodoForm(element: HTMLInputElement) {
    setTodo({
      ...todo,
      [element.name]: element.value,
    });
  }

  return (
    <div
      className={`flex border rounded-lg duration-200 shadow-white/50 shadow-sm ${editable ? 'bg-[#c6e9a7]' : 'bg-[#ccbed7]'}`}
    >
      <input
        type="checkbox"
        className="cursor-pointer mx-3"
        checked={todo.complete}
        onChange={() => toggleComplete()}
      />
      <input
        type="text"
        name="text"
        className={`grow px-3 py-1.5 outline-none duration-200 ${editable ? 'border' : ''}`}
        placeholder="Specify todo"
        readOnly={!editable}
        value={todo.text}
        onChange={e => updateTodoForm(e.currentTarget)}
        autoComplete="off"
      />
      <input
        type="datetime-local"
        name="due"
        className={`w-1/3 px-3 py-1.5 outline-none duration-200 ${editable ? 'border' : ''}`}
        readOnly={!editable}
        value={todo.due}
        onChange={e => updateTodoForm(e.currentTarget)}
      />
      <button
        type="submit"
        className="border cursor-pointer px-1 py-1.5 shrink-0 disabled:opacity-50"
        onClick={saveTodo}
        disabled={todo.complete}
        title={editable ? 'Save' : 'Edit️'}
      >
        {editable ? '📁' : '✏️'}
      </button>
      <button
        type="button"
        className="border cursor-pointer px-1 py-1.5 rounded-r-lg shrink-0"
        onClick={() => removeTodo(todo.id!)}
        title={'Remove'}
      >
        {'❌'}
      </button>
    </div>
  );
}
