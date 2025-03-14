import { useTodoContext } from '../contexts/TodoContext';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const { todos } = useTodoContext();

  return (
    <div className="flex flex-col w-2xl">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
}
