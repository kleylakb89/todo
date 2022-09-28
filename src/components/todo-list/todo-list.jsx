import * as React from 'react';
import { Checkbox } from '../checkbox';
import { TodosContext } from '../../todo-context';
import './todo-list.scss';

// accept the prop to update the todolist
export const TodoList = ({setTodoList}) => {
  const { todos, setTodos } = React.useContext(TodosContext);

  const handleDelete = (id) => {
    // Fix an ability to delete task
    // iterates through todos and confirms which item is being deleted, then copies the todos into a new array and splices out the desired list item before setting the todoList with the newly spliced todo
    for (let i = 0; i < todos.length; i++) {
      if (id === todos[i].id) {
        const newList = [...todos];
        newList.splice(i, 1);
        setTodoList([...newList]);
      }
    }
  };

  const toggleCheck = (id) => {
    // Fix an ability to toggle task
    // creates a new list by mapping the todos items, checks if the ids match, then toggles the checked property within the object
    // Finally, sets the todoList with the updated newList so the checked property is updated
    const newList = todos.map(item => {
      if (id === item.id) {
        if (item.checked) {
          return {...item, checked: false};
        } else return {...item, checked: true}
      }
      return item;
    })
    setTodoList([...newList]);
  };

  const handleKeyUp = (e, id) => {
    if (e.keyCode === 13) {
      toggleCheck(id);
    }
  };

  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      {todos.length ? (
        <div className="todo-list-content">
          {todos.map((todoItem) => (
            <Checkbox
              key={todoItem.id}
              label={todoItem.label}
              // updated to defaultChecked for affecting the checkbox
              // using onClick instead of onChange results in a bug where the user can click the label text to update the todo results counter, but I haven't gotten onChange to trigger the toggleCheck function without crashing
              defaultChecked={todoItem.checked}
              onClick={() => toggleCheck(todoItem.id)}
              onKeyUp={(e) => handleKeyUp(e, todoItem.id)}
              onDelete={() => handleDelete(todoItem.id)}
            />
          ))}
        </div>
      ) : (
        <div className="no-todos">Looks like you&apos;re absolutely free today!</div>
      )}
    </div>
  );
};
