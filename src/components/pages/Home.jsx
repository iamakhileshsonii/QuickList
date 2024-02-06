import React, { useEffect, useState } from 'react';
import SingleTodo from '../cards/SingleTodo';

const Home = () => {
  const [todoInput, setTodoInput] = useState('');
  const [toDos, setToDos] = useState([]);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null); // New state to keep track of the selected todo ID

  useEffect(() => {
    function fetchToDos() {
      const TodoList = JSON.parse(localStorage.getItem('toDo')) || [];
      setToDos(TodoList);
    }
    fetchToDos();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoInput !== "") {
      if (updateBtn && selectedTodoId) { // If update button is clicked and a todo is selected for editing
        const updatedTodos = toDos.map(todo => {
          if (todo.id === selectedTodoId) {
            return { ...todo, task: todoInput }; // Update the task of the selected todo
          }
          return todo;
        });
        setToDos(updatedTodos);
        localStorage.setItem('toDo', JSON.stringify(updatedTodos));
        setUpdateBtn(false); // Reset update button state
        setSelectedTodoId(null); // Reset selected todo ID state
      } else {
        const newTask = { id: Date.now(), task: todoInput };
        const newTodo = [...toDos, newTask];
        setToDos(newTodo);
        localStorage.setItem('toDo', JSON.stringify(newTodo));
      }
      setTodoInput('');
    } else {
      console.log("Type something idiot");
    }
  }

  function addTodo(value) {
    setTodoInput(value);
  }

  function handleDelete(id) {
    const deleteTodo = toDos.filter(delTodo => delTodo.id !== id);
    localStorage.setItem('toDo', JSON.stringify(deleteTodo));
    setToDos(deleteTodo);
  }

  function handleEdit(id) {
    setUpdateBtn(true);
    setSelectedTodoId(id); // Set the selected todo ID
    const selectedTodo = toDos.find(todo => todo.id === id); // Use find instead of filter since you're expecting only one todo
    if (selectedTodo) {
      setTodoInput(selectedTodo.task);
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-r from-black to-red py-5 px-10 md:py-10 md:px-96 block justify-center w-full'>
      <form className='justify-center' onSubmit={handleSubmit}>
        <div className='flex bg-glass rounded-sm px-3 justify-center w-full'>
          <input type="text" placeholder='Add your task...' className='bg-transparent py-1 px-2 focus:outline-none text-white' value={todoInput} onChange={(e) => addTodo(e.target.value)} name='todoInput' />
          {updateBtn ? <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
            </svg>
          </button> :

            <button className='' type='submit'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-white self-middle">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>}
        </div>

        <div className='my-10'>
          {toDos && toDos.map((todo) => (
            <SingleTodo toDo={todo} key={todo.id} deleteTodo={() => handleDelete(todo.id)} editTodo={() => handleEdit(todo.id)} />
          ))}
        </div>
      </form>
    </div>
  )
}

export default Home;
