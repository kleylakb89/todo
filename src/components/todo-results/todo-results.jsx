import * as React from 'react';
import './todo-results.scss';

export const TodoResults = ({todos}) => {
  // create a state to watch the count variable
  const [count, setCount] = React.useState(0);
  // useEffect to watch for changes in the todos array, when it's updated, the setCount is reset and then updated based on how many items within the todos array are checked
  React.useEffect(() => {
    setCount(0);
    for (let item of todos) {
      if (item.checked) {
        setCount(c => c + 1);
      }
    }
  }, [todos]);

  // returns the count with a space for formatting
  const calculateChecked = () => {
    return ' ' + count;
  };

  return (
    <div className="todo-results">
      Done:
      {calculateChecked()}
    </div>
  );
};
