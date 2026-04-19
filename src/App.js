import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo } from './redux/todoSlice';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim() !== '') {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <div className="App" style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h1>Redux Todo App</h1>
      
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo description"
        style={{ padding: '8px', width: '70%', marginRight: '10px' }}
      />
      
      <button onClick={handleAddTodo} style={{ padding: '8px 15px' }}>
        Add Todo
      </button>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => dispatch(toggleTodo(todo.id))}
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              cursor: 'pointer',
              padding: '10px',
              border: '1px solid #ccc',
              marginBottom: '5px',
              backgroundColor: todo.completed ? '#e0e0e0' : 'white'
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;