import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo } from './redux/todoSlice';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (inputText.trim() !== '') {
      dispatch(addTodo(inputText));
      setInputText('');
    }
  };

  return (
    <> 
      <h1>Redux Todo App</h1>
      
      <input
        data-testid="todo-input"
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Add a new todo"
      />
      
      <button 
        data-testid="add-button"
        onClick={handleAddTodo}
      >
        Add
      </button>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => dispatch(toggleTodo(todo.id))}
            style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer' 
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;