import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './redux/todoSlice';

// प्रत्येक Test साठी नवीन Clean Store
const renderWithRedux = (component) => {
  const store = configureStore({
    reducer: {
      todos: todoReducer,
    },
  });
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Redux Todo App Testing', () => {
  
  test('App renders correctly - Snapshot Test', () => {
    const { container } = renderWithRedux(<App />);
    expect(container).toMatchSnapshot();
  });

  test('Input field should be in the document', () => {
    renderWithRedux(<App />);
    const inputElement = screen.getByTestId('todo-input');
    expect(inputElement).toBeInTheDocument();
  });

  test('Button should add todo to the list', () => {
    renderWithRedux(<App />);
    const inputElement = screen.getByTestId('todo-input');
    const buttonElement = screen.getByTestId('add-button');

    fireEvent.change(inputElement, { target: { value: 'Learn Testing' } });
    fireEvent.click(buttonElement);

    expect(screen.getByText('Learn Testing')).toBeInTheDocument();
  });

  test('Todo should get strike-through when clicked', () => {
    renderWithRedux(<App />);
    const inputElement = screen.getByTestId('todo-input');
    const buttonElement = screen.getByTestId('add-button');

    fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
    fireEvent.click(buttonElement);

    const todoElement = screen.getByText('Test Todo'); 
    expect(todoElement).not.toHaveStyle('text-decoration: line-through');
    
    fireEvent.click(todoElement);
    expect(todoElement).toHaveStyle('text-decoration: line-through');
  });

  test('Empty input should not add todo', () => {
    renderWithRedux(<App />);
    const buttonElement = screen.getByTestId('add-button');
    fireEvent.click(buttonElement);
    
    const todoElement = screen.queryByRole('listitem');
    expect(todoElement).not.toBeInTheDocument();
  });
});