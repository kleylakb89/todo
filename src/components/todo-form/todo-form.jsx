import * as React from 'react';
import { TodosContext } from '../../todo-context';
import './todo-form.scss';

// accepted the setTodoList prop from app.jsx
export const TodoForm = ({setTodoList}) => {
  const { todos, setTodos } = React.useContext(TodosContext);
  const [task, setTask] = React.useState('');

  const handleAddTodo = () => {
    // Fin an ability to add new task
    // utilized setTodoList to add the task to the list. Spread the existing array and add the object to it
    // utilizing the length of the array for ids is imperfect. When applied as keys to the list, it can lead to keys overlapping as items are deleted and added. Preferable would be a UUID for unique ids and keys.
      setTodoList([...todos, {
        id: todos.length,
        label: task,
        checked: false
      }]);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };

  return (
    <div className="todo-form">
      <input
        placeholder="Enter new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button type="button" onClick={handleAddTodo}>
        Add task
      </button>
    </div>
  );
};
